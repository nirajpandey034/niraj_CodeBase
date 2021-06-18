import axios from 'axios';

// export default{
    export async function getData(page=0){
        try{
            let posts=[];
            let hasNext;
            let hasPrev;
            let currentPage;
               await axios.get("https://codebase034.herokuapp.com/fetch/?page="+page)
               .then(result=>{
                        result.data.posts.forEach((res)=>{
                            posts.push(res);
                        });
                        hasNext = result.data.hasNextPage;
                        hasPrev = result.data.hasPrevPage;
                        currentPage = result.data.currentPage;

               })
               .catch(err=>{console.log(err)});
            return {posts,hasNext,hasPrev,currentPage};
        }catch(e){
            console.log(e);
        }
    };
// };

