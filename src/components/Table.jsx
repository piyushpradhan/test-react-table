import {
  useReactTable,
  flexRender,
  getCoreRowModel
} from "@tanstack/react-table";
import { useAppContext } from "../store/store";

export default function Table({ columns, data }) {
  const { expandHorizontally } = useAppContext();
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
        border: "1px solid lightgray"
      }}
    >
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                style={{
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid lightgray",
                  cursor: header.column.columnDef.type === "link" && "pointer",
                  background:
                    header.column.columnDef.type === "link"
                      ? "lightgray"
                      : "transparent",
                  color:
                    header.column.columnDef.type === "link" ? "black" : "white"
                }}
                key={header.id}
                colSpan={header.colSpan}
                onClick={() => {
                  if (header.column.columnDef.type === "link") {
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
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
