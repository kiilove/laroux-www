import { createContext, useContext, useEffect, useReducer } from "react";
import { useFirestoreQuery } from "../hooks/useFirestore/index";
import { where } from "firebase/firestore";
import { message } from "antd";

const initialState = {
  isScrolled: false,
  events: [], // 초기 events는 빈 배열
  activeSection: "home",
};

const ACTIONS = {
  SET_SCROLLED: "SET_SCROLLED",
  SET_ACTIVE_SECTION: "SET_ACTIVE_SECTION",
  SET_EVENTS: "SET_EVENTS", // 새로운 액션 추가
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SCROLLED:
      return { ...state, isScrolled: action.payload };
    case ACTIONS.SET_ACTIVE_SECTION:
      return { ...state, activeSection: action.payload };
    case ACTIONS.SET_EVENTS: // events 상태를 업데이트
      return { ...state, events: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const eventsQuery = useFirestoreQuery();
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setScrolled: (isScrolled) =>
      dispatch({ type: ACTIONS.SET_SCROLLED, payload: isScrolled }),
    setActiveSection: (section) =>
      dispatch({ type: ACTIONS.SET_ACTIVE_SECTION, payload: section }),
    setEvents: (events) =>
      dispatch({ type: ACTIONS.SET_EVENTS, payload: events }), // events 상태 업데이트 액션
  };

  const fetchEvents = async () => {
    const conditions = [where("isActive", "==", true)];

    try {
      await eventsQuery.getDocuments(
        "popupEvents",
        (data) => {
          console.log("Fetched events:", data);
          actions.setEvents(data); // 가져온 데이터를 상태에 저장
        },
        { conditions, limitNumber: 3 }
      );
    } catch (error) {
      message.error("데이터 로드에 문제가 발생했습니다.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents(); // 컴포넌트가 마운트될 때 이벤트 가져오기
  }, []);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
