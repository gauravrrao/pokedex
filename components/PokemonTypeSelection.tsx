import { FormControl, InputLabel, Select, MenuItem, Box, Chip, alpha, useTheme } from '@mui/material'
import { trpc } from '@/utils/trpc'
import FilterListIcon from '@mui/icons-material/FilterList'

interface PokemonTypeSelectionProps {
  selectedType: string | undefined
  selectType: (type: string | undefined) => void
}

export default function PokemonTypeSelection({ 
  selectedType, 
  selectType 
}: PokemonTypeSelectionProps) {
  const { data: types = [], isLoading } = trpc.getAllTypes.useQuery()
  const theme = useTheme()

  return (
    <Box 
      mb={4}
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -10,
          left: -10,
          right: -10,
          bottom: -10,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          borderRadius: 3,
          zIndex: -1,
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon fontSize="small" />
          Filter by Type
        </InputLabel>
        <Select
          value={selectedType || ''}
          onChange={(e) => selectType(e.target.value || undefined)}
          label="Filter by Type"
          disabled={isLoading}
          sx={{
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            },
            transition: 'all 0.3s ease',
          }}
          renderValue={(selected) => {
            if (!selected) return <em>All Types</em>
            const typeColors: Record<string, string> = {
              normal: '#A8A878', fire: '#F08030', water: '#6890F0',
              electric: '#F8D030', grass: '#78C850', poison: '#A040A0',
              ground: '#E0C068', flying: '#A890F0', psychic: '#F85888',
              bug: '#A8B820', rock: '#B8A038', ghost: '#705898',
              dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
              fairy: '#EE99AC'
            }
            return (
              <Chip 
                label={selected} 
                size="small"
                sx={{
                  backgroundColor: typeColors[selected] || '#68A090',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            )
          }}
        >
          <MenuItem value="">
            <em>All Types</em>
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: (() => {
                      const colors: Record<string, string> = {
                        normal: '#A8A878', fire: '#F08030', water: '#6890F0',
                        electric: '#F8D030', grass: '#78C850', poison: '#A040A0',
                        ground: '#E0C068', flying: '#A890F0', psychic: '#F85888',
                        bug: '#A8B820', rock: '#B8A038', ghost: '#705898',
                        dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
                        fairy: '#EE99AC'
                      }
                      return colors[type] || '#68A090'
                    })(),
                  }}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}