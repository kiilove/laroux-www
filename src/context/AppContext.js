import { createContext, useContext, useReducer } from "react";

const initialState = {
  isScrolled: false,
  events: [
    {
      id: 1,
      title: "라루 12월 첫 단독 팝업",
      startDate: "2024.12.01",
      endDate: "2024.12.30",
      location: "금정역SKV1 1차 1층",
      addr: "경기도 안양시 동안구 엘에스로 142 C117호(호계동, 금정역SKV1 1차)",
    },
    {
      id: 2,
      title: "일산 현대백화점 팝업행사",
      startDate: "2024.11.25",
      endDate: "2024.12.08",
      location: "현대백화점 일산킨텍스 6층",
    },
    {
      id: 3,
      title: "2025 겨울/봄 프리뷰",
      startDate: "2024.12.20",
      endDate: "2025.01.03",
      location: "갤러리아백화점 타임월드 3층(대전)",
    },
  ],
  activeSection: "home",
};

const ACTIONS = {
  SET_SCROLLED: "SET_SCROLLED",
  SET_ACTIVE_SECTION: "SET_ACTIVE_SECTION",
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SCROLLED:
      return { ...state, isScrolled: action.payload };
    case ACTIONS.SET_ACTIVE_SECTION:
      return { ...state, activeSection: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setScrolled: (isScrolled) =>
      dispatch({ type: ACTIONS.SET_SCROLLED, payload: isScrolled }),
    setActiveSection: (section) =>
      dispatch({ type: ACTIONS.SET_ACTIVE_SECTION, payload: section }),
  };

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
