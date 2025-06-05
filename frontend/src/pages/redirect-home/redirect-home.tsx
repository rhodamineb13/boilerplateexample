import { JSX, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export default function RedirectHome(): JSX.Element {
    const navigate : NavigateFunction = useNavigate();

    useEffect(() => {
        // Redirect to the home page after a short delay
        const timer = setTimeout(() => {
            navigate("/home");
        }, 2000); // Redirect after 2 seconds
        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [navigate]);
    
    return (
        <div className="redirect-home">
            <h1>Redirecting to Home...</h1>
            <p>If you are not redirected automatically, please click <a href="/home">here</a>.</p>
        </div>
    );
}