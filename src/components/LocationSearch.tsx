import { Fragment, useState } from "react"

interface SearchResponse {
    features: {
        properties: {
            place_id: number,
            display_name: string,
        },
        geometry: {
            coordinates: number[]
        }
    }[]
}

interface Place {
    id: number,
    name: string,
    longitude: number,
    latitude: number
}

const LocationSearch = () => {
  const [term, setTerm] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  console.log(places);

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     const features = await searchLocation(term);
     setPlaces(features)
     setTerm('');
  }
  
  const searchLocation = async (term:string) => {
    const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`)
    const data:SearchResponse = await resp.json();
    const features:Place[] = data.features.map((feature) => {
        return {
            id: feature.properties.place_id,
            name: feature.properties.display_name,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1]
        }
    })
    return features;
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="term">Search Place</label>
            <input value={term} onChange={(e) => setTerm(e.target.value)} className="border rounded-md ml-2 px-2" type="text" id="term" />
        </form>
        {places.length > 0 ? (
          <div>
            <h3 className="my-3 font-bold">Search Results: {places.length}</h3>
            {places.map((place) => (
               <Fragment key={place.id}>
                   <div className="mb-5">
                    <p>{place.name}</p>
                    <button className="bg-green-700 p-2 my-3 rounded-md text-white cursor-pointer">Go to the Place</button>
                    <div className="border-b"></div>
                   </div>
                </Fragment>
            ))}
          </div>
        ) : (
          <h3 className="mt-5">No Places found</h3>
        )}
    </div>
  )
}

export default LocationSearch