import VaccinesIcon from '@mui/icons-material/LocalHospital'
import { Box } from '@mui/material'
import { useCallback, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { useSelector } from 'react-redux'
import { AddVaccine } from '../../admin/vaccine/AddVaccine'
import { Vaccine } from '../../redux/Vaccine/type'
import { vaccinesSelector } from '../../redux/Vaccine/VaccineSelector'
import { VaccineCard } from './components/VaccineCard'

export const VaccineList = () => {
  const vaccines = useSelector(vaccinesSelector)
  const [editVaccine, setEditVaccine] = useState<Vaccine | undefined>()

  const handleEditVaccine = useCallback((vaccine?: Vaccine) => {
    if (vaccine) setEditVaccine(vaccine)
    else setEditVaccine(undefined)
  }, [])

  return (
    <div>
      {editVaccine ? (
        <AddVaccine vaccine={editVaccine} handleEditVaccine={handleEditVaccine} />
      ) : (
        <>
          <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <VaccinesIcon fontSize="large" /> Vaccine List
          </h1>
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {vaccines.map((vaccine, i) => (
              <Fade
                key={vaccine._id}
                delay={i * 80} // Wait 200ms before starting
                duration={600} // Animation lasts 1 second
                triggerOnce // Only animate once
                fraction={0.5} // Start animation when element is 50% visible
                direction="left" // Animation direction
              >
                <VaccineCard vaccine={vaccine} handleEditVaccine={handleEditVaccine} />
              </Fade>
            ))}
          </Box>
        </>
      )}
    </div>
  )
}
