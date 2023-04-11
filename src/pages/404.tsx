// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Demo Imports
import FooterIllustrations from '@/common/ServerPagesFooter/footerIllustrations'
import { useRouter } from 'next/navigation'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const Error404 = () => {
  const router = useRouter()
  return (
    <Box className='content-center'>
    <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <BoxWrapper marginTop='25px'>
        <Typography variant='h1' sx={{ mb:2.5 }}>
          404
        </Typography>
        <Typography variant='h5' sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}>
          Page Not Found ⚠️
        </Typography>
        <Typography variant='body2'>We couldn&prime;t find the page you are looking for.</Typography>
      </BoxWrapper>
      <Img alt='error-illustration' src='/Images/pages/404.png' />
        <Button onClick={() => router.back()} variant='contained' sx={{ px: 5.5 , mb:3}}>
          Go Back
        </Button>
    </Box>
   <FooterIllustrations/>
  </Box>
  )
}

export default Error404
