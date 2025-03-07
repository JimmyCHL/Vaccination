import { Autocomplete, Box, TextField } from '@mui/material'
import { SyntheticEvent, useCallback, useMemo, useState } from 'react'
import { Slide } from 'react-awesome-reveal'
import { useDispatch, useSelector } from 'react-redux'
import { hospitalsSelector } from '../../../redux/Hospital/HospitalSelector' // Update selector
import { Hospital } from '../../../redux/Hospital/type' // Update type
import { SET_CURRENT_SCHEDULE } from '../../../redux/Schedule/ScheduleActions'
import { Schedule } from '../../../redux/Schedule/type'
import { HospitalCard } from '../../../share/Hospital/components/HospitalCard' // Update component

type SelectHospitalProps = {
  schedule: Partial<Schedule>
}

export const SelectHospital = ({ schedule }: SelectHospitalProps) => {
  const hospitals = useSelector(hospitalsSelector) // Selector for hospitals
  const dispatch = useDispatch()
  const [hospital, setHospital] = useState<Hospital>()
  const options = useMemo(() => {
    return hospitals.map((hospital) => hospital.name)
  }, [hospitals])

  const handleHospitalChange = useCallback(
    (e: SyntheticEvent, value: string | null) => {
      const selectedHospital = hospitals.find((hospital) => hospital.name === value)
      if (selectedHospital) {
        setHospital(selectedHospital)
        dispatch(SET_CURRENT_SCHEDULE({ ...schedule, hospital: selectedHospital }))
      }
    },
    [dispatch, schedule, hospitals]
  )

  return (
    <Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Autocomplete
          value={schedule.hospital?.name ?? hospital?.name ?? ''}
          disablePortal
          onChange={handleHospitalChange}
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Hospital" />}
        />
        {(schedule.hospital || hospital) && (
          <Box>
            <Slide
              key={schedule.hospital ? schedule.hospital._id : hospital?._id}
              delay={100} // Wait 100ms before starting
              duration={700} // Animation lasts 700ms
              triggerOnce // Only animate once
              fraction={0.8} // Start animation when element is 80% visible
              direction="left" // Animation direction
            >
              <HospitalCard hospital={schedule.hospital ?? hospital!} />
            </Slide>
          </Box>
        )}
      </Box>
    </Box>
  )
}
