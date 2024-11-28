import React from "react";
import "./ClientDetails.css";
import pic from '../assets/avatar.png';

const ClientDetails = ({ client }) => {
  return (
    <div className="client-container">
      <img
        src={pic}
        alt="Client Avatar"
        className="client-avatar"
      />
      <h2 className="client-name">{client.name}</h2>
      <p>
        <strong>ID:</strong> {client.id}
      </p>
      <p>
        <strong>Email:</strong> {client.email}
      </p>
      <p>
        <strong>Contact:</strong> {client.contact}
      </p>
    </div>
  );
};

export default ClientDetails;
