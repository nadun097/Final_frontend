import React, { useState } from 'react';
import './JobDetails.css';
import headerImage from './assets/81d4cd7e8403cf590a0e78f60c2553a.jpg';

export default function JobDetails() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="job-details-container">
      {/* Header Image */}
      <img
        src="./assets/8d14cdd7e8403cf509a0e78f60c2535a.jpg" // Replace with your image URL
        alt="Header"
        className="header-image"
      />

      {/* Header Section */}
      <div className="header">
        <h1>Title</h1>
        <div className="project-info">in list Current Project</div>
        <div className="members"></div>
      </div>

      {/* Sidebar Actions */}
      <div className="sidebar-actions">
        <button onClick={() => toggleDropdown('members')}>Members</button>
        {openDropdown === 'members' && (
          <div className="dropdown-content">Member details go here.</div>
        )}
        
        <button onClick={() => toggleDropdown('labels')}>Labels</button>
        {openDropdown === 'labels' && (
          <div className="dropdown-content">Label details go here.</div>
        )}

        <button onClick={() => toggleDropdown('checklist')}>Checklist</button>
        {openDropdown === 'checklist' && (
          <div className="dropdown-content">Checklist details go here.</div>
        )}

        <button onClick={() => toggleDropdown('dueDate')}>Due Date</button>
        {openDropdown === 'dueDate' && (
          <div className="dropdown-content">Due Date details go here.</div>
        )}

        <button onClick={() => toggleDropdown('attachment')}>Attachment</button>
        {openDropdown === 'attachment' && (
          <div className="dropdown-content">Attachment details go here.</div>
        )}
      </div>

      {/* Asset Section */}
      <div className="asset-section">
        <h2>Website Redesign Assets</h2>
        <div className="asset-thumbnails">
          <img src="https://via.placeholder.com/150" alt="Asset 1" />
          <img src="https://via.placeholder.com/150" alt="Asset 2" />
          <img src="https://via.placeholder.com/150" alt="Asset 3" />
        </div>
        <a href="#!" className="open-folder-link">Open folder in Google Drive</a>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h3>Description</h3>
        <textarea placeholder="Enter description here"></textarea>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h3>Add Comment</h3>
        <textarea placeholder="Add your comment"></textarea>
        <button>Add Comment</button>

        <div className="comment">
          <p><strong>Z. Mariam</strong> <span>Today at 11:32 AM</span></p>
          <p>Comment content goes here...</p>
        </div>
        <div className="comment">
          <p><strong>Shafa</strong> <span>Today at 11:45 AM</span></p>
          <p>Another comment here...</p>
        </div>
      </div>
    </div>
  );
}
