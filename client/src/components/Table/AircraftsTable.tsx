import React from "react";
import { Column, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { AircraftWithSocials } from "../../types/Aircraft/Aircraft";
import { Button } from "../Generics/Buttons/Button";

import Style from "./AircraftsTable.module.scss";

// Documentation: https://react-table.tanstack.com/docs/overview

interface Props {
  columns: Column[];
  data: AircraftWithSocials[];
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const AircraftsTable: React.FC<Props> = ({ columns, data, handleAircraftSelection }) => {

  const [selected, setSelected] = React.useState<any>();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination,
    useRowSelect,
  );

  return (
    <div className={Style.TableView}>
    {/* Apply the table props */}
      <table {...getTableProps()} className={Style.Table}>
        <thead className={Style.TableHeader}>
          { // Loops over the header rows
          headerGroups.map(headerGroup => (
            /* Apply the header row props */
            <tr {...headerGroup.getHeaderGroupProps()}>
              { // Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  { /* Render the header */ }
                  { column.render("Header") }
                  { /* TODO: sort icons 
                    Adds sort indicator */ }
                  <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ↑"
                          : " ↓"
                        : "  "
                      }
                    </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          { // Loop over the table rows
          page.map((row, _i) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              // FIXME: on row click pre-select aircraft
              <tr {...row.getRowProps()} onClick={() => setSelected(row.original)}>
                { // Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return(
                    <td {...cell.getCellProps()}>
                      { // Render the cell contents
                        cell.render("Cell")
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Table Controls */}
      <div className={Style.Controls}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        
        {/* TODO: handle selection */}
        <div className={Style.SelectButton}>
          <Button 
            handleClick={() => handleAircraftSelection(selected)}
            style={"primary"}
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AircraftsTable;
