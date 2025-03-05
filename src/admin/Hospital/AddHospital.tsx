import HospitalIcon from '@mui/icons-material/LocalHospital'
import { Box, Button, FilledInput, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { saveHospital } from '../../redux/Hospital/HospitalActions'
import { Hospital, HospitalEnum } from '../../redux/Hospital/type'
import { AppDispatch } from '../../redux/store'

type Props = {
  hospital?: Hospital
  handleEditHospital?: (hospital?: Hospital) => void
}

const initialData = {
  name: '',
  imageUrl: '',
  address: '',
  description: '',
  type: HospitalEnum.Private,
  charges: 0,
}

export const AddHospital = ({ hospital, handleEditHospital }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [data, setData] = useState<Omit<Hospital, '_id'> & { _id?: string }>(hospital ?? initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id

    // Handle other fields (like name, address, type, etc.)
    setData((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const key = e.target.name
    setData((prev) => ({ ...prev, [key]: e.target.value }))
  }
  const handleSave = useCallback(() => {
    dispatch(
      saveHospital(data, () => {
        toast(data._id ? 'Hospital is updated' : 'You just added a hospital!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        if (data._id) {
          handleEditHospital?.()
        } else {
          setData(initialData)
        }
      })
    )
  }, [data, dispatch, handleEditHospital])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '450px',
        paddingBottom: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <HospitalIcon fontSize="large" /> {hospital ? 'Update a Hospital' : 'Add a Hospital'}{' '}
        {hospital?.name && (
          <Button
            sx={{ color: 'white', backgroundColor: 'black', fontWeight: 600 }}
            onClick={() => handleEditHospital?.()}
          >
            Back
          </Button>
        )}
      </h1>

      {/* Hospital Name */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="name">Hospital Name</InputLabel>
        <FilledInput id="name" value={data.name} onChange={handleChange} />
      </FormControl>

      {/* Hospital Type */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel>Hospital Type</InputLabel>
        {/* <FilledInput id="type" value={data.type} onChange={handleChange} /> */}
        <Select labelId="type" id="type" value={data.type} label="Type" name="type" onChange={handleSelectChange}>
          <MenuItem value={HospitalEnum.Govt}>Government</MenuItem>
          <MenuItem value={HospitalEnum.Private}>Private</MenuItem>
        </Select>
      </FormControl>

      {/* Hospital Description */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="description">Description</InputLabel>
        <FilledInput id="description" value={data.description} onChange={handleChange} />
      </FormControl>

      {/* Hospital Charges */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="charges">Charges</InputLabel>
        <FilledInput id="charges" type="number" value={data.charges} onChange={handleChange} />
      </FormControl>

      {/* Hospital Address */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="address">Address</InputLabel>
        <FilledInput id="address" value={data.address} onChange={handleChange} />
      </FormControl>

      {/* Image URL */}
      <FormControl variant="filled" required sx={{ flex: 1 }}>
        <InputLabel htmlFor="imageUrl">Image URL</InputLabel>
        <FilledInput id="imageUrl" value={data.imageUrl} onChange={handleChange} />
      </FormControl>

      {/* Save Button */}
      <Button
        variant="contained"
        sx={{ width: '450px', color: 'black', backgroundColor: 'lightgray' }}
        onClick={handleSave}
      >
        {hospital ? 'Update Hospital' : 'Add Hospital'}
      </Button>
    </Box>
  )
}
