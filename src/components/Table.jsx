import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
import { useState } from "react";

import { useAppContext } from "../store/store";
import RowItem from "./Row";

export default function Table({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const { expandHorizontally, getIsExpandedHorizontally } = useAppContext();
  const table = useReactTable({
    columns,
    data,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
        <tr>
          {table.getFlatHeaders().map(header => {
            const isLinked =
              header.column.columnDef.type === "link" ||
              header.column.columnDef.type === "embedded";
            return (
              <th
                key={header.id}
                rowSpan={isLinked ? 1 : 2}
                style={{
                  borderTop: "1px solid white",
                  borderRight: "1px solid white",
                  cursor: isLinked && "pointer",
                  background: isLinked ? "lightgray" : "transparent",
                  color: isLinked ? "black" : "white"
                }}
                scope={isLinked ? "colgroup" : "col"}
                colSpan={
                  getIsExpandedHorizontally({ columnId: header.id }) && isLinked
                    ? 3
                    : 1
                }
                onClick={() => {
                  if (isLinked) {
                    handleHorizontalExpansion({
                      columnId: header.column.id
                    });
                  } else {
                    header.column.toggleSorting();
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
        {getIsExpandedHorizontally({ columnId: "info" }) && (
          <tr
            style={{
              borderTop: "1px solid white"
            }}
          >
            <th>
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={() => {
                        console.log({ column: table.getColumn("info") });
                      }}
                      style={{
                        width: "120px",
                        borderRight: "1px solid white"
                      }}
                    >
                      First Name
                    </th>
                    <th
                      style={{
                        width: "160px",
                        borderRight: "1px solid white"
                      }}
                    >
                      Info
                    </th>
                    <th
                      style={{
                        width: "160px",
                        borderRight: "1px solid white"
                      }}
                    >
                      Phone
                    </th>
                  </tr>
                </thead>
              </table>
            </th>
          </tr>
        )}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            style={{
              borderTop: "1px solid white"
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
