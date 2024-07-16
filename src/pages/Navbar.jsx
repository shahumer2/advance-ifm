import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/Slice/userSlice';
import "./CardComponent.css"
function CustomNavbar() {
    const { currentUser } = useSelector((state) => state?.persisted?.user);

    if (!currentUser) {
        return null;
    }

    const { user } = currentUser;
    const username = user.username;
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('Add User');
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        if (location.pathname === '/addEmp') {
            setActiveLink('Add User');
        } else if (location.pathname === '/profile/view') {
            setActiveLink('View Only');
        }
    }, [location.pathname]);

    const handleLogout = () => {
        try {
            dispatch(signoutSuccess());
            navigate("/auth/signin");
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/addEmp">
                <img src="/images/STIE.png" width="90" height="40" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/addEmp" className={activeLink === 'Add User' ? 'active' : ''} onClick={() => setActiveLink('Add User')}>
                        Add Employee
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile/view" className={activeLink === 'View Only' ? 'active' : ''} onClick={() => setActiveLink('View Only')}>
                        View Employee
                    </Nav.Link>
                    {
                        user.authorities[0].authority === "ROLE_ADMIN" &&
                        <Nav.Link as={Link} to="/user/view" className={activeLink === 'View Only' ? 'active' : ''} onClick={() => setActiveLink('View Only')}>
                            View User
                        </Nav.Link>

                    }
                </Nav>
                <Nav>
                    <div className="user-info-box d-flex align-items-center">
                        <img src="/images/default-user.png" className="user-image rounded-circle text-lg" alt="User" />
                        <NavDropdown style={{ fontSize: "20px", textTransform: "capitalize" }} title={username} id="basic-nav-dropdown" className="ml-2">
                            <NavDropdown.Item onClick={handleLogout} >Logout</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
