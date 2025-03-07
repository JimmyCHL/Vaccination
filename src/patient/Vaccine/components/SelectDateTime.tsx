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
      const selectedDate = date ? date : undefined
      dispatch(SET_CURRENT_SCHEDULE({ ...schedule, scheduledDate: selectedDate }))
    },
    [dispatch, schedule]
  )

  return (
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
        defaultValue={schedule.scheduledDate ? schedule.scheduledDate : DateTime.now()}
        value={schedule.scheduledDate ? schedule.scheduledDate : DateTime.now()}
        slots={{ actionBar: () => <></> }}
        minutesStep={5}
        onChange={handleDateTimeChange}
        shouldDisableDate={(date) => date.weekday === 6 || date.weekday === 7}
        shouldDisableTime={(time) => time.hour < 8 || time.hour >= 17}
      />
    </LocalizationProvider>
  )
}
