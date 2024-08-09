import React from 'react';
import PublicMenu from "../../components/menu"
import { Flex } from "antd"
import Top from './top'
import Type from './type'
import Number from './number'
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
                <Type />
                <Flex style={{
                    marginTop: '100px',
                    width: '1570px',
                    height: '580px',
                    marginLeft: '50px',
                }} vertical >
                    <Number />
                    <InfromationCard />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default index;
