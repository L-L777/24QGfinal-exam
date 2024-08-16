import { Flex, Row, Col, Card,Empty } from "antd"
import { showLogNumberOneWeekForGroup } from '../../api/index'
import { useState, useEffect } from 'react'
import ErrorData from './Antv/errorData'
import Cost from './Antv/cost'

const Exception = ({ groupType, logType, projectId }) => {

    const [excdata, excSetData] = useState([])

    const onLoad = async () => {
        try {
            const res = await showLogNumberOneWeekForGroup(groupType, logType, projectId);
            // 处理数据，截断 logInfo 字段
            excSetData(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onLoad()
    }, [])




    return (
        <Flex style={{ width: '90%', marginTop: '30px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>data</h3>
            <Row justify='space-around' gutter={[20]} style={{ width: '100%', marginTop: '30px' }}>
                <Col span={12}>
                    <Card style={{ height: '400px' }} hoverable
                        title={<div style={{ fontSize: '20px' }}>近期错误数据</div>}>
                        <ErrorData excdata={excdata} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ height: '400px', paddingTop: '0px' }} title={<div style={{ fontSize: '20px' }}>最耗时资产花支</div>} hoverable>
                        <Flex align={"center"} justify={"center"} >
                            {excdata.length !== 0 ? <Cost excdata={excdata} /> : <Empty description="暂无数据" style={{ marginTop: '30px',width:'100%' }} />} 
                        </Flex>
                    </Card>
                </Col>
            </Row>

        </Flex >
    )
}
export default Exception;