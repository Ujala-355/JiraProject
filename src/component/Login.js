import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

function Login() {
    const navigate = useNavigate(); // navigate hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Backend API call
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            console.log(response); // Debugging: Check the response from backend

            if (response.data.success) {
                // If login is successful, navigate to dashboard
                console.log('Login successful, navigating to dashboard');
                navigate('/dashboard');
            } else {
                // Show error message from backend
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="login-card p-4 shadow-lg">
                <h2 className="text-center mb-4">Login to your account</h2>
                <Form onSubmit={handleLogin}>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <Form.Group controlId="formBasicUsername" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
