import { useState } from "react";
import EmbeddedField from "./EmbeddedField";

const LinkedField = ({ row }) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false);
  const linkedField = Object.values(row.original.info);
  return (
    <td>
      <table>
        <tbody
          style={{
            width: "100%"
          }}
        >
          {linkedField
            .slice(0, isRowExpanded ? linkedField.length : 1)
            .map((value, index) => (
              <tr
                key={index}
                style={{
                  borderTop: index !== 0 && "1px solid white"
                }}
              >
                <th
                  colSpan={1}
                  style={{
                    width: "120px",
                    borderRight: "1px solid white"
                  }}
                >
                  {value.firstName}{" "}
                  {linkedField.length > 1 && (
                    <a
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() => setIsRowExpanded(prev => !prev)}
                    >
                      {isRowExpanded ? "-" : `+${linkedField.length - 1}`}
                    </a>
                  )}
                </th>
                <EmbeddedField
                  value={value.phone ?? []}
                  index={index}
                  isRowExpanded={isRowExpanded}
                  setIsRowExpanded={setIsRowExpanded}
                />
                <EmbeddedField
                  value={value.hobbies ?? []}
                  index={index}
                  isRowExpanded={isRowExpanded}
                  setIsRowExpanded={setIsRowExpanded}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </td>
  );
};

export default LinkedField;
