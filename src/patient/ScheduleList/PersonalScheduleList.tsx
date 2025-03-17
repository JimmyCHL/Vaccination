import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { cancelSchedule } from '../../redux/Schedule/ScheduleActions'
import { schedulesSelector } from '../../redux/Schedule/ScheduleSelector'
import { Schedule, ScheduleStatusEnum } from '../../redux/Schedule/type'
import { AppDispatch } from '../../redux/store'

export const PersonalScheduleList = () => {
  const schedules = useSelector(schedulesSelector)
  const dispatch = useDispatch<AppDispatch>()

  const [currentPage, setCurrentPage] = useState(1)
  const [schedulesPerPage] = useState(5)

  const indexOfLastSchedule = currentPage * schedulesPerPage
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage
  const currentSchedules = schedules.slice(indexOfFirstSchedule, indexOfLastSchedule)

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const cancelScheduleHandler = (schedule: Schedule) => {
    dispatch(
      cancelSchedule(schedule, () => {
        toast.success('Schedule Cancelled')
      })
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Vaccine Schedules
      </Typography>

      <Stack spacing={2}>
        {currentSchedules.map((schedule, i) => (
          <Fade
            key={schedule._id}
            delay={i * 60} // Wait before the animation starts
            duration={600} // Duration of the animation
            triggerOnce // Animate only once when the element comes into view
            fraction={0.5} // Start animation when element is 50% visible
            direction="bottom-left" // Animation direction
          >
            <Card
              key={schedule._id}
              sx={{
                boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)',
                opacity: isCompleted(schedule) || isDenied(schedule) || isCancelled(schedule) ? 0.5 : 1,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {schedule.vaccine.name} - {schedule.vaccine.type}
                </Typography>
                <Typography variant="body1">
                  Hospital: {schedule.hospital.name} ({schedule.hospital.address})
                </Typography>
                <Typography
                  variant="body2"
                  color={isCancelled(schedule) || isDenied(schedule) ? 'error' : 'textSecondary'}
                >
                  Status: {isCompleted(schedule) ? 'Fully Vaccinated' : schedule.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Payment Status: {schedule.paidStatus}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Amount: ${schedule.details.totalAmount}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Doses: {schedule.details.doses}
                </Typography>
                {!isCancelled(schedule) && !isDenied(schedule) && (
                  <Typography variant="body2" color="textSecondary">
                    Completed Does: {completedDoses(schedule)}
                  </Typography>
                )}

                {/* Accordion for Dates */}
                <Box sx={{ mt: 2 }} />
                <Accordion sx={{ boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Schedule Dates</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      {schedule.dates.map((date, index) => (
                        <Typography
                          key={index}
                          sx={{
                            color: isPast(date) || isDenied(schedule) || isCancelled(schedule) ? 'lightGray' : 'black',
                          }}
                        >
                          {date.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}
                        </Typography>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>

                {/* button */}
                {canCancel(schedule) && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => cancelScheduleHandler(schedule)}
                  >
                    Cancel Schedule
                  </Button>
                )}
                {isGoing(schedule) && <Typography sx={{ mt: 2, color: 'green', p: 1 }}>In Process.....</Typography>}
              </CardContent>
            </Card>
          </Fade>
        ))}
      </Stack>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(schedules.length / schedulesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  )
}

// Calculate the completed doses
const completedDoses = (schedule: Schedule) => {
  return schedule.dates.filter((date) => date < DateTime.now()).length
}

// Check if the date is in the past
const isPast = (date: DateTime) => {
  return date < DateTime.now()
}

// isDenied
const isDenied = (schedule: Schedule) => {
  return schedule.status === ScheduleStatusEnum.Deny
}

// isCancelled
const isCancelled = (schedule: Schedule) => {
  return schedule.status === ScheduleStatusEnum.Cancelled
}

// isCompleted
const isCompleted = (schedule: Schedule) => {
  return schedule.status === ScheduleStatusEnum.Approved && completedDoses(schedule) === schedule.details.doses
}

// isGoing
const isGoing = (schedule: Schedule) => {
  return schedule.status === ScheduleStatusEnum.Approved && completedDoses(schedule) < schedule.details.doses
}

// canCancel
const canCancel = (schedule: Schedule) => {
  return schedule.status === ScheduleStatusEnum.Scheduled && !isPast(schedule.dates[0])
}
