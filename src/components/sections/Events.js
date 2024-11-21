import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import SEO from "../common/SEO";
import EventCard from "../features/EventCard";

const Events = () => {
  const { state } = useApp();
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    setCurrentEvents(state.events);
  }, [state.events]);

  // 이벤트 섹션을 위한 Schema.org 데이터
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Laroux 팝업스토어",
    description: "프리미엄 여성 패션 브랜드 Laroux의 팝업스토어 정보",
    url: "https://www.laroux.co.kr/#events",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: currentEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          location: {
            "@type": "Place",
            name: event.location,
          },
        },
      })),
    },
  };

  return (
    <>
      <SEO
        title="팝업스토어"
        description="프리미엄 여성 패션 브랜드 Laroux의 팝업스토어를 만나보세요."
        keywords="라루,팝업스토어,여성패션,프리미엄패션,Laroux,팝업이벤트"
        url="https://www.laroux.co.kr/#events"
        schemaData={eventSchema}
      />

      <div id="events" className="min-h-screen bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">팝업스토어</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
