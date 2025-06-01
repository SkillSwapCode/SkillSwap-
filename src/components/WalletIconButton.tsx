'use client';

import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { FaWallet, FaCheckCircle } from 'react-icons/fa';

export default function WalletIconButton() {
  const { setVisible } = useWalletModal();
  const { connected } = useWallet();

  const handleClick = () => {
    setVisible(true);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Connect Wallet"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: connected ? '#22c55e' : 'white',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      {connected ? <FaCheckCircle /> : <FaWallet />}
    </button>
  );
}