import React, { useEffect } from 'react';
import { Card, Flex } from 'antd';
import View from './Antv/view'
import Error from './Antv/error'
import ErrorRate from './Antv/errorRate'
import ErrorType from './Antv/errorType'


const InfromationCard = ({ receiveProjectId, weekData }) => {


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
                <View weekData={weekData} />
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 220,
                    marginBottom: '30px'
                }}

            >
                <Error weekData={weekData} />
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 330
                }}

            >
                <ErrorRate weekData={weekData} />
            </Card>
            <Card
                style={{
                    width: '45%',
                    height: 330,

                    overflow: 'visible',

                }}

            >
                <ErrorType weekData={weekData} />
            </Card>
        </Flex>
    );
}

export default InfromationCard;
