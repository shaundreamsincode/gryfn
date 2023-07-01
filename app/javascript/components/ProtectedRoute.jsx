// import React from 'react';
// import { Navigate, Route } from 'react-router-dom';
//
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = () => {
//         // Check if the token exists and is valid
//         const token = localStorage.getItem('token');
//         // Decode and verify the token on the server-side for additional security
//         return token !== null;
//     };
//
//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 isAuthenticated() ? (
//                     <Component {...props} />
//                 ) : (
//                     <Navigate to="/login" />
//                 )
//             }
//         />
//     );
// };
//
// export default ProtectedRoute;
