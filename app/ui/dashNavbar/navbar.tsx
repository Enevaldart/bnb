"use client";

import { usePathname, useRouter } from 'next/navigation';
import styles from './navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleAddHomeClick = () => {
    router.push('/homes/addHome');
  };

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
      <button className={styles.addHome} onClick={handleAddHomeClick}>+ Add Home</button>
      </div>
    </div>
  );
};

export default Navbar;
