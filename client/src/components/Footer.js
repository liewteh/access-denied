import React from "react";
import "./Footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-p">
        <p>Copyright&copy; CodeYourFuture</p>
      </div>
      <div className="footer-icons">
        <FacebookIcon />
        <GitHubIcon />
        <TwitterIcon />
      </div>
    </div>
  );
};

export default Footer;
