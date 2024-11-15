import React, { useState } from 'react';
import './JobDetails.css';
import wallpaper from './assets/wallpaper.jpg';

export default function JobDetails() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const members = [
    { name: 'John Doe', avatar: 'https://via.placeholder.com/30' },
    { name: 'Jane Smith', avatar: 'https://via.placeholder.com/30' },
    { name: 'Alice Brown', avatar: 'https://via.placeholder.com/30' },
    { name: 'Mark Davis', avatar: 'https://via.placeholder.com/30' }, // Extra member
  ];

  return (
    <div>
      {/* Background Image */}
      <img src={wallpaper} alt="Wallpaper" className="image" />

      {/* Main Container */}
      <div className="job-details-container">
        
        <div className="header">
          <h1>Title</h1>
         
        </div>
        <div className="inList">
         
          <h4>In List: Current Project</h4>
        </div>

        <div className="members-hedding">
        <h4>Members</h4> </div>
        {/* Members Section */}
        <div className="members">
          {members.slice(0, 3).map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt={member.name}
              className="member-avatar"
              title={member.name}
            />
          ))}
          {members.length > 3 && (
            <span className="extra-members">+{members.length - 3}</span>
          )}
        </div>

        {/* Description Section */}
        <div className="description-section">
          <h3>Description</h3>
          <textarea
            placeholder="Enter description here"
            className="description-textarea"
          ></textarea>
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
          <a href="#!" className="open-folder-link">
            Open folder in Google Drive
          </a>
        </div>

        {/* Comment Section */}
        <div className="comment-section">
          <h3>Add Comment</h3>
          <textarea
            placeholder="Add your comment"
            className="comment-textarea"
          ></textarea>
          <button>Add Comment</button>

          <div className="comment">
            <p>
              <strong>Z. Mariam</strong> <span>Today at 11:32 AM</span>
            </p>
            <p>Comment content goes here...</p>
          </div>
          <div className="comment">
            <p>
              <strong>Shafa</strong> <span>Today at 11:45 AM</span>
            </p>
            <p>Another comment here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
