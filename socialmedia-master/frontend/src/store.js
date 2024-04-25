import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/User";
import { likeReducer, myPostsReducer } from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
  },
});

export default store;
