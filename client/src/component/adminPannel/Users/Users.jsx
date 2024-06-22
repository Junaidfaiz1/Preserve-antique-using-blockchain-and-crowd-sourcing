// Import the necessary dependencies
import React, { useState, useEffect } from "react";
import "./User.css"
import { viewAllUsers } from "../../../utilities/interact.js"; // Import the viewAllUsers function

const Users = () => {
  // Define state variables to store the list of users and handle loading state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use the useEffect hook to fetch users when the component mounts
  useEffect(() => {
    async function fetchUsers() {
      try {
        // Call the viewAllUsers function to fetch all users
        const allUsers = await viewAllUsers();
        setUsers(allUsers); // Set the fetched users in state
        setLoading(false); // Update loading state once users are fetched
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers(); // Invoke the fetchUsers function
  }, []);

  return (
    <div>
      <div className="table-container">
        <div className="User">
        <h3 className="text-center mt-5 mb-3">Users</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
             
            </tr>
          </thead>
          <tbody>
            {/* Iterate over the list of users and render a table row for each user */}
            {loading ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Users;
