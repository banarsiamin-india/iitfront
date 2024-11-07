// AdminLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import './AdminLayout.css'; // We'll add custom CSS here
import { Container } from 'react-bootstrap';

import { Outlet } from 'react-router-dom'; // Import Outlet to handle nested route rendering

// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const AdminLayout11 = ({ children }) => {
//   return (
//            <div className="d-flex">
//             <Sidebar />
//             <Container fluid className="content p-4">
//                 {children}
//             </Container>
//         </div>
//   );
// };

const AdminLayout = () => {
    return (
      <div className="d-flex">
        <Sidebar />
        <Container fluid className="content12 p-4">
          <Outlet /> {/* This will render the nested route components */}
        </Container>
      </div>
    );
  };

export default AdminLayout;