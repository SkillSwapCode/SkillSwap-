'use client';

import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FaPlusCircle, FaCheckCircle, FaGripLines } from 'react-icons/fa';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  const { connected } = useWallet();

  return (
    <footer className={styles.footer}>
      <Link href="/create" className={styles.iconButton} aria-label="Create">
        <FaPlusCircle size={28} />
      </Link>

      <Link href="/swipe" className={`${styles.iconButton} ${styles.swipeButton}`} aria-label="Swipe page">
        <FaGripLines size={28} />
      </Link>

      <div className={styles.walletButtonWrapper}>
        <WalletMultiButton className={styles.walletButton} />
        {connected && <FaCheckCircle className={styles.connectedIcon} size={18} />}
      </div>
    </footer>
  );
}