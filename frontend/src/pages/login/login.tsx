import React, { JSX } from 'react';
import './login.scss'; // Assuming you have a CSS file for styling
import logo from '../../assets/baf.png'; // Adjust the path as necessary
import { useState } from 'react';
import { Login } from '../../api/login';
import { LoginDTO } from '../../models/dto/login_dto';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function LoginPage(): JSX.Element {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate : NavigateFunction = useNavigate();

    const handleClick = async () => {
        try {
            const loginData : LoginDTO = {
                username: username,
                password: password,
            }
            await Login(loginData)
            alert('login success')
            navigate("/home")
        } catch (err) {
            alert("wrong password")
        }
    }

    return (
        <div className="login-page">
            <h1>Login Page</h1>
            <p>Please enter your credentials to log in.</p>
            <div className="login-form">
                <img src={logo} width='260px' />
                <div className="login-username">
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" name="username" required onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                </div>
                
                <div className="login-password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" onClick={handleClick}>Login</button>    
            </div>
        </div>
    );
}