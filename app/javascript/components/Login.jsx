// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
//
// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//
//     const jwtToken = localStorage.getItem('token'); //
//
//     const checkTokenValidity = () => {
//         fetch('/api/v1/verify_token', {
//             headers: { Authorization: `Bearer ${jwtToken}` },
//         }).then((response) => {
//             if (response.ok) {
//                 navigate('/')
//             }
//         })
//     };
//
//     const handleLogin = () => {
//         const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
//
//         // Send login request to the backend and retrieve the token
//         fetch('/api/v1/sessions', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
//             body: JSON.stringify({ email, password }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 // Save the token in local storage or a secure cookie
//                 localStorage.setItem('token', data.token);
//                 navigate('/')
//                 // Redirect to a protected route or perform other actions
//             })
//             .catch((error) => {
//                 console.error('Failed to login:', error);
//             });
//     };
//
//     const handleSignUp = () => {
//         navigate('/signup')
//     }
//
//     useEffect(() => {
//         checkTokenValidity()
//     }, [jwtToken])
//
//     return (
//         <div>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             /> <br/>
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             /><br/>
//             <button onClick={handleLogin}>Login</button>
//             <br/>
//
//             <button onClick={handleSignUp}>Sign up</button>
//         </div>
//     );
// };
//
// export default Login;
