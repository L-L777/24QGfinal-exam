
import React, { useState,useEffect } from 'react';
import { Button, Drawer,Table,Flex,Empty } from 'antd';
import styled from 'styled-components';
import { viewProjectOperateLog } from "../../api"
const { Column } = Table;
const StyledTable = styled(Table)`
&&{
.ant-table-thead > tr > th {
    background-color: #3F1575;
    color: #fff;
    text-align: center;
    padding: 20px;
    font-size: 14px;
    border-bottom: 2px solid #D1D1D1;
  }
}
`;
const ProjectLog = ({projectId}) => {
    const [open, setOpen] = useState(false);
    const [data,setData]=useState([])
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        async function fetchData(){
try{
    const res = await viewProjectOperateLog(parseInt(projectId))
if(res.code===1){
    setData(res.data)   
}
}catch(error){

}
        }
        fetchData()
    }, [projectId])
    return (
        <>
            <Button type="primary" onClick={showDrawer} style={{ width: '100px', height: '44px', fontSize: '15px' }}>
                项目日志
            </Button>
            <Drawer title="项目发布更新日志" onClose={onClose} open={open} width={700}>
                <Flex style={{ width: '100%', marginTop: '30px' }}>
                    {data.length === 0 ? (<Empty description="暂无数据" style={{ marginTop: '30px', width: '100%' }}></Empty>) : (<StyledTable
                        dataSource={data}
                        pagination={false}
                        style={{ width: '100%' }}
                        tableLayout="fixed"  // 设置表格布局固定
                    >
                        <Column title="operateType" dataIndex="operateType" key="operateType"
                            width="35%"  // 设置列宽
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        <Column title="description" dataIndex="description" key="description"
                            width="50%"  // 设置列宽
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        <Column title="date" dataIndex="date" key="date"
                            width="15%"  // 设置列宽
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                    </StyledTable>)}
                    
                </Flex>
            </Drawer>
        </>
    );
};
export default ProjectLog;