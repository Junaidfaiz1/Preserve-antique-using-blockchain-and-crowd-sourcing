import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import { useParams, Link } from "react-router-dom";
import {
  getAntiqueById,
  getAntiquesByCategory,
} from "../../utilities/interact.js";

const DetailPage = () => {
  const { id, categoryName } = useParams();
  const [antiqueDetails, setAntiqueDetails] = useState(null);
  const [relatedAntiques, setRelatedAntiques] = useState([]);

  useEffect(() => {
    // Fetch antique details by ID
    const fetchAntiqueDetails = async () => {
      try {
        const antique = await getAntiqueById(id);
        setAntiqueDetails(antique);
      } catch (error) {
        console.error("Error fetching antique details:", error);
      }
    };

    fetchAntiqueDetails();

    // Fetch related antiques by category
    const fetchRelatedAntiques = async () => {
      try {
        const antiques = await getAntiquesByCategory(categoryName);
        setRelatedAntiques(antiques);
      } catch (error) {
        console.error("Error fetching related antiques:", error);
      }
    };

    fetchRelatedAntiques();
  }, [id, categoryName]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          {/* Display antique details */}
          {antiqueDetails && (
            <div className="col-lg-6">
              <img
                src={
                  process.env.PUBLIC_URL + "/images/" + antiqueDetails.imageName
                }
                className="img-fluid rounded my-4"
                alt=""
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                }} // Limit image size
              />
            </div>
          )}
          {antiqueDetails && (
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h1 className="display-5 mb-4">{antiqueDetails.name}</h1>
              <p className="mb-4">
                {antiqueDetails.description}
              </p>
            </div>
          )}
        </div>
      </div>
      <hr
        className="my-5 mx-auto border-top border-dark"
        style={{ width: "80%" }}
      />
      <div className="container my-5">
        <h3 className="text-center mb-4">Related Antiques</h3>
        <div className="row">
          {/* Display related antiques */}
          {relatedAntiques.map((relatedAntique) => (
            <div className="col-md-3 mb-5" key={relatedAntique.id}>
              <Link
                to={`/DetailPage/${relatedAntique.id}/${categoryName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card" style={{ width: "15rem" }}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/" +
                      relatedAntique.imageName
                    }
                    className="card-img-top"
                    alt=""
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <p className="card-text">{relatedAntique.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
