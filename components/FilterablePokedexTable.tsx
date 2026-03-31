import { useState } from 'react'
import { Box, CircularProgress, Alert, Pagination, Fade, Typography, alpha, useTheme } from '@mui/material'
import { trpc } from '@/utils/trpc'
import PokedexTable from './PokedexTable'
import PokemonTypeSelection from './PokemonTypeSelection'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

export default function FilterablePokedexTable() {
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const limit = 10
  const theme = useTheme()

  const { data, isLoading, error } = trpc.getAllPokemon.useQuery({
    type: selectedType,
    page,
    limit
  })

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return (
      <Fade in>
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: 24,
            },
          }}
        >
          Error loading Pokemon: {error.message}
        </Alert>
      </Fade>
    )
  }

  return (
    <Box>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={(type) => {
          setSelectedType(type)
          setPage(1)
        }}
      />
      
      {isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center" py={8}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" mt={3} color="text.secondary">
            Loading Pokémon...
          </Typography>
        </Box>
      ) : data && (
        <Fade in timeout={500}>
          <Box>
            {data.data.length === 0 ? (
              <Box textAlign="center" py={8}>
                <CatchingPokemonIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                <Typography variant="h5" color="text.secondary">
                  No Pokémon found of type "{selectedType}"
                </Typography>
              </Box>
            ) : (
              <>
                <PokedexTable 
                  pokemon={data.data}
                  title={selectedType ? `${selectedType.toUpperCase()} Type Pokémon` : 'All Pokémon'}
                />
                
                {data.pagination.totalPages > 1 && (
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                      count={data.pagination.totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          borderRadius: 2,
                          fontWeight: 600,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                        },
                        '& .Mui-selected': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          color: 'white',
                        },
                      }}
                    />
                  </Box>
                )}
                
                <Box 
                  mt={3} 
                  textAlign="center" 
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Showing {data.data.length} of {data.pagination.total} Pokémon • Page {data.pagination.page} of {data.pagination.totalPages}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      )}
    </Box>
  )
}