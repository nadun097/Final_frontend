// import React, { useState } from "react";
// import NavigationBar from "./NavigationBar";
// import axios from "axios";
// import "./Feedback.css"; // Link to the CSS file

// const FeedbackPage = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/feedback", {
//         companyName,
//         feedback,
//       });
//       setMessage("Feedback submitted successfully!");
//       setCompanyName("");
//       setFeedback("");
//     } catch (error) {
//       setMessage("Failed to submit feedback. Please try again.");
//     }
//   };

//   return (
//     <>
//       <NavigationBar />
//       <div className="feedback-container">
//         <h2>Submit Your Feedback</h2>
//         <form onSubmit={handleSubmit} className="feedback-form">
//           <div className="form-group">
//             <label>Company Name:</label>
//             <input
//               type="text"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               required
//               className="input-field"
//             />
//           </div>
//           <div className="form-group">
//             <label>Feedback:</label>
//             <textarea
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               required
//               className="input-field"
//             />
//           </div>
//           <button type="submit" className="submit-button">
//             Submit Feedback
//           </button>
//         </form>
//         {message && <p className="response-message">{message}</p>}
//       </div>
//     </>
//   );
// };

// export default FeedbackPage;


import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios";
import "./Feedback.css"; // Link to the CSS file

const FeedbackPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/feedback", {
        companyName,
        feedback,
      });
      setMessage("Feedback submitted successfully!");
      setCompanyName("");
      setFeedback("");
    } catch (error) {
      setMessage("Failed to submit feedback. Please try again.");
    }
  };

  

  return (
    <>
      <NavigationBar />
      <div className="feedback-container">
        <h2>Submit Your Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submitf-button">
            Submit Feedback
          </button>
           {/* Backlink with arrow */}
        <a href="/" className="backlink">
          <i className="fas fa-arrow-left"></i> Back to Landing Page
        </a>
        </form>
        {message && <p className="response-message">{message}</p>}
        
      </div>
    </>
  );
};

export default FeedbackPage;
