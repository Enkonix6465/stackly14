import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo and About */}
        <div className="footer-section">
          <img src="/Images/logo111.png" alt="Stackly Logo" className="footer-logo" />
          <p className="footer-description">
            Stackly empowers businesses with cutting-edge cloud, AI, and cybersecurity solutions to transform your digital future.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>

            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><Link to="/education-programs">Education Program</Link></li>
            <li><Link to="/healthcare-initiatives">healthcare Initiatives</Link></li>

            <li><Link to="/food-distribution">food Distribution</Link></li>
            <li><Link to="/disaster-relief">Disaster Relief</Link></li>
            <li><Link to="/women-empowerment">Women Empowerment</Link></li>
            <li><Link to="/elderly-care">Elderly Care</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="footer-section">
          <h4>Connect with us</h4>
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/login"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/linkedinl.png"
                alt="LinkedIn"
                style={{ width: "24px", height: "24px" }}
              />
            </a>
            <a
              href="https://www.twitter.com/"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/twitterl.png"
                alt="Twitter"
                style={{ width: "24px", height: "24px" }}
              />
            </a>
            <a
              href="https://www.facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/facebook l.png"
                alt="Facebook"
                style={{ width: "24px", height: "24px" }}
              />
            </a>
            <a
              href="https://mail.google.com"
              aria-label="Gmail"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/google.png"
                alt="Gmail"
                style={{ width: "24px", height: "24px" }}
              />
            </a>
          </div>
          <p className="footer-contact">
            Email: support@stackly.com<br />
            Phone: +1 (800) 123-4567
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        {/* Scroll to Top Button */}
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          ⬆
        </button>
        <p>© {new Date().getFullYear()} Stackly. All rights reserved By ESS.</p>
      </div>
    </footer>
  );
};

export default Footer;