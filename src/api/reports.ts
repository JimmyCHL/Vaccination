import axiosInstance from '../config/globalAxios'

export type GenderCountsPerVaccine = Record<string, { male: number; female: number }>
export type AgeCountsPerVaccine = Record<string, number[]>
export type VaccineRegisteredPerMonth = Record<string, number>
export type PercentageVaccinatedForAllVaccines = Record<string, number>
export type PreDiseasesCountAcrossAllPatients = Record<string, number>

// fetch all vaccines from the database
export const fetchGenderCountsPerVaccine = async (): Promise<GenderCountsPerVaccine> => {
  return axiosInstance
    .get('/schedule/api/admin/genderCountsPerVaccine')
    .then((collection) => {
      const result = collection.data
      return result
    })
    .catch((error) => console.log(error))
}

export const fetchAgeCountsPerVaccine = async (): Promise<AgeCountsPerVaccine> => {
  return axiosInstance
    .get('/schedule/api/admin/ageCountsPerVaccine')
    .then((collection) => {
      const result = collection.data
      return result
    })
    .catch((error) => console.log(error))
}

export const vaccineRegisteredPerMonth = async (): Promise<VaccineRegisteredPerMonth> => {
  return axiosInstance
    .get('/schedule/api/admin/vaccineRegisteredPerMonth2025')
    .then((collection) => {
      const result = collection.data
      return result
    })
    .catch((error) => console.log(error))
}

export const percentageVaccinatedForAllVaccines = async (): Promise<PercentageVaccinatedForAllVaccines> => {
  return axiosInstance
    .get('/schedule/api/admin/percentageVaccinatedForAllVaccines')
    .then((collection) => {
      const result = collection.data
      return result
    })
    .catch((error) => console.log(error))
}

export const preDiseasesCountAcrossAllPatients = async (): Promise<PreDiseasesCountAcrossAllPatients> => {
  return axiosInstance
    .get('/schedule/api/admin/preDiseasesCountAcrossAllPatients')
    .then((collection) => {
      const result = collection.data
      return result
    })
    .catch((error) => console.log(error))
}
