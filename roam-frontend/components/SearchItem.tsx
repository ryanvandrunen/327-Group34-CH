"use client";

import React, { FC } from "react";
import Image from "next/image";

interface SearchItemProps {
  leftIcon: string;
  airline: string;
  tripLength: string;
  departureTime: string;
  arrivalTime: string;
  numStops: string;
  stopInfo: string;
  price: string;
  tripType: string;
  onClick: () => void;
}

const SearchItem: FC<SearchItemProps> = ({
  leftIcon,
  airline,
  tripLength,
  departureTime,
  arrivalTime,
  numStops,
  stopInfo,
  price,
  tripType,
  onClick,
}) => {
  return (
    <button
      className="flex items-center justify-between w-[700px] p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition-all"
      onClick={onClick}
    >
      {/* Box for Left Icon and Airline */}
      <div className="flex items-center w-[200px]">
        <Image
          src={leftIcon || '/images/default.png'}
          alt="Left Icon"
          width={36}
          height={36}
          className="mr-2"
        />
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500">{tripLength}</span>
          <span className="text-sm text-gray-500">{airline}</span>
        </div>
      </div>

      {/* Box for Departure and Arrival Times */}
      <div className="flex flex-col items-center w-[200px]">
        <div className="flex items-center">
          <span className="text-md text-gray-500 font-semibold mr-2">
            {departureTime}
          </span>
          <span className="mx-2"> - </span>
          <span className="text-md text-gray-500 font-semibold">
            {arrivalTime}
          </span>
        </div>
      </div>

      {/* Box for Number of Stops and Stop Info */}
      <div className="flex flex-col ml-4 items-center w-[200px]">
        <span className="text-sm text-gray-500">{numStops}</span>
        <span className="text-sm text-gray-500 whitespace-normal">{stopInfo}</span>
      </div>

      {/* Box for Price and Trip Type */}
      <div className="flex flex-col items-end w-[200px]">
        <span className="text-lg text-gray-500 font-semibold">{price}</span>
        <span className="text-sm text-gray-500">{tripType}</span>
      </div>
    </button>
  );
};

export default SearchItem;

