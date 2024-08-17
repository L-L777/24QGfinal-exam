import React, { useState, useRef, useEffect } from 'react';
import { Flex, Button, Modal, Input, message } from "antd";
import ProjectDrawer from './Drawer/projectDrawer';
import Updata from './Drawer/updata';
import QueryOwnMonitorUser from './Drawer/queryOwnMonitorUser';
import { deleteProject, queryOwnMonitorUser } from '../../api/index';
import { useNavigate } from 'react-router-dom'
import WarnModal from './warnModal';
import ProjectLog from './checkLogModal';
import { useRelease } from '../../utils/roleContext';
const Top = ({ projectData, receiveProjectId }) => {
    
    const [openUpdata, setOpenUpdata] = useState(false);
    const [user, setUser] = useState([])
    const [openOwen, setOpenOwen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false); // 管理按钮的禁用状态
    const [messageApi, contextHolder] = message.useMessage();
    const DeleteRef = useRef();
    const navigate = useNavigate()
    const { release } = useRelease()
    const showDrawerUpdata = () => {
        setOpenUpdata(true);
    };
    const onCloseUpdata = () => {
        setOpenUpdata(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const showDrawerOwen = () => {
        setOpenOwen(true);
    };
    const onCloseOwen = () => {
        setOpenOwen(false);
    };

    const handleOk = async () => {
        if (DeleteRef.current.input.value) {
            setButtonDisabled(true); // 禁用按钮

            try {
                const res = await deleteProject(projectData.projectId, DeleteRef.current.input.value);
                if (res.code === 1) {
                    success("项目已成功删除,1s后跳转");
                    setIsModalOpen(false);
                    setTimeout(() => {
                        navigate("/projectshow");

                    }, 1000);

                } else {
                    error("口令错误，请重新输入");
                    // 1秒后重新启用按钮
                    setTimeout(() => {
                        setButtonDisabled(false);

                    }, 1000);
                }
            } catch (error) {
                console.log(error);
                error("请求异常，请重新输入");

                // 1秒后重新启用按钮
                setTimeout(() => {
                    setButtonDisabled(false);
                }, 1000);
            }
        } else {
            error('请输入密码');
        }
    };

    const handleCancel = () => {
        if (DeleteRef.current) {
            DeleteRef.current.input.value = ''; // 清空输入框
        }
        setIsModalOpen(false);
    };

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };




    useEffect(() => {
        const onLoad = async () => {
            try {
                const res = await queryOwnMonitorUser(receiveProjectId);
                // 处理数据，截断 logInfo 字段           
                setUser(res.data || [])
            } catch (error) {
                console.log(error);
            }
        };
        onLoad()

    }, [receiveProjectId]);


    return (
        <Flex
            style={{
                height: "100px",
                width: "90%",
                borderBottom: '1px solid rgb(193, 187, 201)',
                overflow:'auto',
                scrollbarColor: '#8957ff #e0d1ff  ' ,
                 scrollbarWidth: 'thin', 
            }}
            justify={"space-between"} align={"center"}
        >
            <Flex gap={50} style={{ marginRight: '10px', }}>
                <div style={{ position: "relative", display: "inline-block" ,whiteSpace:'nowrap'}}>
                    <h3
                        style={{
                            fontSize: "28px",
                            position: "relative", // 使文本相对于投影区域
                            zIndex: 1, // 确保文本在投影区域之上
                        }}
                    >
                        {projectData.projectName}
                    </h3>
                    <div
                        style={{
                            position: "absolute",
                            left: "-11px",
                            bottom: "-5px", // 调整阴影区域的垂直位置
                            width: "137px",
                            height: "12px", // 阴影区域的高度
                            background: "linear-gradient(to right, #C8B5FF, #C496FF)",
                            transform: "skewX(-20deg)", // 使左右边变斜
                            transformOrigin: "bottom", // 设置变换的起点为底部
                            zIndex: 0, // 将阴影区域放在文本下方
                        }}
                    ></div>
                </div>
                <ProjectDrawer projectData={projectData}></ProjectDrawer>
            </Flex>
            {release === 1 && (<Flex gap="middle">
                <Button
                    type="primary"
                    style={{ width: '100px', height: '44px', backgroundColor: 'rgb(255, 97, 97)', color: 'white', fontSize: '15px' }}
                    onClick={showModal}
                    disabled={buttonDisabled} // 根据状态禁用按钮
                >
                    删除项目
                </Button>
                <Button
                    type="primary"
                    style={{ width: '100px', height: '44px', backgroundColor: 'rgb(224, 209, 255)', color: 'rgb(144, 83, 192)', fontSize: '15px' }}
                    onClick={showDrawerOwen}
                >
                    监控权限
                </Button>
                <Button
                    type="primary"
                    style={{ width: '100px', height: '44px', backgroundColor: 'rgb(129, 106, 255)', color: 'white', fontSize: '15px' }}
                    onClick={showDrawerUpdata}
                >
                    更新项目
                </Button>
                <WarnModal projectId={receiveProjectId}></WarnModal>
                <ProjectLog projectId={receiveProjectId}></ProjectLog>
            </Flex>)}
            <Updata open={openUpdata} onClose={onCloseUpdata} projectData={projectData} success={success} error={error} />
            <QueryOwnMonitorUser open={openOwen} onClose={onCloseOwen} projectData={projectData} success={success} error={error} user={user} />
            <Modal
                style={{ top: '25%' }}
                title="删除项目"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: buttonDisabled }} // 禁用确认按钮
            >
                <h3 style={{ fontWeight: 400, marginBottom: '15px', marginTop: '40px' }}>项目口令</h3>
                <Input
                    style={{ height: '50px', border: '1px solid black', marginBottom: '50px' }}
                    ref={DeleteRef}
                />
            </Modal>
            {contextHolder}
        </Flex>
    );
}

export default Top;