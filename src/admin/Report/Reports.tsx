import { Box } from '@mui/material'
import { LineChart, PieChart } from '@mui/x-charts'
import { BarChart } from '@mui/x-charts/BarChart'
import { useEffect, useState } from 'react'
import {
  AgeCountsPerVaccine,
  fetchAgeCountsPerVaccine,
  fetchGenderCountsPerVaccine,
  GenderCountsPerVaccine,
  PercentageVaccinatedForAllVaccines,
  percentageVaccinatedForAllVaccines,
  PreDiseasesCountAcrossAllPatients,
  preDiseasesCountAcrossAllPatients,
  vaccineRegisteredPerMonth,
  VaccineRegisteredPerMonth,
} from '../../api/reports'

export const Reports = () => {
  const [data, setData] = useState<
    | [
        GenderCountsPerVaccine,
        AgeCountsPerVaccine,
        VaccineRegisteredPerMonth,
        PercentageVaccinatedForAllVaccines,
        PreDiseasesCountAcrossAllPatients
      ]
    | undefined
  >()

  useEffect(() => {
    Promise.all([
      fetchGenderCountsPerVaccine(),
      fetchAgeCountsPerVaccine(),
      vaccineRegisteredPerMonth(),
      percentageVaccinatedForAllVaccines(),
      preDiseasesCountAcrossAllPatients(),
    ]).then((result) => {
      setData(result)
    })
  }, [])

  return (
    <Box>
      <h3>{'GenderPerVaccine'}</h3>
      <BarChart
        sx={{
          m: '3',
          boxShadow: 'inset 5px 5px 10px 5px yellow',
          backgroundColor: 'transparent',
          borderRadius: '10px',
        }}
        width={900}
        height={300}
        series={[
          { data: Object.values(data?.[0] || []).map((itm) => itm.male), label: 'Male', id: 'Male' },
          { data: Object.values(data?.[0] || []).map((itm) => itm.female), label: 'Female', id: 'Female' },
        ]}
        loading={!data}
        title={'GenderPerVaccine'}
        xAxis={[{ data: Object.keys(data?.[0] || []), scaleType: 'band', label: 'Vaccine' }]}
        yAxis={[{ scaleType: 'linear', label: 'Count' }]}
        resolveSizeBeforeRender={true}
        colors={['#8884d8', '#82ca9d']}
      />
      <Box sx={{ m: '3' }} />
      <h3>{'AgePerVaccine'}</h3>
      <BarChart
        sx={{ m: '3', boxShadow: 'inset 5px 5px 10px 5px black', backgroundColor: 'gray', borderRadius: '10px' }}
        width={900}
        height={300}
        series={[
          { data: Object.values(data?.[1] || []).map((itm) => itm[0]), label: 'under 18', id: 'under18' },
          { data: Object.values(data?.[1] || []).map((itm) => itm[1]), label: '19-25', id: '1925' },
          { data: Object.values(data?.[1] || []).map((itm) => itm[2]), label: '26-35', id: '2635' },
          { data: Object.values(data?.[1] || []).map((itm) => itm[3]), label: '36-45', id: '3645' },
          { data: Object.values(data?.[1] || []).map((itm) => itm[4]), label: '46-55', id: '4655' },
          { data: Object.values(data?.[1] || []).map((itm) => itm[5]), label: '56-65', id: '5665' },
          { data: Object.values(data?.[1] || []).map((itm) => itm[6]), label: '66+', id: '66+' },
        ]}
        loading={!data}
        title={'GenderPerVaccine'}
        xAxis={[{ data: Object.keys(data?.[1] || []), scaleType: 'band', label: 'Vaccine' }]}
        yAxis={[{ scaleType: 'linear', label: 'Count' }]}
        resolveSizeBeforeRender={true}
        colors={['#8884d8', '#82ca9d', 'pink', 'red', 'blue', 'green', 'yellow']}
      />
      <Box sx={{ m: '3' }} />
      <h3>{'VaccineRegisteredPerMonth2025'}</h3>
      <LineChart
        width={900}
        height={300}
        sx={{
          m: '3',
          boxShadow: 'inset 5px 5px 10px 5px green',
          backgroundColor: 'transparent',
          borderRadius: '10px',
        }}
        xAxis={[{ data: Object.keys(data?.[2] || []), scaleType: 'band', label: 'Month' }]}
        yAxis={[{ scaleType: 'linear', label: 'Count' }]}
        title={'VaccineRegisteredPerMonth2025'}
        loading={!data}
        series={[
          {
            data: Object.values(data?.[2] || []),
            label: 'VaccineRegisteredPerMonth2025',
            id: 'VaccineRegisteredPerMonth',
            area: true,
          },
        ]}
      />
      <Box sx={{ m: '3' }} />
      <h3>{'PercentageVaccinatedForAllVaccines'}</h3>

      <PieChart
        sx={{
          boxShadow: 'inset 5px 5px 10px 5px red',
          backgroundColor: 'transparent',
          borderRadius: '10px',
          paddingTop: '25px',
          paddingBottom: '25px',
        }}
        series={[
          {
            arcLabel: 'formattedValue',
            data: Object.entries(data?.[3] || []).map(([key, value]) => ({ label: key, value })),
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter,
          },
        ]}
        width={900}
        height={300}
        loading={!data}
        title={'PercentageVaccinatedForAllVaccines'}
      />

      <Box sx={{ m: '3' }} />
      <h3>{'PreDiseasesCountAcrossAllPatients'}</h3>
      <BarChart
        sx={{
          m: '3',
          boxShadow: 'inset 5px 5px 10px 5px orange',
          backgroundColor: 'transparent',
          borderRadius: '10px',
        }}
        width={900}
        height={300}
        series={[{ data: Object.values(data?.[4] || []).map((itm) => itm), label: 'Disease', id: 'Disease' }]}
        loading={!data}
        title={'PreDiseasesCountAcrossAllPatients'}
        xAxis={[{ data: Object.keys(data?.[4] || []), scaleType: 'band', label: 'Pre Disease' }]}
        yAxis={[{ scaleType: 'linear', label: 'Patient Count' }]}
        resolveSizeBeforeRender={true}
        colors={['#8884d8']}
      />
    </Box>
  )
}

export const valueFormatter = (item: { value: number }) => `${item.value.toPrecision(2)}%`
