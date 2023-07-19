import React from "react";
import Table from "./components/Table";
import "./App.css";
import makeData from "./makeData";
import { useAppContext } from "./store/store";

function App() {
  const { appState, getEmbeddedColumns } = useAppContext();

  let columns = [
    {
      id: "firstName",
      accessorKey: "firstName",
      header: "First Name",
      type: "text",
      cell: info => info.getValue()
    },
    {
      id: "lastName",
      accessorKey: "lastName",
      header: "Last Name",
      type: "text",
      cell: info => info.getValue()
    },
    {
      id: "info",
      accessorKey: "info",
      header: "Info",
      type: "link",
      columns: []
    }
  ];

  columns = columns.reduce((acc, header) => {
    if (header.type === "link") {
      return [
        ...acc,
        {
          ...header,
          type: appState.expandedChecklist[header.accessorKey]
            ? "embedded"
            : "link"
        }
      ];
    }
    return [...acc, header];
  }, []);

  const data = React.useMemo(() => makeData, []);

  return (
    <>
      <h1>React table testing</h1>
      <Table columns={columns} data={data} />
    </>
  );
}

export default App;
