import { FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { useStore } from "../../../hooks/useStore"; // Adjust the import path as needed
import { useEffect, useCallback } from "react";

const Header = () => {
  const { state, loadStore } = useStore();
  const { name, isOpen, address, whatsapp, mapsUrl = "" } = state.store || {};

  const loadStoreData = useCallback(async () => {
    if (state.store.length === 0 && !state.isLoading) {
      try {
        await loadStore();
      } catch (err) {
        console.error("Failed to load store data:", err);
      }
    }
  }, [state.store.length, state.isLoading, loadStore]);

  useEffect(() => {
    loadStoreData();
  }, [loadStoreData]);

  const nameParts = name ? name.split(" ") : ["Toko", "Online"];
  const firstName = nameParts.slice(0, -1).join(" "); // All words except last
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ""; // Last word

  const getTransformedMapsUrl = () => {
    if (mapsUrl.includes("maps/place")) {
      return mapsUrl;
    }
    const coordMatch = mapsUrl.match(/q=([-\d.]+),([-\d.]+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      return `https://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},16z`;
    }
  };

  return (
    <header className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white leading-tight">
            {firstName}{" "}
            {lastName && (
              <span className="text-violet-600 dark:text-violet-400">
                {lastName}
              </span>
            )}
          </h1>
          <div className="w-16 h-1 bg-violet-500 mx-0"></div>
        </div>

        <div className="flex flex-col items-center lg:flex-row lg:items-stretch gap-8 lg:gap-12">
          <div className="w-full lg:w-2/5 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            <div className="w-full flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-violet-100 dark:bg-slate-700 rounded-lg text-violet-600 dark:text-violet-400 flex-shrink-0">
                  <FiMapPin className="text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
                    Alamat Toko
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {address || "Jl. Contoh No. 123, Kota Anda, Kode Pos 12345"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-violet-100 dark:bg-slate-700 rounded-lg text-violet-600 dark:text-violet-400 flex-shrink-0">
                  <FiClock className="text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
                    Jam Operasional
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Senin-Minggu: 08.00 - 21.00 WIB
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isOpen
                    ? "bg-teal-100/50 dark:bg-teal-900/50"
                    : "bg-rose-100/50 dark:bg-rose-900/50"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    isOpen ? "bg-teal-500" : "bg-rose-500"
                  }`}
                ></span>
                <span
                  className={`font-medium ${
                    isOpen
                      ? "text-teal-800 dark:text-teal-200"
                      : "text-rose-800 dark:text-rose-200"
                  }`}
                >
                  {isOpen ? "Toko Sedang Buka" : "Toko Sedang Tutup"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full">
              <a
                href={`https://wa.me/${whatsapp || "6281234567890"}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <FiPhone className="text-lg" />
                <span className="font-medium">WhatsApp</span>
              </a>
              <a
                href={
                  getTransformedMapsUrl() ||
                  "https://maps.google.com?q=Jl.+Contoh+No.+123,+Kota+Anda"
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                <FiMapPin className="text-lg" />
                <span className="font-medium">Buka Maps</span>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
              <iframe
                src={
                  mapsUrl ||
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x9cb5e6416a5cdb09!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1620004072250!5m2!1sen!2sid"
                }
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                className="w-full h-full dark:grayscale-[20%] dark:opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
