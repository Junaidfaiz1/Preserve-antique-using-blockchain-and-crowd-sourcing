// Antique.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAntiques, removeAntique } from "../../../utilities/interact";

// Helper function to truncate a string to a specific number of words
const truncateString = (str, numWords) => {
  const words = str.split(" ");
  if (words.length > numWords) {
    return words.slice(0, numWords).join(" ") + "...";
  }
  return str;
};

const Antique = () => {
  const [antiques, setAntiques] = useState([]);

  const fetchAntiques = async () => {
    try {
      const antiqueList = await getAntiques();
      setAntiques(antiqueList);
    } catch (error) {
      console.error("Error fetching antiques:", error);
    }
  };

  useEffect(() => {
    fetchAntiques();
  }, []);

  const handleRemove = async (antiqueId) => {
    try {
      await removeAntique(antiqueId);
      // After removing the antique, fetch the updated list
      fetchAntiques();
    } catch (error) {
      console.error("Error removing antique:", error);
    }
  };

  return (
    <div>
      <div className="table-container">
        <table className="table table-striped">
          <thead>{/* ... (existing table header) */}</thead>
          <tbody>
            {antiques.map((antique, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{antique.name}</td>
                <td>{antique.category}</td>
                <td>{truncateString(antique.description, 5)}</td>
                <td>
                  <Link
                    to={`/DetailPage/${antique.id}/${antique.category}`}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-eye"></i>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-success">
                    <Link
                      className="nav-link text-white"
                      to={`/update/${antique.id}`}
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(antique.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Antique;
