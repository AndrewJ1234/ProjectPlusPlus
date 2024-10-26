import React, { useState } from 'react';
import './Login.css';
import userIcon from './Assets/person.png';
import emailIcon from './Assets/email.png';
import passwordIcon from './Assets/password.png';
import Modal from 'react-modal';
import axios from 'axios';



function Login(props) {
    const [action, setAction] = useState("Login");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const endpoint = action === "Sign Up" ? '/api/users' : '/api/login'; // Adjusted to use /api/users for sign-up
        const data = action === "Sign Up" ? { username, email, password } : { email, password };
    
        try {
            const response = await axios.post(endpoint, data);
            console.log(response.data.message); // Handle success (e.g., show message)
            props.toggle(); // Close the modal after submission
        } catch (error) {
            // Check if error.response exists
            if (error.response) {
                console.error('Error:', error.response.data.message); // Handle error if response is defined
            } else {
                console.error('Error:', error.message); // Handle unexpected errors (e.g., network issues)
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