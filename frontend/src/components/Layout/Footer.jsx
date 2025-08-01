import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { 
  FaFacebookF, 
  FaYoutube, 
  FaLinkedin, 
  FaGithub,
  FaHeart
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  
  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/subham-nayak-00276930b",
      label: "LinkedIn Profile"
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/Shubham-cyber-prog",
      label: "GitHub Profile"
    },
    {
      icon: <RiInstagramFill />,
      url: "https://www.instagram.com/your_username",
      label: "Instagram Profile"
    },
    {
      icon: <SiGmail />,
      url: "mailto:shubhamnayak2003@gmail.com",
      label: "Email Us"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isAuthorized) return null;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/about" onClick={scrollToTop}>About</Link></li>
            <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
            <li><Link to="/privacy" onClick={scrollToTop}>Privacy Policy</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>Email: shubhamnayak2003@gmail.com</li>
            <li>Phone: +91 1234567890</li>
            <li>Address: Bhubaneswar, Odisha, India</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} HackWatt. All Rights Reserved. 
          Made with <FaHeart className="heart-icon" /> in India
        </p>
      </div>
    </footer>
  );
};

export default Footer;