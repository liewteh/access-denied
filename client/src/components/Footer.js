import React from 'react'
import './Footer.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
    return (
        <div className="footer">

          <div className="footer-p">
            <p >Copyright&copy; CodeYourFuture</p>
          </div>
          <div className="footer-icons">  
            <FacebookIcon onClick={() => window.open( 'https://www.facebook.com/codeyourfuture.io/', "_blank")} />
            <GitHubIcon onClick={() => window.open( 'https://github.com/CodeYourFuture', "_blank")} />
            <InstagramIcon onClick={() => window.open( 'https://www.instagram.com/codeyourfuture_/?hl=en', "_blank")}/>
          </div>
        </div>
    )
}

export default Footer
