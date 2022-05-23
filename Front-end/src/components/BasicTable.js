import React,{useMemo,useState} from 'react';
import {useTable, usePagination} from 'react-table';
import {COLUMNS} from './columns';
import {Link} from 'react-router-dom';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

const BasicTable = (props) => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => props.items, [props.items]);

    const tableInstance = useTable({
        columns: columns,
        data: data
    }, usePagination)

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, allColumns, 
    nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, gotoPage,
    pageCount, setPageSize} = tableInstance;

    const {pageIndex, pageSize} = state;

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
    <div className='text-end' style={{position: "fixed",right: "10px",top: "20%"}}>
    <Button type="primary" onClick={showModal}>
    <i class="fa-solid fa-gear"></i>
    </Button>
    </div>
    <table className="table" style={{overflowX: 'scroll !important', whiteSpace: 'nowrap',}} 
    {...getTableProps()}>
    <thead>
        {
            headerGroups.map((headerGroup) => (         
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))
                    }
                </tr>
            ))
        }
    </thead>
    <tbody {...getTableBodyProps()}>
        {
            page.map((row) => {
                prepareRow(row)
                return(
                    <tr {...row.getRowProps()}>
                        {
                            row.cells.map((cell, index) => {
                                return (index === 0 ) ? 
                                <td {...cell.getCellProps()}><Link to={`/orders/${cell.value}`} target="_blank">{cell.render('Cell')}</Link></td>
                                :
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })
                        }
                    </tr>
            );
            })
        }  
    </tbody>
  </table>

  <div>
      <span>
          Page{' '}<strong>{pageIndex+1} of {pageOptions.length}</strong>{' '}
      </span>
      <span>
          | Go to Page: {' '}
          <input type="number" defaultValue={pageIndex + 1} 
          onChange={(e)=>{const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
          gotoPage(pageNumber)}} style={{width:"50px"}} />{' '}
      </span>
      <select value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}>
            {
                [10,25,50].map(pageSize=>(
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))
            }
      </select>
      <Button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
      <Button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</Button>
      <Button onClick={()=> nextPage()} disabled={!canNextPage}>Next</Button>
      <Button onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</Button>
  </div>

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

export default BasicTable