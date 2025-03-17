import { Alert, Box } from '@mui/material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

// Slider settings
const settings = {
  dots: true, // Show dots for navigation
  infinite: true, // Infinite looping of slides
  slidesToShow: 1, // Show one slide at a time
  slidesToScroll: 1, // Scroll one slide at a time
  autoplay: true, // Enable autoplay
  speed: 7000, // Speed of the slide transition (2 seconds)
  autoplaySpeed: 8000, // Delay between slide transitions (3 seconds)
  cssEase: 'linear', // Smooth transition effect
}

export const MovingBanner = () => {
  return (
    <Slider {...settings}>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Alert
          severity="info"
          sx={{
            margin: '10px',
            width: '95%',
            boxShadow: 'inset 1px 1px 20px 1px yellow, 1px 1px 10px 1px white',
          }}
        >
          The website is updated recently. You can make an appointment from this website now!
        </Alert>
      </Box>
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <Alert
          severity="success"
          sx={{
            margin: '10px',
            width: '95%',
            boxShadow: 'inset 1px 1px 20px 1px black, 1px 1px 10px 1px white',
          }}
        >
          Limited time offer! Book your appointment today and get a special discount.
        </Alert>
      </Box>
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <Alert
          severity="warning"
          sx={{
            margin: '10px',
            width: '95%',
            boxShadow: 'inset 1px 1px 20px 1px red, 1px 1px 10px 1px white',
          }}
        >
          Don't miss out! New slots available for appointments.
        </Alert>
      </Box>
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <Alert
          severity="warning"
          sx={{
            margin: '10px',
            width: '95%',
            boxShadow: 'inset 1px 1px 20px 1px green, 1px 1px 10px 1px white',
          }}
        >
          Population coverage is 80%. Male coverage is 75% and Female coverage is 85%. Age 20-40 coverage is 90%. For
          your safety, get vaccinated today!
        </Alert>
      </Box>
    </Slider>
  )
}
