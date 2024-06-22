import React, { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import "./ContactUs.css";
import Footer from "../footer/Footer";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_j98wdpw",
        "template_dh3413b",
        form.current,
        "ivRPc6p6acHeedhkQ"
      )
      .then(
        (result) => {
          window.alert("Mail sended successful");
          form.current.reset();
        },
        (error) => {
          window.alert("Error");
        }
      );
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="ContactUs">
          <h3 className="text-center mt-4">Contact Us</h3>
          <div className="Login d-flex justify-content-center align-items-center templete w-100 vh-70  bg-white mt-3 mb-3">
            <div className="  p-5 " style={{ width: "90%"}}>
              <form action="" ref={form} onSubmit={sendEmail}>
                <div className="mb-3">
                  <label htmlFor="Name">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="user-name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="user-email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="Subject">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter Subject"
                    name="user-subject"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="textAreaExample">
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    name="user-message"
                    id="textAreaExample1"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="d-grid ">
                  <button className="btn btn-secondary" type="submit">
                    Send Mail
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
