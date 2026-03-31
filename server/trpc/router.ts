import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import superjson from 'superjson'
import { Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const pokemonRouter = t.router({
  // Get single Pokemon
  getPokemon: t.procedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const pokemon = await ctx.prisma.pokemon.findUnique({
        where: { name: input }
      })
      return pokemon
    }),
  
  // Get multiple Pokemon by names
  getPokemonArray: t.procedure
    .input(z.array(z.string()))
    .query(async ({ input, ctx }) => {
      const pokemon = await ctx.prisma.pokemon.findMany({
        where: {
          name: {
            in: input
          }
        }
      })
      return pokemon
    }),
  
  // Get all Pokemon with optional type filter
  getAllPokemon: t.procedure
    .input(z.object({
      type: z.string().optional(),
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20)
    }))
    .query(async ({ input, ctx }) => {
      const where = input.type ? {
        types: {
          has: input.type
        }
      } : {}
      
      const [pokemon, total] = await Promise.all([
        ctx.prisma.pokemon.findMany({
          where,
          skip: (input.page - 1) * input.limit,
          take: input.limit,
          orderBy: { id: 'asc' }
        }),
        ctx.prisma.pokemon.count({ where })
      ])
      
      return {
        data: pokemon,
        pagination: {
          page: input.page,
          limit: input.limit,
          total,
          totalPages: Math.ceil(total / input.limit)
        }
      }
    }),
  
  // Get all unique types
  getAllTypes: t.procedure
    .query(async ({ ctx }) => {
      const pokemon = await ctx.prisma.pokemon.findMany({
        select: { types: true }
      })
      const typesSet = new Set<string>()
      pokemon.forEach(p => p.types.forEach(t => typesSet.add(t)))
      return Array.from(typesSet).sort()
    })
})

export type AppRouter = typeof pokemonRouter