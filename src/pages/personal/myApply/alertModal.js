import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const DetailModal = ({ rejectReason }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" style={{width:'58px',height:'24px',fontSize:'12px',borderRadius:'4px'}} onClick={showModal}>
                详细
            </Button>
            <Modal title="被拒理由" footer={null} open={isModalOpen} onCancel={handleCancel}>
                <div style={{marginTop:'30px',width:'100%',height:'400px',overflow:'auto',fontSize:'16px'}}>{rejectReason}</div>
            </Modal>
        </>
    );
};
export default DetailModal;