from typing import Optional, Dict, Union, List

class FlightSeatsDTO:
    """DTO for flight seat details and availability."""
    def __init__(self, guid: str, seats_available: int, flight_id: str,
                 seat_configuration: List[Dict[str, Union[int, str, bool]]] = None):
        self.guid = guid
        self.seats_available = seats_available
        self.flight_id = flight_id
        self.seat_configuration = seat_configuration

    def to_dict(self) -> Dict[str, Optional[Dict]]:
        return {
            "guid": self.guid,
            "seats_available": self.seats_available,
            "flight_id": self.flight_id,
            "seat_configuration": self.seat_configuration
        }
        
    @staticmethod
    def from_dict(data: Dict[str, Union[str, int, List[Dict[str, Union[int, str, bool]]]]]) -> "FlightSeatsDTO":
        return FlightSeatsDTO(
            guid=data.get("guid", ""),
            seats_available=data.get("seats_available", 0),
            flight_id=data.get("flight_id", ""),
            seat_configuration=data.get("seat_configuration", [])
        )
        
    def create_seat_configuration(self, seat_configuration: List[Dict[str, Union[int, str, bool]]]) -> List[Dict[str, Union[int, str, bool]]]:
        # Each seat should have a seat_id, type, position, and availablity
        return [
            {
                "seat_id": seat.get("seat_id"),
                "type": seat.get("type"),
                "position": seat.get("position"),
                "available": seat.get("available")
            }
            for seat in seat_configuration
        ]