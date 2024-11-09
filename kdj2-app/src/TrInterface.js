import React, { useState } from 'react';
import './KanbanBoard.css';

export default function KanbanBoard() {
  const [columns, setColumns] = useState([
    { 
      title: 'Pending', 
      cards: [
        {
          title: 'Design Website',
          description: 'Create initial design mockups for the client.',
          image: 'https://via.placeholder.com/150',
          employees: [
            { name: 'Alice', avatar: 'https://via.placeholder.com/30' },
            { name: 'Bob', avatar: 'https://via.placeholder.com/30' },
            { name: 'Charlie', avatar: 'https://via.placeholder.com/30' }
          ]
        },
      ]
    },
    { 
      title: 'Ongoing', 
      cards: [
        {
          title: 'Develop Landing Page',
          description: 'Code the landing page using React and CSS.',
          image: 'https://via.placeholder.com/150',
          employees: [
            { name: 'David', avatar: 'https://via.placeholder.com/30' },
            { name: 'Eva', avatar: 'https://via.placeholder.com/30' }
          ]
        },
      ]
    },
    { title: 'Accomplished', cards: [] },
    { title: 'Expired', cards: [] },
  ]);

  const [newColumnTitle, setNewColumnTitle] = useState('');

  // Add a new column
  const handleAddColumn = () => {
    if (newColumnTitle.trim() === '') return;
    setColumns([...columns, { title: newColumnTitle, cards: [] }]);
    setNewColumnTitle('');
  };

  // Add a new job (card) to a specific column
  const handleAddJob = (columnIndex) => {
    const newJobTitle = prompt('Enter job title');
    const newJobDescription = prompt('Enter job description');
    if (newJobTitle && newJobDescription) {
      const newCard = {
        title: newJobTitle,
        description: newJobDescription,
        image: 'https://via.placeholder.com/150',
        employees: [],
      };
      const updatedColumns = columns.map((col, index) => 
        index === columnIndex ? { ...col, cards: [...col.cards, newCard] } : col
      );
      setColumns(updatedColumns);
    }
  };

  return (
    <div className="kanban-container">
      {/* Top right corner for adding a new list */}
      <div className="add-list-container">
        <input
          type="text"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          placeholder="Enter list title"
        />
        <button onClick={handleAddColumn}>Add List</button>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {columns.map((column, index) => (
          <div key={index} className="kanban-column">
            <h3>{column.title}</h3>
            {column.cards.map((card, cardIndex) => (
              <div key={cardIndex} className="kanban-card">
                {/* Card Image */}
                <div className="card-image">
                  <img src={card.image} alt={`${card.title} visual`} />
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <div className="card-title">{card.title}</div>
                  <div className="card-description">{card.description}</div>
                </div>

                {/* Card Footer with Employee Avatars */}
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
                  </div>
                </div>
              </div>
            ))}
            <button className="add-card" onClick={() => handleAddJob(index)}>+ Add a job</button>
          </div>
        ))}
      </div>
    </div>
  );
}
