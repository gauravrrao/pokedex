'use client'

import { Box } from '@mui/material'
import { keyframes } from '@mui/system'
import { useEffect, useState } from 'react'

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
  100% {
    transform: translateY(0px) rotate(360deg);
  }
`

const pulse = keyframes`
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
`

export default function AnimatedBackground() {
  const [pokeballs, setPokeballs] = useState<Array<{
    id: number
    size: number
    left: number
    animationDuration: number
    animationDelay: number
  }>>([])

  useEffect(() => {
    const balls = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      animationDuration: Math.random() * 20 + 10,
      animationDelay: Math.random() * 5,
    }))
    setPokeballs(balls)
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {pokeballs.map((ball) => (
        <Box
          key={ball.id}
          sx={{
            position: 'absolute',
            width: ball.size,
            height: ball.size,
            left: `${ball.left}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.1,
            animation: `${float} ${ball.animationDuration}s infinite ease-in-out`,
            animationDelay: `${ball.animationDelay}s`,
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))',
              animation: `${pulse} 3s infinite ease-in-out`,
            },
          }}
        />
      ))}
    </Box>
  )
}