import { useEffect, useState, useCallback } from "react";
import type { StoreFormFieldsProps } from "../types/storeTypes";

declare global {
  interface Window {
    google: any;
  }
}

interface LatLng {
  lat: number;
  lng: number;
}

export const useGoogleMaps = (
  apiKey: string,
  onChange: StoreFormFieldsProps["onChange"]
) => {
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [geocoder, setGeocoder] = useState<any>(null);

  // Load Google Maps API
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsApiLoaded(true);
        setGeocoder(new window.google.maps.Geocoder());
      };
      script.onerror = () => {
        console.error("Failed to load Google Maps API");
      };
      document.head.appendChild(script);
    } else {
      setIsApiLoaded(true);
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [apiKey]);

  // Ekstrak lat lng dari URL maps
  const extractLatLngFromUrl = useCallback((url: string): LatLng | null => {
    try {
      const urlObj = new URL(url);
      const q = urlObj.searchParams.get("q");
      if (q) {
        const [lat, lng] = q.split(",").map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          return { lat, lng };
        }
      }
      
      // Coba ekstrak dari parameter center jika q tidak ada
      const center = urlObj.searchParams.get("center");
      if (center) {
        const [lat, lng] = center.split(",").map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          return { lat, lng };
        }
      }
    } catch (e) {
      console.error("Error parsing maps URL", e);
    }
    return null;
  }, []);

  // Update field alamat dan mapsUrl
  const updateLocationFields = useCallback(
    (lat: number, lng: number, address: string) => {
      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}`;

      onChange({
        target: {
          name: "mapsUrl",
          value: embedUrl,
        },
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);

      onChange({
        target: {
          name: "address",
          value: address,
        },
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    },
    [apiKey, onChange]
  );

  // Geocode lokasi untuk mendapatkan alamat
  const geocodeLocation = useCallback(
    (location: LatLng, callback?: (address: string) => void) => {
      if (!geocoder) return;

      geocoder.geocode({ location }, (results: any[], status: string) => {
        if (status === "OK" && results?.[0]) {
          const address = results[0].formatted_address;
          if (callback) callback(address);
          return address;
        }
        return null;
      });
    },
    [geocoder]
  );

  // Inisialisasi peta
  const initializeMap = useCallback(
    (
      mapElement: HTMLDivElement,
      mapsUrl?: string,
      address?: string
    ): (() => void) => {
      if (!window.google) return () => {};

      // Default location (Jakarta)
      const defaultLocation = { lat: -6.2088, lng: 106.8456 };
      
      // Ekstrak lokasi dari URL atau gunakan default
      const urlLocation = mapsUrl ? extractLatLngFromUrl(mapsUrl) : null;
      const initialLocation = urlLocation || defaultLocation;

      // Buat peta
      const mapInstance = new window.google.maps.Map(mapElement, {
        center: initialLocation,
        zoom: urlLocation ? 16 : 12,
        mapTypeId: "roadmap",
      });

      // Buat marker jika ada lokasi dari URL
      let markerInstance: any = null;
      if (urlLocation) {
        markerInstance = new window.google.maps.Marker({
          position: urlLocation,
          map: mapInstance,
          draggable: true,
        });

        // Jika ada URL tapi tidak ada alamat, lakukan geocoding
        if (!address) {
          geocodeLocation(urlLocation, (formattedAddress) => {
            updateLocationFields(
              urlLocation.lat,
              urlLocation.lng,
              formattedAddress
            );
          });
        }
      }

      // Tambahkan search box
      const searchBoxContainer = document.createElement("div");
      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = "Search location...";
      searchInput.style.width = "300px";
      searchInput.style.padding = "8px 12px";
      searchInput.style.borderRadius = "4px";
      searchInput.style.border = "1px solid #d1d5db";
      searchBoxContainer.appendChild(searchInput);
      mapInstance.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
        searchBoxContainer
      );

      const searchBox = new window.google.maps.places.SearchBox(searchInput);

      // Event listener untuk search box
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        mapInstance.fitBounds(place.geometry.viewport);
        mapInstance.setZoom(16);

        if (markerInstance) {
          markerInstance.setPosition(location);
        } else {
          markerInstance = new window.google.maps.Marker({
            map: mapInstance,
            position: location,
            draggable: true,
          });
        }

        updateLocationFields(
          location.lat,
          location.lng,
          place.formatted_address || ""
        );
      });

      // Event listener untuk drag marker
      if (markerInstance) {
        markerInstance.addListener("dragend", () => {
          const position = markerInstance.getPosition();
          geocodeLocation(
            { lat: position.lat(), lng: position.lng() },
            (formattedAddress) => {
              updateLocationFields(
                position.lat(),
                position.lng(),
                formattedAddress
              );
            }
          );
        });
      }

      // Event listener untuk klik peta
      mapInstance.addListener("click", (e: any) => {
        if (!e.latLng) return;

        const location = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };

        if (markerInstance) {
          markerInstance.setPosition(location);
        } else {
          markerInstance = new window.google.maps.Marker({
            position: location,
            map: mapInstance,
            draggable: true,
          });
        }

        geocodeLocation(location, (formattedAddress) => {
          updateLocationFields(location.lat, location.lng, formattedAddress);
        });
      });

      // Cleanup function
      return () => {
        if (markerInstance) markerInstance.setMap(null);
        if (mapInstance) {
          window.google.maps.event.clearInstanceListeners(mapInstance);
        }
      };
    },
    [extractLatLngFromUrl, geocodeLocation, updateLocationFields]
  );

  return {
    isApiLoaded,
    initializeMap,
  };
};