import React, { useState, useEffect } from 'react';
import  getVenues from './Utils/Locations';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange} from '@material-ui/core/colors';

import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Container } from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  }
  
}));


function App() {
  const classes = useStyles();

  const [places, setPlaces] = useState([]);

  useEffect(() => getVenues().then(data => setPlaces(data.response.venues)).catch(err => console.log(err))
  , []);

  return (    
    <Container maxWidth="sm" fixed={true}>
      {places.map((place) => {
        return <List key={place.id} component="nav" aria-label="main">
            <ListItem button>
            <ListItemAvatar>
              <Avatar alt={place.name} src={place.categories[0].icon.prefix + 32 + place.categories[0].icon.suffix} className={classes.orange}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={place.name} secondary={place.location.formattedAddress[0]} />          
          </ListItem>
        </List>        
      }
      )}
    </Container>
  )
}

export default App
