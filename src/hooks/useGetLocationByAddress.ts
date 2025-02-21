import type {
  GeocodeResponseData,
  GeocodeResult,
  LatLngLiteral,
} from "@googlemaps/google-maps-services-js";
import { useCallback, useEffect, useState } from "react";

const useGetLocationByAddress = (address: string) => {
  const [location, setLocation] = useState<LatLngLiteral | null>(null);

  const getLocationByAddress = useCallback(async () => {
    if (!address) return;

    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(address)}`,
      );
      const { status, results } =
        (await response.json()) as GeocodeResponseData;

      if (status !== "OK") return;

      const { geometry } = results.pop() as GeocodeResult;

      setLocation(geometry.location);
    } catch {
      setLocation(null);
    }
  }, [address]);

  useEffect(() => {
    getLocationByAddress();
  }, [getLocationByAddress]);

  return {
    location,
  };
};

export default useGetLocationByAddress;
