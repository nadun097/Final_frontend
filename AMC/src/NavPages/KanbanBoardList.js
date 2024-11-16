import React from "react";
import "./KanbanBoard.css"; // Make sure you have the CSS file in the same directory

export default function KanbanBoard() {
  const columns = [
    {
      title: "Pending",
      cards: [
        {
          title: "Task 5", // Task 5 is now at the top
          description: "This is the first pending task. This is the second pending task.",
          type: "low", // Define a type for dynamic styling
          employees: [
            { name: "Alice", avatar: "https://via.placeholder.com/32" },
            { name: "Bob", avatar: "https://via.placeholder.com/32" },
          ],
          image: "https://via.placeholder.com/150", // This card will have an image
        },
        {
          title: "Task 1", // Task 1 follows Task 5
          description: "This is the second pending task",
          type: "low", // Define a type for dynamic styling
          employees: [
            { name: "Alice", avatar: "https://via.placeholder.com/32" },
            { name: "Dave", avatar: "https://via.placeholder.com/32" },
            { name: "Dave", avatar: "https://via.placeholder.com/32" },
          ],
          image: null, // This card will not have an image
        },
      ],
    },
    {
      title: "Ongoing",
      cards: [
        {
          title: "Task 2",
          description: "This task is currently in progress.",
          type: "medium", // Define a type for dynamic styling
          employees: [
            { name: "Charlie", avatar: "https://via.placeholder.com/32" },
          ],
          image: "https://via.placeholder.com/150", // This card will have an image
        },
      ],
    },
    {
      title: "Accomplished",
      cards: [
        {
          title: "Task 3",
          description: "This task has been completed.",
          type: "high", // Define a type for dynamic styling
          employees: [
            { name: "Eve", avatar: "https://via.placeholder.com/32" },
            { name: "Frank", avatar: "https://via.placeholder.com/32" },
            { name: "Dave", avatar: "https://via.placeholder.com/32" },
          ],
          image: null, // This card will not have an image
        },
      ],
    },
    {
      title: "Expired",
      cards: [
        {
          title: "Task 4",
          description: "This task is expired.",
          type: "expired", // Define a type for dynamic styling
          employees: [
            { name: "Grace", avatar: "https://via.placeholder.com/32" },
            { name: "Heidi", avatar: "https://via.placeholder.com/32" },
          ],
          image: "https://via.placeholder.com/150", // This card will have an image
        },
      ],
    },
  ];

  return (
    <div className="kanban-container">
      <div className="kanban-board">
        {columns.map((column, index) => (
          <div key={index} className="kanban-column">
            <h3>{column.title}</h3>
            {column.cards.map((card, cardIndex) => (
              <div
                key={cardIndex}
                className={`kanban-card ${card.type}-card`} // Dynamic class based on type
              >
                {card.image && ( // Conditionally render the image section
                  <div className="card-image">
                    <img
                      src={card.image}
                      alt={card.title}
                    />
                  </div>
                )}
                <div className="card-content">
                  <div className="card-title">{card.title}</div>
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
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
