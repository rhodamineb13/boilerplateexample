import { JSX } from 'react';
import './login.scss'; // Assuming you have a CSS file for styling
import logo from '../../assets/baf.png'; // Adjust the path as necessary

export default function Login(): JSX.Element {
    return (
        <div className="login-page">
            <h1>Login Page</h1>
            <p>Please enter your credentials to log in.</p>
            <div className="login-form">
                <img src={logo} width='260px' />
                <div className="login-username">
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" name="username" required />
                </div>
                
                <div className="login-password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>    
            </div>
        </div>
    );
}