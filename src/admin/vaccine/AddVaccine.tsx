import VaccinesIcon from '@mui/icons-material/Vaccines'
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
} from '@mui/material'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { AppDispatch } from '../../redux/store'
import { Vaccine } from '../../redux/Vaccine/type'
import { saveVaccine } from '../../redux/Vaccine/VaccineActions'

type Props = {
  vaccine?: Vaccine
}

export const AddVaccine = ({ vaccine }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [data, setData] = useState<Omit<Vaccine, '_id'> & { _id?: string }>(
    vaccine ?? {
      name: '',
      type: '',
      price: 0,
      sideEffects: [],
      origin: '',
      dosesRequired: 0,
      strainsCovered: [],
      quantity: 0,
      imageUrl: '',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.target.id

    // Handle checkbox changes for strainsCovered (COVID strains)
    if (e.target.name === 'strainsCovered') {
      if (e.target.checked) {
        setData((prev) => ({
          ...prev,
          strainsCovered: [...prev.strainsCovered, e.target.id],
        }))
      } else {
        setData((prev) => ({
          ...prev,
          strainsCovered: prev.strainsCovered.filter((item) => item !== e.target.id),
        }))
      }
      return
    }

    // Handle checkbox changes for sideEffects (COVID-related side effects)
    if (e.target.name === 'sideEffects') {
      if (e.target.checked) {
        setData((prev) => ({
          ...prev,
          sideEffects: [...prev.sideEffects, e.target.id],
        }))
      } else {
        setData((prev) => ({
          ...prev,
          sideEffects: prev.sideEffects.filter((item) => item !== e.target.id),
        }))
      }
      return
    }

    // For other fields (like name, type, price, etc.)
    setData((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSave = useCallback(() => {
    dispatch(
      saveVaccine(data, () => {
        toast(data._id ? 'Vaccine is updated' : 'You just add a vaccine!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
    )
  }, [data, dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '450px' }}>
      <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <VaccinesIcon fontSize="large" /> {vaccine ? 'Update a Vaccine' : 'Add a Vaccine'}
      </h1>
      {/* Vaccine Name */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="name">Vaccine Name</InputLabel>
        <FilledInput id="name" value={data.name} onChange={handleChange} />
      </FormControl>
      {/* Vaccine Type */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="type">Vaccine Type</InputLabel>
        <FilledInput id="type" value={data.type} onChange={handleChange} />
      </FormControl>
      {/* Vaccine Price */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="price">Price</InputLabel>
        <FilledInput id="price" type="number" value={data.price} onChange={handleChange} />
      </FormControl>
      {/* Vaccine Origin */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="origin">Origin</InputLabel>
        <FilledInput id="origin" value={data.origin} onChange={handleChange} />
      </FormControl>
      {/* Doses Required */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="dosesRequired">Doses Required</InputLabel>
        <FilledInput id="dosesRequired" type="number" value={data.dosesRequired} onChange={handleChange} />
      </FormControl>
      {/* Quantity */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="quantity">Quantity</InputLabel>
        <FilledInput id="quantity" type="number" value={data.quantity} onChange={handleChange} />
      </FormControl>
      {/* Image URL */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="imageUrl">Image URL</InputLabel>
        <FilledInput id="imageUrl" value={data.imageUrl} onChange={handleChange} />
      </FormControl>
      {/* Strains Covered (COVID Strains) */}
      <FormLabel component="legend">COVID Strains Covered</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id="Alpha"
              name="strainsCovered"
              onChange={handleChange}
              checked={data.strainsCovered.includes('Alpha')}
            />
          }
          label="Alpha"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Delta"
              name="strainsCovered"
              onChange={handleChange}
              checked={data.strainsCovered.includes('Delta')}
            />
          }
          label="Delta"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Omicron"
              name="strainsCovered"
              onChange={handleChange}
              checked={data.strainsCovered.includes('Omicron')}
            />
          }
          label="Omicron"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Beta"
              name="strainsCovered"
              onChange={handleChange}
              checked={data.strainsCovered.includes('Beta')}
            />
          }
          label="Beta"
        />
      </FormGroup>
      {/* Side Effects (COVID-related) */}
      <FormLabel component="legend">COVID-19 Side Effects</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id="Fever"
              name="sideEffects"
              onChange={handleChange}
              checked={data.sideEffects.includes('Fever')}
            />
          }
          label="Fever"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Fatigue"
              name="sideEffects"
              onChange={handleChange}
              checked={data.sideEffects.includes('Fatigue')}
            />
          }
          label="Fatigue"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Headache"
              name="sideEffects"
              onChange={handleChange}
              checked={data.sideEffects.includes('Headache')}
            />
          }
          label="Headache"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="Cough"
              name="sideEffects"
              onChange={handleChange}
              checked={data.sideEffects.includes('Cough')}
            />
          }
          label="Cough"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="ShortnessOfBreath"
              name="sideEffects"
              onChange={handleChange}
              checked={data.sideEffects.includes('ShortnessOfBreath')}
            />
          }
          label="Shortness of Breath"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="MusclePain"
              name="sideEffects"
              onChange={handleChange}
              checked={data.sideEffects.includes('MusclePain')}
            />
          }
          label="Muscle Pain"
        />
      </FormGroup>
      {/* Save Button */}
      <Button
        variant="contained"
        sx={{ width: '450px', color: 'black', backgroundColor: 'lightgray' }}
        onClick={handleSave}
      >
        {vaccine ? 'Update Vaccine' : 'Add Vaccine'}
      </Button>
    </Box>
  )
}
