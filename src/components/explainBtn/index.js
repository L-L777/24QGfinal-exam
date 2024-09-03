import React, { useState } from 'react';
import { Button, Modal, Dropdown,message } from 'antd';
import { explainLogs } from "../../api";
const ExplainLogs = (projectId) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aiExplain,setAiExplain]=useState('')
    const [btnLoading,setBtnLoading]=useState(false)
    const [modalLoading,setModalLoading]=useState(false)
    const [groupTypeName,setGroupTypeName]=useState('')
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const aiShow=async (groupType,name)=> {
        setBtnLoading(true)
        setModalLoading(true)
        setGroupTypeName(name)
        try{
            const res = await explainLogs(parseInt(groupType), parseInt(projectId.projectId))
            if(res.code===0){
                message.warning(res.msg)
            }else{
                setAiExplain(res.data)
                console.log(res.data);
                
            }
        }catch(error){
        }finally{
            setBtnLoading(false)
            setModalLoading(false)
        }
    }
    const items = [
        {
            key: '1',
            label: (
                <Button type="primary" onClick={() => { showModal(); aiShow(1,'前端')}} loading={btnLoading}>
                    前端
                </Button >
            ),
        },
        {
            key: '2',
            label: (
                <Button type="primary" onClick={() => { showModal(); aiShow(0,'后台') }} loading={btnLoading}>
                   后台
                </Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button type="primary" onClick={() => { showModal(); aiShow(2,'移动') }} loading={btnLoading}>
                    移动
                </Button>
            ),
        },
    ];
   
    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottom"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <Button type="primary" style={{fontSize:'14px'}}>ai异常分析</Button>
            </Dropdown>
            <Modal title={`${groupTypeName} ai异常分析`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}footer={null} loading={modalLoading}>
                <div style={{
                    width:'100%',marginTop:'30px',marginBottom:'30px'
                }}>{aiExplain}</div>
            </Modal>
        </>
    );
};
export default ExplainLogs;