import {
    Routes,
    Route
} from "react-router-dom";
import WelcomePage from "../pages/components/HomePage/WelcomePage";
import UsersPage from "../pages/components/UserPage/UsersPage";
import ProductsDB from "../pages/components/ProductPage/ProductsDB";
import {useState} from "react";


export default function MyRouter(){
    const [retainDB, setRetainDB] = useState(<ProductsDB/>)
    return(
       <Routes>
           <Route path="/" element={<ProductsDB/>} />
           <Route path="/home" element={<WelcomePage/>} />
           <Route path="/products" element={retainDB}>
           {/*<Route path="/products" element={<ProductsPage/>}>*/}
               {/*<Route path=":productId" element={<Product/>}/>*/}
           </Route>
           <Route path="/users" element={<UsersPage/>} />

           <Route path='*' element={<WelcomePage/>}/>
       </Routes>
    )
}