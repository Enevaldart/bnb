"use client";

import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.navbar}>
      <div className={styles.tabs}>
        <a
          className={pathname === '/dashboard' ? styles.active : ''}
          href="/dashboard"
        >
          Booking List
        </a>
        <a
          className={pathname === '/dashboard/myHomes' ? styles.active : ''}
          href="/dashboard/myHomes"
        >
          My Homes
        </a>
        <a
          className={pathname === '/dashboard/others' ? styles.active : ''}
          href="/dashboard/others"
        >
          Others
        </a>
      </div>
      <div className={styles.addButton}>
        <button className={styles.addHome}>+ Add Home</button>
      </div>
    </div>
  );
};

export default Navbar;
