import { Flex, Table } from "antd";
import styled from 'styled-components';
import { performanceData } from "../../mock/data";
const { Column, ColumnGroup } = Table;
const StyledTable = styled(Table)`
&&{
.ant-table-thead > tr > th {
    background-color: #3F1575;
    color: #fff;
    text-align: center;
    padding: 7px;
    font-size: 14px;
    border-bottom: 2px solid #D1D1D1;
  }
}
`;
const data = [{
    key: '1',
    ip: performanceData.data.ipAddress,
    browser: performanceData.data.browserInfo,
    url: performanceData.url,
    fp: performanceData.data.fp + ' ms',
    fcp: performanceData.data.fcp + ' ms',
    domReady: performanceData.data.domReady + ' ms',
    dns: performanceData.data.dns + ' ms',
    blankScreenTime: performanceData.data.blankScreenTime + " ms",
}];

const PerformanceInfo = () => {
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
                    <ColumnGroup title="performance">
                        <Column title="fp" dataIndex="fp" key="fp"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                        />
                        <Column title="fcp" dataIndex="fcp" key="fcp"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                        />
                        <Column title="domReady" dataIndex="domReady" key="domReady"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                        />
                        <Column title="dns" dataIndex="dns" key="dns"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                        />
                        <Column title="blankScreenTime" dataIndex="blankScreenTime" key="blankScreenTime"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px' }}>{text}</div>}
                        />
                    </ColumnGroup>
                </StyledTable>
            </Flex>
        </Flex>
    );
};

export default PerformanceInfo;