import React from "react";
import { useNavigate } from "react-router-dom";
import "./KanbanBoard.css";

export default function KanbanBoard() {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Pending",
      cards: [
        {
          title: "Task 1",
          description: "This task is waiting to be assigned.",
          type: "low",
          employees: [
            { name: "Alice", avatar: "https://via.placeholder.com/32" },
            { name: "Bob", avatar: "https://via.placeholder.com/32" },
          ],
          image: null,
        },
        {
          title: "Task 2",
          description: "Pending approval from the manager.",
          type: "medium",
          employees: [
            { name: "Charlie", avatar: "https://via.placeholder.com/32" },
          ],
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      title: "Ongoing",
      cards: [
        {
          title: "Task 3",
          description: "This task is currently being worked on by the team.",
          type: "high",
          employees: [
            { name: "Eve", avatar: "https://via.placeholder.com/32" },
            { name: "Frank", avatar: "https://via.placeholder.com/32" },
          ],
          image: null,
        },
        {
          title: "Task 4",
          description: "Development in progress for the new feature.",
          type: "medium",
          employees: [
            { name: "Grace", avatar: "https://via.placeholder.com/32" },
          ],
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      title: "Accomplished",
      cards: [
        {
          title: "Task 5",
          description: "The bug fixes for the latest release are complete.",
          type: "medium",
          employees: [
            { name: "Heidi", avatar: "https://via.placeholder.com/32" },
            { name: "Ivan", avatar: "https://via.placeholder.com/32" },
          ],
          image: null,
        },
        {
          title: "Task 6",
          description: "Feature deployment completed successfully.",
          type: "low",
          employees: [
            { name: "Judy", avatar: "https://via.placeholder.com/32" },
          ],
          image: null,
        },
      ],
    },
    {
      title: "Expired",
      cards: [
        {
          title: "Task 7",
          description: "This task exceeded the deadline.",
          type: "expired",
          employees: [
            { name: "Mallory", avatar: "https://via.placeholder.com/32" },
            { name: "Nina", avatar: "https://via.placeholder.com/32" },
          ],
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Task 8",
          description: "Project timeline missed due to unforeseen delays.",
          type: "expired",
          employees: [
            { name: "Oscar", avatar: "https://via.placeholder.com/32" },
          ],
          image: null,
        },
      ],
    },
  ];

  const getBarColor = (type) => {
    switch (type) {
      case "low":
        return "#FFD700"; // Gold
      case "medium":
        return "#1E90FF"; // DodgerBlue
      case "high":
        return "#FF4500"; // OrangeRed
      case "expired":
        return "#DC143C"; // Crimson
      default:
        return "#74ffb3"; // Default light green
    }
  };

  return (
    <div className="kanban-container">
      <div className="kanban-board">
        {columns.map((column, index) => (
          <div key={index} className="kanban-column">
            <h3>{column.title}</h3>
            {column.cards.map((card, cardIndex) => (
              <div
                key={cardIndex}
                className={`kanban-card ${card.type}-card`}
              >
                {card.image && (
                  <div className="card-image">
                    <img src={card.image} alt={card.title} />
                  </div>
                )}
                <div className="card-content">
                  <div className="card-title">{card.title}</div>
                  <div className="card-bars">
                    <div
                      className="card-bar"
                      style={{ backgroundColor: getBarColor(card.type) }}
                    ></div>
                  </div>
                  <div className="card-description">{card.description}</div>
                </div>
                <div className="card-footer">
                  <div className="employee-avatars">
                    {card.employees.slice(0, 3).map((employee, empIndex) => (
                      <img
                        key={empIndex}
                        src={employee.avatar}
                        alt={employee.name}
                        className="employee-avatar"
                        title={employee.name}
                      />
                    ))}
                    {card.employees.length > 3 && (
                      <div className="extra-employees">
                        +{card.employees.length - 3}
                      </div>
                    )}
                  </div>
                  <button
                    className="job-details-button"
                    onClick={() =>
                      navigate("/job-details", {
                        state: { job: card }, 
                      })
                    }
                    style={{
                      marginTop: "5px",
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#6885fc",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    View Job Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
