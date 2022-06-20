import React, {useState} from "react";
import {message} from "antd";
import './index.scss';
import { useNavigate } from "react-router-dom";
import {useRegisterMutation} from "../../../reducers/api/apiSlice";

export default function Register() {

    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [register] = useRegisterMutation();

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const result = await register({
                username: name,
                password: pwd,
            })
            // console.log(result);
            if(result.error && result.error.originalStatus === 226){
                message.error("User exists, try to login", 2);
            }else{
                message.success(result.data.message, 2);

                localStorage.setItem('token', result.data.token);
                localStorage.setItem('user', result.data.user)
                navigate('../home');
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="logo">Logo</div>

            <div className="login-block">
                <h1>Register</h1>
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
            </div>
        </div>
    )
}