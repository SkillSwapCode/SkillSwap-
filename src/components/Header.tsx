'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import dynamic from 'next/dynamic';
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SkillSwap</div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navItem}>Explore</Link>
        <Link href="/create" className={styles.navItem}>Create</Link>
        <WalletMultiButton className={styles.walletButton} />
      </nav>
    </header>
  );
};

export default Header;