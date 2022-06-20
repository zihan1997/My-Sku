import {
    Routes,
    Route
} from "react-router-dom";
import MainFrame  from "../pages/web_frame/index"
import LogIndex from "../pages/components/LogPage/LogIn";
import Register from "../pages/components/LogPage/Register";


export default function MyRouter(){

    return(
        <Routes>
            <Route path="/login" index element={<LogIndex/>} />
            <Route path="/register" index element={<Register/>} />

            <Route path="/*"  element={<MainFrame/>}/>
            <Route path="*" element={LogIndex}/>
        </Routes>
    )
}