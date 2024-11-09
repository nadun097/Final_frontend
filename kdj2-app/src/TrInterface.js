import React, { useState } from 'react';
import './KanbanBoard.css';

export default function KanbanBoard() {
  const [columns, setColumns] = useState([
 
  ]);
  
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    image: '',
    employees: []
  });
  const [employeeName, setEmployeeName] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleAddJob = (columnIndex) => {
    setSelectedColumn(columnIndex);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageInputChange = (e) => {
    const { value } = e.target;
    const isValidURL = value.match(/\.(jpeg|jpg|gif|png)$/) != null;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      image: isValidURL ? value : '',
    }));
  };

  const handleAddEmployee = () => {
    if (employeeName.trim() === '') return;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      employees: [...prevDetails.employees, { name: employeeName, avatar: 'https://via.placeholder.com/30' }]
    }));
    setEmployeeName('');
  };

  const handleSubmit = () => {
    const newCard = {
      ...jobDetails,
      image: jobDetails.image || 'https://via.placeholder.com/150',
    };
    const updatedColumns = columns.map((col, index) =>
      index === selectedColumn ? { ...col, cards: [...col.cards, newCard] } : col
    );
    setColumns(updatedColumns);
    setShowModal(false);
    setJobDetails({ title: '', description: '', image: '', employees: [] });
  };

  const handleCancel = () => {
    setShowModal(false);
    setJobDetails({ title: '', description: '', image: '', employees: [] });
    setEmployeeName('');
  };

  return (
    <div className="kanban-container">
      <div className="add-list-container">
        <input
          type="text"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          placeholder="Enter list title"
        />
        <button onClick={() => {
          setColumns([...columns, { title: newColumnTitle, cards: [] }]);
          setNewColumnTitle('');
        }}>Add List</button>
      </div>

      <div className="kanban-board">
        {columns.map((column, index) => (
          <div key={index} className="kanban-column">
            <h3>{column.title}</h3>
            {column.cards.map((card, cardIndex) => (
              <div key={cardIndex} className="kanban-card">
                <div className="card-image">
                  <img src={card.image} alt={`${card.title} visual`} />
                </div>
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
            <button className="add-card" onClick={() => handleAddJob(index)}>+ Add a job</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Job Details</h2>
            <label>Enter job title</label>
            <input type="text" name="title" value={jobDetails.title} onChange={handleInputChange} />
            <label>Enter job description</label>
            <textarea name="description" value={jobDetails.description} onChange={handleInputChange}></textarea>
            <label>Upload photo URL</label>
            <input type="text" name="image" value={jobDetails.image} onChange={handleImageInputChange} />

            <label>Enter Workers in this project</label>
            <div className="employee-input">
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Enter employee name"
              />
              <button onClick={handleAddEmployee}>Add Employee</button>
            </div>
            <div className="employee-avatars">
              {jobDetails.employees.map((employee, empIndex) => (
                <img
                  key={empIndex}
                  src={employee.avatar}
                  alt={employee.name}
                  className="employee-avatar"
                  title={employee.name}
                />
              ))}
            </div>

            <button onClick={handleSubmit}>Save Job</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
