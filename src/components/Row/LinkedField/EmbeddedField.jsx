import { useState } from "react";
import * as R from "ramda";

const EmbeddedField = ({ value, index, isRowExpanded, setIsRowExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(Array(value.length).fill(false));
  return (
    <td>
      {value &&
        value
          .slice(0, isExpanded[index] ? value.length : 1)
          .map((phone, phoneIndex) => (
            <table key={`${phone}-${phoneIndex}`}>
              <tbody>
                <tr>
                  <td>
                    {phone}{" "}
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
