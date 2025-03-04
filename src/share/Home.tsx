import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigation = useNavigate()

  return (
    <Box sx={{ padding: '20px' }}>
      <Alert severity="info">The website is updated recently, you can make an appointment from this website now.</Alert>
      <Typography variant="h2" gutterBottom align="center">
        COVID-19 Vaccines
      </Typography>

      <Typography variant="h5" paragraph align="center">
        Learn more about the importance of COVID-19 vaccination and how it helps to fight the pandemic.
      </Typography>

      <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              sx={{ objectFit: 'contain' }}
              image="https://www.bundesregierung.de/resource/image/2003312/16x9/1023/575/ee6ddf55a7e2f530621e0595a93cea73/C54EC3460D7C052680A289466A75F783/2022-02-03-banner-impfen-hilft-auch-allen-die-du-liebst-en.png"
              alt="Why Vaccination is Important"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Why Vaccination is Important
              </Typography>
              <Typography variant="body1" paragraph>
                COVID-19 vaccines are proven to be effective in preventing severe illness, hospitalization, and death.
                Getting vaccinated helps protect not only you but also those around you.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html"
                target="_blank"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              sx={{ objectFit: 'contain' }}
              image={'https://www.buncombecounty.org/common/_RTE/Image/5-Vax.png'}
              alt="Vaccine Availability"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vaccine Availability
              </Typography>
              <Typography variant="body1">
                Vaccines are available at multiple locations across the globe. Check your local health department or
                health services for more details on vaccine availability near you.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href="https://www.vaccines.gov/" target="_blank">
                Find a Vaccine Center
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              sx={{ objectFit: 'contain' }}
              image="https://m.media-amazon.com/images/I/61273pUe0uL.jpg"
              alt="Stay Safe & Protected"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Stay Safe & Protected
              </Typography>
              <Typography variant="body1">
                Vaccination is one of the most effective ways to stop the spread of COVID-19. Even if you’re vaccinated,
                continue to follow local guidelines to stay safe and reduce transmission.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href="https://www.who.int/health-topics/coronavirus" target="_blank">
                WHO COVID-19 Information
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>

      {/* Bottom button */}
      <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
        <Button variant="contained" color="primary" onClick={() => navigation('/makeAppointment')}>
          Get Vaccinated Now
        </Button>
      </Box>
    </Box>
  )
}
