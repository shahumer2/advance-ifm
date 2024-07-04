import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewProfile = () => {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPersons = async (page, size) => {
    try {
      const response = await fetch(`http://localhost:8089/profile/view`, {
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
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  console.log(persons,"heyyy");

  return (
    <div className="container mt-5 mb-8">
          <div style={{ marginBottom: '12px' }}>
      <div className="d-flex justify-content-between">
        <h2>Persons List</h2>
        <Link to={`/page`} className="btn btn-primary">
          Add A Person
        </Link>
      </div>
    </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company Name</th>
            <th>Profession</th>
       
            <th>Mobile Number</th>
          
       
            <th>State</th>
          
            <th>Actions</th>
            <th>View Card</th>
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
              <Link to={`/card/${person.id}`} className="btn btn-primary">
                  View Qr Card
                </Link>
              </td>
              <td>
                <Link to={`/profile/${person.id}`} className="btn btn-secondary">
                  View Card
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
