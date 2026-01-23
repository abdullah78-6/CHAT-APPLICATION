import {configureStore} from "@reduxjs/toolkit"
import chatdata from "./chatslice.js";
const chatstore=configureStore({
    reducer:{
        main:chatdata
    }
})
export default chatstore;