import React, { useState } from 'react'
import styled from 'styled-components'
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
} from 'react-table'

const Styles = styled.div`
  padding: 1rem;
  ${'' /* These styles are suggested for the table fill all available space in its containing element */}
  display: block;
  ${'' /* These styles are required for a horizontaly scrollable table overflow */}
  overflow: scroll;

  .table {
    border-spacing: 0;
    border: 1px solid black;
    width: ${props => props.tableWidth};

    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: auto;
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: hidden;
      height: 400px;
    }

    .tr {
      :nth-child(odd) {  
         background-color: #E1F0FF;  
        }
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid black;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid black;
 :last-child {
        border-right: 0;
      }
            ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      .resizer {
        right: 0;
        background: grey;
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`
const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
]

function TableComponent({ columns, data }) {
  // const [cellValue, setCellValue] = useState('');
  // const [airTableLink, setairTableLink] = useState('')

  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 1.5, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 400, // maxWidth is only used as a limit for resizing
    }),
    []
  )
  const getCellValue = (e, j) => {

    if (e.column.Header == 'First Name') {
      if (e.row.values.appointment_link !== undefined || e.row.values.appointment_link !== "") {
        window.open(e.row.values.appointment_link, "", "width=400,height=600");

      }
    }
    if (e.column.Header == ' First Name')
      if (e.row.values.airtable_link !== undefined || e.row.values.airtable_link !== "") {
        window.open(e.row.values.airtable_link, "", "width=400,height=600");
      }


    if (e.column.Header == 'Name') {

      if (e.row.values.conversation_link !== undefined || e.row.values.conversation_link !== "") {
        window.open(e.row.values.conversation_link, "", "width=400,height=600");

      }

    }



  };

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns: ['airtable_link', 'conversation_link', 'appointment_link']
      }
    },
    useResizeColumns,
    useFlexLayout,
    // useRowState,
  )

  return (
    <div {...getTableProps()} className="table">
      <div>
        {headerGroups.map(headerGroup => (
          <div onClick={() => getCellValue(headerGroup.headers[0])} {...headerGroup.getHeaderGroupProps()}
            {...headerGroup.getHeaderGroupProps({
              style: { fontWeight: 'bold', fontSize: '20px', background: '#0F4A82', paddingRight: '16px', color: 'white' },
            })}
            className="tr"
          >
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps(headerProps)} className="th" >
                {column.render('Header')}


                {/* Use column.getResizerProps to hook up the events correctly */}
                {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${column.isResizing ? 'isResizing' : ''
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="tbody">
        {rows.map((row, cell, j) => {
          prepareRow(row)
          return (
            <div {...row.getRowProps()} className="tr"
            // onClick={(e) => {
            //   debugger;
            // }}
            >
              {row.cells.map(cell => {

                return (
                  <div {...cell.getCellProps(cellProps)} className="td" onClick={() => getCellValue(cell, j)}>
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Table({ data, columns, tableName }) {
  debugger
  let widthX = 0
  if (tableName === "Textline")
    widthX = 1.5;
  if (tableName === "AirTable")
    widthX = 26;
  if (tableName === "Acuity")
    widthX = 20;

  const [data2, setData2] = useState([]);

  React.useEffect(() => {
    if (data2.length === 0)
      setData2(data)
  });

  const newColumns = React.useMemo(
    () => [
      {
        header: 'Delete',
        accessor: 'delete',
        width: widthX,

        Cell: ({ row }) => (

          <div style={{ fontWeight: "bold" }} onClick={() => {
            const dataCopy = [...data2]
            dataCopy.splice(row.index, 1)
            setData2([...dataCopy])
          }
          }>
            X
          </div>
        ),
      },
      ...columns


    ],
    [data2]
  )
  let tableWidth = "200%"
  if (tableName === "Textline")
    tableWidth = "100%"

  return (
    <div >
      <Styles tableWidth={tableWidth}>
        <TableComponent columns={newColumns} data={data2} />
      </Styles>
    </div>

  )


}

export default Table