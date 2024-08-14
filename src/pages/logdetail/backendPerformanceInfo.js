import { Flex, Table } from "antd";
import styled from 'styled-components';
const { Column } = Table;
const StyledTable = styled(Table)`
&&{
.ant-table-thead > tr > th {
    background-color: #3F1575;
    color: #fff;
    text-align: center;
    padding: 15px;
    font-size: 14px;
    border-bottom: 2px solid #D1D1D1;
  }
}
`;

const BackendPerformanceInfo = (logData) => {
console.log(logData);

    const data = [{
        type:logData.logData.logType,
        ...logData.logData.logInfo,
    }]
    return (
        <Flex style={{ width: '90%', marginTop: '50px', marginBottom: '50px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>具体信息</h3>
            <Flex style={{ width: '100%', marginTop: '30px' }}>
                <StyledTable
                    dataSource={data}
                    pagination={false}
                    style={{ width: '100%' }}
                    tableLayout="fixed"  // 设置表格布局固定
                >
                    <Column title="type" dataIndex="type" key="type"
                        width="15%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="requestIp" dataIndex="requestIp" key="requestIp"
                        width="15%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="requestUrl" dataIndex="requestUrl" key="requestUrl"
                        width="15%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="requestMethod" dataIndex="requestMethod" key="requestMethod"
                        width="15%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="requestController" dataIndex="requestController" key="requestController"
                        width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="requestApi" dataIndex="requestApi" key="requestApi"
                        width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="time" dataIndex="requestTime" key="time"
                        width="20%"  // 设置列宽
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                </StyledTable>
            </Flex>
        </Flex>
    );
};

export default BackendPerformanceInfo;