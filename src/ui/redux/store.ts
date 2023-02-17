import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';


import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  image: string
  description: string
}



export const publicationSlice = createSlice({
  name: 'publication',

  initialState:{
  image: "",
  description: ""
},
  reducers: {
    onchangeImg: (state,action:PayloadAction<string>) => {
       state.image = action.payload;
       return state;
    },
    onchangeDescr: (state, action:PayloadAction<string>) => {
      state.description = action.payload;
      return state;
        
    },
  },
})

export const { onchangeDescr, onchangeImg } = publicationSlice.actions


const store = configureStore(
    { reducer:{
        publication:publicationSlice.reducer,
    } },
   
)

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch