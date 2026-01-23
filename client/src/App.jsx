import Chat from "./components/chats"
import {Route, Routes} from "react-router-dom"
import Profile from "./components/profile.initialise"
import Friendchat from "./components/friend.chat"
import Loginpop from "./components/signpop"

function App() {
  return <Routes>
    <Route path="/" element={<Loginpop/>}/>
    <Route path="/chats" element={<Chat/>}/>
    <Route path="/pr" element={<Profile/>}/>
    <Route path="/fr"element={<Friendchat/>}/>
    

  </Routes>


}
export default App
