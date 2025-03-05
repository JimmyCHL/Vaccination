import HospitalIcon from '@mui/icons-material/LocalHospital' // Adjust the icon as needed
import { Box } from '@mui/material'
import { useCallback, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { useSelector } from 'react-redux'
// Path to the component that handles hospital editing
import { AddHospital } from '../../admin/Hospital/AddHospital'
import { hospitalsSelector } from '../../redux/Hospital/HospitalSelector' // Selector for hospitals
import { Hospital } from '../../redux/Hospital/type' // Make sure the path is correct
import { HospitalCard } from './components/HospitalCard' // The card component for displaying individual hospitals

export const HospitalList = () => {
  const hospitals = useSelector(hospitalsSelector) // Replace with actual selector for hospitals
  const [editHospital, setEditHospital] = useState<Hospital | undefined>()

  const handleEditHospital = useCallback((hospital?: Hospital) => {
    if (hospital) setEditHospital(hospital)
    else setEditHospital(undefined)
  }, [])

  return (
    <div>
      {editHospital ? (
        <AddHospital hospital={editHospital} handleEditHospital={handleEditHospital} />
      ) : (
        <>
          <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HospitalIcon fontSize="large" /> Hospital List
          </h1>
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {hospitals.map((hospital, i) => (
              <Fade
                key={hospital._id}
                delay={i * 60} // Wait before the animation starts
                duration={600} // Duration of the animation
                triggerOnce // Animate only once when the element comes into view
                fraction={0.5} // Start animation when element is 50% visible
                direction="left" // Animation direction
              >
                <HospitalCard hospital={hospital} handleEditHospital={handleEditHospital} />
              </Fade>
            ))}
          </Box>
        </>
      )}
    </div>
  )
}
