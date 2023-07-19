import { createContext, useState, useContext } from "react";

const initialState = {
  expandedChecklist: {},
  checklist: {
    info: [
      {
        accessorFn: row => row.info.age,
        header: "Age",
        cell: info => info.getValue()
      },
      {
        accessorFn: row => row.info.type,
        header: "Type",
        cell: info => info.getValue()
      },
      {
        accessorFn: row => row.info.music,
        header: "Music",
        cell: info => info.getValue()
      }
    ]
  }
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const [appState, setAppState] = useState(initialState);

  const expandHorizontally = ({ columnId }) => {
    setAppState(prev => ({
      ...prev,
      expandedChecklist: {
        ...(typeof prev.expandedChecklist?.[columnId] === "boolean"
          ? { [columnId]: !prev.expandedChecklist?.[columnId] }
          : { [columnId]: true })
      }
    }));
  };

  const getEmbeddedColumns = ({ columnId }) => {
    return appState.checklist[columnId] || [];
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        expandHorizontally,
        getEmbeddedColumns
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
