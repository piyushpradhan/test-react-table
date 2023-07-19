import React from "react";
import Table from "./components/Table";
import "./App.css";
import makeData from "./makeData";
import { useAppContext } from "./store/store";

function App() {
  const { appState, getEmbeddedColumns } = useAppContext();

  let columns = [
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: info => info.getValue()
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: info => info.getValue()
    },
    {
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
          columns: appState.expandedChecklist[header.accessorKey]
            ? getEmbeddedColumns({ columnId: header.accessorKey })
            : []
        }
      ];
    }
    return [...acc, header];
  }, []);

  console.log({ expandedChecklist: appState.expandedChecklist });
  console.log({ columns });

  const data = React.useMemo(() => makeData, []);
  return (
    <>
      <h1>React table testing</h1>
      <Table columns={columns} data={data} />
    </>
  );
}

export default App;
