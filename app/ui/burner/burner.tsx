import styles from "./burner.module.css";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          The <b>safest way</b> to Airbnb or <br /> book a tour in Kenya
        </h1>
        <div className={styles.buttons}>
          <button className={styles.buttonPrimary}>Explore Homes</button>
          <button className={styles.buttonSecondary}>Book a Tour</button>
          <button className={styles.buttonSecondary}>Hire a Car</button>
        </div>
        <p>
          <Link href="#">
            <span>Scroll down</span>
            <RiArrowDropDownLine />
          </Link>
        </p>
        <div className={styles.image}>
          <Image src="/home1.jpg" alt="Logo" width={700} height={550} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
