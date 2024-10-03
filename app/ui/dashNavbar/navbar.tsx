"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './navbar.module.css';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('employee-list');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.tabs}>
          <a
            className={activeTab === 'employee-list' ? styles.active : ''}
            onClick={() => handleTabClick('employee-list')} href="/dashboard/employee-list"
          >
            Booking List
          </a>
          <a
            className={activeTab === 'management' ? styles.active : ''}
            onClick={() => handleTabClick('management')} href="/dashboard/management"
          >
            Management
          </a>
          <a
            className={activeTab === 'others' ? styles.active : ''}
            onClick={() => handleTabClick('others')} href="/dashboard/others"
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
