// src/components/ServiceCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const ServiceCard: React.FC<Props> = ({ title, description, link, icon }) => {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>
      <h4 className="service-title">{title}</h4>
      <p className="service-description">{description}</p>
      <Link to={link} className="service-link">
        Learn More
      </Link>
    </div>
  );
};

export default ServiceCard;
