import { useEffect } from "react";
import { pagedQueryPublishedPorject } from  "../../api"
const Admin=()=>{
    useEffect(()=>{
async function fetchData() {
    try{
        await pagedQueryPublishedPorject(1,1,1)
    }catch(error){

    }
   
}
fetchData()
    },[])
    return (<div>dhjfhadk</div>)
}
export default Admin;