import React, { FormEvent, JSX } from 'react';
import './login.scss'; // Assuming you have a CSS file for styling
import logo from '../../assets/baf.png'; // Adjust the path as necessary
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth_context';

export default function LoginPage(): JSX.Element {
    const navigate : NavigateFunction = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();              // ← stop full‑page reload
        setIsSubmitting(true);
        try {
            await login(username, password); 
            navigate('/home');             // ← only fires after login resolves
        } catch (err: any) {
            alert('Login failed: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
  };

    

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <img src={logo} width='260px' />
                <div className="login-username">
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" name="username" required onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                </div>
                
                <div className="login-password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" disabled={isSubmitting}>Login</button>    
            </form>
        </div>
    );
}