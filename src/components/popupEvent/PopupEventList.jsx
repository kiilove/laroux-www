// src/components/features/PopupEventList.js

import React, { useEffect, useState } from "react";
import { useFirestoreQuery } from "../../hooks/useFirestore/index";
import { message, Spin } from "antd";
import EventCard from "../features/EventCard";

const PopupEventList = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const popupEventQuery = useFirestoreQuery();

  const fetchedPopupEvents = async () => {
    try {
      setIsLoading(true);
      await popupEventQuery.getDocuments(
        "popupEvents",
        (data) => {
          setEvents(data);
        },
        { orderByField: "startDate", orderByDirection: "desc" }
      );
    } catch (error) {
      message.error("데이터를 로드하는데 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchedPopupEvents();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen justify-center items-center bg-white">
          <Spin />
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="col-span-full text-center text-gray-600">
              저장된 행사가 없습니다.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PopupEventList;
