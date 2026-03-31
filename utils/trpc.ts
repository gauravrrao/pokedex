import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { type AppRouter } from '@/server/trpc/root'
import superjson from 'superjson'

export const trpc = createTRPCReact<AppRouter>()

export function getBaseUrl() {
  // ✅ Browser
  if (typeof window !== 'undefined') return ''

  // ✅ Netlify production
  if (process.env.URL) {
    return process.env.URL
  }

  // ✅ Local development
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function getTRPCClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        transformer: superjson,
      }),
    ],
  })
}