import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Contact.css";

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
   <section id="contact" className="contact-section py-5">
      <div className="overlay"></div>
      <div className="container text-white">
        <h2 className="text-center fw-bold mb-4" data-aos="fade-down">
          Contact Us
        </h2>
        <p className="text-center mb-5" data-aos="fade-up">
          Have questions or need assistance? Reach out to us — we’d love to
          hear from you!
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className="p-4 bg-dark rounded shadow" data-aos="fade-up">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-warning w-100 fw-semibold">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
