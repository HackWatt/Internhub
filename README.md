# Pre-filled Sample Credentials for Login

The deployed website includes pre-filled sample credentials for easy login and testing purposes.

https://intern-hub-frontend.vercel.app/

# InternHub

InternHub is a full-stack web application that serves as a portal for students and job seekers to apply for internships and for employers to post internship opportunities. The platform includes a user-friendly interface, secure authentication using JWT tokens, a review section for users to rate their internship experiences, and an integrated AI chatbot powered by Google Gemini AI to assist users with any queries.




https://github.com/user-attachments/assets/70d96559-b8a7-4e0c-90c8-55c17aeabe33





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



# Deployment on AWS EC2

### 1. Set Up  AWS EC2 Instance
   - `Launch Instance`.
**Choose an Operating System**:
   - Select a lightweight Ubuntu OS 
**Configure Instance Settings**:
   - Choose the instance type `t2.micro` (Free Tier eligible).

**Launch the Instance**:
   - Keep the remaining settings as default and click `Launch Instance`.

**Allocate and Associate an Elastic IP**

**Connect to  Instance**:

   - Opend terminal, navigate to  Downloads folder (where `.pem` file is located), and paste the SSH command.


**Update and Install Necessary Software**

**Install NVM and Update Node.js**:
   - Install NVM:
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
     ```
   - Load NVM:
     ```bash
     source ~/.bashrc
     ```
   - Install the desired Node.js version:
     ```bash
     nvm install 20.11.0
     ```
   - Use the installed Node.js version:
     ```bash
     nvm use 20.11.0
     ```

### 3. Deploy  MERN App

1. **Clone  GitHub Repository**:
   - Copy  repository URL from GitHub.
   - In the terminal connected to  EC2 instance, run:
     ```bash
     git clone <repo-url>
     ```
   - Navigate into your project directory:
     ```bash

 **Install Dependencies and Start the Backend**

2. **Build  Frontend**

### 4. Configure Security Groups and Final Steps

1. **Set Up Security Groups**:
   - Go back to the AWS EC2 dashboard.
   - Allow inbound traffic for HTTP (port 80), HTTPS (port 443), and any other necessary ports (like 3000 or 4000 for  app).





![backend-pic](https://github.com/user-attachments/assets/e3cf254c-a10b-41ab-88e1-08e59ecdc5ee)



![frontend-pic](https://github.com/user-attachments/assets/9068af6d-cb4f-45ba-8c3f-07e19b7b58e7)


   
