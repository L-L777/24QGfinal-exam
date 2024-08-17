import React, { useState } from 'react';
import { Button, Modal,Flex,Input,message } from 'antd';
import { setErrorRate } from "../../api"
const WarnModal = ({projectId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue,setInputValue]=useState('')
    const [loading,setLoading]=useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async() => {
        setLoading(true)
        const isLessThanOneFloat = /^0\.\d+$/.test(inputValue);
        if (!isLessThanOneFloat) {
            message.error("请输入小于 1 的数");
            setLoading(false);
            return;
        }
        try{
            const res = await setErrorRate(parseInt(projectId), parseFloat(inputValue))
            if(res.code===1){
                message.success('设置成功')
                setIsModalOpen(false);
            }
            else{
                message.error(res.msg)
            }
        }catch(error){
message.error('操作失败')
        }finally{
            setLoading(false)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const inputChange=(e)=>{
        setInputValue(e.target.value)
    }
    return (
        <>
            <Button type="primary" style={{ width: '100px', height: '44px',  fontSize: '15px' }} onClick={showModal}>
                设置警报值
            </Button>
            <Modal title="设置警报值" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={loading}>
                <Flex style={{width:'100%',marginTop:"30px",marginBottom:'20px'}} justify='center'>
                    <Input placeholder='设置警报值（如：50 当错误数到50就发警报）' onChange={inputChange}></Input>
                </Flex>
            </Modal>
        </>
    );
};
export default WarnModal;