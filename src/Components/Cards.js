import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
            overflow:'scroll',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
      }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
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
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{props.code_title}</h2>
            <p id="transition-modal-description"><i>{props.code_approach}</i></p>
            <hr />
            <p id="server-modal-description"
            style={{fontFamily:'monospace'}}>
                <kbd> <code>{props.code_text}</code> </kbd> </p>
            <a style={{textDecoration:'underline', color:'blue', cursor:'pointer' }}
            onClick={()=>window.open('https://techiedelight.com/tools/clike')} >
                Copy code from here and beautify it here (C/C++)</a>
            <br />
                <a style={{textDecoration:'underline', color:'blue', cursor:'pointer' }}
            onClick={()=>window.open('https://codebeautify.org/jsviewer')} >
                Copy code from here and beautify it here (JS)</a>
                <br /><br />
            
            <Button onClick={()=>{handleClose()}} 
            color='primary' variant='contained' size='small'>Close</Button>
          </div>
        </Fade>
      </Modal>
        </div>
    )
}

export default Cards
