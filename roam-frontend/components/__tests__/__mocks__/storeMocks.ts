import { jest } from '@jest/globals';
import { Flight, Airport, Continent, Country, Location, Airline, Layover, FlightSeatConfiguration, DisplayPurchasePassenger, Passenger, DisplayPurchase, PassengerFormData, Trip } from '@/models';
import { TripData } from "@/context/TripContext"

export const mockContinent: Continent = {
  code: "NA",
  guid: "continent-guid",
  name: "North America",
};

export const mockCountry: Country = {
  code: "US",
  guid: "country-guid",
  name: "United States",
};

export const mockLocation: Location = {
  guid: "location-guid",
  latitude: 40.7128,
  longitude: -74.0060,
};

export const mockAirport: Airport = {
  guid: "airport-guid",
  full_name: "John F. Kennedy International Airport",
  iata_code: "JFK",
  short_name: "JFK",
  municipality_name: "New York",
  continent: mockContinent,
  country: mockCountry,
  location: mockLocation,
};

export const mockAirportOther: Airport = {
  guid: "airport-guid-other",
  full_name: "Pearson International Airport",
  iata_code: "YYZ",
  short_name: "YYZ",
  municipality_name: "Mississauga",
  continent: mockContinent,
  country: mockCountry,
  location: mockLocation,
};

export const mockDepartureAirport: Airport = {
  guid: "departure-airport-guid",
  full_name: "John F. Kennedy International Airport",
  iata_code: "JFK",
  short_name: "JFK Airport",
  municipality_name: "New York",
  continent: mockContinent,
  country: mockCountry,
  location: mockLocation,
};

export const mockArrivalAirport: Airport = {
  guid: "arrival-airport-guid",
  full_name: "Los Angeles International Airport",
  iata_code: "LAX",
  short_name: "LAX Airport",
  municipality_name: "Los Angeles",
  continent: mockContinent,
  country: mockCountry,
  location: mockLocation,
};

export const mockDepartureAirportOther: Airport = {
  guid: "departure-airport-guid-other",
  full_name: "Pearson International Airport",
  iata_code: "YYZ",
  short_name: "YYZ",
  municipality_name: "Mississauga",
  continent: mockContinent,
  country: mockCountry,
  location: mockLocation,
};

export const mockArrivalAirportOther: Airport = {
  guid: "arrival-airport-guid-other",
  full_name: "Billy Bishop Toronto City Airport",
  iata_code: "YTZ",
  short_name: "YTZ",
  municipality_name: "Toronto",
  continent: mockContinent,
  country: mockCountry,
  location: mockLocation,
};

export const mockAirportLayover: Airport = {
  guid: "layover-airport-guid",
  full_name: "Vancouver International Airport",
  iata_code: "YVR",
  short_name: "YVR",
  municipality_name: "Richmond",
  continent: mockContinent,
  country: mockCountry,
  location: mockLocation,
};

export const mockAirline: Airline = {
  guid: "airline-guid",
  icao_code: "AA",
  name: "American Airlines",
  logo_path: "/logos/aa.png",
};

export const mockAirlineOther: Airline = {
  guid: "airline-guid-other",
  icao_code: "ACC",
  name: "Air Canada",
  logo_path: "/logos/acc.png",
};

export const mockAirlineNoPhoto: Airline = {
  guid: "airline-guid-no-photo",
  icao_code: "ABB",
  name: "Air Baltic"
}

export const mockLayover: Layover = {
  guid: "layover-guid",
  airport: mockDepartureAirport,
  duration_minutes: 90,
};

export const mockLayoverOther: Layover = {
  guid: "layover-guid",
  airport: mockAirportLayover,
  duration_minutes: 90,
};

export const mockSeats = Array.from({ length: 10 }, (_, i) => ({
  seat_id: i + 1,
  type: i < 2 ? "Business" : "Economy",
  position: i % 3 === 0 ? "Window" : i % 3 === 1 ? "Aisle" : "Middle",
  available: i % 2 === 0,
}));


