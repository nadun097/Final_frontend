// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // Components
// import Header from "./component/Header";
// import Header2 from "./client/Header2";
// import PasswordReset  from  "./component/PasswordReset";
// import AMCnavbar from "./component/AMCnavbar";
// import Login from "./NavPages/Login";
// import Home from "./NavPages/Home";
// import KanbanBoardList from "./NavPages/KanbanBoardList";
// import Invoice from "./NavPages/Invoice";
// import AddUser from "./NavPages/AddUser";
// import AddAMC from "./NavPages/AddAMC";
// import JobDetails from "./NavPages/JobDetails";
// import Dashboard from "./client/Dashboard"; // Ensure correct path
// import VerifyCode from "./component/VerifyCode";
// import LandingPage from "./LandingPage";
// import ForgotPassword from "./component/ForgotPassword";


// // Reports
// import FullAmcs from "./NavbarReports/FullAmc.js";
// import AmcPayments from "./NavbarReports/AmcPayment.js";
// import ClientWiseAmcs from "./NavbarReports/ClientWiseAmcs.js";
// import AmcClientDetails from "./NavbarReports/AmcClientDetails.js";
// import RenewalAmcs from "./NavbarReports/RenewalAmcs.js";
// import ScheduledAmcs from "./NavbarReports/ScheduledAmcs.js";

// import InvoiceDetails from "./NavPages/InvoiceDetails"; // Add this if the file exists
// import ProjectDetails from "./NavPages/ProjectDetails"; // Add this if the file exists
// import FeedbackPage from "./NavPages/FeedbackPage";     // Add this if the file exists



// // Dummy components for reports
// const FullAmc = () => <div>{<FullAmcs />}</div>;
// const AmcPayment = () => <div>{<AmcPayments />}</div>;
// const ClientWiseAmc = () => <div>{<ClientWiseAmcs />}</div>;
// const AmcClientDetail = () => <div>{<AmcClientDetails />}</div>;
// const RenewalAmc = () => <div>{<RenewalAmcs />}</div>;
// const ScheduledAmc = () => <div>{<ScheduledAmcs />}</div>;

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/verify-code" element={<VerifyCode />} />
//           <Route path="/password-reset" element={<PasswordReset />} />
//           <Route path="/home" element={<><Header /><Home /></>} />
//           <Route path="/project" element={<><Header /><KanbanBoardList /></>} />
//           <Route path="/job-details" element={<JobDetails />} />
//           <Route path="/invoice" element={<><Header /><Invoice /></>} />
//           <Route path="/invoiceDetails/:amcId" element={<><Header/><InvoiceDetails /></>} />
//           <Route path="/adduser" element={<><Header /><AddUser /></>} />
//           <Route path="/addAmc" element={<><Header /><AddAMC /></>} />
//           <Route path="/ProjectDetail" element={<Dashboard />} />
//           <Route
//             path="/project-details/:contractName"
//             element={<ProjectDetails />}
//           />

//           <Route path="/feedback" element={<FeedbackPage />} />
          
//           {/* Nested Routes for Report Section */}
//           <Route
//             path="/report/*"
//             element={
//               <>
//                 <Header />
//                 <AMCnavbar />
//                 <Routes>
//                   <Route path="/" element={<FullAmc />} />
//                   <Route path="fullAmc" element={<FullAmc />} />
//                   <Route path="amcPayment" element={<AmcPayment />} />
//                   <Route path="clientWiseAmc" element={<ClientWiseAmc />} />
//                   <Route path="amcClientDetails" element={<AmcClientDetail />} />
//                   <Route path="renewalAmcs" element={<RenewalAmc />} />
//                   <Route path="scheduledAmc" element={<ScheduledAmc />} />
//                 </Routes>
//               </>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import "./App.css";
import Header from "./component/Header";
import Home from "./NavPages/Home";
import KanbanBoardList from "./NavPages/KanbanBoardList";
import Invoice from "./NavPages/Invoice";
import AddUser from "./NavPages/AddUser";
import AddAMC from "./NavPages/AddAMC";
import AMCnavbar from "./component/AMCnavbar";
import Login from "./NavPages/Login";
import JobDetails from "./NavPages/JobDetails";
import Dashboard from "./client/Dashboard";
import ProjectDetails from "./client/ProjectDetails";
import NavigationBar from "./client/NavigationBar";
import FeedbackPage from "./client/FeedbackPage";
import InvoiceDetails from "./NavPages/InvoiceDetails";
import VerifyCode from "./component/VerifyCode";
import LandingPage from "./LandingPage";

import ForgotPassword from "./component/ForgotPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PasswordReset  from  "./component/PasswordReset";
import FullAmcs from "./NavbarReports/FullAmc.js";
import AmcPayments from "./NavbarReports/AmcPayment.js";
import ClientWiseAmcs from "./NavbarReports/ClientWiseAmcs.js";
import AmcClientDetails from "./NavbarReports/AmcClientDetails.js";
import RenewalAmcs from "./NavbarReports/RenewalAmcs.js";
import ScheduledAmcs from "./NavbarReports/ScheduledAmcs.js";

// Dummy components for individual pages
const FullAmc = () => <div>{<FullAmcs />}</div>;
const AmcPayment = () => <div>{<AmcPayments />}</div>;
const ClientWiseAmc = () => <div>{<ClientWiseAmcs />}</div>;
const AmcClientDetail = () => <div>{<AmcClientDetails />}</div>;
const RenewalAmc = () => <div>{<RenewalAmcs />}</div>;
const ScheduledAmc = () => <div>{<ScheduledAmcs />}</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/password-reset" element={<PasswordReset />} /> 
          <Route path="/home" element={<><Header /><Home /></>} />
          <Route path="/project" element={<><Header /><KanbanBoardList /></>} />
          <Route path="/job-details" element={<JobDetails />} />
          <Route path="/invoice" element={<><Header /><Invoice /></>} />
          <Route path="/invoiceDetails/:amcId" element={<><Header/><InvoiceDetails /></>} />
          <Route path="/adduser" element={<><Header /><AddUser /></>} />
          <Route path="/addAmc" element={<><Header /><AddAMC /></>} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route
            path="/project-details/:contractName"
            element={<ProjectDetails />}
          />

          <Route path="/feedback" element={<FeedbackPage />} />

      
         

          {/* Nested Routes for Report Section */}
          <Route
            path="/report/*"
            element={
              <>
                <Header />
                <AMCnavbar />
                <Routes>
                <Route path="/" element={<FullAmc />} />
                  <Route path="fullAmc" element={<FullAmc />} />
                  <Route path="amcPayment" element={<AmcPayment />} />
                  <Route path="clientWiseAmc" element={<ClientWiseAmc />} />
                  <Route path="amcClientDetails" element={<AmcClientDetail />} />
                  <Route path="renewalAmcs" element={<RenewalAmc />} />
                  <Route path="scheduledAmc" element={<ScheduledAmc />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
