import { Flex, Card, Tabs } from "antd";
import MonitorApply from "./monitorApply";
import ProjectApply  from "./projectApply"
import ApplyToMe from "./applyToMe";


const MyApply = () => {
    const items = [
        {
            key: '1',
            label: '监控申请',
            children: <MonitorApply></MonitorApply>,
        },
        {
            key: '2',
            label: '发布和更新申请',
            children: <ProjectApply></ProjectApply>,
        },
        {
            key: '3',
            label: '收到的申请',
            children: <ApplyToMe></ApplyToMe>,
        },
    ];
    return (
        <Flex style={{ width: '90%', marginTop: '30px',marginBottom:'50px' }} vertical>
            <h3 style={{ fontSize: '24px', color: '#3F1575' }}>我的申请</h3>
            <Flex style={{ width: '100%', marginTop: '30px' }}>
                <Card style={{
                    height: '550px', width: '100%', paddingLeft: '30px', paddingRight: '30px', paddingBottom: '20px',
                    overflow: 'auto',
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none', /* Internet Explorer 10+ */
                }}>
                    <Tabs defaultActiveKey="1" items={items} />
                </Card>
            </Flex>
        </Flex>
    )
}
export default MyApply;