import * as React from 'react';
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from "@mui/material/Box";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Navbar from '@/common/navbar';
import SideBar from '@/common/sideBar';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <Navbar/>
    <Box sx={{ height: "100vh", display: "flex" ,position: "absolute",   top: "64px"}}>
    <SideBar/>
    
  
    <Grid item xs={12} sm={7} md={5} lg={5}>
    <Card >
    <CardContent>
      <Box
       sx={{my:5, mx:5, display: 'inline-block'}}>
      <Avatar sx={{ bgcolor: red[500], width: 150, height: 150, }} src="/static/images/avatar/1.jpg" variant="rounded" />
      </Box>

      <Box sx={{ display: 'inline-block' }}>
          <Typography
            variant="subtitle1"
            className="GlobalTextColor"
            sx={{ fontWeight: "bold" }}>
            Shubham
          </Typography>
          
          <Typography 
            variant="subtitle2"
            sx={{ fontWeight: "bold" }}>
            Email: testemail@gmail.com
          </Typography>

          <Typography 
            variant="subtitle2"
            sx={{ fontWeight: "bold" }}>
            Role: User
          </Typography>

          <EditIcon />  
          <VisibilityIcon />
     </Box>

     <Box sx={{float:"right"}}>
      
      </Box>
     </CardContent>

    </Card>
    </Grid>
    </Box>
    </>
  );
}