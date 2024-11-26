"use client";

import styles from "./newNavbar.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/logo.jpg" alt="Logo" width={100} height={12} priority />
      </div>
      <div className={styles.menu}>
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <Link href="#">Homes</Link>
          </li>
          <li>
            <Link href="#">Tours</Link>
          </li>
          <li>
            <Link href="#">Hire a car</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
          <li>
            <Link href="#">FAQ</Link>
          </li>
        </ul>
        <button
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
