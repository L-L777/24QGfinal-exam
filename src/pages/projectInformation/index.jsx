import React from 'react';
import PublicMenu from "../../components/menu"
import { Flex } from "antd"
import Top from './top'
import Number from './number'
import Data from './data'
import InfromationCard from './infromationCard'



const Index = () => {

    return (
        <Flex
            style={{
                width: "100%",
                minHeight: "100vh",
                margin: "auto",
            }}>
            <PublicMenu></PublicMenu>
            <Flex vertical
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    margin: "auto",
                    backgroundColor: '#f3ebf7',
                    marginLeft: '250px',
                    minWidth: '1200px',

                }} align={"center"}>
                <Top />
                <Flex style={{
                    marginTop: '10px',
                    width: '90%',
                }} vertical >
                    <Number />
                    <InfromationCard />
                </Flex>
                <h1 style={{ width: '90%', fontSize: '24px', marginTop: '25px', marginBottom: '25px' }}>日志</h1>
                <Data />
            </Flex>
        </Flex>
    );
}

export default Index;
