import React from 'react';
import PublicMenu from "../../components/menu"
import { Flex } from "antd"
import Top from './top'
import Type from './type'
import Number from './number'
import Data from './data'
import InfromationCard from './infromationCard'


const index = () => {
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
                    width: "calc(100% - 250px)",
                    minHeight: "100vh",
                    margin: "auto",
                    backgroundColor: '#f3ebf7',
                    marginLeft: '250px',
                    minWidth: '1850px',
                }}>
                <Top />
                <Flex style={{
                    marginTop: '10px',
                    width: '1570px',
                    marginLeft: '50px',
                }} vertical >
                    <Number />
                    <InfromationCard />
                </Flex>
                <h1 style={{ marginLeft: '50px', fontSize: '24px', marginTop: '25px', marginBottom: '25px' }}>日志</h1>
                <Data />
            </Flex>
        </Flex>
    );
}

export default index;
