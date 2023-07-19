import { flexRender } from "@tanstack/react-table";
import { useState } from "react";

const RowItem = ({ cell, row }) => {
  const [multiLength, setMultiLength] = useState(1);
  switch (cell.column.columnDef.type) {
    case "text":
    case "link":
      return (
        <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
      );
    case "embedded":
      return (
        <td>
          <table>
            <tbody>
              {Object.values(row.original.info).map((value, index) => (
                <tr key={index}>
                  <th>{value.firstName}</th>
                  <td>
                    {value.phone &&
                      value.phone
                        .slice(0, multiLength)
                        .map((phone, phoneIndex) => (
                          <table key={`${phone}-${phoneIndex}`}>
                            <tbody>
                              <tr>
                                <td>
                                  {phone}{" "}
                                  {value.phone.length > 1 && (
                                    <a
                                      style={{
                                        cursor: "pointer"
                                      }}
                                      onClick={() =>
                                        setMultiLength(prev =>
                                          prev === 1 ? value.phone.length : 1
                                        )
                                      }
                                    >
                                      +{value.phone.length - 1}
                                    </a>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ))}
                  </td>
                  <td>
                    {value.hobbies &&
                      value.hobbies
                        .slice(0, multiLength)
                        .map((hobby, hobbyIndex) => (
                          <table key={`${hobby}-${hobbyIndex}`}>
                            <tbody>
                              <tr>
                                <td>{hobby}</td>
                              </tr>
                            </tbody>
                          </table>
                        ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      );
    // return <Field cell={cell} row={row} />;
    default:
      return <td></td>;
  }
};

export default RowItem;
