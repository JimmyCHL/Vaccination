import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { AuthenticateData, saveUser, SignOutUser } from '../../redux/User/UserActions'
import { userSelector } from '../../redux/User/UserSelector'

export const Authenticate = () => {
  const [{ firstName, lastName, email, password }, setData] = useState<AuthenticateData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const hasToken = localStorage.getItem('token')
  const user = useSelector(userSelector)

  useEffect(() => {
    if (hasToken && user.firstName) {
      dispatch(SignOutUser())
    }
    // only run first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = () => {
    dispatch(
      saveUser({ firstName, lastName, email, password }, () => {
        navigate('/personalDetail')
      })
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex', marginBottom: '10px', width: '450px', gap: '10px' }}>
        <FormControl variant="filled" required sx={{ flex: 1 }}>
          <InputLabel htmlFor="firstName">first Name</InputLabel>
          <FilledInput id="firstName" value={firstName} onChange={handleChange} />
        </FormControl>
        <FormControl variant="filled" required sx={{ flex: 1 }}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <FilledInput id="lastName" value={lastName} onChange={handleChange} />
        </FormControl>
      </div>
      <FormControl variant="filled" sx={{ marginBottom: '10px', width: '450px' }}>
        <InputLabel htmlFor="email" required>
          email
        </InputLabel>
        <FilledInput id="email" value={email} onChange={handleChange} />
      </FormControl>
      <FormControl variant="filled" sx={{ marginBottom: '10px', width: '450px' }}>
        <InputLabel htmlFor="password" required>
          password
        </InputLabel>
        <FilledInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant="contained"
        sx={{ width: '450px', color: 'black', backgroundColor: 'lightgray' }}
        onClick={handleSubmit}
      >
        Login / Signup
      </Button>
    </div>
  )
}
