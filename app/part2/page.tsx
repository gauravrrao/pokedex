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
  Chip
} from '@mui/material'
import { trpc } from '@/utils/trpc'
import PokedexTable from '@/components/PokedexTable'

export default function Part2Page() {
  const [pokemonNames, setPokemonNames] = useState('')
  const [searchNames, setSearchNames] = useState<string[]>([])

  const { data: pokemonList, isLoading, error } = trpc.getPokemonArray.useQuery(
    searchNames,
    { enabled: searchNames.length > 0 }
  )

  const handleSearch = () => {
    const names = pokemonNames
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0)
    
    if (names.length > 0) {
      setSearchNames(names)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Part 2: Multiple Pokémon Search
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box display="flex" gap={2} alignItems="flex-start" flexDirection="column">
          <TextField
            fullWidth
            label="Pokémon Names (comma-separated)"
            variant="outlined"
            value={pokemonNames}
            onChange={(e) => setPokemonNames(e.target.value)}
            placeholder="e.g., bulbasaur, charmander, squirtle"
            multiline
            rows={2}
          />
          <Box display="flex" gap={2} width="100%">
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isLoading || !pokemonNames.trim()}
            >
              Search
            </Button>
            {searchNames.length > 0 && (
              <Button
                variant="outlined"
                onClick={() => {
                  setPokemonNames('')
                  setSearchNames([])
                }}
              >
                Clear
              </Button>
            )}
          </Box>
          {searchNames.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Searching for:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {searchNames.map(name => (
                  <Chip key={name} label={name} size="small" />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error: {error.message}
        </Alert>
      )}

      {pokemonList && pokemonList.length > 0 && (
        <PokedexTable 
          pokemon={pokemonList}
          title={`Found ${pokemonList.length} Pokémon`}
        />
      )}

      {searchNames.length > 0 && !isLoading && pokemonList?.length === 0 && !error && (
        <Alert severity="info">
          No Pokémon found with the provided names
        </Alert>
      )}
    </Container>
  )
}