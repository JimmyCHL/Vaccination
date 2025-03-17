import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Finish = () => {
  const navigate = useNavigate()

  const goToSchedulePage = () => {
    navigate('/ownSchedules')
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        m: 5,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          textAlign: 'center',
          borderRadius: '10px',
          boxShadow: `
          inset 5px 10px 20px 5px rgb(0 200 0 / 30%),
          0 0 5px 10px white,
          inset -5px -10px 20px 5px rgb(200 0 0 / 60%)`,
        }}
      >
        <CardContent>
          <CheckCircleIcon
            sx={{
              fontSize: 60,
              color: 'green',
              mb: 2,
            }}
          />
          <Typography variant="h4" gutterBottom>
            Congratulations!
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            You have successfully registered for the vaccine.
          </Typography>

          <Button variant="contained" color="primary" onClick={goToSchedulePage}>
            Go to schedule page
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
