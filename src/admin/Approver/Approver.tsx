import ApprovalIcon from '@mui/icons-material/Approval'
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
import { Slide } from 'react-awesome-reveal'
import { useDispatch, useSelector } from 'react-redux'
import { approveOrDenySchedule } from '../../redux/Schedule/ScheduleActions'
import { adminSchedulesSelector } from '../../redux/Schedule/ScheduleSelector'
import { Schedule, ScheduleStatusEnum } from '../../redux/Schedule/type'
import { AppDispatch } from '../../redux/store'

export const Approver = () => {
  const schedules = useSelector(adminSchedulesSelector)
  const dispatch = useDispatch<AppDispatch>()

  const [currentPage, setCurrentPage] = useState(1)
  const [schedulesPerPage] = useState(5)

  const indexOfLastSchedule = currentPage * schedulesPerPage
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage
  const currentSchedules = schedules.slice(indexOfFirstSchedule, indexOfLastSchedule)

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const approveSchedule = (schedule: Schedule) => {
    // Update the schedule status to "APPROVED" in your state or database
    dispatch(approveOrDenySchedule(schedule, ScheduleStatusEnum.Approved))
  }

  const denySchedule = (schedule: Schedule) => {
    // Update the schedule status to "DENIED" in your state or database
    dispatch(approveOrDenySchedule(schedule, ScheduleStatusEnum.Deny))
  }

  const numScheduleNeedAttention = schedules.filter(
    (schedule) => schedule.status === ScheduleStatusEnum.Scheduled
  ).length

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
        <ApprovalIcon fontSize="large" />
        Admin Schedules {numScheduleNeedAttention > 0 && `(${numScheduleNeedAttention} schedules need attention)`}
      </Typography>

      <Stack spacing={2}>
        {schedules.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No pending schedules yet.
          </Typography>
        )}
        {currentSchedules.map((schedule, i) => (
          <Slide
            key={schedule._id}
            delay={i * 60} // Delay for animation
            duration={600} // Animation duration
            triggerOnce
            fraction={0.5} // Animation trigger at 50% visibility
            direction="up" // Direction of animation
          >
            <Card
              sx={{
                boxShadow: 'inset 5px 5px 20px 5px rgba(0, 0, 0, 1)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {schedule.vaccine.name} - {schedule.vaccine.type}
                </Typography>
                <Typography variant="body1">Ref: {schedule._id}</Typography>
                <Typography variant="body1">
                  User: {schedule.user.firstName} {schedule.user.lastName}
                </Typography>
                <Typography variant="body1">Age: {schedule.user.age}</Typography>
                <Typography variant="body1">Gender: {schedule.user.gender}</Typography>
                <Typography variant="body1">
                  Hospital: {schedule.hospital.name} ({schedule.hospital.address})
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: Pending
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

                {/* Accordion for Dates */}
                <Box sx={{ mt: 2 }} />
                <Accordion sx={{ boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Schedule Dates</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      {schedule.dates.map((date, index) => (
                        <Typography key={index} variant="body2">
                          {date.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}
                        </Typography>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>

                {schedule.status === ScheduleStatusEnum.Scheduled ? (
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" color="success" onClick={() => approveSchedule(schedule)}>
                      Approve
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => denySchedule(schedule)}>
                      Deny
                    </Button>
                  </Stack>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, color: schedule.status === ScheduleStatusEnum.Approved ? 'green' : 'red' }}
                  >
                    {schedule.status.toUpperCase()} .....
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Slide>
        ))}
      </Stack>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(currentSchedules.length / schedulesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  )
}
