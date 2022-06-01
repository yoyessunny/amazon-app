import React,{useMemo,useState} from 'react';
import {useTable, usePagination, useSortBy} from 'react-table';
import {COLUMNS} from './columns';
import {Link} from 'react-router-dom';
import { Modal, Button, Dropdown, Space, Menu } from 'antd';
import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BasicTable = (props) => {

    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => props.items.filter((row) => {
        var rowDate = new Date(row.purchase_date);
        if (searchStartDate === '') {
          return row;
        } else 
        if (searchStartDate && rowDate.getTime() >= searchStartDate.getTime() && searchEndDate && rowDate.getTime() <= searchEndDate.getTime()) 
        {
            return row;
        }
      })    
    , [props.items,searchEndDate,searchStartDate]);

    const tableInstance = useTable({
        columns: columns,
        data: data
    }, useSortBy, usePagination);

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

    //Calendar
    const [menuKey, setMenuKey] = useState("Select Range");
    const onClick = ({ key }) => {
        setMenuKey(key);
    };

    const menu = (
        <Menu
          onClick={onClick}
          items={[
            {
              key: 'Today',
              label: (
                  <div onClick={()=>{setSearchStartDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()));setSearchEndDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() + 1))}}>
                      Today
                  </div>
              ),
            },
            {
              key: 'Yesterday',
              label: (
                <div onClick={()=>{setSearchStartDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() - 1));setSearchEndDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()))}}>
                    Yesterday
                </div>
              ),
            },
            {
              key: 'Last 7 days',
              label: (
                  <div onClick={()=>{setSearchStartDate(new Date(new Date().getTime() - 7*24*60*60*1000));setSearchEndDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() + 1))}}>
                      Last 7 days
                  </div>
              ),
            },
            {
              key: 'Last 30 days',
              label: (
                <div onClick={()=>{setSearchStartDate(new Date(new Date().getTime() - 30*24*60*60*1000));setSearchEndDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() + 1))}}>
                    Last 30 days
                </div>
              ),
            },
            {
                key: 'Last 90 days',
                label: (
                  <div onClick={()=>{setSearchStartDate(new Date(new Date().getTime() - 90*24*60*60*1000));setSearchEndDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() + 1))}}>
                      Last 90 days
                  </div>
                ),
            },
            {
                key: 'Last month',
                label: (
                  <div onClick={()=>{setSearchStartDate(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1));setSearchEndDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}}>
                      Last month
                  </div>
                ),
            },
            {
                key: 'Last year',
                label: (
                  <div onClick={()=>{setSearchStartDate(new Date(new Date().getFullYear() - 1, 0, 1));setSearchEndDate(new Date(new Date().getFullYear() - 1, 11, 31))}}>
                      Last year
                  </div>
                ),
            },
            {
                key: 'Month to date',
                label: (
                  <div onClick={()=>{setSearchStartDate(new Date(new Date().getFullYear(),new Date().getMonth(), 1));setSearchEndDate(new Date())}}>
                      Month to date
                  </div>
                ),
            },
            {
                key: 'Year to date',
                label: (
                  <div onClick={()=>{setSearchStartDate(new Date(new Date().getFullYear(), 0, 1));setSearchEndDate(new Date())}}>
                      Year to date
                  </div>
                ),
            },
          ]}
        />
      );
    
    const [show, setShow] = useState(true);
    const [showEndDate, setShowEndDate] = useState(true);

    const handleSelectStart = (date) => {
        setSearchStartDate(new Date(date));
        setShow((s) => !s)
    }

    const handleSelectEnd = (date) => {
        setSearchEndDate(new Date(date));
        setShowEndDate((s) => !s)
    }
  
    console.log(searchStartDate + searchEndDate);
  return (
    <>
    <div style={{position: "fixed",right: "60%",top: "20%",zIndex: "999"}}>
    <Dropdown overlay={menu}>
        <Space>
            {menuKey}
            <DownOutlined />
        </Space>
    </Dropdown>
    </div>
    <Button onClick={() => setShow((s) => !s)} style={{position: "fixed",right: "50%",top: "20%",zIndex: "999"}}>Start Date</Button>
    <Button onClick={() => setShowEndDate((s) => !s)} style={{position: "fixed",right: "40%",top: "20%",zIndex: "999"}}>End Date</Button>
    <div style={{ display: show ? "none" : "block" , zIndex:"999",left: "30%",position: "absolute",top: "30%"}}> 
    <Calendar onChange={handleSelectStart} />
    </div>
    <div style={{ display: showEndDate ? "none" : "block" , zIndex:"999",left: "40%",position: "absolute",top: "30%"}}> 
    <Calendar onChange={handleSelectEnd} />
    </div>
    <div className='text-end' style={{position: "fixed",right: "10px",top: "20%",zIndex: "999"}}>
    <Button onClick={showModal}>
    <i class="fa-solid fa-gear"></i>
    </Button>
    </div>
    <table className="table" style={{overflowX: 'scroll !important', whiteSpace: 'nowrap',}} 
    {...getTableProps()}>
    <thead style={{position: 'sticky', top: '105px', backgroundColor:'white'}}>
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
            page.map((row) => {
                prepareRow(row)
                return (<tr {...row.getRowProps()}>
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

export default BasicTable;