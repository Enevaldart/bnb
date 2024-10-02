"use client";

import "../globals.css";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import MobileMenu from '@/app/ui/menu/menu'; // Ensure the MobileMenu component is correctly imported
import { RiSearch2Line } from "react-icons/ri";
import axios from 'axios'; // Axios for making API requests

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchParams, setSearchParams] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    name: ''
  });
  const [searchResults, setSearchResults] = useState<any[]>([]); // To store search results
  const [isLoading, setIsLoading] = useState(false); // Loading state for search

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      const buffer = 30;

      if (currentScrollY > lastScrollY + buffer || currentScrollY < buffer) {
        setShowNav(currentScrollY < lastScrollY);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true); // Set loading state

    // Filter out empty parameters from the search query
    const params = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value)
    );

    try {
      // Send search request to the backend
      const response = await axios.get('http://localhost:5000/api/homes/search', { params });

      setSearchResults(response.data); // Set search results from API response
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <nav className={`navbar ${!showNav ? 'scrolled' : ''}`}>
        <div className={`tp ${showNav ? 'visible' : ''}`}>
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={100}
            height={12}
            priority
          />
          <div>
            <div className={`pc-menu search scrolled-menu ${showNav ? 'hidden' : ''}`} id="scrolled-menu">
              <form onSubmit={handleSearch}>
                <div className="scrol">
                  <RiSearch2Line />
                </div>
                <div>
                  <label>Where</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Map area"
                    value={searchParams.location}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit"><RiSearch2Line /></button>
              </form>
            </div>
            <div className={`pc-menu ${showNav ? '' : 'hidden'}`} id="pc-m">
              <Link href=".." className="active">Stays</Link>
              <Link href="/homes/reviews" passHref>Experiences</Link>
              <Link href="/homes/reviews" passHref>Online Experiences</Link>
            </div>
          </div>
          <div className="avatar">
            <a href="/homes/addHome">Airbnb your home</a>
            <MobileMenu />
          </div>
        </div>
        <div className={`search ${showNav ? '' : 'hidden'}`} id="pc-search">
          <form onSubmit={handleSearch}>
            <div className="where">
              <label>Where</label>
              <input
                type="text"
                name="location"
                placeholder="Map area"
                value={searchParams.location}
                onChange={handleInputChange}
              />
            </div>
            <hr />
            <div>
              <label>Min Price</label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={searchParams.minPrice}
                onChange={handleInputChange}
              />
            </div>
            <hr />
            <div>
              <label>Max Price</label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={searchParams.maxPrice}
                onChange={handleInputChange}
              />
            </div>
            <hr />
            <div>
              <label>Hotel Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter hotel name"
                value={searchParams.name}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit"><RiSearch2Line /></button>
          </form>
        </div>
      </nav>

      {/* Display search results */}
      <div className="search-results">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <li key={result._id}>
                  <div>
                    <h3>{result.name}</h3>
                    <p>Location: {result.location}</p>
                    <p>Price: ${result.price}</p>
                    <p>Rating: {result.rating}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
