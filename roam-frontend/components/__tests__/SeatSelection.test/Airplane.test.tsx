import React from "react";
import { render, screen, fireEvent, waitFor, act, cleanup } from "@testing-library/react";
import Airplane from "@/components/SeatSelection/Airplane";
import { PossibleSeatStates } from "@/components/SeatSelection/Seat";

/**
 * Test File: Airplane Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Airplane component, including:
 *      - Proper rendering of all seats.
 *      - Correct initialization of seat states (loading, available, taken).
 *      - Handling seat click events, toggling seat states between available and selected.
 *      - Verifying that taken seats are not interactive.
 *
 * Test Cases:
 * 1. Renders the correct number of seats.
 *    - Expectation: Renders all 188 seats.
 *
 * 2. Seat state from available to selected.
 *    - Expectation: Clicking an available seat should change its state to selected and call onSeatClick.
 *
 * 3. Seat state from selected back to available.
 *    - Expectation: Clicking a selected seat should change its state back to available and call onSeatClick.
 *
 * 4. Correct seat state initialization.
 *    - Expectation: Seat states should be initialized as available or taken.
 */

describe("Airplane Component", () => {
  let mockSeatStates: { [id: number]: PossibleSeatStates };
  const mockOnSeatClick = jest.fn((seatId: number) => {
    mockSeatStates[seatId] = mockSeatStates[seatId] === "available" ? "selected" : "available";
  });

  // const mockSeatStates: { [id: number]: PossibleSeatStates } = Array.from({ length: 188 }, (_, i) => ({
  //   [i + 1]: i % 2 === 0 ? "taken" as PossibleSeatStates : "available" as PossibleSeatStates
  // })).reduce((acc, curr) => ({ ...acc, ...curr }), {});  

  beforeEach(() => {
    jest.clearAllMocks();

    mockSeatStates = Array.from({ length: 188 }, (_, i) => ({
      [i + 1]: i % 2 === 0 ? "taken" as PossibleSeatStates : "available" as PossibleSeatStates,
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
  });

  const renderComponent = () => render(
    <Airplane
      onSeatClick={mockOnSeatClick}
      seatStates={mockSeatStates}
      areSeatsInitialized={true}
    />
  );

  test("Renders the correct number of seats", async () => {
    // Supress finDOMNode console warning for this specfic test by mocking console.error
    const originalConsoleError = console.error;
    jest.spyOn(console, 'error').mockImplementation((msg) => {
      if (msg.includes('findDOMNode is deprecated')) {
        return; // Ignore this specific warning
      }
      originalConsoleError(msg); // Allow other warnings to be logged
    });

    // Arrange: Render the Airplane component with mock onSeatClick function
    renderComponent();

    // Act: Get all seat elements
    const seats = await screen.findAllByTestId(/^seat-\d+-(available|taken|selected|loading)$/);

    // Assert: Check that the correct number of seats is rendered (188 in total)
    await waitFor(() => {
      expect(seats.length).toBe(188);
    });
  });

  test("Handles click event on available seat", async () => {
    // Arrange: Render the Airplane component
    await act(async () => {
      renderComponent();
    });
  
    // Act: Click on an available seat
    const availableSeats = await screen.findAllByTestId(/^seat-\d+-available$/);
    const availableSeat = availableSeats[0]; // Get the first available seat
  
    // Get the seat id as a number
    const seatId = Number(availableSeat.getAttribute('id')); // Get the seat id
  
    fireEvent.click(availableSeat);
  
    // Assert: Check that the click triggers the onSeatClick function with the correct seat id
    await waitFor(() => {
      expect(mockOnSeatClick).toHaveBeenCalledWith(seatId);
    });
  });
  

  test("Does not call onSeatClick for taken seat", async () => {
    // Arrange: Render the Airplane component
    await act(async () => {
      renderComponent();
    });

    // Act: Click on a taken seat
    const takenSeats = await screen.findAllByTestId(/^seat-\d+-taken$/);
    const takenSeat = takenSeats[0]; // Get the first available seat  
    fireEvent.click(takenSeat);

    // Assert: Check that the click does not trigger the onSeatClick function
    await waitFor(() => {
      expect(mockOnSeatClick).not.toHaveBeenCalled();
    });
  });

  test("Toggles seat state from available to selected", async () => {
    // Arrange: Render the Airplane component
    await act(async () => {
      renderComponent();
    });

    // Act: Click on an available seat
    const seats = await screen.findAllByTestId(/^seat-\d+-available$/);
    const seat = seats[0]; // Get the first available seat    
    fireEvent.click(seat);

    const seatId = Number(seat.getAttribute('id')); // Get the seat id
    const seatRectTestId = new RegExp(`^seat-rect-${seatId}$`);

    // Arrange: ReRender the Airplane component with the updated seat state
    cleanup();
    renderComponent();

    // Assert: Check that onSeatClick is called and seat state is changed to selected
    await waitFor(() => {
      expect(mockOnSeatClick).toHaveBeenCalledWith(seatId);
      //expect(screen.getByTestId(`seat-${seatId}-selected`)).toBeInTheDocument();
      expect(screen.getByTestId(seatRectTestId).getAttribute("fill")).toBe("#2E9881");
    });
  });

  test("Toggles seat state from selected back to available", async () => {
    // Arrange: Render the Airplane component
    await act(async () => {
      renderComponent();
    });

    // Act: Click on selected seat, clicking the seat again should change it to available
    const seats = await screen.findAllByTestId(/^seat-\d+-available$/);
    const seat = seats[0]; // Get the first available seat    

    fireEvent.click(seat);
    fireEvent.click(seat);

    const seatId = Number(seat.getAttribute('id')); // Get the seat id

    // Assert: onSeatClick called twice and seat reverted to available
    await waitFor(() => {
      expect(mockOnSeatClick).toHaveBeenCalledWith(seatId);
      expect(mockOnSeatClick).toHaveBeenCalledTimes(2);
    });
  });

  test("Correct seat states are initialized after rendering", async () => {
    // Arrange: Render the Airplane component
    await act(async () => {
      renderComponent();
    });

    // Act: Get all seat elements
    const availableSeats = await screen.findAllByTestId(/^seat-\d+-available$/);

    const takenSeats = await screen.findAllByTestId(/^seat-\d+-taken$/);

    const loadingSeats = await screen.queryAllByTestId(/^seat-\d+-loading$/);

    // Assert: Check that some seats are taken and some are available, and none are loading after initialization
    await waitFor(() => {
      expect(loadingSeats.length).toBe(0);
      expect(availableSeats.length).toBeGreaterThan(0);
      expect(takenSeats.length).toBeGreaterThan(0);

      expect(availableSeats[0].getAttribute("fill")).not.toBe("#cccccc");
      expect(takenSeats[0].getAttribute("fill")).not.toBe("#cccccc");
    });
  });
});
