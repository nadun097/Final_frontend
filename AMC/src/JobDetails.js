import React, { useState } from "react";
import "./JobDetails.css";
import wallpaper from "./assets/wallpaper.jpg";
import icon1 from "./icon/Rounded Rectangle 1.png";
import icon2 from "./icon/2991248.png";
import icon3 from "./icon/icons8-member-96(3).png";
import icon4 from "./icon/icons8-tags-96.png";
import icon5 from "./icon/icons8-clock-96.png";
import icon6 from "./icon/icons8-attachment-90.png";
import icon7 from "./icon/icons8-check-box-96.png";

export default function JobDetails() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const members = [
    { name: "John Doe", avatar: "https://via.placeholder.com/30" },
    { name: "Jane Smith", avatar: "https://via.placeholder.com/30" },
    { name: "Alice Brown", avatar: "https://via.placeholder.com/30" },
    { name: "Mark Davis", avatar: "https://via.placeholder.com/30" }, // Extra member
  ];
  const [comments, setComments] = useState([
    {
      name: "Z. Mariam",
      time: "Today at 11:32 AM",
      text: "Comment content goes here...",
      avatar: "https://via.placeholder.com/30",
    },
    {
      name: "Shafa",
      time: "Today at 11:45 AM",
      text: "Another comment here...",
      avatar: "https://via.placeholder.com/30",
    },
  ]);
  return (
    <div>
      {/* Background Image */}
      <img src={wallpaper} alt="Wallpaper" className="image" />

      <div className="job-details-container">
        <div className="iconAlingn">
          <img src={icon1} alt="Icon" className="icon" />
          <div className="header">
            <h1>Test Title</h1>
          </div>
        </div>
        <div className="inList">
          <h4>In List: Current Project</h4>
        </div>

        <div className="members-hedding">
          <h4>Members</h4>{" "}
        </div>
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
          <button onClick={() => toggleDropdown("members")}>
            <img src={icon3} alt="Icon" className="icon2" /> Members
          </button>
          {openDropdown === "members" && (
            <div className="dropdown-content">Member details go here.</div>
          )}

          <button onClick={() => toggleDropdown("labels")}>
            <img src={icon4} alt="Icon" className="icon2" /> Labels
          </button>
          {openDropdown === "labels" && (
            <div className="dropdown-content">Label details go here.</div>
          )}

          <button onClick={() => toggleDropdown("checklist")}>
            <img src={icon7} alt="Icon" className="icon2" /> Checklist
          </button>
          {openDropdown === "checklist" && (
            <div className="dropdown-content">Checklist details go here.</div>
          )}

          <button onClick={() => toggleDropdown("dueDate")}>
            <img src={icon5} alt="Icon" className="icon2" /> Due Date
          </button>
          {openDropdown === "dueDate" && (
            <div className="dropdown-content">Due Date details go here.</div>
          )}

          <button onClick={() => toggleDropdown("attachment")}>
            <img src={icon6} alt="Icon" className="icon2" /> Attachment
          </button>
          {openDropdown === "attachment" && (
            <div className="dropdown-content">Attachment details go here.</div>
          )}
        </div>

        {/* Asset Section */}
        <div className="asset-section">
          <h2>
            <img src={icon2} alt="Icon" className="icon" /> Website Redesign
            Assets
          </h2>
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
          <div>
            <button>Add Comment</button>
          </div>

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
