import { Get_products, Get_single } from "./actiontypes";
import  axios from "axios";


function getallprods(payload)
{
return {
    type:Get_products,
    payload:payload
}
}

function Getsingle(payload)
{
    return {
        type:Get_single,
    payload:payload
}
    
}

export const Getproducts = (search,thing,material) =>(dispatch)=>{
    let url=`http://localhost:8080/prod`;
    if(search!="")
    {
        url=`http://localhost:8080/prod?text=${search}`
    }
    if(thing!="" || material!="")
    {
        url=`http://localhost:8080/prod?product=${thing}&material=${material}`
    }
    axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response.data,1);
    dispatch(getallprods(response.data))
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
   
  })
}

export const Editprods = (item) => (dispatch)=>{
    console.log(item,2);
    axios.patch(`http://localhost:8080/prod/${item._id}`,item)
    .then(function (response) {
      // handle success
      console.log(response.data);
     alert(response.data.msg);
     window.location.reload();
  
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
     
    })
}