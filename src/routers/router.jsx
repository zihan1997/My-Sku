import {
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
import MainFrame  from "../pages/web_frame/index"
import LogIndex from "../pages/components/LogPage/LogIn";
import Register from "../pages/components/LogPage/Register";
import {useEffect} from "react";


export default function MyRouter(){
    const time = localStorage.getItem('expiredIn');
    const diff = (new Date().getTime() - new Date(time).getTime()) / (1000 * 60) // in mins;

    const navigate = useNavigate();
    useEffect(()=>{
        if(Math.round(diff) > 10){
            localStorage.clear();
            navigate('../login');

        }
    }, [diff])

    return(
        <Routes>
            <Route path="/login" index element={<LogIndex/>} />
            <Route path="/register" index element={<Register/>} />

            <Route path="/*"  element={<MainFrame/>}/>
            <Route path="*" element={LogIndex}/>
        </Routes>
    )
}