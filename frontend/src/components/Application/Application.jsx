import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { FaPaperclip, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";

const Application = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coverLetter: "",
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    
    if (!formData.resume) {
      toast.error("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("coverLetter", formData.coverLetter);
    data.append("resume", formData.resume);
    data.append("jobId", id);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        coverLetter: "",
        resume: null
      });
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response?.data?.message || "Application failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
    return null;
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaFileAlt className="input-icon" />
            <textarea
              name="coverLetter"
              placeholder="Cover Letter..."
              value={formData.coverLetter}
              onChange={handleChange}
              required
            />
          </div>

          <div className="file-upload">
            <label>
              <FaPaperclip className="upload-icon" />
              <span>Upload Resume (PDF, DOC, JPG, PNG)</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
            </label>
            {formData.resume && (
              <div className="file-info">
                <span>{formData.resume.name}</span>
              </div>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;