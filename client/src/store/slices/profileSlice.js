import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../utils/api'

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
  };


  export const getCurrentProfile = createAsyncThunk("getUserProfile", 
  async ()=>{
    try {
      const res = await api.get('/profile/me');
      return res.data

      // dispatch({
      //   type: GET_PROFILE,
      //   payload: res.data
      // });

    } catch (err) {
      return {msg : err.response.statusText , status :err.response.status}

      // dispatch({
      //   type: PROFILE_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status }
      // });
    }
  }
  )





  // Get all profiles
export const getProfiles = createAsyncThunk("getallprofiles",
   async ()=>{
    try {
      const res = await api.get('/profile');
       return res.data 

      // dispatch({
      //   type: GET_PROFILES,
      //   payload: res.data
      // });
    } catch (err) {

       return { msg: err.response.statusText, status: err.response.status }

      // dispatch({
      //   type: PROFILE_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status }
      // });
    }
   }
)


export const getProfileById = createAsyncThunk("getprofilebyid", 
async(userId)=>{
  try {
    const res = await api.get(`/profile/user/${userId}`);
    return res.data
    // dispatch({
    //   type: GET_PROFILE,
    //   payload: res.data
    // });
  } catch (err) {
    return { msg: err.response.statusText, status: err.response.status }
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
}
)


export const getGithubRepos = createAsyncThunk("getgitrepos", 
 async(username)=>{
  try {
    const res = await api.get(`/profile/github/${username}`);
    return res.data 
    // dispatch({
    //   type: GET_REPOS,
    //   payload: res.data
    // });
  } catch (err) {

    // dispatch({
    //   type: NO_REPOS
    // });
  }
 }
)


export const createProfile = createAsyncThunk("createprofile", 
async function(formData, history, edit = false){
  try {
    const res = await api.post('/profile', formData);
        return res.data 
    // dispatch({
    //   type: GET_PROFILE,
    //   payload: res.data
    // });

    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
      
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
)


export const addEducation = createAsyncThunk("addeducation", 
async function(){

}
)


export const deleteEducation = createAsyncThunk("deleteeducation", 
async function(id){
  try {
    const res = await api.delete(`/profile/education/${id}`);
    return res.data

    // dispatch({
    //   type: UPDATE_PROFILE,
    //   payload: res.data
    // });

    // dispatch(setAlert('Education Removed', 'success'));
  } catch (error) {
       return {msg: err.response.statusText, status: err.response.status}
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
 
}
)



export const addExperience = createAsyncThunk("addexperience", 
async function(){

}
)


export const deleteExperience = createAsyncThunk("deleteexperience", 
async function(id){
  try {

     const response  =  await api.delete(`/profile/experience/${id}`) 
     return response.data

  } catch (error) {
      return  { msg: error.response.statusText, status: error.response.status }
  }
  
}
)


export const deleteaccount = createAsyncThunk("deleteaccount", 
async function(){
  if(window.confirm("Are you sure ! This cannot be Undone ?")){
    try {
      await api.delete('/profile');

      // dispatch({ type: CLEAR_PROFILE });
      // dispatch({ type: ACCOUNT_DELETED });
      // dispatch(setAlert('Your account has been permanently deleted'));

    } catch (error) {
         return {msg: err.response.statusText, status: err.response.status}
      //  dispatch({
      //   type: PROFILE_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status }
      // });
    }
  }
} 
)




const profileSlice = createSlice({
  name : "profileSlice",
  initialState : initialState ,
  reducers : {},
  extraReducers : (builder)=>{
    

    builder.addCase(getCurrentProfile.pending , (state,{type,payload})=>{
       state.loading = true 
    })
    builder.addCase(getCurrentProfile.fulfilled , (state,{type,payload})=>{
          state.profile = payload 
          state.loading = false 
    })
    builder.addCase(getCurrentProfile.rejected , (state,{type,payload})=>{
      state.error = payload,
      state.profile = null 
      statse.loading = false 
    })


     builder.addCase(deleteaccount.pending , (state,{type,payload})=>{
      state.loading = true 
     })
     builder.addCase(deleteaccount.fulfilled , (state,{type,payload})=>{
         state.profile = null
         state.repos = []   
     })
     builder.addCase(deleteaccount.rejected , (state,{type,payload})=>{
          state.error = payload,
          state.profile = null 
          statse.loading = false 
     })


     builder.addCase(deleteEducation.pending , (state,{type,payload})=>{
      state.loading = true 
     })
     builder.addCase(deleteEducation.fulfilled , (state,{type,payload})=>{
         state.profile = payload
         state.loading = false  
     })
     builder.addCase(deleteEducation.rejected , (state,{type,payload})=>{
          state.error = payload,
          state.profile = null 
          statse.loading = false 
     })

     builder.addCase(deleteExperience.pending , (state,{type,payload})=>{
      state.loading = true 
     })
     builder.addCase(deleteExperience.fulfilled , (state,{type,payload})=>{
         state.profile = payload
         state.loading = false  
     })
     builder.addCase(deleteExperience.rejected , (state,{type,payload})=>{
          state.error = payload,
          state.profile = null 
          statse.loading = false 
     })


  }
})

export default profileSlice.reducer