export const mockSeatConfiguration: FlightSeatConfiguration = {
  guid: "seat-config-guid",
  seats_available: mockSeats.filter(seat => seat.available).length,
  flight_id: "flight-guid",
  seat_configuration: mockSeats,
};


export const mockSeatSimple = ([
  {
    seat_id: 1,
    type: "Business",
    position: "Window",
    available: true,
  },
  {
    seat_id: 2,
    type: "Business",
    position: "Window",
    available: true,
  },
]);


export const mockSeatConfigurationSimple: FlightSeatConfiguration = {
  guid: "seat-config-guid",
  seats_available: 2,
  flight_id: "flight-guid",
  seat_configuration: mockSeatSimple,
};

export const mockCurrentFlight: Flight = {
  guid: "flight-guid",
  airline: mockAirline,
  departure_airport: mockDepartureAirport,
  arrival_airport: mockArrivalAirport,
  flight_time_minutes: 300,
  departure_time: "2023-12-25T10:00:00Z",
  arrival_time: "2023-12-25T13:00:00Z",
  num_stops: 1,
  price_economy: 300,
  price_business: 600,
  baggage_allowance: "2 bags",
  seat_configuration: mockSeatConfigurationSimple,
  layover: undefined,
};

export const mockFlightReturnNoSeats: Flight = {
  guid: "flight-guid-return",
  airline: mockAirlineNoPhoto,
  departure_airport: mockDepartureAirportOther,
  arrival_airport: mockArrivalAirportOther,
  flight_time_minutes: 500,
  departure_time: "2024-10-25T10:00:00Z",
  arrival_time: "2024-10-25T13:00:00Z",
  num_stops: 1,
  price_economy: 200,
  price_business: 800,
  baggage_allowance: "1 bag",
  seat_configuration: null,
  layover: undefined,
};

export const mockFlight: Flight = {
  guid: "flight-guid",
  airline: mockAirline,
  departure_airport: mockDepartureAirport,
  arrival_airport: mockArrivalAirport,
  flight_time_minutes: 300,
  departure_time: "2023-12-25T10:00:00Z",
  arrival_time: "2023-12-25T13:00:00Z",
  num_stops: 1,
  price_economy: 200,
  price_business: 600,
  baggage_allowance: "2 bags",
  seat_configuration: mockSeatConfiguration,
  layover: mockLayover,
};

export const mockFlightSameReturn: Flight = {
  guid: "flight-guid",
  airline: mockAirline,
  departure_airport: mockArrivalAirport,
  arrival_airport: mockDepartureAirport,
  flight_time_minutes: 300,
  departure_time: "2023-12-25T10:00:00Z",
  arrival_time: "2023-12-25T13:00:00Z",
  num_stops: 1,
  price_economy: 300,
  price_business: 600,
  baggage_allowance: "2 bags",
  seat_configuration: mockSeatConfiguration,
  layover: mockLayover,
};

export const mockFlightNoStop: Flight = {
  guid: "flight-guid",
  airline: mockAirline,
  departure_airport: mockDepartureAirport,
  arrival_airport: mockArrivalAirport,
  flight_time_minutes: 300,
  departure_time: "2023-12-25T10:00:00Z",
  arrival_time: "2023-12-25T13:00:00Z",
  num_stops: 0,
  price_economy: 300,
  price_business: 600,
  baggage_allowance: "2 bags",
  seat_configuration: mockSeatConfiguration,
  layover: undefined,
};

export const mockFlightOneStop: Flight = {
  guid: "flight-guid",
  airline: mockAirline,
  departure_airport: mockDepartureAirport,
  arrival_airport: mockArrivalAirport,
  flight_time_minutes: 300,
  departure_time: "2023-12-25T10:00:00Z",
  arrival_time: "2023-12-25T13:00:00Z",
  num_stops: 1,
  price_economy: 300,
  price_business: 600,
  baggage_allowance: "2 bags",
  seat_configuration: mockSeatConfiguration,
  layover: mockLayover,
};

