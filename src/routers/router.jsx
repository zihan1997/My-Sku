import {
    Routes,
    Route
} from "react-router-dom";
import WelcomePage from "../pages/components/HomePage/WelcomePage";
import UsersPage from "../pages/components/UserPage/UsersPage";
import ProductsPage from '../pages/components/ProductPage/ProductPage'
import ProductController from "../pages/components/ProductPage/ProductController";

export default function MyRouter(){
    return(
        <Routes>
            {/*<Route path="/" element={<ProductController/>} />*/}
            {/*<Route path="/" element={<ProductsPage/>} />*/}
            <Route path="/" element={<WelcomePage/>} />
            <Route path="home" element={<WelcomePage/>} />
            <Route path="products" element={<ProductsPage/>}/>
            <Route path="products/actions" element={<ProductController/>}/>
            <Route path="users" element={<UsersPage/>} />
            <Route path='*' element={<WelcomePage/>}/>
        </Routes>
    )
}