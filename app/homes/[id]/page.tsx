import Rules from "@/app/ui/rules";
import Payment from "@/app/ui/payment";
import "@/app/globals.css";
import Collage from "@/app/ui/collages";
import Assets from "@/app/ui/mainAssets";
import React from "react";
import { MdOutlineBed } from "react-icons/md";
import CustomCarousel from "@/app/ui/carousel";
import ReviewCard from "@/app/ui/reviewcard/reviewcard";
import OverallRating from "@/app/ui/overalRating/overalRating";
import HostProfile from "@/app/ui/hostProfile/hostProfile";
import { MdOutlineBedroomParent } from "react-icons/md";

interface Home {
  _id: string;
  rating: string;
  name: string;
  location: string;
  description: string;
  price: string;
  imageUrl?: string[]; // Array of image URLs
  amenities?: string[];
}

const reviews = [
  {
    userName: "ES Kamau",
    date: "18 Apr 2023",
    rating: 4,
    comment:
      "Several years ago, Channel 4, together with Jo Frost (perhaps better known as Supernanny) conducted an experiment. Forty children, aged six, were invited to a party and divided into two halves. One half was given typical sugary party foods. The other half ate sugar-free foods.",
    likes: 298,
  },
  {
    userName: "Mwangi John Wahurui",
    date: "15 Apr 2023",
    rating: 3,
    comment:
      "Below are a series of poorly constructed paragraphs and possible solutions. Put yourself in the place of a teacher. Criticise the structure of each paragraph and suggest how it might be improved. Be very critical about how the paragraph is constructed and how well the ideas flow. There are quite a few examples to have a go at because being critical of the work of others is difficult but gets easier the more you practice.",
    likes: 178,
  },
];

const overallRating = 3.75;
const totalReviews = 1297;

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

  // Use the images fetched from the backend
  const images: string[] = home.imageUrl ? home.imageUrl.map((img) => `http://localhost:5000${img}`) : [];

  const name = home.name;
  const NoOfBedroom = "1";
  const NoOfGuests = "2";
  const NoOfBeds = "1";

  return (
    <div className="home-more">
      <div className="gallery-carousel">
        {/* Pass the fetched images to CustomCarousel */}
        <CustomCarousel images={images} name={name} />
      </div>
      <div className="gallery-collage">
        {/* Pass the fetched images to Collage */}
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
          <div className="amenities-list">
            <h3>Amenities</h3>
            <ul>
              {home.amenities?.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
          <div>
            <OverallRating rating={overallRating} totalReviews={totalReviews} />
            <h2>Most liked comments</h2>
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
        <div>
          <Payment price={home.price} description={home.description} />
        </div>
      </div>
      <hr />
      <div>
        <HostProfile
          hostName="Karl And Salha"
          profilePicture="/path-to-profile.jpg"
          reviews={53}
          rating={5}
          yearsHosting={5}
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
