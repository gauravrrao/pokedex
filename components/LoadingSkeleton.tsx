import { Box, Skeleton, Paper, alpha } from '@mui/material'

export default function LoadingSkeleton() {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        background: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      <Box mb={3}>
        <Skeleton variant="rectangular" width="100%" height={60} />
      </Box>
      {[1, 2, 3, 4, 5].map((i) => (
        <Box key={i} display="flex" gap={2} mb={2}>
          <Skeleton variant="circular" width={64} height={64} />
          <Box flex={1}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="40%" height={24} />
          </Box>
          <Skeleton variant="rounded" width={100} height={32} />
        </Box>
      ))}
    </Paper>
  )
}