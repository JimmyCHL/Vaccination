import { Alert, Box } from '@mui/material'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'
import { DateTime } from 'luxon'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { SET_CURRENT_SCHEDULE } from '../../../redux/Schedule/ScheduleActions'
import { Schedule } from '../../../redux/Schedule/type'

type SelectDateTimeProps = {
  schedule: Partial<Schedule>
}

export const SelectDateTime = ({ schedule }: SelectDateTimeProps) => {
  const dispatch = useDispatch()

  const handleDateTimeChange = useCallback(
    (date: DateTime | null) => {
      const dates: DateTime[] = []
      if (date) {
        dates.push(date)
        if (schedule.vaccine?.dosesRequired && schedule.vaccine?.dosesRequired > 1) {
          for (let i = 1; i < schedule.vaccine.dosesRequired; i++) {
            dates.push(date.plus({ days: 14 * i }))
          }
        }
      }
      dispatch(SET_CURRENT_SCHEDULE({ ...schedule, dates }))
    },
    [dispatch, schedule]
  )

  return (
    <Box>
      <Alert severity="info" sx={{ marginTop: 2 }}>
        If there are second doses or thirds, the schedule interval will be 14 days between and will be scheduled
        automatically.
      </Alert>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <StaticDateTimePicker
          orientation="landscape"
          disablePast={true}
          sx={{
            backgroundColor: 'white',
            mt: 4,
            boxShadow: '5px 5px 10px 20px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            maxWidth: '600px',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
          defaultValue={schedule.dates ? schedule.dates[0] : DateTime.now()}
          value={schedule.dates ? schedule.dates[0] : DateTime.now()}
          slots={{ actionBar: () => <></> }}
          minutesStep={5}
          onChange={handleDateTimeChange}
          shouldDisableDate={(date) => date.weekday === 6 || date.weekday === 7}
          shouldDisableTime={(time) => time.hour < 8 || time.hour >= 17}
        />
      </LocalizationProvider>
    </Box>
  )
}
