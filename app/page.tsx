"use client";

import { useEffect, useState } from "react";
import Card from "@/app/ui/card";
import { fetchHomes, searchHomes } from "./homes/api";
import "./globals.css";
import Navbar from "@/app/ui/navbar"; // Import your existing Navbar component

export default function Home() {
  const [homes, setHomes] = useState([]); // For all homes
  const [searchResults, setSearchResults] = useState([]); // For search results
  const [searchStarted, setSearchStarted] = useState(false); // Flag to track if search has started

  // Fetch homes on initial load
  useEffect(() => {
    async function getHomes() {
      const data = await fetchHomes();
      setHomes(data);
    }
    getHomes();
  }, []);

  // Function to handle search
  const handleSearch = async (params) => {
    setSearchStarted(true); // Mark that search has started
    const results = await searchHomes(params); // Fetch search results
    setSearchResults(results);
  };

  // Combine search results and homes, prioritize search results
  const combinedHomes = [
    ...searchResults,
    ...homes.filter(
      (home) => !searchResults.some((res) => res._id === home._id)
    ),
  ];

  return (
    <>
      {/* Navbar with integrated search functionality */}
      <Navbar onSearch={handleSearch} />

      <main className="flex min-h-screen flex-col items-center justify-between p-5">
        {/* Homes Display */}
        <div className="section-1 flex p-5">
          {searchStarted
            ? // Show the search results first followed by the rest of the homes
              combinedHomes.map((home) => (
                <Card
                  key={home._id}
                  rate={home.rating}
                  hrefLink={`./homes/${home._id}`}
                  county={home.name}
                  region={home.location}
                  specific={home.description}
                  price={home.price}
                  imageUrl={home.imageUrl?.[0]}
                />
              ))
            : // Initially show all homes if search has not started
              homes.map((home) => (
                <Card
                  key={home._id}
                  rate={home.rating}
                  hrefLink={`./homes/${home._id}`}
                  county={home.name}
                  region={home.location}
                  specific={home.description}
                  price={home.price}
                  imageUrl={home.imageUrl?.[0]}
                />
              ))}
        </div>
      </main>
    </>
  );
}
