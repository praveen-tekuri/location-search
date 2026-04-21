import LocationSearch from "./components/LocationSearch";
import Maps from "./components/Maps";

function App(){
  return (
    <div className="max-w-7xl w-full mx-auto p-5">
        <h2 className="text-center text-3xl">Location Search App</h2>
        <div className="flex">
            <div className="flex-3">
                <LocationSearch/>
            </div>
            <div className="flex-9">
                <Maps/>
            </div>
        </div>
    </div>
  )
}


export default App;