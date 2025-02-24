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

const BASE_ZOOM_SIZE = 22;
const BASE_INFO_WINDOW_OFFSET = 0.00001;

const DEFAULT_ZOOM_SIZE = 16;

const ActivityLocation = ({ address }: { address: string }) => {
  const addressContext = address.split(",") || null;
  const { location } = useGoogleMaps(address);

  const [zoomSize, setZoomSize] = useState<number>(DEFAULT_ZOOM_SIZE);
  const infoWindowOffsetSize = useMemo(() => {
    const scale = BASE_ZOOM_SIZE - zoomSize;
    const power = 2 ** scale || 1;
    return power * BASE_INFO_WINDOW_OFFSET;
  }, [zoomSize]);

  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(true);

  const handleToggleInfoWindow = () => {
    setInfoWindowOpen((prev) => !prev);
  };

  const handleCloseInfoWindow = () => {
    setInfoWindowOpen(false);
  };

  if (!address) return null;

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="w-full overflow-hidden rounded-16 border border-brand-300">
        {location && (
          <Map
            mapId="vivitrip_activity_map"
            defaultZoom={DEFAULT_ZOOM_SIZE}
            minZoom={2}
            maxZoom={BASE_ZOOM_SIZE}
            defaultCenter={{ lat: location.lat, lng: location.lng }}
            onZoomChanged={({ map }) => {
              setZoomSize(map.getZoom() ?? DEFAULT_ZOOM_SIZE);
            }}
            style={{
              width: "100%",
              height: "480px",
              maxHeight: "calc(100vh - var(--header-height) - 5rem)",
            }}>
            {infoWindowOpen && (
              <InfoWindow
                position={{
                  lat: location.lat + infoWindowOffsetSize,
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
                onClose={handleCloseInfoWindow}
                onCloseClick={handleCloseInfoWindow}>
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
              onClick={handleToggleInfoWindow}>
              <Pin
                borderColor="#c4590d"
                background="#ff7c1d"
                glyphColor="#fff4e8"
              />
            </AdvancedMarker>
          </Map>
        )}
      </div>

      <div className="mt-8 flex items-center gap-2">
        <IcLocation />
        <p className="font-14px-regular flex-1">{address}</p>
      </div>
    </APIProvider>
  );
};

export default ActivityLocation;
