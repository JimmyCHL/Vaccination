import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../redux/User/UserSelector'

export const useAuthenticated = () => {
  const user = useSelector(userSelector)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (user._id && !!localStorage.getItem('token')) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [user])

  return { isAuthenticated }
}
