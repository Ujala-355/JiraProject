// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';
// import './Login.css';

// function Login() {
//     const navigate = useNavigate(); // navigate hook
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             // Backend API call
//             const response = await axios.post('http://localhost:5000/api/auth/login', {
//                 username,
//                 password,
//             });

//             console.log(response); // Debugging: Check the response from backend

//             if (response.data.success) {
//                 // If login is successful, navigate to dashboard
//                 console.log('Login successful, navigating to dashboard');
//                 navigate('/dashboard');
//             } else {
//                 // Show error message from backend
//                 setError(response.data.message);
//             }
//         } catch (err) {
//             console.error('Error during login:', err);
//             setError('Something went wrong. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="login-container d-flex justify-content-center align-items-center">
//             <div className="login-card p-4 shadow-lg">
//                 <h2 className="text-center mb-4">Login to your account</h2>
//                 <Form onSubmit={handleLogin}>
//                     {error && <p className="text-danger text-center">{error}</p>}
//                     <Form.Group controlId="formBasicUsername" className="mb-3">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter your username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="formBasicPassword" className="mb-3">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Button variant="primary" type="submit" className="w-100" disabled={loading}>
//                         {loading ? 'Logging in...' : 'Login'}
//                     </Button>
//                 </Form>
//             </div>
//         </div>
//     );
// }

// export default Login;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';
// import './Login.css';

// function LoginRegister() {
//     const navigate = useNavigate();
//     const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             const endpoint = isRegister
//                 ? '/api/auth/register'
//                 : '/api/auth/login';

//             const payload = { username, password };
//             const response = await axios.post(endpoint, payload);

//             console.log('API Response:', response.data);

//             // Check if the server response indicates success
//             if (response.status === 201 || response.status === 200) {
//                 if (isRegister) {
//                     alert('Registration successful! Redirecting to the dashboard...');
//                     localStorage.setItem('token', response.data.token); // Save token for authentication
//                     navigate('/dashboard'); // Redirect to the dashboard
//                 } else {
//                     alert('Login successful!');
//                     localStorage.setItem('token', response.data.token); // Save token for authentication
//                     navigate('/dashboard'); // Redirect to the dashboard
//                 }
//             } else {
//                 // If the response does not indicate success
//                 setError(response.data.error || 'An unexpected error occurred.');
//             }
//         } catch (err) {
//             console.error('Error during form submission:', err);

//             // Handle the error properly
//             setError(
//                 err.response?.data?.error ||
//                 'Something went wrong. Please try again.'
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="login-container d-flex justify-content-center align-items-center">
//             <div className="login-card p-4 shadow-lg">
//                 <h2 className="text-center mb-4">
//                     {isRegister ? 'Register an Account' : 'Login to Your Account'}
//                 </h2>
//                 <Form onSubmit={handleFormSubmit}>
//                     {error && <p className="text-danger text-center">{error}</p>}
                    
//                     <Form.Group controlId="formBasicUsername" className="mb-3">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter your username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="formBasicPassword" className="mb-3">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Button variant="primary" type="submit" className="w-100" disabled={loading}>
//                         {loading
//                             ? (isRegister ? 'Registering...' : 'Logging in...')
//                             : (isRegister ? 'Register' : 'Login')}
//                     </Button>
//                 </Form>
//                 <p className="text-center mt-3">
//                     {isRegister
//                         ? 'Already have an account? '
//                         : "Don't have an account? "}
//                     <span
//                         className="text-primary"
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => setIsRegister(!isRegister)}
//                     >
//                         {isRegister ? 'Login' : 'Register'}
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default LoginRegister;



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

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError('');

    //     try {
    //         const endpoint = isRegister
    //             ? '/api/auth/register'
    //             : '/api/auth/login';

    //         const payload = { username, password };
    //         const response = await axios.post(endpoint, payload);

    //         console.log('API Response:', response.data);

    //         // Check if the server response indicates success
    //         if (response.status === 201 || response.status === 200) {
    //             if (isRegister) {
    //                 alert('Registration successful! Redirecting to the dashboard...');
    //                 localStorage.setItem('token', response.data.token); // Save token for authentication
    //                 navigate('/dashboard'); // Redirect to the dashboard
    //             } else {
    //                 alert('Login successful!');
    //                 localStorage.setItem('token', response.data.token); // Save token for authentication
    //                 navigate('/dashboard'); // Redirect to the dashboard
    //             }
    //         } else {
    //             // If the response does not indicate success
    //             setError(response.data.error || 'An unexpected error occurred.');
    //         }
    //     } catch (err) {
    //         console.error('Error during form submission:', err);

    //         // Handle the error properly
    //         setError(
    //             err.response?.data?.error ||
    //             'Something went wrong. Please try again.'
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };
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
    
                navigate('/dashboard');
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



