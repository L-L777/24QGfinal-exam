import React from 'react';
import { Card, Flex } from 'antd';

const infromationCard = () => {
    return (
        <Flex style={{
            width: '1570px',
            height: '480px',
        }} wrap justify={"space-between"} align={"center"}>
            <Card
                style={{
                    width: 770,
                    height: 220
                }}
            >
            </Card>
            <Card
                style={{
                    width: 770,
                    height: 220
                }}
            >
            </Card>
            <Card
                style={{
                    width: 770,
                    height: 220
                }}
            >
            </Card>
            <Card
                style={{
                    width: 770,
                    height: 220
                }}
            >
            </Card>
        </Flex>
    );
}

export default infromationCard;
