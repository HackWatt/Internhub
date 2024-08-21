# InterHub

InternHub is a full-stack web application that serves as a portal for students and job seekers to apply for internships and for employers to post internship opportunities. The platform includes a user-friendly interface, secure authentication using JWT tokens, a review section for users to rate their internship experiences, and an integrated AI chatbot powered by Google Gemini AI to assist users with any queries.

## Features

- **User Authentication**: Secure login and registration using JWT tokens and password encryption with bcrypt.
- **Internship Listings**: Employers can post internships, and job seekers can apply for them.
- **Application Management**: Employers can review and select applicants for their posted internships.
- **Reviews Section**: Job seekers can rate and review their internship experiences at different companies.
- **Chatbot**: An AI-powered chatbot using Google Gemini AI to assist users with common questions and needs.
- **Responsive Design**: The application is responsive and user-friendly.

## Technologies Used

- **Frontend**: React, React Router, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token), bcrypt
- **File Uploads**: express-fileupload
- **Environment Variables**: dotenv
- **CORS**: CORS configuration to allow cross-origin requests
- **AI Chatbot**: Google Gemini AI API
- **Deployment**: Backend hosted on Vercel, frontend managed with React

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/internhub.git

2. Navigate to the project directory:

   cd internhub

3. Install dependencies for both the frontend and backend:

npm install

4. Create a .env file in the root directory and add your environment variables:
MONGO_URI=your_mongo_uri
JWT_SECRET_KEY=your_jwt_secret_key
COOKIE_EXPIRE=number_of_days_cookie_expires
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
CLOUDINARY_CLIENT_NAME 
CLOUDINARY_CLIENT_API 
CLOUDINARY_CLIENT_SECRET

## Usage

- **User Registration and Login**: Users can register and log in securely.
- **Posting Internships**: Employers can post new internships that are visible to all users.
- **Applying for Internships**: Job seekers can browse and apply for internships.
- **Managing Applications**: Employers can view applications for their posted internships and select suitable candidates.
- **Adding Reviews**: Users can review their internship experiences to help others make informed decisions.
- **Chatbot**: Use the AI chatbot to get help with any queries or issues.



   
