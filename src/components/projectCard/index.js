import React from 'react';
import { Card,Flex } from 'antd';
import DetailModal from './detailsModal';
const ProjectCard = ({projectName,projectId,description,creator,createTime}) => (
        <Card
        hoverable
            style={{
                // width: '330px',
                height:'200px',
                padding:'20px',
                position:"relative",
                background:' linear-gradient(109deg, #C8B5FF 0%, rgba(199.96, 180.62, 255, 0.50) 50%, rgba(206.21, 167.88, 255, 0.90) 100%)',
            }}
        >
            <Flex vertical style={{width:'100%'}}>
                <div style={{width:'100%', marginBottom: '10px',display:"flex", }}>
                <div style={{ fontSize: '14px', whiteSpace: 'nowrap',marginRight:'10px' }}>项目名:</div>
                <div style={{ width: '80%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '14px' }}>{projectName}</div>
                </div>
            <div style={{ width: '100%', marginBottom: '10px', display: "flex", }}>
                <div style={{ fontSize: '14px', whiteSpace: 'nowrap', marginRight: '10px' }}>发布时间:</div>
                <div style={{ width: '80%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '14px' }}>{createTime}</div>
            </div>
            <div style={{ width: '100%', marginBottom: '10px', display: "flex", }}>
                <div style={{ fontSize: '14px', whiteSpace: 'nowrap', marginRight: '10px' }}>发布者:</div>
                <div style={{ width: '80%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '14px' }}>{creator}</div>
            </div>
           

            </Flex>
            <div style={{position:'absolute', bottom:'10px',right:'10px',borderRadius:'4px',width:'70px',height:'28px',backgroundColor:'#000'}}>
                <DetailModal projectName={projectName} projectId={projectId} createTime={createTime} creator={creator} description={description}></DetailModal>
            </div>
        </Card>
    

);
export default ProjectCard;