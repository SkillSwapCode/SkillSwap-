'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/types/Service';
import ServiceCard from './ServiceCard';
import styles from '@/styles/SwipeContainer.module.css';

export default function SwipeContainer() {
  const [services, setServices] = useState<Service[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data.reverse());
    };

    fetchServices();
  }, []);

  const handleTap = () => {
    if (index < services.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {services.length > 0 && (
          <motion.div
            key={services[index].id}
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleTap}
          >
            <ServiceCard service={services[index]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}