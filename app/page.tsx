"Use Client";

import Navbar from "@/app/ui/NewNavbar/newNavbar";
import Banner from "@/app/ui/burner/burner";
import FilterSection from "@/app/ui/filterSection/filterSection";
import AdvancedSearch from "./ui/advancedSearch/advancedSearch";
import Footerburner from "./ui/footerBurner/footerburner";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <FilterSection />
      <AdvancedSearch />
      <Footerburner />
    </div>
  );
}
