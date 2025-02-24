import { Button, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const NavButton = ({ to, children }: { to: string; children: ReactNode }) => {
  const location = useLocation()

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
          backgroundColor: 'lightgray',
        },
      }}
    >
      <Typography
        sx={{ fontWeight: isActive ? 'bold' : 'normal' }} // Active style
      >
        {children}
      </Typography>
    </Button>
  )
}
