import { React, useState, useEffect } from "react";
import Poster from "../Poster/Poster";
import product from "../images/AboutUs img.jpg";
import Footer from "../footer/Footer";
import { getAntiques } from "../../utilities/interact";
import { Link } from "react-router-dom";

const Home = () => {
  const [latestAntiques, setLatestAntiques] = useState([]);

  useEffect(() => {
    async function fetchLatestAntiques() {
      try {
        const antiques = await getAntiques();
        if (!antiques || !Array.isArray(antiques)) {
          console.error("Antiques data is not valid:", antiques);
          return;
        }

        // Convert BigInt id values to numbers before sorting
        antiques.sort((a, b) => Number(b.id) - Number(a.id));

        // Slice antiques array to get the last eight antiques
        const lastEightAntiques = antiques.slice(0, 8);

        setLatestAntiques(lastEightAntiques);

        antiques.forEach((antique) => {
          if (antique && typeof antique.imageName === "string") {
            console.log("Image Name:", antique.imageName);
          } else {
            console.error("Invalid image name found:", antique);
          }
        });
      } catch (error) {
        console.error("Error fetching latest antiques:", error);
      }
    }

    fetchLatestAntiques();
  }, []);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    const truncated = words.slice(0, 7).join(" ");
    return truncated;
  };

  return (
    <div>
      <Poster />

      <div className="container text-center mb-2 mt-3">
        <div className="row">
          <h3
            className="mx-auto mt-4 mb-4"
            style={{
              fontFamily: "cursive",
              width: "100%",
              textDecoration: "underline",
            }}
          >
            Newly Uploaded Antiques
          </h3>
          {latestAntiques.map((antique) => (
            <div key={antique.id} className="col-md-3 mx-auto mb-4">
              <div
                className="card"
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <Link
                  to={`/DetailPage/${antique.id}/${antique.category}`}
                  className="text-decoration-none"
                >
                  {/* Navigate to DetailPage with id and categoryName as URL parameters */}
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/" + antique.imageName
                    }
                    className="card-img-top"
                    alt="...."
                    style={{
                      width: "100%",
                      height: "200px", // Set a fixed height for all images
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <div className="card-body" style={{}}>
                  <h5 className="card-text">{antique.name}</h5>
                  <p style={{ fontFamily: "Centaur" }}>
                    {" "}
                    {truncateDescription(antique.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {
        // Testimonial
      }
      <div className="container mb-5">
        <div className="container text-center">
          <div className="row">
            <h3 className="mx-auto mt-4">Testimonials</h3>
          </div>
          <hr
            className="my-0 mx-auto border-top border-dark"
            style={{ width: "15rem" }}
          />
        </div>
        <div className="row">
          <div className="col-md-3 mt-4 mx-auto">
            <div className="card" style={{ width: "15rem" }}>
              <img src={product} className="card-img-top" alt="Testimonial 1" />
              <div className="card-body">
                <p className="card-text">
                  "Amazing experience! The team provided exceptional service and
                  helped me find exactly what I was looking for."
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mt-4 mx-auto">
            <div className="card" style={{ width: "15rem" }}>
              <img src={product} className="card-img-top" alt="Testimonial 2" />
              <div className="card-body">
                <p className="card-text">
                  "I'm impressed with the quality of the products and the
                  professionalism of the staff. Highly recommended!"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mt-4 mx-auto">
            <div className="card" style={{ width: "15rem" }}>
              <img src={product} className="card-img-top" alt="Testimonial 3" />
              <div className="card-body">
                <p className="card-text">
                  "Great selection and excellent customer service. Will
                  definitely be coming back for more!"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mt-4 mx-auto">
            <div className="card" style={{ width: "15rem" }}>
              <img src={product} className="card-img-top" alt="Testimonial 4" />
              <div className="card-body">
                <p className="card-text">
                  " happier with my experience! The team went above and beyond
                  to make sure I was satisfied."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
