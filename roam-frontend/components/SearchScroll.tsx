import React, { useState } from "react";
import SearchItem from "@/components/SearchItem";
import SearchResultExpansion from "@/components/SearchResultExpansion";
import { getTimeCategory } from "@/components/HelperFunctions/TimeFilter";
import { getNumStops } from "@/components/HelperFunctions/NumStopsFilter";

import { SearchProvider, useSearchContext } from "@/context/SearchContext";

import { Flight, FilterOptions, getPriceByPassengerType } from "@/models"
import flightData from "@/public/data/flightData";


interface SearchScrollProps {
  filters: FilterOptions;
  flights: Flight[];
}

const SearchScroll: React.FC<SearchScrollProps> = ({ filters, flights }) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const { searchData, setSearchData } = useSearchContext();

  const filterFlights = () => {
    return flights.filter((flight) => {
      const priceCheck =
        !filters.maxPrice || getPriceByPassengerType(searchData.seatTypeMapping, flight) <= parseInt(filters.maxPrice.replace("$", ""));
      const stopsCheck =
        !filters.stops || String(flight.num_stops) === filters.stops;
      const arrivalCheck =
        !filters.arrivalTime ||
        getTimeCategory(flight.arrival_time) === filters.arrivalTime;
      const departureCheck =
        !filters.departureTime ||
        getTimeCategory(flight.departure_time) === filters.departureTime;
      // const airlineCheck =
      //   !filters.airline || flight.airline === filters.airline;

      return (
        priceCheck &&
        stopsCheck &&
        arrivalCheck &&
        departureCheck //&&
        //airlineCheck
      );
    });
  };

  const filteredFlights = filterFlights();

  return (
    <div className="flex mb-10 h-[500px] justify-between">
      <div className="hide-scrollbar h-[500px] overflow-y-auto w-[800px] bg-white p-4 rounded-lg overflow-hidden">
        {filteredFlights.length === 0 ? (
          <div className="no-results">
            <p>No results found for your search criteria.</p>
          </div>
        ) : (
          filteredFlights.map((flight, index) => (
            <SearchItem
              key={index}
              flight={flight}
              onClick={() => setSelectedFlight(flight)}
            />
          ))
        )}
      </div>

      <div className="ml-20 w-[500px] h-full mr-10 mb-20">
        <SearchResultExpansion flight={selectedFlight} />
      </div>
    </div>
  );
};

export default SearchScroll;
