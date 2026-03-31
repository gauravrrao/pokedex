import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const pokemonData = [
  {
    name: "Bulbasaur",
    types: ["grass", "poison"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  {
    name: "Charmander",
    types: ["fire"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
  },
  {
    name: "Squirtle",
    types: ["water"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
  },
  {
    name: "Pikachu",
    types: ["electric"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  {
    name: "Jigglypuff",
    types: ["normal", "fairy"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png"
  },
  {
    name: "Geodude",
    types: ["rock", "ground"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png"
  },
  {
    name: "Gengar",
    types: ["ghost", "poison"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
  },
  {
    name: "Dragonite",
    types: ["dragon", "flying"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png"
  }
]

async function main() {
  console.log("Start seeding...")

  for (const pokemon of pokemonData) {
    const result = await prisma.pokemon.upsert({
      where: { name: pokemon.name },
      update: {},
      create: pokemon,
    })

    console.log(`Created pokemon with id: ${result.id}`)
  }

  console.log("Seeding finished.")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })