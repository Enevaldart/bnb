// app/ui/navbar.jsx

"use client";

import "../globals.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MobileMenu from "@/app/ui/menu/menu";
import { RiSearch2Line } from "react-icons/ri";

const Navbar = ({ onSearch }) => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchParams, setSearchParams] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    name: "",
  });

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      const buffer = 30;

      if (currentScrollY > lastScrollY + buffer || currentScrollY < buffer) {
        setShowNav(currentScrollY < lastScrollY);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams); // Call the passed search function
  };

  return (
    <nav className={`navbar ${!showNav ? "scrolled" : ""}`}>
      <div className={`tp ${showNav ? "visible" : ""}`}>
        <Image src="/logo.jpg" alt="Logo" width={100} height={12} priority />
        <div>
          <div
            className={`pc-menu search scrolled-menu ${
              showNav ? "hidden" : ""
            }`}
            id="scrolled-menu"
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="scrol">
                <RiSearch2Line />
              </div>
              <div>
                <label>Where</label>
                <input
                  type="text"
                  placeholder="Map area"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <button type="submit">
                <RiSearch2Line />
              </button>
            </form>
          </div>
          <div className={`pc-menu ${showNav ? "" : "hidden"}`} id="pc-m">
            <Link href=".." className="active">
              Stays
            </Link>
            <Link href="/homes/reviews" passHref>
              Experiences
            </Link>
            <Link href="/homes/reviews" passHref>
              Online Experiences
            </Link>
          </div>
        </div>
        <div className="avatar">
          <a href="/homes/addHome">Airbnb your home</a>
          <MobileMenu />
        </div>
      </div>
      <div className={`search ${showNav ? "" : "hidden"}`} id="pc-search">
        <form onSubmit={handleSearchSubmit}>
          <div className="where">
            <label>Where</label>
            <input
              type="text"
              placeholder="Map area"
              value={searchParams.location}
              onChange={(e) =>
                setSearchParams({ ...searchParams, location: e.target.value })
              }
            />
          </div>
          <hr />
          <div>
            <label>Min Price</label>
            <input
              type="number"
              placeholder="Min Price"
              value={searchParams.minPrice}
              onChange={(e) =>
                setSearchParams({ ...searchParams, minPrice: e.target.value })
              }
            />
          </div>
          <hr />
          <div>
            <label>Max Price</label>
            <input
              type="number"
              placeholder="Max Price"
              value={searchParams.maxPrice}
              onChange={(e) =>
                setSearchParams({ ...searchParams, maxPrice: e.target.value })
              }
            />
          </div>
          <hr />
          <div>
            <label>Hotel Name</label>
            <input
              type="text"
              placeholder="Hotel Name"
              value={searchParams.name}
              onChange={(e) =>
                setSearchParams({ ...searchParams, name: e.target.value })
              }
            />
          </div>
          <button type="submit">
            <RiSearch2Line />
          </button>
        </form>
      </div>

      <div
        className={`pc-menu search mobile ${showNav ? "" : ""}`}
        id="mobile-2"
      >
        <form onSubmit={handleSearchSubmit}>
          <div className="scrol">
            <RiSearch2Line />
          </div>
          <div>
            <label>Where</label>
            <input
              type="text"
              placeholder="Map area"
              value={searchParams.location}
              onChange={(e) =>
                setSearchParams({ ...searchParams, location: e.target.value })
              }
            />
          </div>
          <button type="submit">
            <RiSearch2Line />
          </button>
        </form>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
