import HospitalIcon from '@mui/icons-material/LocalHospital'
import {
  Accordion,
  AccordionDetails,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { DateTime } from 'luxon'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { adminPatientListSelector } from '../../redux/Schedule/ScheduleSelector'

export const PatientList = () => {
  const patientList = useSelector(adminPatientListSelector)

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [expanded, setExpanded] = useState('')

  // Handle page change
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to first page
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
        <HospitalIcon fontSize="large" />
        Patient List
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: '2px 2px 990px 10px pink' }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'lightgray' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Medical Conditions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
              <Fragment key={patient._id}>
                <TableRow
                  key={patient._id}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setExpanded(expanded === patient._id ? '' : patient._id)}
                >
                  <TableCell>{`${patient.user.firstName} ${patient.user.lastName}`}</TableCell>
                  <TableCell>{patient.user.contact}</TableCell>
                  <TableCell>{patient.user.email}</TableCell>
                  <TableCell>{patient.user.age}</TableCell>
                  <TableCell>{patient.user.medicalCondition.join(', ')}</TableCell>
                </TableRow>
                {expanded === patient._id && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      {patient.schedules.map((schedule) => (
                        <Accordion
                          key={schedule._id}
                          expanded={expanded === schedule._id}
                          sx={{ boxShadow: ' inset 5px 1px 20px 1px' }}
                        >
                          <AccordionDetails>
                            <Typography>Ref ID: {schedule._id}</Typography>
                            <Typography>
                              Vaccine: {schedule.vaccine.name} @ {schedule.hospital.name}
                            </Typography>
                            <Typography>Total doses: {schedule.vaccine.dosesRequired}</Typography>
                            <Typography>
                              Dates:{' '}
                              {schedule.dates
                                .map((date) => date.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS))
                                .join(', ')}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patientList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}
