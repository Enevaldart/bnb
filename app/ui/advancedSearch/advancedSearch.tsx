"use client";

import { useState } from "react";
import styles from "./advancedSearch.module.css";
import { CiFilter } from "react-icons/ci";

const AdvancedSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleExpand} className={styles.toggleButton}>
        {isExpanded ? "Hide Advanced Search" : "Click here for Advanced Search"}
        <CiFilter />
      </button>

      <form className={styles.form}>
        {isExpanded && (
          <>
            <div className={styles.fieldGroup}>
              <label htmlFor="location">Location</label>
              <input type="text" id="location" placeholder="Enter location" />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="priceRange">Budget</label>
              <div className={styles.rangeInputs}>
                <input type="number" placeholder="Min price" />
                <input type="number" placeholder="Max price" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label htmlFor="propertyType">Property Type</label>
                <select id="propertyType">
                  <option value="any">Any</option>
                  <option value="apartment">Hotel</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                  type="number"
                  id="bedrooms"
                  placeholder="Number of bedrooms"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="keywords">Keywords</label>
              <input
                type="text"
                id="keywords"
                placeholder="E.g., pool, garden"
              />
            </div>
          </>
        )}
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default AdvancedSearch;
