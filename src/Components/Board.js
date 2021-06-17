import React, { useState, useEffect } from 'react'
import Cards from './Cards'

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FacebookIcon from '@material-ui/icons/Facebook';

import CircularProgress from '@material-ui/core/CircularProgress';

import Tooltip from '@material-ui/core/Tooltip';


import {postFirstBatch, postsNextBatch} from './Post';


import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function Board() {
    const [data, setData] = useState([])
    const [lastkey, setLastkey] = useState("")
    const [nextPosts_loading, setNextPostsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true;
        postFirstBatch()
        .then((res)=>{
             let dat = [];
            res.posts.forEach((post)=>{
                dat = [...dat, <Cards key={post.code_title} owner_name={post.owner_name} owner_email={post.owner_email}
                        code_title={post.code_title} code_url={post.code_url}
                        code_approach={post.code_approach} code_text={post.code_text} date={post.time} />]
            });

            if(isMounted) setData(dat);
             setLastkey(res.lastkey);
            return () => { isMounted = false };
        });
    },[]);
    const fetchMorePosts = (key) =>{
        if(key.length > 0){
            setNextPostsLoading(true);
            postsNextBatch(key)
            .then((res)=>{
                let dat = [];
                res.posts.forEach((post)=>{
                dat = [...dat, <Cards key={post.code_title} owner_name={post.owner_name} owner_email={post.owner_email}
                        code_title={post.code_title} code_url={post.code_url}
                        code_approach={post.code_approach} code_text={post.code_text} date={post.time} />]
            });
                setData(data.concat(dat));
                setLastkey(res.lastkey);
                setNextPostsLoading(false);
            })
            .catch((err)=>{ 
                console.log(err);
                setNextPostsLoading(false);
            });
        }
    };  


    return (
        <div>
            <Tooltip title="Created by Niraj Pandey">
                <h1
                    style={{
                        textDecoration: 'none', backgroundColor: 'black', color: 'white', cursor: 'default'
                    }}>The CODE BASE</h1>
            </Tooltip>

            {(data.length === 0)?<CircularProgress /> : data}
            <div style={{textAlign:"center"}}>
                {nextPosts_loading ? (
                     <CircularProgress />
                ) : lastkey.length > 0 ? (
                    <Button color="primary" startIcon={<ExpandMoreIcon />} onClick={()=>fetchMorePosts(lastkey)}>More Codes</Button>
                ) : (<span></span>)
                }
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
