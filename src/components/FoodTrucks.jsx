import { useState } from "react";
import TruckGrid from "../components/TruckGrid";
import TruckDetail from "../components/TruckDetail";
import trucks from "./trucks";

export default function FoodTrucks() {
  const [selectedTruck, setSelectedTruck] = useState(null);

  if (selectedTruck) {
    return (
      <TruckDetail
        truck={selectedTruck}
        onBack={() => setSelectedTruck(null)}
      />
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <TruckGrid
        trucks={trucks}
        title="Food Trucks Near You"
        showCategoryFilter={true}
        onCardClick={(truck) => setSelectedTruck(truck)}
      />
    </div>
  );
}
