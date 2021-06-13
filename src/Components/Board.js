import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import Cards from './Cards'

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FacebookIcon from '@material-ui/icons/Facebook';

import CircularProgress from '@material-ui/core/CircularProgress';

import Tooltip from '@material-ui/core/Tooltip';


function Board() {
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        const getData = () => {
            let dat = [];
            firebase.database().ref("codeBase").on("child_added", (snapshot, prevChildKey) => {
                let value = snapshot.val();
                dat = [...dat, <Cards key={value.code_title} owner_name={value.owner_name} owner_email={value.owner_email}
                    code_title={value.code_title} code_url={value.code_url}
                    code_approach={value.code_approach} code_text={value.code_text} date={value.time} />]
                setFlag(false)
            });
            setData(dat);
        }
        getData();
    }, [flag])

    return (
        <div>
            <Tooltip title="Created by Niraj Pandey">
                <h1
                    style={{
                        textDecoration: 'none', backgroundColor: 'black', color: 'white', cursor: 'default'
                    }}>The CODE BASE</h1>
            </Tooltip>

            {(data.length === 0) ? <CircularProgress /> : data}

            <br />
            <Tooltip title='Upload Your Code'>
                <a href="https://ur-code-base.web.app/" target="_blank" rel="noreferrer"><AddCircleRoundedIcon fontSize="large" color="primary" /></a>
            </Tooltip>
            &emsp;&emsp;
            <Tooltip title='Get in touch with Creator'>
                <a href="https://www.linkedin.com/in/imnirajpandey" target="_blank" rel="noreferrer"><EmojiPeopleIcon fontSize="large" color="primary" /></a>
            </Tooltip>
            &emsp;&emsp;
            <Tooltip title='Github Repository'>
                <a href="https://github.com/nirajpandey034/niraj_CodeBase" target="_blank" rel="noreferrer"><CodeRoundedIcon fontSize="large" color="primary" /></a>
            </Tooltip>
            &emsp;&emsp;
            <Tooltip title='Share'>
                <a href="https://facebook.com/" target="_blank" rel="noreferrer"><FacebookIcon fontSize="large" color="primary" /></a>
            </Tooltip>
        </div>
    )
}
export default Board
