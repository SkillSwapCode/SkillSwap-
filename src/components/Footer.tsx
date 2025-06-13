'use client';

import Link from 'next/link';
import { FaPlusCircle, FaGripLines } from 'react-icons/fa';
import styles from '@/styles/Footer.module.css';
import WalletIconButton from './WalletIconButton';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Footer() {
  const pathname = usePathname();

  return (
    <motion.footer
      className={styles.footer}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        href="/create"
        className={`${styles.iconButton} ${pathname === '/create' ? styles.active : ''}`}
        aria-label="Create"
      >
        <FaPlusCircle size={28} />
      </Link>

      <Link
        href="/"
        className={`${styles.iconButton} ${styles.swipeButton} ${pathname === '/' ? styles.active : ''}`}
        aria-label="Swipe page"
      >
        <FaGripLines size={28} />
      </Link>

      <WalletIconButton />
    </motion.footer>
  );
}
