import {
    Routes,
    Route
} from "react-router-dom";

import WelcomePage from "../pages/components/WelcomePage";
import ProductsPage from "../pages/components/Products";
import UsersPage from "../pages/components/UsersPage";
import HomeIndex from "../pages/home/index"
import App from "../app";
import Product from "../pages/components/tools/Product";

export default function MyRouter(){
   return(
       <Routes>
           <Route path="/home" element={<WelcomePage/>} />
           <Route path="/products" element={<ProductsPage/>}>
               <Route
                   index
                   element={
                   <main style={{padding: "1rem"}}>
                       <p>Select a product</p>
                   </main>
                   }
               />
               <Route path=":productId" element={<Product/>}/>
           </Route>
           <Route path="/users" element={<UsersPage/>} />

           <Route path='*' element={<WelcomePage/>}/>
       </Routes>
   )
}