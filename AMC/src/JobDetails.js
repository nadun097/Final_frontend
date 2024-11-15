import React, { useState } from 'react';
import './JobDetails.css';
import wallpaper from './assets/wallpaper.jpg';

export default function JobDetails() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div>
     
      <img src={wallpaper} alt="Wallpaper" className="image" />

     
      <div className="job-details-container">
        
        {/* Header Section */}
        <div className="header">
          <h1>Title</h1>
        </div>
        <div className="listDetails">
          <h4>in list current project</h4>
        </div>

        {/* Sidebar Actions */}
        <div className="sidebar-actions">
  <h2>Add</h2>
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
    </div>
  );
}
