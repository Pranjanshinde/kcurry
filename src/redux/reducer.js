import { Get_products, Get_single } from "./actiontypes"

const initstate={
    products:[],
    single:{}
}


export function reducer(state=initstate,{type,payload})
{
    switch(type){
        case Get_products :
            return {...state,products:payload}

            case Get_single :
                return {...state,single:payload}

            default:return state



    }
}