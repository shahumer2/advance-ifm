import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Import React-Bootstrap components
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery from react-responsive
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_URL } from '../constants/utils';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { signoutSuccess } from '../redux/Slice/userSlice';

function CustomNavbar() {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token, user } = currentUser;
    const username = user.username;
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const location = useLocation(); // Get current location from React Router
    const [activeLink, setActiveLink] = useState('Add User'); // State to track active link
    const isMobile = useMediaQuery({ maxWidth: 768 }); // Check if screen size is mobile (example threshold is 768px)

    // Function to update active link based on current path
    useEffect(() => {
        if (location.pathname === '/addEmp') {
            setActiveLink('Add User');
        } else if (location.pathname === '/profile/view') {
            setActiveLink('View Only');
        }
    }, [location.pathname]); // Run effect whenever location.pathname changes
    // const handleLogout = () => {
    //     try {
    //       dispatch(signoutSuccess());
    //       navigate("/auth/signin")
    //     } catch (error) {
    
    //     }
    //   }


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${LOGOUT_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include"
            });

            if (response.ok) {
                toast.success("Logout Successfully!");
                navigate("/auth/signin");
            } else {
                console.error('Failed to log out');
                toast.error("Failed to log out. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <Navbar bg="light" expand="lg" className="navbar-expand-lg">
            <Navbar.Brand as={Link} to="/addEmp">
                <img src="/images/STIE.png" width="90" height="40" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/addEmp" className={activeLink === 'Add User' ? 'active' : ''} onClick={() => setActiveLink('Add User')}>
                        Add Employee
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile/view" className={activeLink === 'View Only' ? 'active' : ''} onClick={() => setActiveLink('View Only')}>
                        View Employee
                    </Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title={username} id="basic-nav-dropdown" >
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
