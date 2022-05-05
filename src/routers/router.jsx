import {
    Routes,
    Route
} from "react-router-dom";
import WelcomePage from "../pages/components/HomePage/WelcomePage";
import UsersPage from "../pages/components/UserPage/UsersPage";
import ProductsDB from "../ProductsDB/ProductsGenerator/ProductsDB";
import Product from "../pages/components/tools/Product";
// import ProductsPage from "../pages/components/ProductPage/Products.jsx";
export default function MyRouter(){
   return(
       <Routes>
           <Route path="/" element={<ProductsDB/>} />
           <Route path="/home" element={<WelcomePage/>} />
           <Route path="/products" element={<ProductsDB/>}>
           {/*<Route path="/products" element={<ProductsPage/>}>*/}
               {/*<Route path=":productId" element={<Product/>}/>*/}
           </Route>
           <Route path="/users" element={<UsersPage/>} />

           <Route path='*' element={<WelcomePage/>}/>
       </Routes>
   )
}