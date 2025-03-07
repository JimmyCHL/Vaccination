import { Autocomplete, Box, TextField } from '@mui/material'
import { SyntheticEvent, useCallback, useMemo, useState } from 'react'
import { Slide } from 'react-awesome-reveal'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_SCHEDULE } from '../../../redux/Schedule/ScheduleActions'
import { Schedule } from '../../../redux/Schedule/type'
import { vaccinesSelector } from '../../../redux/Vaccine/VaccineSelector'
import { Vaccine } from '../../../redux/Vaccine/type'
import { VaccineCard } from '../../../share/Vaccine/components/VaccineCard'

type SelectVaccineProps = {
  schedule: Partial<Schedule>
}

export const SelectVaccine = ({ schedule }: SelectVaccineProps) => {
  const vaccines = useSelector(vaccinesSelector)
  const dispatch = useDispatch()
  const [vaccine, setVaccine] = useState<Vaccine>()
  const options = useMemo(() => {
    return vaccines.map((vaccine) => vaccine.name)
  }, [vaccines])

  const handleVaccineChange = useCallback(
    (e: SyntheticEvent, value: String | null) => {
      const selectedVaccine = vaccines.find((vaccine) => vaccine.name === value)
      if (selectedVaccine) {
        setVaccine(selectedVaccine)
        dispatch(SET_CURRENT_SCHEDULE({ ...schedule, vaccine: selectedVaccine }))
      }
    },
    [dispatch, schedule, vaccines]
  )

  return (
    <Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Autocomplete
          value={schedule.vaccine?.name ?? vaccine?.name ?? ''}
          disablePortal
          onChange={handleVaccineChange}
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Vaccine" />}
        />
        {(schedule.vaccine || vaccine) && (
          <Box>
            <Slide
              key={schedule.vaccine ? schedule.vaccine._id : vaccine?._id}
              delay={100} // Wait 200ms before starting
              duration={700} // Animation lasts 1 second
              triggerOnce // Only animate once
              fraction={0.8} // Start animation when element is 50% visible
              direction="left" // Animation direction
            >
              <VaccineCard vaccine={schedule.vaccine ?? vaccine!} />
            </Slide>
          </Box>
        )}
      </Box>
    </Box>
  )
}
