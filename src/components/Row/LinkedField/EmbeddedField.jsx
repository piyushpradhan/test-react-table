import { useState } from "react";
import * as R from "ramda";

const EmbeddedField = ({ value, index, isRowExpanded, setIsRowExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(Array(value.length).fill(false));
  return (
    <td
      style={{
        width: "160px",
        borderRight: "1px solid white"
      }}
    >
      {value &&
        value
          .slice(0, isExpanded[index] ? value.length : 1)
          .map((nested, nestedIndex) => (
            <table
              key={`${nested}-${nestedIndex}`}
              style={{
                width: "100%",
                borderTop: nestedIndex !== 0 && "1px solid white"
              }}
            >
              <tbody>
                <tr>
                  <td colSpan={1}>
                    {nested}{" "}
                    {value.length > 1 && (
                      <a
                        style={{
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          if (!isRowExpanded && index === 0) {
                            setIsRowExpanded(prev => !prev);
                          } else {
                            setIsExpanded(prev => {
                              const updatedState = R.clone(prev);
                              updatedState[index] = !prev[index];
                              return updatedState;
                            });
                          }
                        }}
                      >
                        {isExpanded[index] ? "-" : `+${value.length - 1}`}
                      </a>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
    </td>
  );
};

export default EmbeddedField;
