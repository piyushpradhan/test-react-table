import {
  useReactTable,
  flexRender,
  getCoreRowModel
} from "@tanstack/react-table";

import { useAppContext } from "../store/store";
import RowItem from "./Row";

export default function Table({ columns, data }) {
  const { appState, expandHorizontally } = useAppContext();
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  const handleHorizontalExpansion = ({ columnId }) => {
    if (columnId === "info") {
      expandHorizontally({ columnId });
    }
  };

  return (
    <table
      style={{
        border: "1px solid lightgray",
        borderCollapse: "collapse"
      }}
    >
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              const isLinked =
                header.column.columnDef.type === "link" ||
                header.column.columnDef.type === "embedded";
              return (
                <th
                  style={{
                    borderBottom: "1px solid lightgray",
                    borderRight: "1px solid lightgray",
                    cursor: isLinked && "pointer",
                    background: isLinked ? "lightgray" : "transparent",
                    color: isLinked ? "black" : "white"
                  }}
                  key={header.id}
                  colSpan={
                    isLinked ? header.column.columnDef.columns.length : 1
                  }
                  onClick={() => {
                    if (isLinked) {
                      handleHorizontalExpansion({
                        columnId: header.column.id
                      });
                    }
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            style={{
              borderBottom: "1px solid lightgray"
            }}
          >
            {row.getVisibleCells().map(cell => (
              <RowItem key={cell.id} cell={cell} row={row} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
