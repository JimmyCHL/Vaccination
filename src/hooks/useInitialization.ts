import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { fetchVaccines } from '../redux/Vaccine/VaccineActions'

// for global initialization
export const useInitialization = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    //fetch vaccination
    dispatch(fetchVaccines())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
