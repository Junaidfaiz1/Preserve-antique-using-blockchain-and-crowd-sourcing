import React from "react";
import Navbar from "../Navbar/Navbar";
import Posters from "../images/poster.jpg";

const Poster = () => {
  return (
    <div>
      <Navbar />
      <div
        className="poster-section d-flex align-items-center justify-content-center position-relative"
        style={{
          backgroundImage: `url(${Posters})`,
          height: "25rem",
          width: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white position-absolute">
          <div className="design-element"></div>
          <h1
            className="poster-heading mb-0"
            style={{
              fontFamily: "Lucida calligraphy",
              fontSize: "40px",
              textDecoration: "underline",
            }}
          >
            Pakistan Heritage <br />
          </h1>
          <div className="design-element mt-0">
            <div className="input-group">
              <div className="form-outline " data-mdb-input-init>
                <input
                  id="search-input"
                  type="search"
                  style={{ width: "23rem" }}
                  placeholder="Search..."
                  className="form-control"
                />
              </div>
              <button id="search-button" type="button" className="btn btn-dark">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          className="position-absolute bottom-0 start-0 mb-1 ms-3"
          style={{
            marginLeft: "10rem",
            marginRight: "1rem",
            paddingLeft: "1rem",
          }}
        >
          <h4
            className="text-white"
            style={{ fontFamily: "kunstler script", fontSize: "40px" }}
          >
            Keep History Alive
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Poster;
