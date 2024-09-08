import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


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
async function(){

}
)

export const addExperience = createAsyncThunk("addexperience", 
async function(){

}
)


export const deleteExperience = createAsyncThunk("deleteexperience", 
async function(){

}
)


export const deleteaccount = createAsyncThunk("deleteaccount", 
async function(){
  
} 
)




const profileSlice = createSlice({
  name : "profileSlice",
  initialState : initialState ,
  reducers : {},
  extraReducers : (builder)=>{
  
  }
})

export default profileSlice 