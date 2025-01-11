export interface Partida {
    jugadores: Jugador[],
    ganadores?: Jugador[],
    ultimaOportunidad: boolean
}

export interface Jugador {
    apodo: string,
    puntuacion: number
}
