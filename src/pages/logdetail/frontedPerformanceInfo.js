import { Flex, Table } from "antd";
import styled from 'styled-components';
// import { performanceData } from "../../mock/data";
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
//     ipAddress: performanceData.data.ipAddress,
//     browserInfo: performanceData.data.browserInfo,
//     url: performanceData.url,
//     fp: performanceData.data.fp + ' ms',
//     fcp: performanceData.data.fcp + ' ms',
//     domReady: performanceData.data.domReady + ' ms',
//     dns: performanceData.data.dns + ' ms',
//     blankScreenTime: performanceData.data.blankScreenTime + " ms",
// }];

const FrontedPerformanceInfo = ({logData,logTime,logUrl}) => {
    // console.log(logData)
    const data=[{
        ...logData,
        url:logUrl,
        time:logTime
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
                    <ColumnGroup title="performance">
                        <Column title="fp/ms" dataIndex="fp" key="fp"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        <Column title="fcp/ms" dataIndex="fcp" key="fcp"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        <Column title="domReady/ms" dataIndex="domReady" key="domReady"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        <Column title="dns/ms" dataIndex="dns" key="dns"
                            width="12%"
                            render={text => <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontSize: '16px', textAlign: 'center' }}>{text}</div>}
                        />
                        <Column title="blankScreen/ms" dataIndex="blankScreenTime" key="blankScreenTime"
                            width="12%"
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

export default FrontedPerformanceInfo;