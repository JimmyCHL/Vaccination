import { useSelector } from 'react-redux'
import { userSelector } from '../redux/User/UserSelector'
import { RoleEnum } from '../redux/User/type'

export const useIsAdmin = () => {
  const user = useSelector(userSelector)

  return {
    isAdmin: user.role === RoleEnum.Admin,
    isUser: user.role === RoleEnum.User,
  }
}