export const mockFlightExpensive: Flight = {
  guid: "flight-guid",
  airline: mockAirline,
  departure_airport: mockDepartureAirport,
  arrival_airport: mockArrivalAirport,
  flight_time_minutes: 300,
  departure_time: "2023-12-25T10:00:00Z",
  arrival_time: "2023-12-25T13:00:00Z",
  num_stops: 0,
  price_economy: 900,
  price_business: 1200,
  baggage_allowance: "2 bags",
  seat_configuration: mockSeatConfiguration,
  layover: undefined,
};

export const mockFlightOutbound: Flight = {
  guid: "flight-guid-outbound",
  airline: mockAirline,
  departure_airport: mockDepartureAirport,
  arrival_airport: mockArrivalAirport,
  flight_time_minutes: 300,
  departure_time: "2023-12-25T10:00:00Z",
  arrival_time: "2023-12-25T13:00:00Z",
  num_stops: 1,
  price_economy: 300,
  price_business: 600,
  baggage_allowance: "2 bags",
  seat_configuration: mockSeatConfiguration,
  layover: mockLayoverOther,
};

export const mockFlightReturn: Flight = {
  guid: "flight-guid-return",
  airline: mockAirlineNoPhoto,
  departure_airport: mockArrivalAirportOther,
  arrival_airport: mockDepartureAirportOther,
  flight_time_minutes: 500,
  departure_time: "2024-10-25T10:00:00Z",
  arrival_time: "2024-10-25T13:00:00Z",
  num_stops: 1,
  price_economy: 200,
  price_business: 800,
  baggage_allowance: "1 bag",
  seat_configuration: mockSeatConfiguration,
  layover: undefined,
};

export const mockPassengerFormData: PassengerFormData = {
  name: "John",
  middle: "A",
  last: "Doe",
  prefix: "Mr.",
  dob: new Date("1990-01-01"),
  passport_number: "A1234567",
  email: "johndoe@example.com",
  phone: "123-456-7890",
  street_address: "123 Main St",
  apt_number: "4B",
  province: "ON",
  zip_code: "12345",
  emerg_name: "Jane",
  emerg_last: "Doe",
  emerg_email: "janedoe@example.com",
  emerg_phone: "098-765-4321",
  known_traveller_number: "KT123456789",
  same_as_passenger: true
};

export const mockPassengerSingle: Passenger = {
  guid: "passenger-guid-1",
  trip_id: "trip-guid",
  name: "John Doe",
  departing_seat_id: 1,
  returning_seat_id: 1,
  middle: "A.",
  last: "Doe",
  prefix: "Mr.",
  dob: new Date("1990-01-01"),
  passport_number: "123456789",
  known_traveller_number: "KT123456",
  email: "john.doe@example.com",
  phone: "+1234567890",
  street_address: "123 Main St",
  apt_number: "4B",
  province: "NY",
  zip_code: "10001",
  emerg_name: "Jane Doe",
  emerg_last: "Doe",
  emerg_email: "jane.doe@example.com",
  emerg_phone: "+1234567891",
}

