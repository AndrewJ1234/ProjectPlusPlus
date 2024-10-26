import React, { useState } from 'react';
import './Login.css';
import Modal from 'react-modal';
import axios from 'axios';

function Login(props) {
    const [action, setAction] = useState("Login");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = action === "Sign Up" 
            ? 'http://localhost:4000/db/users' 
            : 'http://localhost:4000/db/login';
        const data = action === "Sign Up" 
            ? { username, email, password } 
            : { email, password };

        try {
            const response = await axios.post(endpoint, data, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data.message); 
            if (props.toggle) props.toggle(); // Ensure toggle exists before calling it
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data.message);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <Modal 
            isOpen={true}
            onRequestClose={props.toggle}
            style={{
                overlay: { background: "rgba(0, 0, 0, 0.75)" },
                content: { width: "auto", margin: "auto", padding: "20px", background: "rgb(220, 217, 217)" }
            }}
        >
            <div className="popup-inner">
                <h2>{action}</h2>
                <form onSubmit={handleSubmit}>
                    {action === "Sign Up" && (
                        <label>
                            Username:
                            <input 
                                type="text" 
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                                required 
                            />
                        </label>
                    )}
                    <label>
                        Email:
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </label>
                    <button type="submit">{action}</button>
                </form>
                <div className="toggle-container">
                    <span>{action === "Login" ? "Don't have an account?" : "Already have an account?"}</span>
                    <button onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
                        {action === "Login" ? "Sign Up" : "Login"}
                    </button>
                </div>
                <button onClick={props.toggle}>Close</button>
            </div>
        </Modal>
    );
}

export default Login;
