import { Flex, Card,Tabs } from "antd";
import MyUpload from "./myupload";
import MyMonitor from "./mymonitor";
import { useRole } from "../../../utils/roleContext"
const MyProject= ({userName,userId}) => {
    const items = [
        {
            key: '1',
            label: '我发布的',
            children: <MyUpload userId={userId}></MyUpload>,
        },
        {
            key: '2',
            label: '我监控的',
            children: <MyMonitor userId={userId}></MyMonitor>,
        },
    ];
    const {role}=useRole()
    return (
        <Flex style={{ width: '90%', marginTop: '30px' }} vertical>
            {role.role === '用户' && (<h3 style={{ fontSize: '24px', color: '#3F1575' }}>我的项目</h3>)}
            {role.role === '管理员' && (<h3 style={{ fontSize: '24px', color: '#3F1575' }}>{userName}的项目</h3>)}
            
            <Flex style={{ width: '100%', marginTop: '30px' }}>
                <Card style={{ height: '550px', width: '100%' ,paddingLeft:'30px',paddingRight:'30px',paddingBottom:'20px',
                    overflow:'auto',
                      scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none', /* Internet Explorer 10+ */
}}>
                    <Tabs defaultActiveKey="1" items={items}  />
                </Card>
            </Flex>
        </Flex>
    )
}
export default MyProject;