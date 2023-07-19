import { createContext, useState, useContext } from "react";

const initialState = {
  expandedChecklist: {},
  expandedEmbeddedRows: {},
  checklist: {
    info: [
      {
        id: "friend",
        accessorFn: row => row["info-firstName"],
        header: "Friend",
        type: "text",
        cell: cell => cell.getValue()
      },
      {
        id: "phone",
        accessorFn: row => row["info-phone"],
        header: "Phone",
        type: "text",
        cell: cell => cell.getValue()
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

  const toggleEmbeddedFieldsExpansion = ({
    instanceId,
    columnId,
    maxRows,
    index
  }) => {
    setAppState(prev => ({
      ...prev,
      expandedEmbeddedRows: {
        ...prev.expandedEmbeddedRows,
        [instanceId]: {
          ...prev.expandedEmbeddedRows?.[instanceId],
          [index]: {
            ...prev.expandedEmbeddedRows?.[instanceId]?.[index],
            [columnId]:
              !prev.expandedEmbeddedRows?.[instanceId]?.[columnId] ?? true,
            maxRows
          }
        }
      }
    }));
  };

  const getMaxRows = ({ instanceId, index }) => {
    return appState.expandedEmbeddedRows?.[instanceId]?.[index]?.maxRows ?? 1;
  };

  const getIsExpanded = ({ instanceId, columnId }) => {
    return appState.expandedEmbeddedRows[instanceId]?.[columnId];
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        expandHorizontally,
        getEmbeddedColumns,
        getMaxRows,
        toggleEmbeddedFieldsExpansion,
        getIsExpanded
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
