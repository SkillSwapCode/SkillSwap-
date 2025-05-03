import React, { useState } from 'react';
import styles from '@/styles/ServiceCard.module.css';
import { Service } from '@/types/Service';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{service.title}</div>
        <div className={styles.cardDate}>{service.date}</div>
      </div>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${service.backgroundImage})` }}
      >
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.cardBody}>
        <p>{service.description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.price}>${service.price}</span>
          <button className={styles.orderButton} onClick={openModal}>
            Order
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Order Details</h2>
            <p><strong>Title:</strong> {service.title}</p>
            <p><strong>Description:</strong> {service.description}</p>
            <p><strong>Price:</strong> ${service.price}</p>
            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.closeButton}>Close</button>
              <button className={styles.confirmButton}>Confirm Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;