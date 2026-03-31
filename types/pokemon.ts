export interface Pokemon {
  id: number
  name: string
  types: string[]
  sprite: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PokemonResponse {
  data: Pokemon[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}