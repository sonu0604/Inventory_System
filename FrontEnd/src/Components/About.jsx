import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel } from "react-bootstrap";
import "./About.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="overlay"></div>
      <div className="container text-white py-5">
        <h2 className="text-center fw-bold mb-4" data-aos="fade-down">
          About Us
        </h2>
        <div className="row align-items-center">
          {/* Left Image */}
          <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
            <img
              src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg"
              alt="About Inventory Management"
              className="img-fluid rounded shadow-lg"
            />
          </div>

          {/* Right Text Slider */}
          <div className="col-md-6" data-aos="fade-left">
            <Carousel
              indicators={false}
              controls={true}
              interval={4000}
              fade={true}
            >
              <Carousel.Item>
                <div>
                  <h4 className="fw-semibold">Who We Are</h4>
                  <p>
                    InventoryMS is a modern inventory management system designed
                    to help businesses efficiently track products, suppliers,
                    consumers, sales, and purchases. Our mission is to simplify
                    inventory management for both administrators and staff.
                  </p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div>
                  <h4 className="fw-semibold">Our Vision</h4>
                  <p>
                    To provide an intuitive, secure, and reliable inventory
                    tracking solution that improves productivity and reduces
                    operational costs. We believe in making inventory control
                    seamless and accessible from anywhere.
                  </p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div>
                  <h4 className="fw-semibold">Why Choose Us?</h4>
                  <ul>
                    <li>Role-based access for admins and staff</li>
                    <li>Real-time stock updates</li>
                    <li>Detailed purchase and sales reports</li>
                    <li>Secure authentication and data handling</li>
                  </ul>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

