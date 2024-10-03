"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./myHomes.module.css";
import { getUserHomes } from "@/app/homes/api";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

interface Home {
  _id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string[];
  rating: number;
  bedrooms: number;
  beds: number;
}

const MyHomes = () => {
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null); // Track the open menu for each home
  const router = useRouter();

  useEffect(() => {
    async function fetchUserHomes() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const data = await getUserHomes(token);
        setHomes(data);
      } catch (err) {
        setError("Failed to fetch homes. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchUserHomes();
  }, [router]);

  const toggleMenu = (homeId: string) => {
    setMenuOpen(menuOpen === homeId ? null : homeId);
  };

  const handleUpdate = (homeId: string) => {
    router.push(`/homes/update/${homeId}`);
  };

  const handleDelete = (homeId: string) => {
    // Logic to delete the home (confirming with the user can be added here)
    console.log("Delete home with ID:", homeId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Homes List</h1>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.scrollable}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.headerCell}>Home Name</th>
                <th className={styles.headerCell}>Location</th>
                <th className={styles.headerCell}>Price|night</th>
                <th className={styles.headerCell}>Bedrooms</th>
                <th className={styles.headerCell}>Beds</th>
                <th className={styles.headerCell}>Rating</th>
                <th className={styles.headerCell}></th>{" "}
                {/* Empty cell for menu */}
              </tr>
            </thead>
            <tbody>
              {homes.map((home, index) => (
                <tr
                  key={home._id}
                  className={`${styles.tableRow} ${
                    index % 2 === 0 ? styles.evenRow : styles.oddRow
                  }`}
                >
                  <td className={styles.cell}>{home.name} <br /> <a href={`../homes/${home._id}`}>{home._id}</a></td>
                  <td className={styles.cell}>{home.location}</td>
                  <td className={styles.cell}>{home.price}</td>
                  <td className={styles.cell}>{home.bedrooms}</td>
                  <td className={styles.cell}>{home.beds}</td>
                  <td className={`${styles.cell} ${styles.totalPrice}`}>
                    {home.rating}
                  </td>
                  <td className={styles.cell}>
                    <div className={styles.menuWrapper}>
                      <button
                        className={styles.threeDots}
                        onClick={() => toggleMenu(home._id)}
                      >
                        <HiOutlineMenuAlt3 />
                      </button>
                      {menuOpen === home._id && (
                        <div className={styles.dropdownMenu}>
                          <button
                            className={styles.menuItem}
                            onClick={() => handleUpdate(home._id)}
                          >
                            <CiEdit />
                            <p>Update</p>
                          </button>
                          <button
                            className={styles.menuItem}
                            onClick={() => handleDelete(home._id)}
                          >
                            <MdDeleteOutline />
                            <p>Delete</p>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyHomes;
