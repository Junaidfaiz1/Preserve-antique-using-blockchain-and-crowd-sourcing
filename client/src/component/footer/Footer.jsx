import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start bg-dark text-light">
        <section className="pt-2">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
                <p>00923434023832 pakharitage@gmail.com</p>
              </div>

              <div className="col-md-2 col-lg-3 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Antique Collections
                </h6>
                <p>
                  <a href="/" className="text-reset text-decoration-none">
                    Antique Places
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset text-decoration-none">
                    Antique Artifacts
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-3 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link
                    to="/AboutUs"
                    className="text-reset text-decoration-none"
                  >
                    AboutUs
                  </Link>
                </p>
                <p>
                  <Link
                    to="/ContactUs"
                    className="text-reset text-decoration-none"
                  >
                    Contact Us
                  </Link>
                </p>
                <p>
                  <a href="/" className="text-reset text-decoration-none">
                    FAQ
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset text-decoration-none">
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Follow Us</h6>
                <p>
                  <a
                    href="https://www.facebook.com/"
                    className="text-decoration-none text-light "
                  >
                    <i className="fab fa-facebook me-2"></i> Facebook
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.instagram.com/"
                    className="text-decoration-none text-light "
                  >
                    <i className="fab fa-instagram me-2"></i> Instagram
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.youtube.com/"
                    className="text-decoration-none text-light "
                  >
                    <i className="fab fa-youtube me-2"></i> Youtube
                  </a>
                </p>
                <p>
                  <a
                    href="https://pk.linkedin.com/"
                    target="_blank"
                    className="text-decoration-none text-light "
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin me-2"></i> Linked In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

      
      </footer>
    </div>
  );
};

export default Footer;
