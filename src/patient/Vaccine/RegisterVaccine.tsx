import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SET_CURRENT_SCHEDULE } from '../../redux/Schedule/ScheduleActions'
import { scheduleSelector } from '../../redux/Schedule/ScheduleSelector'
import { Schedule } from '../../redux/Schedule/type'
import { Finish } from './components/Finish'
import { MakePayment } from './components/MakePayment'
import { SelectDateTime } from './components/SelectDateTime'
import { SelectHospital } from './components/SelectHospital'
import { SelectVaccine } from './components/SelectVaccine'

const steps = ['Select Vaccine', 'Select Hospital', 'Select Date', 'Make Payment', 'Finish']

const defaultSchedule: Partial<Schedule> = {
  _id: '',
}

export const RegisterVaccine = () => {
  const [activeStep, setActiveStep] = useState(0)
  const currentSchedule = useSelector(scheduleSelector)
  const dispatch = useDispatch()

  // set active step based on current schedule
  useEffect(() => {
    if (!currentSchedule || activeStep === 4) return

    const { vaccine, hospital, dates } = currentSchedule
    if (vaccine && hospital && dates?.[0]) {
      setActiveStep(3)
    } else if (vaccine && hospital) {
      setActiveStep(2)
    } else if (vaccine) {
      setActiveStep(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNext = () => {
    if (!canGoNext)
      return toast('No Value is Selected!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { color: 'red' },
      })
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const paymentCallback = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    dispatch(SET_CURRENT_SCHEDULE({ _id: '' }))
  }

  const canGoNext = useMemo<boolean>(() => {
    if (activeStep === 0) return !!currentSchedule?.vaccine
    if (activeStep === 1) return !!currentSchedule?.hospital
    if (activeStep === 2) return !!currentSchedule?.dates?.[0]
    return false
  }, [activeStep, currentSchedule])

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={activeStep === 0 || activeStep === 4}
          onClick={handleBack}
          sx={{
            backgroundColor: 'gray',
            opacity: activeStep === 0 ? 0.2 : 1,
            fontWeight: 'bold',
            mt: 3,
            mr: 1,
            width: '80px',
            color: 'white',
            '&:hover': {
              backgroundColor: 'lightskyblue',
            },
          }}
        >
          Back
        </Button>
        {activeStep !== 3 && activeStep !== 4 && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              backgroundColor: 'gray',
              fontWeight: 'bold',
              mt: 3,
              width: '80px',
              color: 'white',
              '&:hover': {
                backgroundColor: 'lightskyblue',
              },
            }}
          >
            Next
          </Button>
        )}
      </Box>
      {activeStep === 0 && <SelectVaccine schedule={currentSchedule ?? defaultSchedule} />}
      {activeStep === 1 && <SelectHospital schedule={currentSchedule ?? defaultSchedule} />}
      {activeStep === 2 && <SelectDateTime schedule={currentSchedule ?? defaultSchedule} />}
      {activeStep === 3 && <MakePayment schedule={currentSchedule ?? defaultSchedule} callback={paymentCallback} />}
      {activeStep === 4 && <Finish />}
    </Box>
  )
}
