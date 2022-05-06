import {
    Routes,
    Route
} from "react-router-dom";
import WelcomePage from "../pages/components/HomePage/WelcomePage";
import UsersPage from "../pages/components/UserPage/UsersPage";
import ProductsDB from "../pages/components/ProductPage/ProductsDB";
import {useState} from "react";
import { BrowserRouter } from "react-router-dom";

export default function MyRouter(){
    // const [retainDB, setRetainDB] = useState(<ProductsDB/>)
    return(
        <Routes>
            <Route path="/" element={<ProductsDB/>} />
            <Route path="home" element={<WelcomePage/>} />
            <Route path="products" element={<ProductsDB/>}/>
            <Route path="users" element={<UsersPage/>} />
            <Route path='*' element={<WelcomePage/>}/>
           {/*</Route>*/}
        </Routes>
    )
}