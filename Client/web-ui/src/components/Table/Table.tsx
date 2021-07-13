import React from "react";
import { useTable } from "react-table";

import Style from "./Table.module.scss"

interface Props {
  data: any,
  columns: {Header: string, accessor: string}[]
}

const Table = ({columns, data}: Props): JSX.Element => {

  const { 
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data})

  return (
    // Apply the table props
    <table {...getTableProps} className={Style.Table}>
      <thead>
        { // Loops over the header rows
        headerGroups.map(headerGroup => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            { // Loop over the headers in each row
            headerGroup.headers.map(column => (
              // Apply the header cell props
              <th {...column.getHeaderProps()}>
                { // Render the header
                  column.render("Header")
                }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        { // Loop over the table rows
        rows.map(row => {
          // Prepare the row for display
          prepareRow(row)
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              { // Loop over the rows cells
              row.cells.map(cell => {
                // Apply the cell props
                return(
                  <td {...cell.getCellProps()}>
                    { // Render the cell contents
                      cell.render("Cell")
                    }
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};

export default Table;
