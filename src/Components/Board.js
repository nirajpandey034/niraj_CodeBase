import React, {useState, useEffect} from 'react'
import firebase from '../firebase'
import Cards from './Cards'
function Board() {
    const [data, setData] = useState([])  
    const [flag, setFlag] = useState(true)
    const loading = 'Please Wait, Loading the data';

    useEffect(()=>{
        const getData = () =>{
            let dat = [];
            firebase.database().ref("codeBase").on("child_added", (snapshot, prevChildKey) =>{    
                let value = snapshot.val(); 
                dat = [...dat ,<Cards key={value.code_title} owner_name={value.owner_name} owner_email={value.owner_email} 
                    code_title={value.code_title} code_url={value.code_url}
                    code_approach={value.code_approach} code_text={value.code_text}/>]
                setFlag(false)
        });
        setData(dat);
        }
            getData(); 
    },[flag])
    return (       
        <div>
            <h1 style={{textDecoration:'none'}}>[The CODE_BASE]</h1>
                {(data.length === 0) ? loading : data}

            <br />
            <a href="https://ur-code-base.web.app/" target="_blank">Want to Contribute Codes?</a>
            &emsp;&emsp;
            <a href="https://www.linkedin.com/in/imnirajpandey" target="_blank">Get in touch with the Creator.</a>
            &emsp;&emsp;
            <a href="https://github.com/nirajpandey034/niraj_CodeBase" target="_blank">Github Repository</a>
        </div>
    )
}
 export default Board
