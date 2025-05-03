'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { Service } from '@/types/Service';
import styles from '@/styles/SwipeContainer.module.css';

const mockServices: Service[] = [
  {
    id: 1,
    user: '0xAbC...123',
    title: 'Code review for smart contracts',
    description: 'I will review your Solidity contract for bugs, gas optimization, and clarity.',
    price: 15,
    date: 'May 2',
    backgroundImage: '1.jpg',
  },
  {
    id: 2,
    user: '0xD3F...aaa',
    title: 'NFT collection cover design',
    description: 'Vector illustration in custom style. Great for PFP drops and art collections.',
    price: 20,
    date: 'May 1',
    backgroundImage: '2.jpg',
  },
  {
    id: 3,
    user: '0xEf7...77f',
    title: 'Go-to-market strategy for Web3',
    description: 'Marketing plan for your DeFi, GameFi, or NFT project. Let’s grow it!',
    price: 25,
    date: 'April 30',
    backgroundImage: '3.jpg',
  },
];

export default function SwipeContainer() {
  const [index, setIndex] = useState(0);

  const handleTap = () => {
    if (index < mockServices.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mockServices[index].id}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleTap}
        >
          <ServiceCard service={mockServices[index]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}