export const mockPassengers: Passenger[] = [
  {
    guid: "passenger-guid-1",
    trip_id: "trip-guid",
    name: "John Doe",
    departing_seat_id: 1,
    returning_seat_id: 1,
    middle: "A.",
    last: "Doe",
    prefix: "Mr.",
    dob: new Date("1990-01-01"),
    passport_number: "123456789",
    known_traveller_number: "KT123456",
    email: "john.doe@example.com",
    phone: "+1234567890",
    street_address: "123 Main St",
    apt_number: "4B",
    province: "NY",
    zip_code: "10001",
    emerg_name: "Jane Doe",
    emerg_last: "Doe",
    emerg_email: "jane.doe@example.com",
    emerg_phone: "+1234567891",
  },
  {
    guid: "passenger-guid-2",
    trip_id: "trip-guid",
    name: "Jane Doe",
    departing_seat_id: 2,
    returning_seat_id: 2,
    middle: "B.",
    last: "Doe",
    prefix: "Ms.",
    dob: new Date("1992-02-02"),
    passport_number: "987654321",
    known_traveller_number: "KT987654",
    email: "jane.doe@example.com",
    phone: "+1234567892",
    street_address: "456 Elm St",
    apt_number: "5A",
    province: "CA",
    zip_code: "90001",
    emerg_name: "John Doe",
    emerg_last: "Doe",
    emerg_email: "john.doe@example.com",
    emerg_phone: "+1234567890",
  }
];

export const mockPassengerMin: Passenger =
{
  guid: "passenger-guid-1",
  trip_id: "trip-guid",
  name: undefined,
  departing_seat_id: 0,
  returning_seat_id: undefined,
  middle: undefined,
  last: undefined,
  prefix: undefined,
  dob: undefined,
  passport_number: undefined,
  known_traveller_number: undefined,
  email: undefined,
  phone: undefined,
  street_address: undefined,
  apt_number: undefined,
  province: undefined,
  zip_code: undefined,
  emerg_name: undefined,
  emerg_last: undefined,
  emerg_email: undefined,
  emerg_phone: undefined,
};

export const mockTripData: TripData = {
  trip: {
    guid: "trip-guid",
    name: "Holiday Trip",
    is_round_trip: true,
    departing_flight: mockFlight,
    returning_flight: mockFlightSameReturn,
    passengers: mockPassengers,
    departure_date: new Date("2023-12-25T10:00:00Z"),
    return_date: new Date("2023-12-31T15:00:00Z"),
  },
  current_flight: mockFlight,
  current_flight_departure_date: new Date("2023-12-25T10:00:00Z"),
  departure_date: new Date("2023-12-25T10:00:00Z"),
  return_date: new Date("2023-12-31T15:00:00Z"),
  total_cost: 900,
  trip_booking_active: true,
  trip_purchased: false,
};

export const mockTrip: Trip = {
  guid: "trip-guid",
  name: "Holiday Trip",
  is_round_trip: true,
  departing_flight: mockFlight,
  returning_flight: mockFlight,
  passengers: mockPassengers,
  departure_date: new Date("2023-12-25T10:00:00Z"),
  return_date: new Date("2023-12-31T15:00:00Z"),
};

export const mockTripOneWay: Trip = {
  guid: "trip-guid",
  name: "Holiday Trip",
  is_round_trip: false,
  departing_flight: mockFlight,
  passengers: mockPassengers,
  departure_date: new Date("2023-12-25T10:00:00Z"),
  return_date: null,
}

export const mockTripNoSeats: Trip = {
  guid: "trip-guid",
  name: "Holiday Trip",
  is_round_trip: true,
  departing_flight: mockFlight,
  returning_flight: mockFlightReturnNoSeats,
  passengers: mockPassengers,
  departure_date: new Date("2023-12-25T10:00:00Z"),
  return_date: new Date("2023-12-31T15:00:00Z"),
}

export const mockTripDataOther: TripData = {
  trip: {
    guid: "trip-guid",
    name: "Holiday Trip",
    is_round_trip: true,
    departing_flight: mockFlight,
    returning_flight: mockFlightReturn,
    passengers: [mockPassengerMin],
    departure_date: new Date("2023-12-25T10:00:00Z"),
    return_date: new Date("2023-12-31T15:00:00Z"),
  },
  current_flight: mockFlight,
  current_flight_departure_date: new Date("2023-12-25T10:00:00Z"),
  departure_date: new Date("2023-12-25T10:00:00Z"),
  return_date: new Date("2023-12-31T15:00:00Z"),
  total_cost: 900,
  trip_booking_active: true,
  trip_purchased: false,
};

