import { TextInput } from "../../ui/TextInput";
import type { StoreFormFieldsProps } from "../../../types/storeTypes";
import { useEffect, useRef } from "react";
import { useGoogleMaps } from "../../../hooks/useGoogleMaps";
import React from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const StoreFormFields = React.memo(
  ({ store, onChange, errors }: StoreFormFieldsProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const { isApiLoaded, initializeMap } = useGoogleMaps(API_KEY, onChange);

    useEffect(() => {
      if (!isApiLoaded || !mapRef.current) return;

      const cleanup = initializeMap(
        mapRef.current,
        store.mapsUrl,
        store.address
      );

      return () => {
        if (cleanup) cleanup();
      };
    }, [isApiLoaded, store.mapsUrl, store.address, initializeMap]);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* Left Column - Store Information */}
        <div className="flex flex-col lg:col-span-1 h-full">
          <TextInput
            label="Store Name"
            name="name"
            type="text"
            placeholder="Enter store name"
            value={store.name}
            onChange={onChange}
            required
            autoFocus
            error={errors?.name} // Pastikan ini terhubung
          />

          <TextInput
            label="Logo URL (Optional)"
            name="logo"
            type="url"
            value={store.logo || ""}
            onChange={onChange}
            placeholder="https://example.com/logo.jpg"
            error={errors?.logo} // Pastikan ini terhubung
          />

          <TextInput
            label="WhatsApp Number (Optional)"
            name="whatsapp"
            type="tel"
            value={store.whatsapp || ""}
            onChange={onChange}
            placeholder="+6281234567890"
            error={errors?.whatsapp} // Pastikan ini terhubung
          />

          <TextInput
            label="Instagram (Optional)"
            name="instagram"
            type="text"
            value={store.instagram || ""}
            onChange={onChange}
            placeholder="@yourstore"
            error={errors?.instagram} // Pastikan ini terhubung
          />

          <TextInput
            label="Facebook (Optional)"
            name="facebook"
            type="text"
            value={store.facebook || ""}
            onChange={onChange}
            placeholder="yourstore"
            error={errors?.facebook} // Pastikan ini terhubung
          />

          <TextInput
            label="TikTok (Optional)"
            name="tiktok"
            type="text"
            value={store.tiktok || ""}
            onChange={onChange}
            placeholder="@yourstore"
            error={errors?.tiktok} // Pastikan ini terhubung
          />
        </div>

        {/* Right Column - Location Information */}
        <div className="flex flex-col lg:col-span-1 h-full">
          <div className="flex-1 min-h-0 mb-4">
            <div className="h-full flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Store Address
              </label>
              <textarea
                name="address"
                value={store.address}
                onChange={onChange}
                placeholder="Address will be filled automatically"
                required
                className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div className="flex-1 min-h-0 mb-4">
            <div className="h-full flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Google Maps Link
              </label>
              <textarea
                name="mapsUrl"
                value={store.mapsUrl}
                onChange={onChange}
                placeholder="Will be generated automatically"
                required
                readOnly
                className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            {errors.mapsUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.mapsUrl}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:col-span-2 h-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Maps
          </label>
          <div className="h-full w-full rounded-lg overflow-hidden border border-gray-300 mb-4">
            {isApiLoaded ? (
              <div ref={mapRef} className="h-full w-full" />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">Loading map...</p>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Klik pada peta atau cari lokasi untuk mengatur lokasi toko
          </p>
        </div>
      </div>
    );
  }
);
