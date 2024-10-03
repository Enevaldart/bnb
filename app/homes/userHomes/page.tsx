"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/app/ui/card";
import { getUserHomes, searchHomes } from "@/app/homes/api";
import Navbar from "@/app/ui/navbar";

export default function UserHomes() {
  const [homes, setHomes] = useState<Home[]>([]);
  const [searchResults, setSearchResults] = useState([]); // For search results
  const [searchStarted, setSearchStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <>
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
                  hrefLink={`./userHomes/${home._id}`}
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
                  hrefLink={`./userHomes/${home._id}`}
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
