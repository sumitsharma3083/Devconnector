import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
  };
  

 export const getPosts = createAsyncThunk("getPosts", 
  async function(){
    
 }

 )


 export const addLike = createAsyncThunk("addlike", 
  async function(){
    
  }
 )


 export const removeLike = createAsyncThunk("removeLike", 
 async function(){
   
 }
)


export const deletePost = createAsyncThunk("deletepost", 
async function(){
  
}
)


export const addPost = createAsyncThunk("addpost", 
async function(){
  
}
)

export const getPost = createAsyncThunk("getpost", 
async function(){
  
}
)


export const addComment = createAsyncThunk("addcomment", 
async function(){
  
}
)

export const deleteComent = createAsyncThunk("deletecomment", 
async function(){
  
}
)





const postSlice = createSlice({
    name : "postSlice",
    initialState : initialState,
    reducers: {},
    extraReducers : function (builder){
     
    }
})


export default postSlice 