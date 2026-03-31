'use client'

import { Container, Typography, Paper } from '@mui/material'
import FilterablePokedexTable from '@/components/FilterablePokedexTable'

export default function Part3Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Part 3: Filterable Pokédex
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Filter Pokémon by type and browse through pages
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <FilterablePokedexTable />
      </Paper>
    </Container>
  )
}