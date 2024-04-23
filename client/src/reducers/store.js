import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import posts from "./posts";

const store = configureStore({
  reducer: {
    posts: posts,
    auth: auth,
  },
});

export default store;
