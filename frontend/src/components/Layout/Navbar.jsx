import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaSignOutAlt, FaHome, FaBriefcase, FaFileAlt, FaPlusCircle, FaRobot } from "react-icons/fa";
import { RiChatSmile2Fill } from "react-icons/ri";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setShow(false);
  }, [location.pathname]);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (show && !e.target.closest('.menu') && !e.target.closest('.hamburger')) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  if (!isAuthorized) return null;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/scholar.png" alt="logo" />
          </Link>
        </div>
        
        <ul className={`menu ${show ? 'show' : ''}`}>
          <NavItem 
            path="/" 
            icon={<FaHome />} 
            text="HOME" 
          />
          
          <NavItem 
            path="/job/getall" 
            icon={<FaBriefcase />} 
            text="ALL INTERNSHIPS" 
          />
          
          <NavItem 
            path="/applications/me" 
            icon={<FaFileAlt />} 
            text={user?.role === "Employer" ? "APPLICANTS" : "MY APPLICATIONS"} 
          />

          {user?.role === "Job Seeker" && (
            <NavItem 
              path="/Reviews" 
              icon={<RiChatSmile2Fill />} 
              text="REVIEWS" 
            />
          )}

          {user?.role === "Employer" && (
            <>
              <NavItem 
                path="/job/post" 
                icon={<FaPlusCircle />} 
                text="POST INTERNSHIP" 
              />
              <NavItem 
                path="/job/me" 
                icon={<FaBriefcase />} 
                text="MY INTERNSHIPS" 
              />
            </>
          )}

          <NavItem 
            path="/chat" 
            icon={<FaRobot />} 
            text="CHAT BOT" 
          />

          <li className="user-info">
            {user && (
              <div className="user-greeting">
                <FaUserCircle className="user-icon" />
                <span>Hi, {user.name.split(' ')[0]}</span>
              </div>
            )}
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> LOGOUT
            </button>
          </li>
        </ul>
        
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
          {show && <div className="overlay"></div>}
        </div>
      </div>
    </nav>
  );
};

// Reusable NavItem component
const NavItem = ({ path, icon, text }) => (
  <li>
    <Link to={path}>
      {icon}
      <span>{text}</span>
    </Link>
  </li>
);

export default Navbar;