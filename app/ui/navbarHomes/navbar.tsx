"use client";

import { RiSearch2Line } from "react-icons/ri";
import styles from "./navbar.module.css";
import Image from "next/image";
import MobileMenu from "@/app/ui/menu/menu";
import { useState } from "react";

const ResponsiveSearch = () => {
  const [searchParams, setSearchParams] = useState({ location: "" });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchParams.location);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/logo.jpg" alt="Logo" width={100} height={50} priority />
      </div>

      {/* Large Screen Search Bar */}
      <div className={styles.largeScreenSearch}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <div className={styles.searchInputContainer}>
            <RiSearch2Line className={styles.searchIcon} />
            <div>
              <label className={styles.label}>Where</label>
              <input
                type="text"
                placeholder="Map area"
                value={searchParams.location}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, location: e.target.value })
                }
                className={styles.searchInput}
              />
            </div>
          </div>
          <button type="submit" className={styles.searchButton}>
            <RiSearch2Line />
          </button>
        </form>
      </div>
      <div className={styles.rightMenu}>
        <a href="/homes/addHome" className={styles.airbnbLink}>
          Airbnb your home
        </a>
        <MobileMenu />
      </div>
    </nav>
  );
};

export default ResponsiveSearch;
