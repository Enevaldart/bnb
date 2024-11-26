import styles from "./filterSection.module.css";
import { CiSearch } from "react-icons/ci";

const FilterSection = () => {
  return (
    <div className={styles.filterContainer}>
      <h1 className={styles.heading}>Find what fits you</h1>
      <p className={styles.subheading}>
        We help you find a home that fits your personality, <br /> dream and
        pocket!
      </p>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>
          Search by Name
        </button>
        <button className={styles.tab}>Filter by Location</button>
        <button className={styles.tab}>Filter by Home Type</button>
      </div>

      <div className={styles.searchContainer}>
        <h2 className={styles.searchLabel}>Search home</h2>
        <p className={styles.searchDescription}>
          Simply write the home name and press the search button (e.g., Shanzu
          Apartments or Buxton point)
        </p>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search home name"
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.filterBudget}>
        <h2 className={styles.budgetLabel}>Filter by budget</h2>
        <div className={styles.budgetButtons}>
          <button className={styles.budgetButton}>0 - 500K</button>
          <button className={styles.budgetButton}>500K - 1M</button>
          <button className={styles.budgetButton}>1M - 2M</button>
          <button className={styles.budgetButton}>2M - 3M</button>
          <button className={styles.budgetButton}>3M - 5M</button>
          <button className={styles.budgetButton}>5M - 10M</button>
          <button className={styles.budgetButton}>Above 10M</button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
