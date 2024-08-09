import React from 'react';
import { Flex } from "antd"
import styles from "./type.module.css"

const type = () => {
    return (
        <Flex style={{
            width: "180px",
            marginLeft: '0px',
            marginTop: '15px',
            marginBottom: '15px'

        }} justify={"space-between"}>
            <h3 style={{ cursor: 'pointer' }} className={styles.h}>前端</h3>
            <h3 style={{ cursor: 'pointer' }} className={styles.h}>后台</h3>
            <h3 style={{ cursor: 'pointer' }} className={styles.h}>移动</h3>
        </Flex>
    );
}

export default type;
