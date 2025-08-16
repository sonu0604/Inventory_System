import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Features.css";

function Features() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const features = [
    {
      icon: "bi-speedometer2",
      title: "Admin Dashboard",
      front: "Manage products, suppliers, consumers, and generate reports.",
      back: "Full control over inventory, role assignments, and detailed analytics.",
    },
    {
      icon: "bi-cart-check",
      title: "Staff Operations",
      front: "Perform purchases and sales transactions with real-time updates.",
      back: "Easy interface for quick transactions, reduces manual errors.",
    },
    {
      icon: "bi-graph-up-arrow",
      title: "Reports & Insights",
      front: "Generate insightful purchase and sales reports.",
      back: "Track performance trends and make better business decisions.",
    },
  ];

  return (
    <section id="features" className="features-section py-5">
      <div className="overlay"></div>
      <div className="container text-white">
        <h2 className="text-center fw-bold mb-5" data-aos="fade-down">
          Key Features
        </h2>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="col-md-4"
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <div className="flip-card h-100">
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className="flip-card-front bg-dark text-light shadow d-flex flex-column align-items-center justify-content-center p-4">
                    <i
                      className={`bi ${feature.icon} display-4 text-warning`}
                    ></i>
                    <h5 className="mt-3">{feature.title}</h5>
                    <p className="text-center">{feature.front}</p>
                  </div>
                  {/* Back Side */}
                  <div className="flip-card-back bg-warning text-dark shadow d-flex flex-column align-items-center justify-content-center p-4">
                    <h5>{feature.title}</h5>
                    <p className="text-center">{feature.back}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
