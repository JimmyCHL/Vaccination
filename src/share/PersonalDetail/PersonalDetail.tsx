import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userSelector } from '../../redux/User/UserSelector'

export const PersonalDetail = () => {
  const user = useSelector(userSelector)
  const [data, setData] = useState(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.target.id
    if (e.target.name === 'gender') key = 'gender'
    if (e.target.name === 'conditions') {
      if (e.target.checked) {
        setData((prev) => ({ ...prev, medicalCondition: [...prev.medicalCondition, e.target.id] }))
      } else {
        setData((prev) => ({ ...prev, medicalCondition: prev.medicalCondition.filter((item) => item !== e.target.id) }))
      }
      return
    }
    setData((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSave = useCallback(() => {
    console.log(data)
    toast('Details saved!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }, [data])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '450px' }}>
      <h1>Personal Detail</h1>
      <Typography variant="h6">Email: {data.email}</Typography>
      <Typography variant="h6">Role: {data.role}</Typography>
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="firstName">first Name</InputLabel>
        <FilledInput id="firstName" value={data.firstName} onChange={handleChange} />
      </FormControl>
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <FilledInput id="lastName" value={data.lastName} onChange={handleChange} />
      </FormControl>

      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="age">Age</InputLabel>
        <FilledInput id="age" type="number" value={data.age} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleChange}
          value={data.gender}
        >
          <FormControlLabel name="gender" value="Female" control={<Radio />} label="Female" />
          <FormControlLabel name="gender" value="Male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>

      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="profession">Profession</InputLabel>
        <FilledInput id="profession" value={user.profession} onChange={handleChange} />
      </FormControl>

      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="contact">Contact</InputLabel>
        <FilledInput id="contact" value={user.contact} onChange={handleChange} />
      </FormControl>

      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="address">Address</InputLabel>
        <FilledInput id="address" value={user.address} onChange={handleChange} />
      </FormControl>

      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="medicalCertificate">Medical Certificate</InputLabel>
        <FilledInput id="medicalCertificate" value={user.medicalCertificate} onChange={handleChange} />
      </FormControl>

      <FormLabel component="legend">Medical Conditions</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id="Headache"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Headache')}
            />
          }
          label="Headache"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="CommonCold"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('CommonCold')}
            />
          }
          label="Common Cold"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Flu"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Flu')}
            />
          }
          label="Flu"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Hypertension"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Hypertension')}
            />
          }
          label="Hypertension"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Diabetes"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Diabetes')}
            />
          }
          label="Diabetes"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Arthritis"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Arthritis')}
            />
          }
          label="Arthritis"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Asthma"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Asthma')}
            />
          }
          label="Asthma"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Pneumonia"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Pneumonia')}
            />
          }
          label="Pneumonia"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Depression"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Depression')}
            />
          }
          label="Depression"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Acne"
              name="conditions"
              onChange={handleChange}
              checked={data.medicalCondition.includes('Acne')}
            />
          }
          label="Acne"
        />
      </FormGroup>

      <Button
        variant="contained"
        sx={{ width: '450px', color: 'black', backgroundColor: 'lightgray' }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  )
}
