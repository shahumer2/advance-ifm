import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DEL_CARD, GET_CARD, GET_EMP } from '../constants/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const ViewProfile = () => {
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPersons = async (page, size) => {
    try {
      const response = await fetch(`${GET_EMP}?page=${page}`, {
        method: 'GET',
        headers:{
          "Authorization":`Bearer ${token}`
        }
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
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          if (window.confirm("Are you sure you want to delete this profile?")) {
            const response = await fetch(`${DEL_CARD}/${id}`, {
              method: 'DELETE',
              headers:{
                "Authorization":`Bearer ${token}`
              },
            });

            if (response.ok) {
              setPersons(persons.filter(person => person.id !== id));
              resolve('Profile deleted successfully');
            } else {
              reject('Failed to delete profile');
            }
          } else {
            reject('Delete action canceled');
          }
        } catch (error) {
          reject('Error deleting profile');
        }
      }),
      {
        pending: 'Deleting profile...',
        success: 'Profile deleted successfully 👌',
        error: 'Failed to delete profile 🤯'
      }
    );
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
                  <Link to={`/profile/viewCard/${person.id}`} className="btn btn-secondary" style={{ fontSize: "15px", width: "120px" }}>
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
      <ToastContainer />
    </div>
  );
};

export default ViewProfile;
