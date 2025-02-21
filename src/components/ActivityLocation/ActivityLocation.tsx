import IcLocation from "@/assets/svgs/ic_location.svg";
import useGoogleMaps from "@/src/hooks/useGetLocationByAddress";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useMemo, useState } from "react";

const ZOOM_SIZE = 16;

const ActivityLocation = ({ address }: { address: string }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(true);
  const addressContext = useMemo(() => {
    if (!address) return null;
    return address.split(",");
  }, [address]);
  const { location } = useGoogleMaps(address);

  const handleClickMarker = () => {
    setInfoWindowOpen(true);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="w-full overflow-hidden rounded-16">
        {location && (
          <Map
            mapId="vivitrip_activity_map"
            defaultZoom={ZOOM_SIZE}
            minZoom={ZOOM_SIZE}
            maxZoom={ZOOM_SIZE}
            defaultCenter={{ lat: location.lat, lng: location.lng }}
            disableDefaultUI={true}
            style={{
              width: "100%",
              height: "480px",
              maxHeight: "calc(100vh - var(--header-height) - 5rem)",
            }}>
            {infoWindowOpen && (
              <InfoWindow
                position={{
                  lat: location.lat + 0.0006,
                  lng: location.lng,
                }}
                headerContent={
                  addressContext &&
                  addressContext.map((item) => {
                    return (
                      <p key={item} className="font-12px-regular">
                        {item}
                      </p>
                    );
                  })
                }
                onCloseClick={() => setInfoWindowOpen(false)}>
                <div className="p-2">
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-12px-regular text-blue-200 hover:underline">
                    Google 지도에서 보기
                  </Link>
                </div>
              </InfoWindow>
            )}
            <AdvancedMarker
              position={location}
              clickable={true}
              onClick={handleClickMarker}>
              <Pin
                borderColor="#c4590d"
                background="#ff7c1d"
                glyphColor="#fff4e8"
              />
            </AdvancedMarker>
          </Map>
        )}
      </div>

      <div className="mt-8 flex items-center">
        <IcLocation />
        <p className="font-14px-regular">{address}</p>
      </div>
    </APIProvider>
  );
};

export default ActivityLocation;
