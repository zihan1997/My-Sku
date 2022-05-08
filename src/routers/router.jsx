import {
    Routes,
    Route
} from "react-router-dom";
import WelcomePage from "../pages/components/HomePage/WelcomePage";
import UsersPage from "../pages/components/UserPage/UsersPage";
import ProductsPage from '../features/products/ProductPage'

export default function MyRouter(){
    return(
        <Routes>
            <Route path="/" element={<ProductsPage/>} />
            <Route path="home" element={<WelcomePage/>} />
            <Route path="products" element={<ProductsPage/>}/>
            <Route path="users" element={<UsersPage/>} />
            <Route path='*' element={<WelcomePage/>}/>
        </Routes>
    )
}