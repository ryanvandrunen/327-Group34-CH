'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Airplane from "@/components/SeatSelection/Airplane";
import BookingForm from "@/components/SeatBookingForm";
import Header from "@/components/Header";
import LoaderPopup from "@/components/LoaderPopup";
import SeatBookingFormFooter from "@/components/SeatBookingFormFooter";
import { TripProvider, useTripContext } from "@/context/TripContext";
import { PossibleSeatStates } from "@/components/SeatSelection/Seat";
import { fetchFlightSeats } from "@/api/FetchFlightSeats";
import { PassengerFormData, transformToPassenger, Seat, Flight } from "@/models"

export default function SeatBookingPage() {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [passengerName, setPassengerName] = useState<string>("");
  const [isRoundTrip] = useState<boolean>(true);
  const [isFirstFlight, setIsFirstFlight] = useState<boolean>(true);
  const [passengerIndex, setPassengerIndex] = useState<number>(0);
  const { tripData, setTripData } = useTripContext();
  const [loading, setLoading] = useState<boolean>(true)
  const [groupSize, setGroupSize] = useState<number>(tripData?.trip?.passengers?.length || 5);
  const [seatStates, setSeatStates] = useState<{ [id: number]: PossibleSeatStates }>({});

  const router = useRouter();

  const cancel = () => {
    router.back();
  };

  const [formData, setFormData] = useState<PassengerFormData>({
    name: tripData?.trip?.passengers?.[passengerIndex]?.name ?? "",
  });

  useEffect(() => {
    loadPassengerData(passengerIndex);
  }, [passengerIndex, tripData]);

  const loadPassengerData = (index: number) => {
    const passenger = tripData.trip.passengers[index] || {};
    setFormData({
      name: passenger.name || "",
      last: passenger.last || "",
      middle: passenger.middle || "",
      prefix: passenger.prefix || "",
      dob: passenger.dob || undefined,
      passport_number: passenger.passport_number || "",
      known_traveller_number: passenger.known_traveller_number || "",
      email: passenger.email || "",
      phone: passenger.phone || "",
      street_address: passenger.street_address || "",
      apt_number: passenger.apt_number || "",
      zip_code: passenger.zip_code || "",
      emerg_name: passenger.emerg_name || "",
      emerg_last: passenger.emerg_last || "",
      emerg_email: passenger.emerg_email || "",
      emerg_phone: passenger.emerg_phone || "",
    });
  };

  const initializeSeatStates = (seats: Seat[]) => {
    const newSeatStates: { [id: number]: PossibleSeatStates } = {};
    seats.forEach(seat => {
      newSeatStates[seat.seat_id] = seat.available ? "available" : "taken";
    });
    setSeatStates(newSeatStates);
    setLoading(false);
  };

  const loadFlightSeats = async (flight: Flight) => {
    try {
      const flightConfig = await fetchFlightSeats(flight.guid);
      initializeSeatStates(flightConfig.seat_configuration);
      flight.seat_configuration = flightConfig;
    } catch (error) {
      console.error("Error fetching seat data:", error);
    }
  };

  useEffect(() => {
    loadFlightSeats(tripData.current_flight);
  }, [tripData.current_flight]);

  const toggleSeatState = (id: number) => {
    setSeatStates((prevState) => {
      const newSeatStates: { [id: number]: PossibleSeatStates } = {};

      Object.keys(prevState).forEach((seatId) => {
        const seatIdNumber = Number(seatId);
        if (seatIdNumber === id && prevState[seatIdNumber] === "available") {
          newSeatStates[seatIdNumber] = "selected";
          handleSeatClick(id);
        } else if (prevState[seatIdNumber] === "selected") {
          newSeatStates[seatIdNumber] = "available";
          handleSeatClick(id);
        } else {
          newSeatStates[seatIdNumber] = prevState[seatIdNumber];
        }
      });

      return newSeatStates;
    });
  };

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeat(seatNumber === selectedSeat ? null : seatNumber);
  };

  const updateFormData = (newData: Partial<PassengerFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleFormSubmit = async () => {
    setLoading(true)
    const existingPassenger = tripData.trip.passengers[passengerIndex];
    const passengerData = {
      ...transformToPassenger(formData, existingPassenger),
      ...(isFirstFlight 
        ? { departing_seat_id: selectedSeat ?? 0 }
        : { returning_seat_id: selectedSeat ?? 0 }
      ),
    };

    setTripData((prevTrip) => ({
        ...prevTrip,
        trip: {
            ...prevTrip.trip,
            passengers: [
                ...prevTrip.trip.passengers.slice(0, passengerIndex),
                passengerData,
                ...prevTrip.trip.passengers.slice(passengerIndex + 1),
            ],
        },
    }));

    if (selectedSeat !== null) {
      setSeatStates((prev) => ({
        ...prev,
        [selectedSeat]: "reserved",
      }));
    }

    if (isFirstFlight) {
      if (tripData?.trip?.passengers && tripData.trip.passengers.length < groupSize) {
        setGroupSize(tripData.trip.passengers.length);
      }
      if (passengerIndex < groupSize - 1) {
        setPassengerIndex(passengerIndex + 1);
        loadPassengerData(passengerIndex + 1);
        setSelectedSeat(null);
        setLoading(false)
      } else {
        setPassengerIndex(0);
        setIsFirstFlight(false);
        loadPassengerData(0);
        setSelectedSeat(null);
        const next_flight = tripData.trip.returning_flight ?? tripData.current_flight;
        setTripData((prevTrip) => ({
          ...prevTrip,
          current_flight: next_flight,
          current_flight_departure_date: tripData.return_date,
        }));
        loadFlightSeats(next_flight);
      }
    } 
    else if (passengerIndex < groupSize - 1) {
      setPassengerIndex(passengerIndex + 1);
      loadPassengerData(passengerIndex + 1);
      setSelectedSeat(null);
      setLoading(false)
    }
    else {
      const next_flight = tripData.trip.departing_flight ?? tripData.current_flight;
        setTripData((prevTrip) => ({
          ...prevTrip,
          current_flight: next_flight,
          current_flight_departure_date: tripData.departure_date,
        }));
      router.push('/checkout');
    }
  };

  return (
    <TripProvider>
      <LoaderPopup isOpen={loading} />
      <div className="relative">
        <Header headerSize="small" backgroundImage logoColour="black" displayProfilePicture />
        <div className="relative flex overflow-hidden z-20 bg-neutral-50" style={{ height: "calc(100vh - 150px)" }}>
          <div className={`relative transition-all duration-300 ease-in-out overflow-hidden ${selectedSeat ? "w-2/4" : "w-full"}`} style={{ height: "100%" }}>
            <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
              <Airplane onSeatClick={toggleSeatState} seatStates={seatStates} areSeatsInitialized={!loading} />
            </div>
          </div>
          {selectedSeat && (
            <div className="absolute right-0 w-4/7 h-full bg-white shadow-lg transition-opacity duration-300 ease-in-out opacity-100 flex flex-col justify-between">
              <div className="p-8 flex-1 overflow-auto">
                <BookingForm
                  currentPassengerIndex={passengerIndex}
                  firstPassengerData={tripData.trip.passengers[0]}
                  setPassengerName={setPassengerName}
                  formData={formData}
                  updateFormData={updateFormData}
                  onSubmit={handleFormSubmit}
                />
              </div>
              <div className="bg-gray-200 p-4">
                <SeatBookingFormFooter
                  passengerName={passengerName}
                  seatNumber={selectedSeat}
                  groupSize={groupSize}
                  passengerIndex={passengerIndex}
                  isRoundTrip={isRoundTrip}
                  isFirstFlight={isFirstFlight}
                  onCancel={cancel}
                  onNextPassenger={handleFormSubmit}
                  onNextFlight={handleFormSubmit}
                  onContinue={handleFormSubmit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </TripProvider>
  );
}
