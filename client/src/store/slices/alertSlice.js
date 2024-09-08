import {createSlice} from '@reduxjs/toolkit'
import {SET_ALERT , REMOVE_ALERT} from './types'

const initialState = [];

 
const alertSlice = createSlice({
    name  : "alertSlice", 
    initialState: initialState,
    reducers: {
        setAlert(state, action){
            const {type , payload} = action
            switch (type) {
                case SET_ALERT:
                     return [...state, payload];
                case REMOVE_ALERT:
                     return state.filter((alert) => alert.id !== payload);
                default:
                     return state;
            }
        }
      },
})  

export const {setAlert} = alertSlice.actions

export default alertSlice ; 