import React, { useState, useEffect } from 'react'
import Cards from './Cards'

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FacebookIcon from '@material-ui/icons/Facebook';

import CircularProgress from '@material-ui/core/CircularProgress';

import Tooltip from '@material-ui/core/Tooltip';


import { getData, getSearchData, getAllTitles } from './Post';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function Board() {
    const [data, setData] = useState([])
    //state for next and previous posts
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [currentPage, setCurrentPage] = useState();
    //for rendering
    const [status, setStatus] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [codeTitles, setCodeTitles] = useState([]);

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
                setStatus(true);
                return () => { isMounted = false };
            });
            //getting titles
        getAllTitles()
            .then((res)=>{
                let titles = [];
                res.post.forEach((title)=>{
                    titles = [...titles, title.code_title];
                })
                setCodeTitles(titles);
            })
            .catch((err)=>{
                console.log("Some Error occured");
            });
    }, [status]);

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

    const searchCode = () =>{
        let code_title = searchText;
        if(code_title === '')
            alert('Kindly enter the search data correctly');
        else{
        getSearchData(code_title)
            .then((res)=>{
                let dat = [];
                dat = [<Cards key={res.post.data.code_title} owner_name={res.post.data.owner_name} owner_email={res.post.data.owner_email}
                    code_title={res.post.data.code_title} code_url={res.post.data.code_url}
                    code_approach={res.post.data.code_approach} code_text={res.post.data.code_text} date={res.post.data.time}/>]

                setData(dat);
                setHasNext(false);
                setHasPrev(false);
            })
            .catch((err)=>{alert('No matched found as per your search, please try again')});
        }
    }

    const refreshPage = () => {
        if(status !== false)
        {
            setStatus(false);
            setSearchText('');
        }
    }
    return (
        <div>
            <Tooltip title="Created by Niraj Pandey">
                <h1
                    style={{
                        textDecoration: 'none', backgroundColor: 'black', color: 'white', cursor: 'default'
                    }}>The CODE BASE</h1>
            </Tooltip>

            <div style={{display:"inline-block", width:"100%", marginLeft: 'auto', marginRight: '0px'}}>
            {/* jsdnjsdfn */}
            <Autocomplete
                id="search_text"
                freeSolo
                autoComplete={true}
                inputValue={searchText}
                onInputChange={(event, newInputValue) => {setSearchText(newInputValue);}}
                options={codeTitles}
                renderInput={(params) => (
                    <TextField
                            {...params}
                            variant="outlined" margin="normal" 
                            label="Enter the title to search" id='search_text'
                            InputProps={{ ...params.InputProps, type: 'search' }}/>
                )}
                //{
                //     //return (
                //         // <div ref={params}>
                //             <TextField
                //             {...params}
                //             variant="outlined" margin="normal" 
                //             label="Enter the title to search" id='search_text'
                //             InputProps={{ ...params.InputProps, type: 'search' }}/>
                //         {/* </div> */}
                //     //)
                // }}
            />
            {/* ljsjdjsdnvjnsd */}

            <Button startIcon={<SearchIcon />} color='primary' onClick={searchCode}>Search</Button>
            <Button startIcon={<AutorenewIcon />} color='secondary' onClick={refreshPage}>Reset</Button>
                 
            </div>

            {/* page change div */}
            <div style={{display:"flex", width:"100%"}}>

            {hasPrev ? <Button startIcon={<ArrowBackIosIcon />} onClick={() => { fetch('p') }}>Previous</Button> : null} <br />

            {hasNext ? <Button endIcon={<ArrowForwardIosIcon />} style={{marginLeft:"auto"}} onClick={() => { fetch('n') }}>Next</Button> : null} 

            </div>

            {(data.length === 0) ? <CircularProgress /> : data}

            {/* page change div */}
            <div style={{display:"flex", width:"100%"}}>

            {hasPrev ? <Button startIcon={<ArrowBackIosIcon />} onClick={() => { fetch('p') }}>Previous</Button> : null} <br />

            {hasNext ? <Button endIcon={<ArrowForwardIosIcon />} style={{marginLeft:"auto"}} onClick={() => { fetch('n') }}>Next</Button> : null} 

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
