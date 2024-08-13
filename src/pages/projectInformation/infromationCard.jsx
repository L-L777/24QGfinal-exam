import React, { useEffect } from 'react';
import { Card, Flex } from 'antd';
import View from './Antv/view'
import Error from './Antv/error'
import ErrorRate from './Antv/errorRate'
import ErrorType from './Antv/errorType'


const InfromationCard = ({ receiveProjectId }) => {



    return (
        <Flex style={{
            width: '100%',
            marginTop: '30px',
            marginBottom: '30px'
        }} wrap justify={"space-between"} align={"center"}>
            <Card
                style={{
                    width: '45%',
                    height: 220,
                    marginBottom: '30px'
                }}
            >
                <View />
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 220,
                    marginBottom: '30px'
                }}
            >
                <Error />
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 330
                }}
            >
                <ErrorRate />
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 330,

                    overflow: 'visible',

                }}
            >
                <ErrorType />
            </Card>
        </Flex>
    );
}

export default InfromationCard;
