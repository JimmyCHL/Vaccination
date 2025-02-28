import { Button, Typography, useMediaQuery } from '@mui/material'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const NavButton = ({ to, children }: { to: string; children: ReactNode }) => {
  const location = useLocation()
  const isSmall = useMediaQuery('(max-width: 900px)')
  // Check if the current path matches the target 'to' path
  const isActive = location.pathname === to

  return (
    <Button
      component={Link}
      to={to} // Use the 'to' prop from React Router
      variant={isActive ? 'contained' : 'text'}
      sx={{
        backgroundColor: isActive ? 'black' : 'lightgray', // Active style
        color: 'white',
        '&:hover': {
          backgroundColor: 'lightskyblue',
        },
      }}
    >
      <Typography
        sx={{ fontWeight: isActive ? 'bold' : 'normal', fontSize: isSmall ? '12px' : '16px' }} // Active style
      >
        {children}
      </Typography>
    </Button>
  )
}
