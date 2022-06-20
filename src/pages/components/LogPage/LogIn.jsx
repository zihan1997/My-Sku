import React, {useState} from "react";
import {message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useGetJWTTokenMutation} from "../../../reducers/api/apiSlice";
import "./index.scss"

export default function LogIndex() {

    const [name, setName] = useState("test");
    const [pwd, setPwd] = useState("test");
    const [getTokenByUser] = useGetJWTTokenMutation();

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const result = await getTokenByUser({username: name, password: pwd}, { force: true }).unwrap();
            // console.log(result)
            if(!(result.token && result.user)){
                message.error("Error occurred", 1)
            }else {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', result.user);
                localStorage.setItem('expiredIn', new Date().toISOString().toString());
                // redirect the URL
                navigate("../products", {replace: true})
            }
        }catch (e) {
            // console.log("error occurred: " + JSON.stringify(e))
            message.error("Error: " + e.data + ". Code: " + e.originalStatus, 2)
        }

    }

    return (
        <div>
            <div className="log-logo">My-Sku</div>

            <div className="login-block">
                <h1>Login</h1>
                <input type="text"
                       value={name}
                       onChange={e => setName(e.target.value)}
                       placeholder="Username"
                       id="username"/>
                <input type="password"
                       value={pwd}
                       onChange={e => setPwd(e.target.value)}
                       placeholder="Password"
                       id="password"

                />
                <button onClick={handleSubmit}>Submit</button>

                <div id="linkReg">
                    Not a member?
                    <Link to="../register">Sign up now</Link>
                </div>
            </div>
        </div>
    )
}