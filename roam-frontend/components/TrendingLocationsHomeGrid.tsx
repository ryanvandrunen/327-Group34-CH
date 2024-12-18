"use client";

import React from "react";
import Image from "next/image";
import { PopularDestination } from "@/models/popular_destination";

interface TrendingLocationsHomeGridProps {
  destinations: PopularDestination[];
  isSmallScreen?: boolean; // Optional override screen size for testing
}

const TrendingLocationsHomeGrid: React.FC<TrendingLocationsHomeGridProps> = ({
  destinations,
  isSmallScreen,
}) => {
  return (
    <section className="mb-16" data-testid="trending-locations-grid">
      <h2 className="text-5xl font-bold text-center mb-2">
        Popular Destinations
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Trending destinations today
      </p>

      <div className="px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
        <ul
          className={`grid grid-cols-2 ${
            isSmallScreen === false ? "" : "md:grid-cols-4 lg:grid-cols-5"
          } gap-4 list-none`}
          data-testid={"destinations"}
        >
          {destinations.map((destination, index) => (
            <li
              key={destination.guid}
              className={`flex flex-col items-center ${
                index === 4 && (isSmallScreen === true || isSmallScreen === undefined)
                  ? "hidden lg:flex"
                  : ""
              }`}
              data-testid={`destination-item-${index}`}
            >
              <figure
                className="relative rounded-2xl overflow-hidden group w-full sm:max-w-[250px] md:max-w-[300px] lg:max-w-[1200px] lg:min-w-[200px] aspect-[3/2]"
                data-testid="destination-figure"
              >
                <Image
                  src={destination.image_path || "/assets/placeholder.svg"}
                  alt={destination.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 group-hover:scale-110"
                  data-testid="destination-image"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"
                  data-testid="image-overlay"
                ></div>
              </figure>
              <figcaption
                className="mt-3 text-lg font-semibold text-gray-800 tracking-wide"
                data-testid="destination-name"
              >
                {destination.name}
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrendingLocationsHomeGrid;
