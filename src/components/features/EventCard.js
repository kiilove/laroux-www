// src/components/features/EventCard.js
import Button from "../common/Button";

const EventCard = ({ event }) => (
  <div
    className="bg-gray-50 rounded-lg overflow-hidden shadow-lg 
                  transform transition-transform duration-300 hover:-translate-y-1"
  >
    <img
      src={`https://picsum.photos/400/300?random=${event.id}`}
      alt={event.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4">
        {event.startDate} - {event.endDate}
      </p>
      <p className="text-gray-700 mb-4">{event.location}</p>
      <Button variant="secondary">자세히 보기</Button>
    </div>
  </div>
);

export default EventCard;
