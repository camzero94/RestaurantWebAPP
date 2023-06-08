
import { makeStyles } from '@material-ui/core/styles';
import backgroundImg from '../public/background.png'  

  export const box_header_Menu= {

    display: "flex",
    mt: 2,
    ml: 2,
    mr: 2,
    mb: 1,
    maxWidth: 600,
    maxHeight: 32,
  }
  export const box_header_Item= {

    display: "flex",
    mt: 2,
    ml: 2,
    mr: 2,
    mb: 1,
    maxWidth: 600,
    maxHeight: 32,
  }


export const box_header_Ingredient = {
  display: "flex",
  mt: 2,
  ml: 2,
  mr: 2,
  mb: 1,
  maxWidth: 600,
  maxHeight: 32,
}


//Card Styles
export const cardIngredient = {
  root: {
    display: "flex",
    padding: 2,
    justifyContent: "space-around",
    flexWrap: "nowrap",
    width: "maxWidth",
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    height: 215
  },
  containerPaper: {
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    maxHeight: 135,
    maxWidth: 261
  },

  containerText: {
    display: 'flex',
    width: "maxWidth",
  },
  logo: {
    width: 18,
    height: 18,
    // bgcolor: deepOrange[500],
  },
  button: {
  }
}

export const cardItem= {
  root: {
    display: "flex",
    padding: 2,
    justifyContent: "space-around",
    flexWrap: "nowrap",
    width: "maxWidth",
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    height:300
  },
  containerPaper: {
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    maxHeight: 135,
    maxWidth: 261
  },
  price:{
    display:'flex',
    justifyContent:'center',
    
  },
  containerText: {
    display: 'flex',
    width: "maxWidth",
  },
  logo: {
    width: 18,
    height: 18,
    // bgcolor: deepOrange[500],
  },
  button: {
  }
}


export const cardMenu= {
  root: {
    display: "flex",
    padding: 2,
    justifyContent: "space-around",
    flexWrap: "nowrap",
    width: "maxWidth",
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    height:300
  },
  containerPaper: {
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    marginTop: 2,
    maxHeight: 135,
    maxWidth: 261
  },
  price:{
    display:'flex',
    justifyContent:'center',
    
  },
  containerText: {
    display: 'flex',
    width: "maxWidth",
  },
  logo: {
    width: 18,
    height: 18,
    // bgcolor: deepOrange[500],
  },
  button: {
  }
}





export const cardOrder= {
  root: {
    display: "flex",
    padding: 2,
    // justifyContent: "space-around",
    flexWrap: "nowrap",
    width: "maxWidth",
  },

  ribbon: {
    position:'relative',
    width: 150,
    height: 150,
    padding: 10,
    backgroundColor: '#e3e3e3',
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    height:360,
    padding:2,
  },
  paperOverlay:{
    display: "flex",
    flexGrow: 1,
    height:380,
    padding:2,
    '& .MuiCard-root': {
      backgroundColor:'red'
    }
  },
  container:{
    display:'flex',
    justifyContent:'center',
  },
  title1:{
    display:'flex',
    justifyContent:'center',
    fontSize:'35px',
    fontWeight:'bold',
    maxHeight:32,
    marginBottom:2
  },
  title:{
    display:'flex',
    justifyContent:'center',
    fontSize:'20px',
    fontWeight:'bold',
    maxHeight:32
  },
  itemsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    height:150,
    maxHeight:150,
  },
  items:{
    display:'flex',
    justifyContent:'center',
    height:32,
    maxHeight:32,
  },
  price: {
    display: 'flex',
    width: "maxWidth",
    marginTop:1,
    marginBottom:1,
    height:80,
    maxHeight:80,
    // backgroundColor:'red',
  },
  logo: {
    width: 18,
    height: 18,
    // bgcolor: deepOrange[500],
  },
}


//Style Button Item Post

export const post_button_add_delete= {
  fontWeight:'bold',
  fontSize:'10px'
}

export const box_homeCard= {
     
    height: '75vh',
    width: 450,
    margin: '25px auto',
}
export const box_profileCard= {
     
    height: '190px',
    width: '350px',
}


export const useStyles = makeStyles({
  card: {
    position: 'relative',
    overflow: 'hidden',
    // boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    // backdropFilter: 'blur(8em)',
    // WebkitBackdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      // boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
    },
  },
  button:{
    borderRadius: '40px',
  },
  img:{
    marginTop: '10px',
  }
});


export const cardProfileStyle= makeStyles({
  image: {
    position: 'absolute',
    top:0,
    left:0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',

  },
  button:{
    borderRadius: '40px',
  },
  img:{
    marginTop: '40px',
  }
});


export const backGroundStyles= makeStyles({
  root: {
    width: '100%',  
    height: '100%',

  }
});




