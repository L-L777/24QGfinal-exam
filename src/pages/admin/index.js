import { useEffect } from "react";
import { pagedQueryPublishedProject } from  "../../api"
const Admin=()=>{
    useEffect(()=>{
async function fetchData() {
    try{
        await pagedQueryPublishedProject(1,1,1)
    }catch(error){

    }
   
}
fetchData()
    },[])
    return (<div>dhjfhadk</div>)
}
export default Admin;