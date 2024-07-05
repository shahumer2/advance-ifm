import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewProfile = () => {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPersons = async (page, size) => {
    try {
      const response = await fetch(`http://localhost:8089/profile/view?page=${page}`, {
        method: 'GET',
      });
      const data = await response.json();
      setPersons(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPersons(page, size);
  }, [page, size]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8089/profile/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPersons(persons.filter(person => person.id !== id));
        alert('Profile deleted successfully');
      } else {
        alert('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className="container mt-5 mb-8 p-10" style={{ padding: '12px', backgroundColor: "white" }}>
      <div style={{ marginBottom: '12px', backgroundColor: "white" }}>
        <div className="d-flex justify-content-center mt-3 mb-3 font-bold">
          <h2>Employee List</h2>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr className="table-secondary">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company Name</th>
              <th>Profession</th>
              <th>Mobile Number</th>
              <th>State</th>
              <th>View Qr Card</th>
              <th>View Card</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.companyName}</td>
                <td>{person.profession}</td>
                <td>{person.mobileNumber}</td>
                <td>{person.state}</td>
                <td>
                  <Link to={`/card/${person.id}`} className="btn btn-primary" style={{ fontSize: "15px", width: "120px" }}>
                    View Qr Card
                  </Link>
                </td>
                <td>
                  <Link to={`/profile/${person.id}`} className="btn btn-secondary" style={{ fontSize: "15px", width: "120px" }}>
                    View Card
                  </Link>
                </td>
                <td>
                  <Link to={`/profile/update/${person.id}`} style={{ fontSize: "15px", width: "120px", marginRight: "3px" }}>
                    <FaEdit size="20px" />
                  </Link>
                 
                    <MdDelete onClick={() => handleDelete(person.id)} size="25px" />
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
