import styles from "./footerburner.module.css";
import { FaSearch, FaCar, FaSmile } from 'react-icons/fa'; // Example icons
import { IoHomeOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import { GrAtm } from "react-icons/gr";

const steps = [
  {
    id: 1,
    title: "One",
    description: "Select Home",
    icon: <IoHomeOutline className={styles.icon} /> ,
  },
  {
    id: 2,
    title: "Two",
    description: "Enquire",
    icon: <TbFileInvoice className={styles.icon} /> ,
  },
  {
    id: 3,
    title: "Three",
    description: "Pay",
    icon: <GrAtm className={styles.icon} /> ,
  },
];

const Footerburner = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>
        Owning a home is as Simple as <br />
        <span>One, Two, Three</span>
      </h2>
      <div className={styles.cardContainer}>
        {steps.map((step) => (
          <div key={step.id} className={styles.card}>
            <div className={styles.iconBox} >{step.icon}</div>
            <h3 className={styles.cardTitle}>{step.title}</h3>
            <p className={styles.cardDescription}>{step.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.last}></div>
    </section>
  );
};

export default Footerburner;
