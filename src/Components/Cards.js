import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import CodeIcon from '@material-ui/icons/Code';

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

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import emailjs from 'emailjs-com';
import Tooltip from '@material-ui/core/Tooltip';



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
    const [ShareOpen, setShareOpen] = useState(false);
    const [email, setEmail] = useState('');
    //sent status 
    const [sending, setSending] = useState('')
    const bull = <span className={classes.bullet}>•</span>;

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleShareOpen = () => {
        setShareOpen(true);
      };
    
      const handleShareClose = () => {
        setShareOpen(false);
      };

      const setemail = (e) =>{
          setEmail(e.target.value)
      }

      const sendEmail = () =>{
        let data1 = {
          from_name: 'CodeBase',
          to_email: email,
          message: props.code_text,
          reply_to:'codewithniraj034@gmail.com'
      };
      setSending('');
        emailjs.send('service_codebase', 'template_t4z1v0s', data1, 'user_etDRuxhbEwmGrJ7URIpL1')
        .then(()=>{alert('Sent');  setEmail(''); setSending(''); handleShareClose();})
        .catch((err)=>{setSending('Error Occured');})
      }
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
              <div style={{display:'flex', width:'100%'}}>
                <div>
                <Tooltip title='Approach & Code'>
                <CodeIcon size="small" className="btn" 
                color="secondary" onClick={handleOpen} >
                </CodeIcon>
                </Tooltip>
                </div>
             
                <div style={{marginLeft:'auto', marginRight:'0'}}>
                <Tooltip title='Send this to your email'>
                <EmailIcon size="small"
                color="secondary" onClick={handleShareOpen} >
                </EmailIcon>
                </Tooltip>
                </div>
              </div>
            </CardActions>
        </Card>
        {/* Code section */}
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

      {/* Share Section */}
      <Dialog
        open={ShareOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleShareClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Share the Code"}</DialogTitle>
        <DialogContent> 
          <TextField type="text" placeholder="Enter your Email" onChange={setemail}/>
          <p style={{color:'red'}}>{sending}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendEmail} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default Cards
