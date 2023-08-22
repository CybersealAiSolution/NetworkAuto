import { combineReducers } from "redux"

const setUserState =( lastvalue={adminAccess:"",delegation:[]}, action)=>{
    
    const {type,payload}= action

    if(type==="USER_STATE"){
        return payload
    }

    return lastvalue
    
}

   

export default combineReducers({
    UserStates: setUserState
   })


