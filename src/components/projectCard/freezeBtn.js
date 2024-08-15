import React, { useState } from 'react';
import { Button, Modal, Flex, Input,message} from 'antd';
import { freezeProject } from "../../api"
const FreezeModal = ({  projectId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [InputValue,setInputValue]=useState('')
    const [loading,setLoading]=useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const valueChange=(e)=>{
// console.log(e.target.value);
setInputValue(e.target.value)
    }
    const freezeClick= async()=>{
        setLoading(true)
        const isNumeric = /^[0-9]+(\.[0-9]+)?$/.test(InputValue);
        if (!isNumeric) {
            message.error("请输入有效的数字");
            setLoading(false)
            return;
        }
        try{
          const res=  await freezeProject(projectId,InputValue)
          if(res.code===1){
              message.success("冻结成功")
          }    
        else{
              message.error("冻结失败请重新冻结")
        }
        }catch{
message.error("冻结失败请重新冻结")
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <Button type="primary" onClick={showModal} style={{ width: '100%', height: '100%', }} >
                冻结
            </Button>
            <Modal title="项目信息" open={isModalOpen} onCancel={handleCancel} footer={null} width={500}>
                <Flex vertical style={{marginTop:'30px',width:'100%'}} align='center'>
                    <Input placeholder='请输入冻结时间：1 (代表1小时)' onChange={valueChange}></Input>
                    <Button type='primary' style={{width:'100px',height:'30px',marginTop:'30px'}} loading={loading} onClick={freezeClick}>冻结</Button>
                </Flex>
            </Modal>
        </>
    );
};
export default FreezeModal;