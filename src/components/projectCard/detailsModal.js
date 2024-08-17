import React, { useState,useEffect } from 'react';
import { Button, Modal, Flex, Form,Alert,Input,message} from 'antd';
import { applyMonitorPermission, checkMonitorAuth, verifyApplication } from "../../api"
import { useNavigate} from "react-router-dom";
import { useRole,useRelease } from "../../utils/roleContext";
const DetailModal = ({ projectName, projectId, description, creator, createTime, applicationId, selectedLog,projectUrl}) => {
    
    const { role } = useRole();
    const {setRelease}=useRelease();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = localStorage.getItem('userId')
    const [btnLoading, setBtnLoading] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [btnText, setBtnText] = useState({agree:'同意',disagree:'拒绝'})
    const [inputValue,setInputValue]=useState('')
    const [alertStatus, setAlertStatus] = useState({ type: 'error', message: '申请失败，请重新申请', status: false })
    // 消息提示框弹出函数
    let alertTimeId=null
    const alertShow = (setter, msg) => {
        if (alertTimeId) {
            clearTimeout(alertTimeId);
        }
        setter(msg)
        alertTimeId=setTimeout(() => {
            setter({ type: 'error', message: '上传失败，请重新上传', status: false })
        }, 3000)
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // 管理员拒绝理由
    const rejectValue=(e)=>{
setInputValue(e.target.value)
    }
    // 管理员同意或拒绝该项目
    const decision=async(status)=>{
        if (status === 2 && !inputValue){
message.error('拒绝理由不能为空')
return;
        }
        setBtnLoading(true)
        try{
            await verifyApplication(applicationId, status,inputValue)
            if(status===1){
                setBtnText({ agree: '已通过', disagree: '拒绝' })
            }
        if(status===2)
        {
            setBtnText({ agree: '通过', disagree: '已拒绝' })
        }
         setBtnDisabled(true)
        }catch(error){
message.error('操作失败，请重新操作')
        }finally{
            setBtnLoading(false)
        }
    }
    // 查看用户是否有这个项目的监测权限
    const checkMyAuth=async()=>{
        setBtnLoading(true)
        if (selectedLog === '3' || selectedLog === '4'){
            showModal();
            setBtnLoading(false)
            setRelease(1)
            return;
        } else if ( role.role === '管理员' && (selectedLog === "1" || selectedLog === '2')){
            navigate(`/projectinformation?projectId=${projectId}&release=1`);
            setRelease(1)
            return;
        }
        try {
            const response= await checkMonitorAuth(projectId,parseInt(userId))
            if (response.data ==='普通用户'){
                showModal()
                setRelease(0)
                localStorage.setItem('release',0)
            } else if (response.data ==='发布者'){
                navigate(`/projectinformation?projectId=${projectId}&release=1`);
                setRelease(1)
                localStorage.setItem('release', 1)
            }else{
                navigate(`/projectinformation?projectId=${projectId}&release=0`);
                setRelease(0)
                localStorage.setItem('release', 0)
            }
            setBtnLoading(false)       
        } catch (error) {
            setBtnLoading(false)
            showModal()
            alertShow(setAlertStatus, { type: 'error', message: '请求错误，请重新点击详情', status: true })
        }
    }
    // 申请权限函数
    const toApply=async()=>{
        setBtnLoading(true)
        try {
            await applyMonitorPermission(userId, projectId)
            setBtnLoading(false)
            alertShow(setAlertStatus, { type: 'success', message: '申请成功', status: true })
        } catch (error) {
            setBtnLoading(false)
            alertShow(setAlertStatus, { type: 'error', message: '申请失败，请重新申请', status: true })
        }
    }
    return (
        <>
            <Button type="primary" onClick={checkMyAuth} style={{ width: '100%', height: '100%', }} loading={btnLoading}>
                详细
            </Button>
            <Modal title="项目信息" open={isModalOpen}  onCancel={handleCancel} footer={null} width={600}>
                {alertStatus.status && <Alert message={alertStatus.message} type={alertStatus.type} style={{ marginBottom: '10px' }} />}
                <Flex vertical style={{ width: '100%', }} justify='space-evenly' align='center'>
                    <Form>
                        <Form.Item
                            label="项目名"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                               {projectName}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="发布时间"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                                {createTime}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="发布者"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                                {creator}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="项目地址"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px', color: '#652fff' }}>
                                <a href={projectUrl}>项目地址（点击跳转）</a>
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="项目描述"
                        >
                            <div style={{ width: '440px', maxHeight: '400px', marginLeft: '20px', fontSize: '16px', borderRadius: '6px', overflow: 'auto', }}>
                                {description}
                            </div>
                        </Form.Item>
                    </Form>
                    {role.role === '用户' && <Button type='primary' style={{ marginTop: '10px' }} onClick={toApply} loading={btnLoading}>申请权限</Button>}
                    {role.role === '管理员'&&selectedLog==='3' && (<Flex style={{ marginTop: '10px', width: '100%' }} vertical>
                        <Input.TextArea rows={6} onChange={rejectValue} placeholder='请输入你的拒绝理由：（同意则不用输入）' ></Input.TextArea>
                        <Flex style={{ marginTop: '10px', width: '100%' }} justify='space-evenly'>
                            <Button type='primary' loading={btnLoading} disabled={btnDisabled} onClick={() => decision(1)}>{btnText.agree}</Button> <Button disabled={btnDisabled} onClick={() => decision(2)} loading={btnLoading}>{btnText.disagree}</Button>
                        </Flex>
                    </Flex>)}
                </Flex>
            </Modal>
        </>
    );
};
export default DetailModal;