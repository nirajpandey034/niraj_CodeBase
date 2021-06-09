import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//Coded by Niraj Pandey
function Cards(props) {
    const useStyles = makeStyles((theme)=>({
        root: {
          maxWidth: 1000,
          margin: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
          overflow: 'auto',
          backgroundColor:'#d5f4e6',
          zIndex:10,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        owner_name: {
            width:'auto',
            textAlign:'left',
            fontSize: 12,
            display:'inline-block',
        },
        owner_email: {
            width:'auto',
            textAlign:'right',
            fontSize: 12,
            display:'inline-block',
        },
        pos: {
          marginBottom: 12,
        },
        btn: {
            borderRadius: '4px',
            fontFamily: "Arial",
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow:'auto',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        appBar: {
          position: 'relative',
          backgroundColor:'#d5f4e6',
          color:'black',
        },
        title: {
          marginLeft: theme.spacing(2),
          flex: 1,
        },
      }));
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const bull = <span className={classes.bullet}>•</span>;

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return (
        <div>
          <Card className={classes.root}>
            <CardContent>
                    <Typography className={classes.owner_name} color="textSecondary" 
                    component='p'> 
                        <strong>Contributed By:</strong> {props.owner_name}</Typography>
                    {bull}
                    <Typography className={classes.owner_email} color="secondary" 
                    style={{cursor : 'pointer', textDecoration: 'underline'}}
                    component='p' onClick={()=>{window.location.href='mailto:' + props.owner_email}}> 
                    {props.owner_email}</Typography>


                    <Typography  color="textPrimary" variant='h5'
                    style={{marginTop:'6px'}}> 
                    {props.code_title}</Typography>

                    <Typography  color="primary" variant='overline' 
                    onClick={()=>{window.open(props.code_url)}} 
                    style={{cursor : 'pointer', textDecoration: 'underline'}}> 
                    {props.code_url}
                    </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" className="btn" 
                color="secondary" onClick={handleOpen}>
                Approach & Code</Button>
            </CardActions>
        </Card>
        {/* trial */}
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Approach & Code
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem >
            <ListItemText primary="Code Approach" secondary={props.code_approach} />
          </ListItem>
          <Divider />
          <ListItem >
            <pre><code><ListItemText primary="Code" secondary={props.code_text} /> </code></pre>
          </ListItem>
        </List>
      </Dialog>
        </div>
    )
}

export default Cards
