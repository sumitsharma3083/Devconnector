import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../utils/api'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  


export const login = createAsyncThunk("user/login",
  async (body)=>{
      try {
        const response =  await api.post('/auth', body)
        return response.data
      } catch (error) {
        return error
      }
     
  }
 )


 export const register = createAsyncThunk('user/register', 
 async (formData)=>{
  const response = await api.post('/users', formData);
    return response.data
 }
 )


 export const loadUser = createAsyncThunk("user/loaduser", 
 async () => {
  try {
    const response  = await api.get('/auth');
     return response; 
  } catch (err) {
     return err
  }
}
)





const authSlice = createSlice({
     name : "AuthSlice",
     initialState : initialState, 
     reducers : {
      logout(state){
        state.token = null,
        state.isAuthenticated = false,
        state.loading =  false,
        state.user=  null
      }, 
      accountDelete(state){
        state.token = null,
        state.isAuthenticated = false,
        state.loading =  false,
        state.user=  null
      }
     },
     extraReducers : (builder)=>{


      builder.addCase(login.pending , (state,{type,payload})=>{
        state.isAuthenticated = false,
        state.loading = true
      })
      builder.addCase(login.fulfilled , (state, {type,payload})=>{
        state.isAuthenticated = true,
        state.loading = false 
        state.user = payload
      })
      builder.addCase(login.rejected , (state, {type,payload})=>{
        state.isAuthenticated = false
      })


      builder.addCase(register.pending , (state,{type, payload})=>{
          state.isAuthenticated = false 
          state.loading = true
      })
      builder.addCase(register.fulfilled , (state, {type,payload})=>{
        state.isAuthenticated = true 
        state.loading = false
        state.user = payload
      })
      builder.addCase(register.rejected , (state, {type,payload})=>{
        state.isAuthenticated = false 
        state.loading = false
      })


      builder.addCase(loadUser.pending , (state, {payload})=>{
        state.isAuthenticated = false 
        state.loading = true 
      })
      builder.addCase(loadUser.fulfilled , (state, {payload})=>{
        state.loading = false
        state.isAuthenticated = true 
        state.user = payload 
      })

     }
})

export const {logout , accountDelete} = authSlice.actions
export default authSlice.reducer ; 