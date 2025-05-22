import styles from '@/styles/Header.module.css';

export default function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>SkillSwap</div>
    </header>
  );
}