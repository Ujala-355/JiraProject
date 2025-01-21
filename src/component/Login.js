import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

function LoginRegister() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isRegister
                ? '/api/auth/register'
                : '/api/auth/login';

            const payload = { username, password };
            const response = await axios.post(endpoint, payload);

            console.log('API Response:', response.data); // Debugging API response

            if (response.data.success) {
                // Access the token correctly from the response
                const token = response.data.data.token;
                if (!token) {
                    throw new Error('Token is missing from the response.');
                }

                // Store token in localStorage
                localStorage.setItem('token', token);
                console.log('Token stored in localStorage:', token);

                if (isRegister) {
                    alert('Registration successful! Redirecting to the dashboard...');
                } else {
                    alert('Login successful!');
                }

                navigate('/project');
            } else {
                setError(response.data.message || 'An unexpected error occurred.');
            }
        } catch (err) {
            console.error('Error during form submission:', err);

            setError(
                err.response?.data?.error || 'Something went wrong. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="login-card p-4 shadow-lg">
                <h2 className="text-center mb-4">
                    {isRegister ? 'Register an Account' : 'Login to Your Account'}
                </h2>
                <Form onSubmit={handleFormSubmit}>
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
                        {loading
                            ? (isRegister ? 'Registering...' : 'Logging in...')
                            : (isRegister ? 'Register' : 'Login')}
                    </Button>
                </Form>
                <p className="text-center mt-3">
                    {isRegister
                        ? 'Already have an account? '
                        : "Don't have an account? "}
                    <span
                        className="text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? 'Login' : 'Register'}
                    </span>
                </p>
            </div>
        </div>
    );
}
export default LoginRegister;



