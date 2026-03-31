"use client"
import { Container, Typography, Box, Card, CardContent, Grid, Button } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Pokédex
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Your complete Pokémon encyclopedia
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Part 1
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Search and view individual Pokémon details including name, ID, types, and sprite.
              </Typography>
              <Button 
                component={Link} 
                href="/part1" 
                variant="contained" 
                color="primary"
                fullWidth
              >
                Try Part 1
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Part 2
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                View multiple Pokémon in a beautiful table format with complete details.
              </Typography>
              <Button 
                component={Link} 
                href="/part2" 
                variant="contained" 
                color="primary"
                fullWidth
              >
                Try Part 2
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Part 3
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Filter Pokémon by type with our advanced filtering system and pagination.
              </Typography>
              <Button 
                component={Link} 
                href="/part3" 
                variant="contained" 
                color="primary"
                fullWidth
              >
                Try Part 3
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}