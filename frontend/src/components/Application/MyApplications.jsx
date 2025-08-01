import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { FaTrash, FaEye, FaBriefcase, FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  
  // State management
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  // Fetch applications based on user role
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const endpoint = user.role === "Employer" 
          ? "/api/v1/application/employer/getall" 
          : "/api/v1/application/jobseeker/getall";
        
        const { data } = await axios.get(`http://localhost:4000${endpoint}`, {
          withCredentials: true,
        });
        
        setApplications(data.applications);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch applications");
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthorized, user?.role, navigateTo]);

  // Delete application handler
  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      
      toast.success(data.message);
      setApplications(prev => prev.filter(app => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  // Modal handlers
  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  if (!isAuthorized) {
    return null; // Already redirecting in useEffect
  }

  // Loading state
  if (loading) {
    return (
      <section className="my_applications page">
        <div className="container">
          <div className="loading-spinner">
            <ImSpinner8 className="spinner" />
            <p>Loading applications...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="my_applications page">
        <div className="container">
          <div className="error-message">
            <h3>Error loading applications</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>
          {user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
        </h1>
        
        {applications.length === 0 ? (
          <div className="no-applications">
            <h4>No applications found</h4>
            {user.role === "Job Seeker" && (
              <p>You haven't applied to any jobs yet.</p>
            )}
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map((application) => (
              user.role === "Job Seeker" ? (
                <JobSeekerCard
                  key={application._id}
                  application={application}
                  onDelete={deleteApplication}
                  onViewResume={openModal}
                />
              ) : (
                <EmployerCard
                  key={application._id}
                  application={application}
                  onViewResume={openModal}
                />
              )
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

// Job Seeker Card Component
const JobSeekerCard = ({ application, onDelete, onViewResume }) => {
  const { jobTitle, companyName, status, resume, createdAt } = application;
  
  return (
    <div className="application-card">
      <div className="card-header">
        <h3>{jobTitle}</h3>
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      </div>
      
      <div className="card-body">
        <div className="info-item">
          <FaBriefcase className="icon" />
          <span>{companyName}</span>
        </div>
        
        <div className="info-item">
          <FaCalendarAlt className="icon" />
          <span>Applied on: {new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="card-actions">
        <button 
          className="view-btn"
          onClick={() => onViewResume(resume.url)}
        >
          <FaEye /> View Resume
        </button>
        <button 
          className="delete-btn"
          onClick={() => onDelete(application._id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

// Employer Card Component
const EmployerCard = ({ application, onViewResume }) => {
  const { jobTitle, applicantName, email, phone, resume, status } = application;
  
  return (
    <div className="application-card">
      <div className="card-header">
        <h3>{jobTitle}</h3>
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      </div>
      
      <div className="card-body">
        <div className="info-item">
          <FaUser className="icon" />
          <span>{applicantName}</span>
        </div>
        
        <div className="info-item">
          <FaEnvelope className="icon" />
          <span>{email}</span>
        </div>
        
        {phone && (
          <div className="info-item">
            <FaPhone className="icon" />
            <span>{phone}</span>
          </div>
        )}
      </div>
      
      <div className="card-actions">
        <button 
          className="view-btn"
          onClick={() => onViewResume(resume.url)}
        >
          <FaEye /> View Resume
        </button>
      </div>
    </div>
  );
};

export default MyApplications;