import { createContext, useState, useContext } from "react";

const initialState = {
  expandedChecklist: {},
  expandedEmbeddedRows: {},
  checklist: {}
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

  const getIsExpandedHorizontally = ({ columnId }) => {
    return appState.expandedChecklist[columnId];
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
        getIsExpandedHorizontally,
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
