import {
    Routes,
    Route
} from "react-router-dom";
import WelcomePage from "../pages/components/HomePage/WelcomePage";
import UsersPage from "../pages/components/UserPage/UsersPage";
import ProductsPage from '../pages/components/ProductPage/ProductPage'
import ProductController from "../pages/components/ProductPage/ProductController";
import MainPage  from "../pages/web_frame/index"
import LogIndex from "../pages/components/LogPage/LogIn";
import Register from "../pages/components/LogPage/Register";

export default function MyRouter(){
    return(
        <Routes>
            <Route path="/login" index element={<LogIndex/>} />
            <Route path="/register" index element={<Register/>} />
            <Route path="/" element={<MainPage/>} >
                <Route path="/home" exact element={<WelcomePage/>} />
                <Route path="products" element={<ProductsPage/>}/>
                <Route path="/products/manage" element={<ProductController/>}/>
                <Route path="/users" element={<UsersPage/>} />
                <Route path='*' element={<WelcomePage/>}/>
            </Route>
        </Routes>
    )
}