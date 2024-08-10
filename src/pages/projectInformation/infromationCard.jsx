import React from 'react';
import { Card, Flex } from 'antd';

const infromationCard = () => {
    return (
        <Flex style={{
            width: '100%',
            height: '480px',
        }} wrap justify={"space-between"} align={"center"}>
            <Card
                style={{
                    width: '45%',
                    height: 220
                }}
            >
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 220
                }}
            >
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 220
                }}
            >
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 220
                }}
            >
            </Card>
        </Flex>
    );
}

export default infromationCard;
