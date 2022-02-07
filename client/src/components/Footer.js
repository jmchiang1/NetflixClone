import React from "react";
import "./Styles/Footer.css";
// import { Button } from './Button';
import { Link } from "react-router-dom";
import { Facebook, GitHub, LinkedIn, Web } from "@material-ui/icons";
function Footer() {
  return (
    <div className="footer-container">
      <section className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">Jonathan Chiang © 2021</small>
          <small className="website-rights">jmchiang5@gmail.com</small>
          <div className="website-rights" style={{display: 'flex', alignItems: 'center'}}>
            <small className="social-media" style={{marginRight: '5px'}}>
              Check out the project here!:  
            </small>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHub />
            </Link>
          </div>
          <div className="social-icons">
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHub />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Web"
            >
              <Web />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
