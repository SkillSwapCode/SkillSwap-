'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/types/Service';
import ServiceCard from './ServiceCard';
import styles from '@/styles/SwipeContainer.module.css';

const swipeConfidenceThreshold = 15000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function SwipeContainer() {
  const [services, setServices] = useState<Service[]>([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data.reverse());
    };

    fetchServices();
  }, []);

  const paginate = (newDirection: number) => {
    setIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return 0;
      if (next >= services.length) return services.length - 1;
      return next;
    });
    setDirection(newDirection);
  };

  const handleDragEnd = (event: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    const swipe = swipePower(info.offset.y, info.velocity.y);

    if (swipe < -swipeConfidenceThreshold && index < services.length - 1) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold && index > 0) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute' as const,
      width: '100%',
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      position: 'relative' as const,
      width: '100%',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction > 0 ? -300 : 300,
      opacity: 0,
      position: 'absolute' as const,
      width: '100%',
    }),
  };

  return (
    <div className={styles.container} style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {services.length > 0 && (
          <motion.div
            key={services[index].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            style={{ cursor: 'grab', userSelect: 'none' }}
          >
            <ServiceCard service={services[index]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}