import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchHospitals } from '../redux/Hospital/HospitalActions'
import { AppDispatch } from '../redux/store'
import { fetchVaccines } from '../redux/Vaccine/VaccineActions'

// for global initialization
export const useInitialization = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    //fetch vaccinations
    dispatch(fetchVaccines())
    // fetch hospitals
    dispatch(fetchHospitals())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
