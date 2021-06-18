import React, { useState, useEffect } from 'react'
import Cards from './Cards'

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FacebookIcon from '@material-ui/icons/Facebook';

import CircularProgress from '@material-ui/core/CircularProgress';

import Tooltip from '@material-ui/core/Tooltip';


import { getData } from './Post';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Button from '@material-ui/core/Button';


function Board() {
    const [data, setData] = useState([])
    //state for next and previous posts
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [currentPage, setCurrentPage] = useState();

    useEffect(() => {
        let isMounted = true;
        getData()
            .then((res) => {
                let dat = [];
                res.posts.forEach((post) => {
                    dat = [...dat, <Cards key={post.code_title} owner_name={post.owner_name} owner_email={post.owner_email}
                        code_title={post.code_title} code_url={post.code_url}
                        code_approach={post.code_approach} code_text={post.code_text} date={post.time} />]
                });

                if (isMounted) setData(dat);
                setHasNext(res.hasNext);
                setHasPrev(res.hasPrev);
                setCurrentPage(res.currentPage);

                return () => { isMounted = false };
            });
    }, []);

    const fetch = (char) => {
        let page;
        if (char === 'p')
            page = currentPage - 1;
        else if (char === 'n')
            page = currentPage + 1;

        getData(page)
            .then((res) => {
                let dat = [];
                res.posts.forEach((post) => {
                    dat = [...dat, <Cards key={post.code_title} owner_name={post.owner_name} owner_email={post.owner_email}
                        code_title={post.code_title} code_url={post.code_url}
                        code_approach={post.code_approach} code_text={post.code_text} date={post.time} />]
                });

                setData(dat);
                setHasNext(res.hasNext);
                setHasPrev(res.hasPrev);
                setCurrentPage(res.currentPage);
            });
    }
    return (
        <div>
            <Tooltip title="Created by Niraj Pandey">
                <h1
                    style={{
                        textDecoration: 'none', backgroundColor: 'black', color: 'white', cursor: 'default'
                    }}>The CODE BASE</h1>
            </Tooltip>

            {(data.length === 0) ? <CircularProgress /> : data}

            <div style={{display:"flex", width:"100%"}}>

            {hasNext ? <Button endIcon={<ArrowForwardIosIcon />} onClick={() => { fetch('n') }}>Next</Button> : null} <br />
            
            {hasPrev ? <Button startIcon={<ArrowBackIosIcon />} style={{marginLeft:"auto"}} onClick={() => { fetch('p') }}>Previous</Button> : null}

            </div>
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
