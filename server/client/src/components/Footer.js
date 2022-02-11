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
              to="https://github.com/jmchiang1/NetflixClone"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHub />
            </Link>
          </div>
          <div className="social-icons">
            <Link
              className="social-icon-link twitter"
              to="https://www.facebook.com/jonamon.chiang/"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="https://www.linkedin.com/in/jmchiang5/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="https://github.com/jmchiang1"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHub />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="https://jonathanchiang.com/"
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
