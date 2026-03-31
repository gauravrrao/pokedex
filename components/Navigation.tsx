'use client'

import { AppBar, Toolbar, Typography, Button, Container, Box, Chip } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import SearchIcon from '@mui/icons-material/Search'
import TableChartIcon from '@mui/icons-material/TableChart'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { path: '/part1', label: 'Single Search', icon: <SearchIcon /> },
    { path: '/part2', label: 'Multiple Search', icon: <TableChartIcon /> },
    { path: '/part3', label: 'Filterable Table', icon: <FilterAltIcon /> },
  ]

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <CatchingPokemonIcon 
              sx={{ 
                mr: 1, 
                fontSize: 32,
                color: '#EF5350',
                animation: 'spin 2s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }} 
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              Pokédex Pro
            </Typography>
            <Chip 
              label="Beta" 
              size="small"
              sx={{ 
                ml: 1,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          </Box>

          <Box display="flex" gap={2}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                href={item.path}
                startIcon={item.icon}
                sx={{
                  color: pathname === item.path ? '#667eea' : '#666',
                  fontWeight: pathname === item.path ? 700 : 500,
                  borderBottom: pathname === item.path ? '2px solid #667eea' : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    color: '#667eea',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}