export const mockDisplayPurchasePassenger: DisplayPurchasePassenger = {
  name: "John Doe",
  departing_flight: mockFlightOutbound,
  returning_flight: mockFlightReturn,
  departure_seat: "12",
  return_seat: "14",
  departure_date: new Date("2023-12-25T10:00:00Z"),
  return_date: new Date("2023-12-30T15:00:00Z"),
};

export const mockDisplayPurchasePassengerNoFlights: DisplayPurchasePassenger = {
  name: "John Doe",
  departing_flight: null,
  returning_flight: null,
  departure_seat: "12",
  return_seat: "14",
  departure_date: new Date("2023-12-25T10:00:00Z"),
  return_date: new Date("2023-12-30T15:00:00Z"),
}

export const mockDisplayPurchasePassengerNoReturn: DisplayPurchasePassenger = {
  name: "John Doe",
  departing_flight: mockFlightOutbound,
  returning_flight: null,
  departure_seat: "12",
  return_seat: null,
  departure_date: new Date("2023-12-25T10:00:00Z"),
  return_date: null
}

export const mockDisplayPurchasePassengerOther: DisplayPurchasePassenger = {
  name: "John Doe",
  departing_flight: mockFlightOutbound,
  returning_flight: mockFlightReturn,
  departure_seat: null,
  return_seat: null,
  departure_date: null,
  return_date: null,
}

export const mockDisplayPurchase: DisplayPurchase = {
  guid: "purchase-guid-456",
  title: "Holiday Trip to NYC",
  passengers: [
    mockDisplayPurchasePassenger
  ],
  subtotal: 600,
  taxes: 50,
  total_cost: 650,
};



// Mock Zustand stores
type TripDataUpdate = Partial<TripData> | ((prev: TripData) => TripData);

export const mockUseTripStore = {
  tripData: mockTripData,
  setTripData: jest.fn(),

  getState: jest.fn(() => ({
    tripData: mockTripData,
  })),

  setState: jest.fn((update: TripDataUpdate) => {
    mockUseTripStore.tripData =
      typeof update === "function"
        ? update(mockUseTripStore.tripData)
        : { ...mockUseTripStore.tripData, ...update };
  }),
};

export const mockUseLoaderStore = {
  isLoading: false,
  showLoader: jest.fn(),
  hideLoader: jest.fn(),
};

export const mockSearchData = {
  departureAirport: mockAirport,
  arrivalAirport: { ...mockAirport, guid: "arrival-airport-guid", iata_code: "LAX", short_name: "LAX", municipality_name: "Los Angeles" },
  departureDate: new Date("2024-10-21"),
  returnDate: new Date("2024-10-28"),
  passengers: 2,
  seatTypeMapping: { 1: "Economy", 2: "Business" },
  isRoundTrip: true,
  selectedAirlines: ["Delta", "United"],
};


// Mock store for useSearchStore
export const mockUseSearchStore = {
  searchData: mockSearchData,
  setSearchData: jest.fn(),
};

// Mock store for useAuthStore Signed In
export const mockAuthStoreSignedIn = {
  authData: {
    guid: "user-guid-123",
    isSignedIn: true,
    showPleaseSignInPopup: false,
    showBadAccessPopup: false,
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
  setAuthData: jest.fn(),
  setShowPleaseSignInPopup: jest.fn(),
  setBadAccessPopup: jest.fn(),
};

// Mock store for useAuthStore Signed Out
export const mockAuthStoreSignedOut = {
  authData: {
    guid: "",
    isSignedIn: false,
    showPleaseSignInPopup: false,
    showBadAccessPopup: false,
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
  setAuthData: jest.fn(),
  setShowPleaseSignInPopup: jest.fn(),
  setBadAccessPopup: jest.fn(),
};

