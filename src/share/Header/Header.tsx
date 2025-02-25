import AdbIcon from '@mui/icons-material/Adb'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthenticated } from '../../hooks/useAuthenticated'
import { AppDispatch } from '../../redux/store'
import { SignOutUser } from '../../redux/User/UserActions'
import { NavButton } from './NavButton'

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthenticated()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      dispatch(SignOutUser())
      navigate('/authenticate')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <AdbIcon sx={{ marginRight: '5px' }} />
            <NavButton to="/" children="Home" />
          </Box>
          {isAuthenticated && (
            <Button component={Link} to="/personalDetail" color="inherit">
              Info
            </Button>
          )}

          <Button component={Link} to="/authenticate" color="inherit">
            {isAuthenticated ? 'Log Out' : 'Sign In'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
