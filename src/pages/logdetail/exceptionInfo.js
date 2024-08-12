import { Flex, Table } from "antd";
import styled from 'styled-components';
import { exceptionData } from "../../mock/data";
const { Column, ColumnGroup } = Table;
const StyledTable = styled(Table)`
&&{
.ant-table-thead > tr > th {
    background-color: #3F1575;
    color: #fff;
    text-align: center;
    padding: 5px;
    font-size: 14px;
    border-bottom: 2px solid #D1D1D1;
  }
}
`;
const data = [{
    key: '1',
    ip: exceptionData.data.ipAddress,
    browser: exceptionData.data.browserInfo,
    url: exceptionData.url,
    message: exceptionData.data.message,
    stack: exceptionData.data.stack,
}];

const ExceptionInfo = () => {
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
                    <Column title="ip" dataIndex="ip" key="ip"
                        width="20%"  // 设置列宽
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                    />
                    <Column title="browser" dataIndex="browser" key="browser"
                        width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                    />
                    <Column title="url" dataIndex="url" key="url"
                        width="20%"
                        render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                    />
                    <ColumnGroup title="exception">
                        <Column title="message" dataIndex="message" key="message"
                            width="20%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                        />
                        <Column title="stack" dataIndex="stack" key="stack"
                            width="20%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                        />
                        
                    </ColumnGroup>
                </StyledTable>
            </Flex>
        </Flex>
    );
};

export default ExceptionInfo;