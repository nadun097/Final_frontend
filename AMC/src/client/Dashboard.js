import React, { useState, useEffect } from "react";
import Header from "./Header2";
import ClientDetails from "./ClientDetails";
import CompanyDetails from "./CompanyDetails";
import ProjectDetails from "./ProjectDetails";
import "./Dashboard.css";

const Dashboard = () => {
  const [clientData, setClientData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchClientData = () => ({
      id: "C123",
      name: "Dua Lipa",
      contact: "+123456789",
      email: "dua.lipa@example.com",
     
    });

    const fetchCompanyData = () => ({
      name: "ABC Software Solutions",
      email: "info@abcsoftware.com",
      phone: "+987654321",
      address: "123 Tech Park, Silicon Valley, CA",
      projects: [
        {
          name: "Project Alpha",
          description: "A web application redesign project.",
          startDate: "2023-01-01",
          endDate: "2023-12-31",
        },
        {
          name: "Project Beta",
          description: "A mobile app development project.",
          startDate: "2023-06-01",
          endDate: "2024-06-01",
        },
      ],
    });

    const client = fetchClientData();
    setClientData(client);

    const company = fetchCompanyData();
    setCompanyData(company);
  }, []);

  if (!clientData || !companyData) {
    return <div>Loading...</div>;
  }

  if (selectedProject) {
    return (
      <div>
        <Header />
        <ProjectDetails
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="left-panel">
          <ClientDetails client={clientData} />
        </div>
        <div className="right-panel">
          <CompanyDetails
            company={companyData}
            onProjectClick={setSelectedProject}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
