'use client'

import { useState } from 'react'
import { 
  Container, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper,
  Alert,
  Fade,
  alpha,
  useTheme
} from '@mui/material'
import { trpc } from '@/utils/trpc'
import PokedexTable from '@/components/PokedexTable'
import SearchIcon from '@mui/icons-material/Search'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

export default function Part1Page() {
  const [pokemonName, setPokemonName] = useState('')
  const [searchName, setSearchName] = useState('')
  const theme = useTheme()

  const { data: pokemon, isLoading, error } = trpc.getPokemon.useQuery(
    searchName,
    { enabled: !!searchName }
  )

  const handleSearch = () => {
    if (pokemonName.trim()) {
      setSearchName(pokemonName.trim())
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <Box>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              textAlign: 'center',
              mb: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Single Pokémon Search
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            textAlign="center" 
            mb={4}
          >
            Search for any Pokémon by name and view its details
          </Typography>
        </Box>
      </Fade>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
        }}
      >
        <Box display="flex" gap={2} alignItems="flex-start">
          <TextField
            fullWidth
            label="Pokémon Name"
            variant="outlined"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter Pokémon name (e.g., Bulbasaur, Pikachu, Charizard)"
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '1.1rem',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading || !pokemonName.trim()}
            startIcon={<SearchIcon />}
            sx={{ 
              height: 56,
              px: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </Box>
      </Paper>

      {error && (
        <Fade in>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              borderRadius: 2,
            }}
          >
            Error: {error.message}
          </Alert>
        </Fade>
      )}

      {pokemon && (
        <Fade in timeout={500}>
          <Box>
            <PokedexTable 
              pokemon={[pokemon]} 
              title={`Pokémon Details: ${pokemon.name}`}
            />
          </Box>
        </Fade>
      )}

      {searchName && !pokemon && !isLoading && !error && (
        <Fade in>
          <Paper sx={{ p: 6, textAlign: 'center', background: 'rgba(255, 255, 255, 0.95)' }}>
            <CatchingPokemonIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No Pokémon found with name "{searchName}"
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Make sure the name is spelled correctly
            </Typography>
          </Paper>
        </Fade>
      )}
    </Container>
  )
}