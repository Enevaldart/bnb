"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/app/ui/card';
import { getUserHomes } from '@/app/homes/api';

export default function UserHomes() {
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchUserHomes() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        const data = await getUserHomes(token);
        setHomes(data);
      } catch (err) {
        setError('Failed to fetch homes. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchUserHomes();
  }, [router]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Homes</h1>
      {homes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homes.map((home) => (
            <Card
              key={home._id}
              rate={home.rating}
              hrefLink={`/homes/userHomes/${home._id}`}
              county={home.name}
              region={home.location}
              specific={home.description}
              price={home.price}
              imageUrl={home.imageUrl?.[0]}
            />
          ))}
        </div>
      ) : (
        <p className="text-center py-10">You haven't listed any homes yet.</p>
      )}
    </main>
  );
}