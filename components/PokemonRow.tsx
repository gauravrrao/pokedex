import { TableRow, TableCell, Avatar, Chip, Box, Typography, Fade } from '@mui/material'
import { Pokemon } from '@/types/pokemon'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import GrassIcon from '@mui/icons-material/Grass'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import WaterDropIcon from '@mui/icons-material/WaterDrop'

interface PokemonRowProps {
  pokemon: Pokemon
  index: number
}

const typeIcons: Record<string, any> = {
  fire: WhatshotIcon,
  water: WaterDropIcon,
  grass: GrassIcon,
  electric: FlashOnIcon,
  ice: AcUnitIcon,
}

export default function PokemonRow({ pokemon, index }: PokemonRowProps) {
  const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    }
    return colors[type] || '#68A090'
  }

  return (
    <Fade in timeout={500 * (index * 0.1)}>
      <TableRow 
        hover
        sx={{
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(102, 126, 234, 0.05)',
            transform: 'scale(1.01)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        }}
      >
        <TableCell>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar 
              src={pokemon.sprite} 
              alt={pokemon.name}
              sx={{ 
                width: 64, 
                height: 64, 
                border: '2px solid #667eea',
                backgroundColor: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                },
              }}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {pokemon.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                #{String(pokemon.id).padStart(3, '0')}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Box display="flex" gap={1} flexWrap="wrap">
            {pokemon.types.map((type) => {
              const IconComponent = typeIcons[type]
              return (
                <Chip
                  key={type}
                  icon={IconComponent && <IconComponent sx={{ color: 'white !important' }} />}
                  label={type}
                  size="medium"
                  sx={{
                    backgroundColor: getTypeColor(type),
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    px: 1,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                  }}
                />
              )
            })}
          </Box>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease',
              },
            }}
          >
            <Avatar 
              src={pokemon.sprite} 
              alt={pokemon.name}
              sx={{ 
                width: 56, 
                height: 56,
                backgroundColor: '#f5f5f5',
                border: '2px solid #e0e0e0',
              }}
            />
          </Box>
        </TableCell>
      </TableRow>
    </Fade>
  )
}