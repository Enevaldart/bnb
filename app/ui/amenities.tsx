// app/Amenities/amen.tsx
import { TbBeach, TbSwimming, TbAirConditioning, TbParking, TbBrandCarbon } from "react-icons/tb";
import { TiWiFi } from "react-icons/ti";
import { BiSolidBinoculars } from "react-icons/bi";
import { MdOutlineSecurity } from "react-icons/md";
import { PiWashingMachine, PiCourtBasketball } from "react-icons/pi";
import { FaKitchenSet } from "react-icons/fa";

interface AmenitiesProps {
  amenities: string[]; // Declare the amenities prop
}

const amenitiesIconMap: { [key: string]: JSX.Element } = {
  "Beach access | Beachfront": <TbBeach />,
  "Swimming pool": <TbSwimming />,
  "Air conditioning": <TbAirConditioning />,
  "Wifi connection": <TiWiFi />,
  "Amazing view": <BiSolidBinoculars />,
  "Security": <MdOutlineSecurity />,
  "Washing machine": <PiWashingMachine />,
  "Basketball court": <PiCourtBasketball />,
  "Kitchen": <FaKitchenSet />,
  "Free parking": <TbParking />,
  "Carbon monoxide alarm": <TbBrandCarbon />,
};

export default function Amenities({ amenities }: AmenitiesProps) {
  return (
    <div className="offers">
      <h2>What this place offers</h2>
      <ul>
        {amenities.map((amenity, index) => (
          <li key={index}>
            {amenitiesIconMap[amenity] || "🔧"} {amenity}
          </li>
        ))}
      </ul>
      {/*<button>Show all 33 amenities</button>*/}
    </div>
  );
}
