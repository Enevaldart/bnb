"use client";

import Rules from "@/app/ui/rules";
import Payment from "@/app/ui/payment/payment";
import "@/app/globals.css";
import Collage from "@/app/ui/collages";
import Assets from "@/app/ui/mainAssets";
import React, { useEffect, useState } from "react";
import { MdOutlineBed } from "react-icons/md";
import CustomCarousel from "@/app/ui/carousel";
import ReviewCard from "@/app/ui/reviewcard/reviewcard";
import OverallRating from "@/app/ui/overalRating/overalRating";
import HostProfile from "@/app/ui/hostProfile/hostProfile";
import { MdOutlineBedroomParent } from "react-icons/md";
import { getHomeById, fetchReviewsByHomeId } from "@/app/homes/api";
import styles from "./home.module.css"

interface Home {
  _id: string;
  rating: string;
  name: string;
  location: string;
  description: string;
  price: string;
  bedrooms: string;
  beds: string;
  imageUrl?: string[];
  amenities?: string[];
}

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const HomePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [home, setHome] = useState<Home | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const homeData = await getHomeById(id);
        setHome(homeData);
      } catch (err) {
        setError("Failed to fetch home data");
      }
    };

    const fetchHomeReviews = async () => {
      try {
        const reviewsData = await fetchReviewsByHomeId(id);
        setReviews(reviewsData);
      } catch (err) {
        setError("Failed to fetch reviews");
      }
    };

    fetchHomeData();
    fetchHomeReviews();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!home) {
    return <div>Loading...</div>;
  }

  const images: string[] = home.imageUrl ? home.imageUrl.map((img) => `http://localhost:5000${img}`) : [];

  const name = home.name;
  const NoOfBedroom = home.bedrooms;
  const NoOfGuests = "2";
  const NoOfBeds = home.beds;

  return (
    <div className="home-more">
      <div className="gallery-carousel">
        <CustomCarousel images={images} name={name} />
      </div>
      <div className="gallery-collage">
        <Collage images={images} name={name} />
      </div>
      <div className="des">
        <div className="des-sc">
          <h2>
            {home.name}, {home.location}
          </h2>
          <Assets guests={NoOfGuests} bedroom={NoOfBedroom} bed={NoOfBeds} bath="2" />
          <hr />
          <h2 className="section-bed">Where you&apos;ll sleep</h2>
          <div className="bed">
            <div>
              <MdOutlineBedroomParent />
              <span>Bedrooms</span>
              <span>{NoOfBedroom} bedroom</span>
            </div>
            <div>
              <MdOutlineBed />
              <span>Beds</span>
              <span>{NoOfBeds} bed</span>
            </div>
          </div>
          <hr />
          <div className={styles.amenities}>
            <h3>What this place offers</h3>
            <ul>
              {home.amenities?.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
          <hr />
          <div>
            <OverallRating rating={parseFloat(home.rating)} totalReviews={reviews.length} />
            <h2>Most Liked Comments</h2>
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                userName={review.user?.username || 'Unknown User'}
                date={review.date}
                rating={review.rating}
                comment={review.comment}
                likes={298} // You can add likes logic later or mock for now
              />
            ))}
          </div>
        </div>
        <div>
          <Payment homeId={home._id} price={home.price} description={home.description} />
        </div>
      </div>
      <hr />
      <div>
        <HostProfile
          homeId={id}
          hostName="Karl And Salha"
          profilePicture="/path-to-profile.jpg"
          rating={5}
          homesHosting={5}
          work="Photographer and Singer"
          languages="English and Swahili"
          description="We are here to make your stay as memorable as possible."
          coHostName="Salha"
          coHostPicture="/path-to-cohost.jpg"
          responseRate="100%"
          responseTime="within an hour"
        />
      </div>
      <hr />
      <Rules />
    </div>
  );
};

export default HomePage;
