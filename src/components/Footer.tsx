'use client';

import Link from 'next/link';
import { FaPlusCircle, FaGripLines } from 'react-icons/fa';
import styles from '@/styles/Footer.module.css'
import WalletIconButton from './WalletIconButton';

export default function Footer() {

  return (
    <footer className={styles.footer}>
      <Link href="/create" className={styles.iconButton} aria-label="Create">
        <FaPlusCircle size={28} />
      </Link>

      <Link href="/swipe" className={`${styles.iconButton} ${styles.swipeButton}`} aria-label="Swipe page">
        <FaGripLines size={28} />
      </Link>

      <WalletIconButton />
    </footer>
  );
}