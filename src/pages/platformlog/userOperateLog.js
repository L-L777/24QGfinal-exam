import { useEffect, useState } from "react";
import { Flex, Table, Empty } from "antd"
import styled from 'styled-components';
import { userOperateLogData } from '../../mock/data'
import { queryAllUserOperationLog } from "../../api"
const StyledTable = styled(Table)`
&&{
.ant-table-thead > tr > th {
    background-color: #3F1575;
    color: #fff;
    text-align: center;
    padding: 15px;
    font-size: 16px;
    border-bottom: 2px solid #D1D1D1;
  }
     .ant-pagination {
      display: flex;
      justify-content: center; /* 将分页栏居中 */
      margin-top: 30px; /* 增加顶部间距 */
    }
}
`;
const columns = [
    {
        title: 'user',
        dataIndex: 'userName',
        render: (text) => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>,
        width: '20%',
    },
    {
        title: 'operate',
        dataIndex: 'operate',
        render: (text) => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>,
        width: '60%',
    },
    {
        title: 'Time',
        dataIndex: 'operateTime',
        render: (text) => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>,
        width: '20%',
    },
];
const UserOperateLog = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(6)
    const [logData, setLogData] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const response = await queryAllUserOperationLog(current, pageSize)
                setLogData(response.data.data)
                setTotal(response.data.total)

            } catch (error) {
                setCurrent(1)
                setPageSize(5)
                setTotal(userOperateLogData.total)
                setLogData(userOperateLogData.data)
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [current, pageSize])

    // 处理分页变化的回调函数
    const handleTableChange = (pagination) => {
        setCurrent(pagination.current);
        setPageSize(pagination.pageSize);
    };
    return (
        <Flex style={{ width: '90%', marginTop: '30px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>用户操作日志</h3>
            {logData.length === 0 && !loading ? (<Empty description="暂无数据" style={{ marginTop: '30px' }} />) : (<StyledTable style={{ width: '100%', marginTop: '30px' }} columns={columns}
                dataSource={logData} // 传递数据给 dataSource
                rowKey="user" // 使用唯一字段作为 key
                tableLayout="fixed"  // 设置表格布局固定
                loading={loading}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: total, // 总条目数
                    showSizeChanger: true, // 是否可以改变 pageSize
                    pageSizeOptions: ['10', '20', '50'], // 可选择的每页条目数
                }}
                onChange={handleTableChange} // 分页、排序、筛选变化时触发
            >

            </StyledTable>)}
           
        </Flex>
    )
}
export default UserOperateLog;