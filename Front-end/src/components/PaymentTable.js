import React,{useMemo,useState} from 'react';
import {useTable, useSortBy} from 'react-table';
import {COLUMNS} from './columnsPayment';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

const PaymentTable = (props) => {
  
  
    console.log(props.items);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => props.items, [props.items]);

    const tableInstance = useTable({
        columns: columns,
        data: data
    }, useSortBy);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, allColumns} = tableInstance;

    //Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

  return (
    <> 
    <h1 style={{position:"sticky",top:"65px",backgroundColor:"white",zIndex:"10"}}>{props.viewType}</h1>
    <div className='text-end' style={{position: "fixed",right: "10px",top: "20%",zIndex:"99"}}>
    <Button onClick={showModal}>
    <i class="fa-solid fa-gear"></i>
    </Button>
    </div>
        {
        props.loading ? <div>Loading...</div>
        : 
        props.error ? <div>{props.error}</div>
        : (  
    <table className="table" style={{overflowX: 'scroll !important', whiteSpace: 'nowrap',}} 
    {...getTableProps()}>
    <thead style={{position: 'sticky', top: '113px', backgroundColor:'white'}}>
        {
            headerGroups.map((headerGroup) => (         
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {' '}
                                    {column.isSorted ? (column.isSortedDesc ? <i class="fa-solid fa-angle-down"></i> : <i class="fa-solid fa-angle-up"></i>):''}
                                </span>
                            </th>
                        ))
                    }
                </tr>
            ))
        }
    </thead>
    <tbody {...getTableBodyProps()}>
        {
            rows.map((row) => {
                prepareRow(row)
                return( 
                    ((props.viewType === "Other")?(!(row.values.type.includes("Order")||
                row.values.type.includes("Adjustment")||row.values.type.includes("FBA Inventory Fee")||row.values.type.includes("Refund")
                ||row.values.type.includes("Service Fee")||row.values.type.includes("Tax Withheld")||
                row.values.type.includes("Transfer"))):
                (props.viewType === "All")?(row.values.type.includes("Order")||
                row.values.type.includes("Adjustment")||row.values.type.includes("FBA Inventory Fee")||row.values.type.includes("Refund")
                ||row.values.type.includes("Service Fee")||row.values.type.includes("Tax Withheld")||
                row.values.type.includes("Transfer")):
                (row.values.type.includes(props.viewType)))
                  ?
                   ( <tr {...row.getRowProps()}>
                        {
                            row.cells.map((cell, index) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })
                        }
                    </tr>
                  ) 
                  : ""
            );
            })
        }  
    </tbody>
  </table>
        )
        }
  
    <Modal title="Table Settings" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <div>
        {
            allColumns.map((column) => (
                <div key={column.id}>
                    <label>
                        <input type="checkbox" {...column.getToggleHiddenProps()} />
                        {column.Header}
                    </label>
                </div>
            ))
        }
    </div>   
    </Modal>

  </>
  )
}

export default PaymentTable;