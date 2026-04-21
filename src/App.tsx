import { useState } from "react";
import LocationSearch from "./components/LocationSearch";
import Maps from "./components/Maps";
import type { Place } from "./api/place";

function App(){
  const [place, setPlace] = useState<Place | null>(null);
  console.log('place', place);
  return (
    <div className="max-w-7xl w-full mx-auto p-5">
        <h2 className="text-center text-3xl">Location Search App</h2>
        <div className="flex">
            <div className="flex-3">
                <LocationSearch onPlaceClick={(p) => setPlace(p)} />
            </div>
            <div className="flex-9">
                <Maps/>
            </div>
        </div>
    </div>
  )
}


export default App;