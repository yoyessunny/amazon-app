import React,{useState} from 'react';
import { Modal, Button, Dropdown, Space, Menu } from 'antd';
import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';

const HomeScreen = () => {

    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");

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
    

  return (
    <div>
        Dashboard
        <div>
            Time:{' '}
        <Dropdown overlay={menu}>
            <Space>
                {menuKey}
                <DownOutlined />
            </Space>
        </Dropdown>
        </div>
    </div>
  )
}

export default HomeScreen;