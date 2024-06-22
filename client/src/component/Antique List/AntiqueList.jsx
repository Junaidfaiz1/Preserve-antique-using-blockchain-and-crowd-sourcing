import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import { getAntiquesByCategory } from "../../utilities/interact";

const AntiqueList = () => {
  const [antiques, setAntiques] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { name } = useParams();

  const antiquesPerPage = 9;

  useEffect(() => {
    const fetchAntiquesByCategory = async () => {
      try {
        const antiquesByCategory = await getAntiquesByCategory(name);
        setAntiques(antiquesByCategory);
        setTotalPages(Math.ceil(antiquesByCategory.length / antiquesPerPage));
      } catch (error) {
        console.error("Error fetching antiques by category:", error);
      }
    };

    fetchAntiquesByCategory();
  }, [name]);

  const indexOfLastAntique = currentPage * antiquesPerPage;
  const indexOfFirstAntique = indexOfLastAntique - antiquesPerPage;
  const currentAntiques = antiques.slice(
    indexOfFirstAntique,
    indexOfLastAntique
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-3 mb-5">
        <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
          <h2 className="text-center mb-4">Category: {name}</h2>
          {currentAntiques.map((antique) => (
            <div key={antique.id} className="col-md-4 mb-4">
              <Link
                to={`/DetailPage/${antique.id}/${name}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="card"
                  style={{ width: "100%", height: "100%", display: "flex" }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/" + antique.imageName
                    }
                    className="card-img-top"
                    alt="..."
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "200px",
                    }} // Set fixed height
                  />
                  <div className="card-body">
                    <h4 className="card-text text-center">{antique.name}</h4>
                    {/* Limit description to first seven words */}
                 
                      <p>
                        {antique.description.split(" ").slice(0, 15).join(" ")}{" "}
                        {antique.description.split(" ").length > 15
                          ? "......"
                          : ""}
                      </p>
                    
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>
            {pageNumbers.map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${
                  pageNumber === currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
};

export default AntiqueList;
