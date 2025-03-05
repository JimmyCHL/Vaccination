import { Box, Divider, Paper } from '@mui/material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useIsAdmin } from '../../../hooks/useIsAdmin'
import { Hospital } from '../../../redux/Hospital/type' // Adjust the path as needed

type Props = {
  hospital: Hospital
  handleEditHospital?: (hospital?: Hospital) => void
}

export const HospitalCard = ({ hospital, handleEditHospital }: Props) => {
  const { isAdmin } = useIsAdmin()

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Paper
        elevation={10}
        sx={{ margin: '10px', padding: '10px' }}
        onClick={() => (isAdmin ? handleEditHospital?.(hospital) : null)}
      >
        <Card sx={{ maxWidth: 345, cursor: isAdmin ? 'pointer' : 'none', maxHeight: '530px', overflow: 'auto' }}>
          <CardActionArea>
            <CardMedia component="img" height="240" image={hospital.imageUrl} alt={hospital.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {hospital.name}
              </Typography>
              <Divider sx={{ margin: '10px' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {hospital.description}
              </Typography>
              <Divider sx={{ margin: '10px' }} />
              <Typography variant="body2" color="text.secondary">
                Address: {hospital.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Charges: ${hospital.charges}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {hospital.type}
              </Typography>

              <Box sx={{ display: 'flex', gap: '10px' }}>{/* Add any additional details if needed */}</Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </Box>
  )
}
