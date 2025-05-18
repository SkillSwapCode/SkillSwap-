import React, { useState } from 'react';
import styles from '@/styles/ServiceCard.module.css';
import { Service } from '@/types/Service';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wallet = useWallet();


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const YOUR_WALLET_ADDRESS = '969AsGFCHevB5EzYmuoDfwMPn6Xo4gnkDiFUPMZzv3qs';

  const handleOrder = async (price: number) => {
    try {
      const connection = new Connection('https://api.devnet.solana.com');
      const { blockhash } = await connection.getLatestBlockhash();

      if (!wallet.publicKey || !wallet.signTransaction) {
        alert('Please connect your wallet');
        return;
      }

      const recipientPubKey = new PublicKey(YOUR_WALLET_ADDRESS);

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: wallet.publicKey
      }).add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recipientPubKey,
          lamports: price * 1e9 
        })
      );


      const signed = await wallet.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(txid);

      alert('Payment successful!');
    } catch (err) {
      console.error(err);
      alert('Transaction failed');
    }
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
              <button className={styles.confirmButton} onClick={() => handleOrder(service.price)}>Confirm Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;