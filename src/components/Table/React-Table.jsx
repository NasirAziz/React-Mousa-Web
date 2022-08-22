import React, { useState } from 'react'
import styled from 'styled-components'
import Popup from '../Popup'
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
    width: 200%;

    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: auto;
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: hidden;
      height: 250px;
    }

    .tr {
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

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        right: 0;
        background: blue;
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

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <span ref={resolvedRef} {...rest} >X</span>
      </>
    )
  }
)

function TableComponent({ columns, data }) {
  const [cellValue, setCellValue] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 15, // minWidth is only used as a limit for resizing
      // width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 500, // maxWidth is only used as a limit for resizing
    }),
    []
  )
  const getCellValue = (cell) => {
    setCellValue(cell.value)
    console.log(cell.value)
  }

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      // defaultColumn,
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
              // style: { paddingRight: '15px' },
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
            <div {...row.getRowProps()} className="tr" onClick={() => {
              debugger;
              setModalOpen(true);

            }
            }>
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
      {modalOpen && <Popup setOpenModal={setModalOpen} />}
    </div>
  )
}

function Table({ data, columns, tableName }) {

  const [data2, setData2] = useState([]);

  React.useEffect(() => {
    if (data2.length === 0)
      setData2(data)
  });

  const columnsAcuity = React.useMemo(
    () => [
      {
        header: 'Delete',
        accessor: 'delete',
        width: tableName === "Textline" ? 1 : 15,
        Cell: ({ row }) => (
          <div onClick={() => {
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
  console.log((data2.length))

  console.log([...data2])
  return (
    <div >
      <Styles>
        <TableComponent columns={columns} data={data} />
      </Styles>
    </div>

  )


}

export default Table