import { Flex, Table } from "antd";
import styled from 'styled-components';
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

const BackendSelfDefinedInfo = (logData) => {

    const data = [{
        type: logData.logData.logType,
        ...logData.logData.logInfo,
    }]
    return (
        <Flex style={{ width: '90%', marginTop: '50px', marginBottom: '50px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>自定义信息</h3>
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
                    <Column title="logContent" dataIndex="logContent" key="logContent"
                        width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="logLevel" dataIndex="logLevel" key="logLevel"
                        width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="time" dataIndex="logTime" key="time"
                        width="20%"  // 设置列宽
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                </StyledTable>
            </Flex>
        </Flex>
    );
};

export default BackendSelfDefinedInfo;