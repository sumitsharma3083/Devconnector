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
async function(postId, formData){
    try {
        const res = await api.post(`/posts/comment/${postId}`, formData);
        return res.data 
    } catch (error) {
        return  { msg: err.response.statusText, status: err.response.status }
    }
   
}
)

export const deleteComment = createAsyncThunk("deletecomment", 
async function(){
  
}
)





const postSlice = createSlice({
    name : "postSlice",
    initialState : initialState,
    reducers: {},
    extraReducers : function (builder){
        builder.addCase(addComment.pending, (state,{type,payload})=>{
           state.loading = true
        })
        builder.addCase(addComment.fulfilled , (state, {type,payload})=>{
           state.post.comments = payload;
           state.loading = false 
        })
        builder.addCase(addComment.rejected  , (state, {type,payload})=>{
            state.error = payload
            state.loading = false 
        })
    }
})


export default postSlice 