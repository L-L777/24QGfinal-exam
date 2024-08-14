import { Flex, Card, List } from "antd";
import {useRole} from "../../utils/roleContext"
const MyInfo = ({ userName, userId }) => {
    const {role}=useRole()
    return (
        <Flex style={{ width: '90%', }} vertical>
            <h3 style={{ fontSize: '24px', color: '#3F1575' }}>个人信息</h3>
            <Flex style={{ width: '100%', marginTop: '30px' }}>
                <Card  style={{height:'160px',width:'1000px'}}>
                    <List style={{width:'100%' ,paddingLeft:'20px',paddingRight:'20px'}}>
                        <List.Item>
                            <List.Item.Meta
                                title={<div style={{ fontWeight: '400' }}>用户名</div>}
                                description={<div style={{ fontSize: '12px' }}>你的全名</div>}
                            />
                            {role.role === '用户' && (<div style={{ width: '370px', height: '20px', border: '1px solid #DDDDDD', borderRadius: '6px', fontSize: '14px', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{role.username}</div>)}
                            {role.role === '管理员' && (<div style={{ width: '370px', height: '20px', border: '1px solid #DDDDDD', borderRadius: '6px', fontSize: '14px', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</div>)}
                           
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={<div style={{ fontWeight: '400' }}>用户ID</div>}
                                description={<div style={{ fontSize: '12px' }}>关于你的账户唯一ID，不能被修改</div>}
                            />
                            <div style={{ width: '370px', height: '20px', border: '1px solid #DDDDDD', borderRadius: '6px', fontSize: '14px', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', background: '#F6F6F6', color:'#CCCCCC'}}>{userId}</div>
                        </List.Item>
                    </List>
                </Card>
            </Flex>
        </Flex>
    )
}
export default MyInfo;