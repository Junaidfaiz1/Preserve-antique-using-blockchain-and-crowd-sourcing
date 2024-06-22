import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import AboutUsimg from "../images/AboutUs img.jpg";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-3">About Us</h1>
      <div className=" mx-5">
        <p className="text-right">
          Welcome to our blockchain-powered platform dedicated to preserving
          Pakistan's rich heritage of antiques! Dive into our collection to see
          amazing things from the past. Want to stay connected with us? Follow
          us on Facebook, Instagram, and YouTube for fun updates. Got questions
          or just want to say hi? Drop us an email via our "Contact Us" page.
          Let's team up to keep Pakistan's incredible history alive.
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 mb-5 mt-4 d-flex justify-content-center align-item center">
            <div className="w-75">
              <img
                src={AboutUsimg}
                className="img-fluid rounded "
                alt="This is Img"
              />
            </div>
          </div>
          <div className="col-6 ">
            <div className="text-center mt-4 ">
              <h2> Journey Through Time: Exploring Pakistan's Treasures</h2>
            </div>
            <div>
              <p className="text-left">
                Join us on a journey through Pakistan's history with our
                campaign "Journey Through Time." We'll explore the stories
                behind each antique, revealing secrets from the past. Our videos
                bring these tales to life, taking you back in time. From old
                pottery to ancient artifacts, each piece has a unique story.
                Let's celebrate Pakistan's heritage together! Mark your
                calendars for the adventure ahead!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
