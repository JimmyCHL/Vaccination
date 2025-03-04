import { Vaccine } from '../../../redux/Vaccine/type'

import { Box, Divider, Paper } from '@mui/material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useIsAdmin } from '../../../hooks/useIsAdmin'
type Props = {
  vaccine: Vaccine
  handleEditVaccine?: (vaccine?: Vaccine) => void
}

export const VaccineCard = ({ vaccine, handleEditVaccine }: Props) => {
  const { isAdmin } = useIsAdmin()

  return (
    <Box sx={{ display: 'flex', gap: '10px', width: '100%' }}>
      <Paper
        elevation={10}
        sx={{ margin: '10px', padding: '10px', width: '100%' }}
        onClick={() => (isAdmin ? handleEditVaccine?.(vaccine) : null)}
      >
        <Card sx={{ maxWidth: 345, height: '100%', cursor: isAdmin ? 'pointer' : 'none' }}>
          <CardActionArea>
            <CardMedia component="img" height="240" image={vaccine.imageUrl} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {vaccine.name}
              </Typography>
              <Divider sx={{ margin: '10px' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {vaccine.description}
              </Typography>
              <Divider sx={{ margin: '10px' }} />
              <Typography variant="body2" color="text.secondary">
                Price: ${vaccine.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {vaccine.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {vaccine.origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Doses Required: {vaccine.dosesRequired}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {vaccine.quantity}
              </Typography>
              <Divider sx={{ margin: '10px' }} />
              <Box sx={{ display: 'flex', gap: '10px' }}>
                {vaccine.strainsCovered.map((strain) => (
                  <Typography key={strain} variant="body2" color="text.secondary">
                    {strain}
                  </Typography>
                ))}
              </Box>
              <Divider sx={{ margin: '10px' }} />
              <Typography variant="body2" color="text.secondary" sx={{ minHeight: '50px' }}>
                Side Effects: {vaccine.sideEffects.join(', ')}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </Box>
  )
}
