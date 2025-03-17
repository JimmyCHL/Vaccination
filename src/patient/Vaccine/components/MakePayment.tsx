import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { useDispatch, useSelector } from 'react-redux'
import { saveSchedule } from '../../../redux/Schedule/ScheduleActions'
import { Schedule } from '../../../redux/Schedule/type'
import { AppDispatch } from '../../../redux/store'
import { userSelector } from '../../../redux/User/UserSelector'

export type MakePaymentProps = {
  schedule: Partial<Schedule>
  callback: () => void
}

export const MakePayment = ({ schedule, callback }: MakePaymentProps) => {
  const user = useSelector(userSelector)
  const dispatch = useDispatch<AppDispatch>()

  const handlePayment = () => {
    const newSchedule = {
      ...schedule,
      user,
      details: {
        curPrice: schedule.vaccine?.price || 0,
        doses: schedule.vaccine?.dosesRequired || 0,
        totalAmount: (schedule.vaccine?.price || 1) * (schedule.vaccine?.dosesRequired || 1),
      },
    } as Schedule

    dispatch(saveSchedule(newSchedule, callback))
  }

  return (
    <Box
      sx={{
        p: 3,
        boxShadow: `
        inset 5px 10px 20px 5px rgb(0 200 0 / 30%),
        0 0 5px 10px white,
        inset -5px -10px 20px 5px rgb(200 0 0 / 60%)`,
        borderRadius: '10px',
        m: 2,
      }}
    >
      <Stack spacing={4}>
        {/* Schedule Details */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Schedule Details
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Patient: {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Age: {user?.age}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Phone: {user?.gender}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Vaccine: {schedule.vaccine?.name} - {schedule.vaccine?.type}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Hospital: {schedule.hospital?.name} ({schedule.hospital?.address})
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Price per dose: ${schedule.vaccine?.price}</Typography>
            <Typography variant="body1">Doses: {schedule.vaccine?.dosesRequired}</Typography>
            <Typography variant="body1" fontWeight="bold">
              Total Amount: ${(schedule.vaccine?.price || 1) * (schedule.vaccine?.dosesRequired || 1)}
            </Typography>
          </CardContent>
        </Card>

        {/* Schedule Times Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Schedule Times:
          </Typography>
          <Stack direction="column" spacing={2} flexWrap="wrap">
            {schedule.dates?.slice(0, 3).map((date, index) => (
              <Card key={index} sx={{ width: '100%', sm: '30%' }}>
                <CardContent>
                  <Typography variant="body1">Schedule Time {index + 1}:</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Button variant="contained" onClick={handlePayment} sx={{ backgroundColor: 'green', color: 'white' }}>
          Pay now & Confirm
        </Button>
      </Stack>
    </Box>
  )
}
