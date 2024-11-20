import { createContext, useContext, useReducer } from "react";

const initialState = {
  isScrolled: false,
  events: [
    {
      id: 1,
      title: "겨울 신상 팝업스토어",
      startDate: "2024.11.20",
      endDate: "2024.11.30",
      location: "현대백화점 무역센터점 5층",
    },
    {
      id: 2,
      title: "블랙프라이데이 특별전",
      startDate: "2024.11.25",
      endDate: "2024.12.05",
      location: "롯데백화점 본점 3층",
    },
    {
      id: 3,
      title: "2025 봄 컬렉션 프리뷰",
      startDate: "2024.12.10",
      endDate: "2024.12.20",
      location: "신세계백화점 강남점 4층",
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
