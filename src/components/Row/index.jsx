import { flexRender } from "@tanstack/react-table";
import LinkedField from "./LinkedField";

const RowItem = ({ cell, row }) => {
  switch (cell.column.columnDef.type) {
    case "text":
    case "link":
      return (
        <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
      );
    case "embedded":
      return <LinkedField cell={cell} row={row} />;
    default:
      return <td></td>;
  }
};

export default RowItem;
