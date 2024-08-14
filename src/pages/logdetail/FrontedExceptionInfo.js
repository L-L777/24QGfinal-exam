import { Flex, Table } from "antd";
import styled from 'styled-components';
// import { exceptionData } from "../../mock/data";
const { Column, ColumnGroup } = Table;
const StyledTable = styled(Table)`
&&{
.ant-table-thead > tr > th {
    background-color: #3F1575;
    color: #fff;
    text-align: center;
    padding: 10px;
    font-size: 14px;
    border-bottom: 2px solid #D1D1D1;
  }
}
`;
// const data = [{
//     key: '1',
//     ip: exceptionData.data.ipAddress,
//     browser: exceptionData.data.browserInfo,
//     url: exceptionData.url,
//     message: exceptionData.data.message,
//     stack: exceptionData.data.stack,
// }];

const FrontedExceptionInfo = (logData,logTime,logUrl) => {
    // console.log(logData);
    
    const data = [{
        ...logData.logData,
        url:logData.logUrl,
        time:logData.logTime
    }]
    return (
        <Flex style={{ width: '90%', marginTop: '50px', marginBottom: '50px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>异常信息</h3>
            <Flex style={{ width: '100%', marginTop: '30px' }}>
                <StyledTable
                    dataSource={data}
                    pagination={false}
                    style={{ width: '100%' }}
                    tableLayout="fixed"  // 设置表格布局固定
                >
                    <Column title="ip" dataIndex="ipAddress" key="ip"
                        width="15%"  // 设置列宽
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="browser" dataIndex="browserInfo" key="browser"
                        width="10%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <Column title="url" dataIndex="url" key="url"
                        width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                    <ColumnGroup title="exception">
                        <Column title="message" dataIndex="message" key="message"
                            width="20%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        <Column title="stack" dataIndex="stack" key="stack"
                            width="20%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        
                    </ColumnGroup>
                    <Column title="time" dataIndex="time" key="time"
                        width="15%"  // 设置列宽
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                    />
                </StyledTable>
            </Flex>
        </Flex>
    );
};

export default FrontedExceptionInfo;