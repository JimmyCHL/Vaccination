import AdbIcon from '@mui/icons-material/Adb'
import { Fab, Menu, MenuItem, useMediaQuery } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthenticated } from '../../hooks/useAuthenticated'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { AppDispatch } from '../../redux/store'
import { SignOutUser } from '../../redux/User/UserActions'
import { NavButton } from './NavButton'

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthenticated()
  const { isUser, isAdmin } = useIsAdmin()
  const isLarge = useMediaQuery('(max-width: 1000px)')

  // MUI Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
          {/* admin */}
          {isAdmin && (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
              {!isLarge ? (
                <>
                  <AdbIcon sx={{ marginRight: '5px' }} />
                  <NavButton to="/admin/addVaccine" children="Add Vaccine" />
                  <NavButton to="/admin/vaccineList" children="Vaccine List" />
                  <NavButton to="/admin/AddHospital" children="Add Hospital" />
                  <NavButton to="/admin/hospitalList" children="Hospital List" />
                  <NavButton to="/admin/approver" children="Approver" />
                  <NavButton to="/admin/patientList" children="Patient List" />
                </>
              ) : (
                <>
                  <Fab sx={{ width: '40px', height: '40px' }} aria-label="add" onClick={handleClick}>
                    <AdbIcon />
                  </Fab>
                  <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>
                      <NavButton to="/admin/addVaccine" children="Add Vaccine" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavButton to="/admin/vaccineList" children="Vaccine List" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavButton to="/admin/AddHospital" children="Add Hospital" />
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <NavButton to="/admin/hospitalList" children="Hospital List" />
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <NavButton to="/admin/approver" children="Approver" />
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <NavButton to="/admin/patientList" children="Patient List" />
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
          {/* patient */}
          {isUser && (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
              {!isLarge ? (
                <>
                  <AdbIcon sx={{ marginRight: '5px' }} />
                  <NavButton to="/" children="Home" />
                  <NavButton to="/vaccineList" children="Vaccine List" />
                  <NavButton to="/hospitalList" children="Hospital List" />
                  {isAuthenticated && (
                    <>
                      <NavButton to="/ownSchedules" children="Own Schedules" />
                      <NavButton to="/makeAppointment" children="Make Appointment" />
                    </>
                  )}
                </>
              ) : (
                <>
                  <Fab sx={{ width: '40px', height: '40px' }} aria-label="add" onClick={handleClick}>
                    <AdbIcon />
                  </Fab>
                  <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>
                      <NavButton to="/" children="Home" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavButton to="/vaccineList" children="Vaccine List" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavButton to="/hospitalList" children="Hospital List" />
                    </MenuItem>
                    {isAuthenticated && (
                      <>
                        <MenuItem onClick={handleClose}>
                          <NavButton to="/ownSchedules" children="Own Schedules" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <NavButton to="/makeAppointment" children="Make Appointment" />
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </>
              )}
            </Box>
          )}
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
