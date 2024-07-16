import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DEL_CARD, GET_CARD, GET_EMP, GET_USER } from '../constants/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const ViewUser = () => {
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const [users, setusers] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);


  const fetchusers = async (page, size) => {





    try {
      const response = await fetch(`${GET_USER}?page=${page}`, {
        method: 'GET',
        headers: {
          "Content-Type":"Application/json",
          "Authorization": `Bearer ${token}`,
         
        }
      });
      const data = await response.json();
      console.log(data, "shuuu");
      setusers(data.content);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalElements)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchusers(page, size);

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
              headers: {
                "Authorization": `Bearer ${token}`
              },
            });

            if (response.ok) {
              setusers(users.filter(person => person.id !== id));
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
          <h2>Users</h2>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr className="table-secondary">
              <th>Name</th>
              <th>UserName</th>
              <th>Address</th>
             
              <th>Mobile Number</th>
              <th>Role</th>
            
            
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((person) => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.username}</td>
                <td>{person.address}</td>
                <td>{person.phoneNumber}</td>
                <td>{person.authorities[0].authority}</td>
               
              
                <td>
                  <Link to={`/user/update/${person.id}`} style={{ fontSize: "15px", width: "120px", marginRight: "3px" }}>
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
        <span>
          Page {page } of {totalPages} | Total Items: {totalItems}
        </span>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewUser;
