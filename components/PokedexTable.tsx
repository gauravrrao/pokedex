import { 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  Paper,
  TableContainer,
  Box,
  Typography,
  useTheme,
  alpha
} from '@mui/material'
import { Pokemon } from '@/types/pokemon'
import PokemonRow from './PokemonRow'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

interface PokedexTableProps {
  pokemon: Pokemon[]
  title?: string
}

export default function PokedexTable({ pokemon, title }: PokedexTableProps) {
  const theme = useTheme()

  if (pokemon.length === 0) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 8, 
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <CatchingPokemonIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No Pokémon found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try searching for a different Pokémon
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer 
      component={Paper} 
      elevation={3}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        '&::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: 4,
          '&:hover': {
            background: '#555',
          },
        },
      }}
    >
      {title && (
        <Box 
          p={2.5} 
          borderBottom={`1px solid ${alpha(theme.palette.primary.main, 0.2)}`}
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showing {pokemon.length} Pokémon
          </Typography>
        </Box>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight="bold" fontSize="1rem">
                Pokémon
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold" fontSize="1rem">
                Types
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold" fontSize="1rem">
                Sprite
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemon.map((p, index) => (
            <PokemonRow key={p.id} pokemon={p} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}