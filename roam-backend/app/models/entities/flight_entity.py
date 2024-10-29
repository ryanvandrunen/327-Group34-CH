import uuid
from app import db
from app.models.entities.airline_entity import AirlineEntity
from app.models.entities.airport_entity import AirportEntity
from app.models.entities.layover_entity import LayoverEntity
from app.models.dto.flight_dto import FlightDTO

class FlightEntity(db.Model):
    __tablename__ = 'flights'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    flight_time_minutes: int = db.Column(db.Integer, nullable=False)  # Flight duration in minutes
    
    # Foreign keys
    airline_id: str = db.Column(db.String(36), db.ForeignKey('airlines.guid'), nullable=False)
    departure_airport_id: str = db.Column(db.String(36), db.ForeignKey('airports.guid'), nullable=False)
    arrival_airport_id: str = db.Column(db.String(36), db.ForeignKey('airports.guid'), nullable=False)

    # Relationships
    airline = db.relationship("AirlineEntity", back_populates="flights")
    departure_airport = db.relationship("AirportEntity", foreign_keys=[departure_airport_id])
    arrival_airport = db.relationship("AirportEntity", foreign_keys=[arrival_airport_id])
    layover = db.relationship("LayoverEntity", back_populates="flight", uselist=False, cascade="all, delete-orphan")

    def to_dto(self) -> FlightDTO:
        return FlightDTO(
            guid=self.guid,
            airline=self.airline.to_dto(),
            departure_airport=self.departure_airport.to_dto(),
            arrival_airport=self.arrival_airport.to_dto(),
            flight_time_minutes=self.flight_time_minutes,
            layover=self.layover.to_dto() if self.layover else None
        )

    @staticmethod
    def from_dto(dto: FlightDTO) -> "FlightEntity":
        # Check for airline and create it if it doesn't exist
        if dto.airline:
            airline = AirlineEntity.query.filter_by(guid=dto.airline.guid).first()
            if not airline:
                airline = AirlineEntity.from_dto(dto.airline)
                db.session.add(airline)
                
        # Check for departure airport and create it if it doesn't exist
        if dto.departure_airport:
            departure_airport = AirportEntity.query.filter_by(guid=dto.departure_airport.guid).first()
            if not departure_airport:
                departure_airport = AirportEntity.from_dto(dto.departure_airport)
                db.session.add(departure_airport)
                
        # Check for arrival airport and create it if it doesn't exist
        if dto.arrival_airport:
            arrival_airport = AirportEntity.query.filter_by(guid=dto.arrival_airport.guid).first()
            if not arrival_airport:
                arrival_airport = AirportEntity.from_dto(dto.arrival_airport)
                db.session.add(arrival_airport)
                
        # Check for layover and create it if it doesn't exist
        layover = None
        if dto.layover:
            layover_airport = AirportEntity.query.filter_by(guid=dto.layover.airport.guid).first() or AirportEntity.from_dto(dto.layover.airport)
            layover = LayoverEntity.query.filter_by(guid=layover_airport.guid).first()
            if not layover:
                layover = LayoverEntity(guid=dto.layover.guid, airport=layover_airport, duration_minutes=dto.layover.duration_minutes)
            db.session.add(layover)

        flight = FlightEntity(
            guid=dto.guid,
            airline=airline,
            departure_airport=departure_airport,
            arrival_airport=arrival_airport,
            flight_time_minutes=dto.flight_time_minutes
        )

        if layover:
            flight.layover = layover

        db.session.commit()
        return flight