import React from 'react'
import './Footer.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const Footer = () => {
    return (
        <div className="footer">

          <div className="footer-p">
            <p >Copyright&copy; CodeYourFuture</p>
          </div>
          <div className="footer-icons">  
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </div>
        </div>
    )
}

export default Footer
