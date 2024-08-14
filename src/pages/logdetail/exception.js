import { Flex, Row, Col, Card } from "antd"

const Exception = () => {
    return (
        <Flex style={{ width: '90%', marginTop: '30px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>data</h3>
            <Row justify='space-around' gutter={[20]} style={{ width: '100%', marginTop: '30px' }}>
                <Col span={12}>
                    <Card style={{ height: '400px' }} hoverable
                        title={<div style={{ fontSize: '20px' }}>近期错误数据</div>}></Card>
                </Col>
                <Col span={12}>
                    <Card style={{ height: '400px' }} title={<div style={{ fontSize: '20px' }}>最耗时资产</div>}  hoverable>
                    </Card>
                </Col>
            </Row>
            
        </Flex>
    )
}
export default Exception;