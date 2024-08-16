import React, { useState } from 'react';
import { Button, Modal,Flex } from 'antd';
const GetSdk = ({projectId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading,setLoading]=useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDownload = () => {
        setLoading(true)
        const downloadUrl = 'https://faken.oss-cn-guangzhou.aliyuncs.com/SDK.zip';
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'sdk-file.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setLoading(false)
    };
    return (
        <>
            <Button type="primary" onClick={showModal} style={{ width: '58px', height: '24px', fontSize: '12px', borderRadius: '4px' }}>
               查看
            </Button>
            <Modal title="获取配置" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <Flex style={{width:'100%',marginTop:'30px',}} vertical align='center'>
                    <div><span style={{color:'#CCCCCC',fontWeight:'700',marginRight:'20px'}}>projectId: </span>  { projectId}</div>
                    <Button type='primary' style={{ marginTop: '30px' }} loading={loading} onClick={handleDownload}> 下载sdk文件</Button>
                </Flex>
            </Modal>
        </>
    );
};
export default GetSdk;