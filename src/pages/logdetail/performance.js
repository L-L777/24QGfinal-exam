import { Flex,Row,Col,Card } from "antd"

const Performance=()=>{
    return(
        <Flex style={{ width: '90%', marginTop: '30px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>performance</h3>
            <Row justify='space-around' gutter={[20]} style={{width:'100%',marginTop:'30px'}}>
                <Col span={12}>
                <Card style={{height:'300px'}} hoverable
                title={<div style={{fontSize:'20px'}}>fp</div>}></Card>
                </Col>
                <Col span={12}>
                    <Card style={{ height: '300px' }} title={<div style={{ fontSize: '20px' }}>fcp</div>} hoverable></Card>
                </Col>
            </Row>
            <Row justify='space-around' gutter={[20]} style={{ width: '100%', marginTop: '30px' }}>
                <Col span={8}>
                    <Card style={{ height: '300px' }} hoverable
                        title={<div style={{ fontSize: '20px' }}>Domready</div>}></Card>
                </Col>
                <Col span={8}>
                    <Card style={{ height: '300px' }} title={<div style={{ fontSize: '20px' }}>dns</div>} hoverable></Card>
                </Col>
                <Col span={8}>
                    <Card style={{ height: '300px' }} title={<div style={{ fontSize: '20px' }}>blackScreenTime</div>} hoverable></Card>
                </Col>
            </Row>
        </Flex>
    )
}
export default Performance;