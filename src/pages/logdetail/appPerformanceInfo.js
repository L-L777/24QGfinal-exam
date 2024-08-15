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

const AppPerformanceInfo = (logInfo) => {
    // console.log(logInfo);
    
    const data = [{
        ...logInfo.logInfo,
    }]
    return (
        <Flex style={{ width: '90%', marginTop: '50px', marginBottom: '50px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>性能信息</h3>
            <Flex style={{ width: '100%', marginTop: '30px' }}>
                <StyledTable
                    dataSource={data}
                    pagination={false}
                    style={{ width: '100%' }}
                    tableLayout="fixed"  // 设置表格布局固定
                >
                    <Column title="memory" dataIndex="memory" key="memory"
                        width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                        <Column title="fps" dataIndex="fps" key="fps"
                            width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        <Column title="view" dataIndex="view" key="view"
                            width="40%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px',textAlign:'center' }}>{text}</div>}
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

export default AppPerformanceInfo;