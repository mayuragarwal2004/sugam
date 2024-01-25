import React, { useMemo, useState, useEffect } from "react";
import Map from "./AnalyticsComponents/Map";
import "./css/analytics.css";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { app } from "./base";
import { async } from "@firebase/util";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import ComplainCards from "./AnalyticsComponents/ComplainCards";

function Analytics() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [activeMarker, setActiveMarker] = useState(null);

  console.log(activeMarker);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const center = useMemo(() => ({ lat: 18.4807627, lng: 73.8724301 }), []);
  const [queryData, setqueryData] = useState([]);
  async function getData() {
    const db = getFirestore(app);
    const q = query(collection(db, "Complaints"), where("state", "==", "Maharashtra"));

    const querySnapshot = await getDocs(q);
    setqueryData([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setqueryData((prev) => [...prev, { ...doc.data(), docID:doc.id }]);
      // console.log(doc.id, " => ", doc.data());
    });
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="home-agenda section-container">
        <div className="home-max-width2 max-content-container">
          <div className="home-heading-container1">
            <h1 className="home-text11 heading2">View Analytics</h1>
          </div>
          <div className="map-container" >
            {!isLoaded ? (
              <div>Loading...</div>
            ) : (
              <GoogleMap
                zoom={13}
                center={center}
                mapContainerClassName="gmap"
                onClick={() => setActiveMarker(null)}
              ><>
                {queryData && (
                  <Map
                    data={queryData}
                    activeMarker={activeMarker}
                    setActiveMarker={setActiveMarker}
                    handleActiveMarker={handleActiveMarker}
                  />
                )}
                </>
              </GoogleMap>
            )}
            <span id="info-box">?</span>
            <button id="remove">Remove Ward Outlines</button>
            <button id="add">Add Ward Outlines</button>
          </div>
        </div>
      </div>
      {queryData && <ComplainCards data={queryData}/>}
      <div>
        <div className="fieldmajor" tabIndex="5">
          <label htmlFor="majorcomponent" id="majorcid">
            Select the major component of garbage to be shown
          </label>
          <br />
          <span id="majorcomponentspan">
            <input
              type="text"
              name="majorcompnum"
              id="majorcompnum"
              style={{ display: "none" }}
              value="0"
              required
              readOnly
            />
            <input
              type="text"
              name="majorcomponents"
              id="majorcomponents"
              style={{ display: "none" }}
              required
              readOnly
            />
            <input
              type="checkbox"
              className="majorcompoption"
              id="drywaste"
              name="Dry Waste"
              value="Dry Waste"
            />
            <label className="majorcl" htmlFor="drywaste">
              Dry Waste <span id="p"></span>
            </label>
            <br />

            <input
              type="checkbox"
              className="majorcompoption"
              id="plantwaste"
              value="Plant Waste"
            />
            <label className="majorcl" htmlFor="plantwaste">
              Plant Waste <span id="p"></span>
            </label>
            <br />

            <input
              type="checkbox"
              className="majorcompoption"
              id="constructionwaste"
              value="Construction waste"
            />
            <label className="majorcl" htmlFor="constructionwaste">
              Construction waste <span id="constructionwastep"></span>
            </label>
            <br />

            <input
              type="checkbox"
              className="majorcompoption"
              id="wetwaste"
              value="Wet Waste"
            />
            <label className="majorcl" htmlFor="wetwaste">
              Wet Waste <span id="wetwastep"></span>
            </label>
            <br />

            <input
              type="checkbox"
              className="majorcompoption"
              id="clothes"
              value="Clothes"
            />
            <label className="majorcl" htmlFor="clothes">
              Clothes <span id="clothesp"></span>
            </label>
            <br />

            <input
              type="checkbox"
              className="majorcompoption"
              id="sanitarywaste"
              value="Sanitary Waste"
            />
            <label className="majorcl" htmlFor="sanitarywaste">
              Sanitary Waste <span id="sanitarywastep"></span>
            </label>
            <br />

            <input
              type="checkbox"
              className="majorcompoption"
              id="medicalwaste"
              value="Medical Waste"
            />
            <label className="majorcl" htmlFor="medicalwaste">
              Medical Waste <span id="medicalwastep"></span>
            </label>
            <br />
          </span>
        </div>
        <button
          onClick={() => console.log("filter()")}
          value="submit"
          id="submitbtn"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Analytics;
