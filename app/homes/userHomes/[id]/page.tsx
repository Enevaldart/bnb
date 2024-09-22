import Rules from "@/app/ui/rules";
import Payment from "@/app/ui/payment";
import "@/app/globals.css";
import Collage from "@/app/ui/collages";
import Assets from "@/app/ui/mainAssets";
import React from "react";
import { MdOutlineBed } from "react-icons/md";
import CustomCarousel from "@/app/ui/carousel";
import { MdOutlineBedroomParent } from "react-icons/md";
import styles from "./id.module.css";

interface Home {
  _id: string;
  rating: string;
  name: string;
  location: string;
  description: string;
  price: string;
  imageUrl?: string[];
  amenities?: string[];
}

const HomePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  let home: Home | null = null;

  try {
    const response = await fetch(`http://localhost:5000/api/homes/${id}`);
    if (response.ok) {
      home = await response.json();
    } else {
      console.error("Failed to fetch home data");
    }
  } catch (error) {
    console.error("Error fetching home:", error);
  }

  if (!home) {
    return <div>Home not found</div>;
  }

  const images: string[] = [
    "/1brNyali/IMG-20240504-WA0025.jpg",
    "/1brNyali/IMG-20240504-WA0026.jpg",
    "/1brNyali/IMG-20240504-WA0028.jpg",
    "/1brNyali/IMG-20240504-WA0030.jpg",
    "/1brNyali/IMG-20240504-WA0033.jpg",
    "/1brNyali/IMG-20240504-WA0031.jpg",
    "/1brNyali/IMG-20240504-WA0032.jpg",
  ];

  const name = home.name;
  const NoOfBedroom = "1";
  const NoOfGuests = "2";
  const NoOfBeds = "1";

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
          <Assets
            guests={NoOfGuests}
            bedroom={NoOfBedroom}
            bed={NoOfBeds}
            bath="2"
          />
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
          {/* Pass the amenities to the Amenities component 
          <Amenities amenities={home.amenities? || []} />
          {/* OR list them directly here */}
          <div className="amenities-list">
            <h3>Amenities</h3>
            <ul>
              {home.amenities?.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.paymn}>
          <Payment price={home.price} description={home.description} />
          <div className={styles.btn}>
            <a href={`/homes/update/${id}`}>Update home</a>
            <a href="#">Delete home</a>
          </div>
        </div>
      </div>
      <hr />
      <Rules />
    </div>
  );
};

export default HomePage;
