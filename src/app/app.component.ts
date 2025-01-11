import { ChangeDetectorRef, Component } from '@angular/core';
import { Jugador, Partida } from './shared/interfaces/partida';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, DialogModule, SelectButtonModule, FormsModule, InputTextModule, FloatLabelModule, ToastModule, ChipModule, IconFieldModule, InputIconModule, AutoFocusModule, ConfirmPopupModule, CheckboxModule, CommonModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dardos';
  partida: Partida | null = null;
  crearPartidaPopup: boolean = false;
  siguienteTurnoPopup: boolean = false;

  /* Datos partida nueva */
  modalidadPartida: number = 501;
  jugadorAAnadir: string = '';
  listaJugadores: string[] = [];
  ultimaOportunidad: boolean = true;
  ganadoresProvisionales: Jugador[] = [];

  modalidadPartidaOptions: any[] = [
      { name: '301', value: 301 },
      { name: '501', value: 501 },
      { name: '701', value: 701 },
      { name: '901', value: 901 }
  ];

  numeros: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  puntuacionRondaActual: (number | null)[] = [0, null, null];
  dardoActual: number = 1;
  jugadorActual: string = '';

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.isLocalStorageAvailable()) {
      const partida = localStorage.getItem('partida');
      /* Si habia alguna partida antes, cogemos sus datos */
      if (partida) {
        this.partida = JSON.parse(partida);
        this.puntuacionRondaActual = JSON.parse(localStorage.getItem('puntuacionRondaActual')!);
        this.dardoActual = JSON.parse(localStorage.getItem('dardoActual')!);
        this.jugadorActual = JSON.parse(localStorage.getItem('jugadorActual')!);
        this.ganadoresProvisionales = JSON.parse(localStorage.getItem('ganadoresProvisionales')!);
      }
      this.cdr.detectChanges();
    }
  }

  // Método para verificar si localStorage está disponible
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private guardarDatos() {
    localStorage.setItem('partida', JSON.stringify(this.partida));
    localStorage.setItem('puntuacionRondaActual', JSON.stringify(this.puntuacionRondaActual));
    localStorage.setItem('dardoActual', JSON.stringify(this.dardoActual));
    localStorage.setItem('jugadorActual', JSON.stringify(this.jugadorActual));
    localStorage.setItem('ganadoresProvisionales', JSON.stringify(this.ganadoresProvisionales));
  }

  anadirJugadorALista() {
    if (this.jugadorAAnadir && !this.listaJugadores.includes(this.jugadorAAnadir)) {
      this.listaJugadores.push(this.jugadorAAnadir);
      this.jugadorAAnadir = '';
    } else if (this.listaJugadores.includes(this.jugadorAAnadir)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No puede repetirse el jugador', life: 3000 });
    }
  }

  eliminarJugador(jugador: string) {
    this.listaJugadores.splice(this.listaJugadores.findIndex((player) => player === jugador), 1);
  }

  crearPartida() {
    this.puntuacionRondaActual = [0, null, null];
    this.dardoActual = 1;
    this.jugadorActual = this.listaJugadores[0];
    if (this.listaJugadores?.length && this.modalidadPartida) {
      this.jugadorAAnadir = '';
      this.partida = {
        jugadores: this.listaJugadores.map(jugador => ({apodo: jugador, puntuacion: this.modalidadPartida})),
        ultimaOportunidad: this.ultimaOportunidad
      };
      this.crearPartidaPopup = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Añade mínimo 1 jugador', life: 3000 });
    }
    this.guardarDatos();
  }

  anotarDardoActual(num: number) {
    this.puntuacionRondaActual[this.dardoActual - 1] = num;

    /* Para controlar que se muestre el dardo o no */
    if (this.puntuacionRondaActual[this.dardoActual] === null && this.dardoActual < 3) {
      this.puntuacionRondaActual[this.dardoActual] = 0;
    }

    if (this.dardoActual != 3) {
      this.dardoActual++;
    }
    this.guardarDatos();
  }

  focoInput() {
    setTimeout(() => {
      document.getElementById('on_label_jugador')?.focus();
    }, 50);
  }

  siguienteTurno(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Pasar al siguiente turno?',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptButtonProps: {
            label: 'Siguiente'
        },
        accept: () => {
          /* Anotamos la puntuación para el jugador actual */
          const jugadorActual = this.partida?.jugadores.find(j => j.apodo === this.jugadorActual);
          if (jugadorActual) {
            // Normalizamos puntuaciones no definidas a 0 y calculamos la suma
            const totalPuntuacion = this.puntuacionRondaActual
              .map(puntuacion => puntuacion || 0)
              .reduce((a, b) => a + b, 0);
          
            // Restamos la puntuación acumulada y aseguramos que no sea negativa, si no, se queda con la ultima que tenia
            if (jugadorActual.puntuacion - totalPuntuacion >= 0) {
              jugadorActual.puntuacion -= totalPuntuacion;
            }
          
            // Determinamos ganadores según las reglas de última oportunidad
            if (this.partida) {
              const { ultimaOportunidad } = this.partida;
              if (jugadorActual.puntuacion === 0) {
                if (ultimaOportunidad) {
                  this.ganadoresProvisionales.push(jugadorActual);
                } else {
                  this.partida.ganadores = [jugadorActual];
                  return;
                }
              }
              /* Seguimos jugando si nadie llego a 0 */
              const indiceJugadorActual = this.partida.jugadores.indexOf(jugadorActual);
              if (indiceJugadorActual == this.partida.jugadores.length - 1) {
                /* Cambiamos de ronda */
                /* Si habia algun ganador acumulado de ultima oportunidad, gana */
                this.partida.ganadores = this.ganadoresProvisionales;
                this.ganadoresProvisionales = [];
                /* Si no, seguimos */
                this.jugadorActual = this.partida.jugadores[0].apodo;
              } else {
                this.jugadorActual = this.partida.jugadores[indiceJugadorActual + 1].apodo;
              }
              this.puntuacionRondaActual = [0, null, null];
              this.dardoActual = 1;
            }
          }
          this.guardarDatos();
        }
    });
  }

  resetearProgreso(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres borrar los datos?',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'Borrar',
          severity: 'danger'
      },
      accept: () => {
        this.partida = null;
        this.puntuacionRondaActual = [0, null, null];
        this.dardoActual = 1;
        this.jugadorActual = '';
        this.ganadoresProvisionales = [];
        this.guardarDatos(); 
      }
    });
  }
}
