// src/components/sections/Events.js
import { useApp } from "../../context/AppContext";
import EventCard from "../features/EventCard";

const Events = () => {
  const { state } = useApp();

  return (
    <div id="events" className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">진행중인 행사</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
