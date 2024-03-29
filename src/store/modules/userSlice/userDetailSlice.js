import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "Fetch";
// import { instance } from "Fetch";

export const getCurrentUser = createAsyncThunk('getCurrentUser',async (payload,{rejectWithValue})=>{
    const response = await instance('getCurrentUser');
    try {
        // const res = await response.json()
        console.log('res',response)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

export const userDetail = createSlice({
    name:'userDetail',
    initialState:{
        id:'',
        parentId:'',
        userName:'',
        roles:'',
        active:'',
        delegations:[],
        loading:false,
        error:null
    },
    extraReducers:{
        [getCurrentUser.pending]:(state)=>{
            state.loading=true;
        },
        [getCurrentUser.fulfilled]:(state,action)=>{
            state.loading=false;
            state.id=action.payload.data.id
            state.userName=action.payload.data.userName
            state.roles=action.payload.data.roles
            state.delegations=action.payload.data.delegations
            state.active=action.payload.data.active
            state.parentId=action.payload.data.parentId
        },
        [getCurrentUser.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload
            window.location.href = "/";
        }
    }
})


export default userDetail.reducer