import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Footer.css";

function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer
      className="footer bg-dark text-white pt-4"
      data-aos="fade-up"
    >
      <div className="container">
        <div className="row">
          {/* Brand / About */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-warning">
              Inventory<span className="text-white">MS</span>
            </h5>
            <p>
              Your trusted solution for managing inventory, suppliers,
              consumers, and transactions — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/features" className="footer-link">Features</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contact Us</h5>
            <p><i className="bi bi-geo-alt-fill"></i> 123 Business Street, Mumbai</p>
            <p><i className="bi bi-telephone-fill"></i> +91 98765 43210</p>
            <p><i className="bi bi-envelope-fill"></i> support@inventoryms.com</p>
            <div>
              <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center py-3 border-top border-secondary mt-3">
          &copy; {new Date().getFullYear()} InventoryMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
