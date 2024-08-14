import { Flex,Row,Col,Card } from "antd"
import { useEffect,useState } from "react";
import { queryFrontPerformanceLog } from "../../api"
const FrontedPerformance=({projectId})=>{
    const [data,setData]=useState([])
    const[fp,setFp]=useState([])
    const[fcp,setFcp]=useState([])
    const [domReady, setDomReady]=useState([])
    const[dns,setDns]=useState([])
    const [blankScreenTime, setBlankScreenTime]=useState([])
    useEffect(()=>{
async function fetchData(){
    try {
        const response = await queryFrontPerformanceLog(projectId)
        setData(response.data)
        response.data.map((item)=>{
            const parsedData = JSON.parse(item.data)
            setFp(prevFp => [...prevFp, parsedData.fp]);
            setFcp(prevFcp => [...prevFcp, parsedData.fcp]);
            setDomReady(prevDomReady => [...prevDomReady, parsedData.domReady]);
            setDns(prevDns => [...prevDns, parsedData.dns]);
            setBlankScreenTime(prevBlackScreenTime => [...prevBlackScreenTime, parsedData.blankScreenTime]);
        })
        
} catch (error) {

    }
}
        fetchData();
        return ()=>{
            setFp([]);
            setFcp([]);
            setDomReady([]);
            setDns([]);
            setBlankScreenTime([]);
        }
    },[projectId])

    return(
        <Flex style={{ width: '90%', marginTop: '30px' }} vertical>
            <h3 style={{ color: "#3F1575", fontSize: '24px' }}>performance</h3>
            <Row justify='space-around' gutter={[20]} style={{width:'100%',marginTop:'30px'}}>
                <Col span={12}>
                <Card style={{height:'300px'}} hoverable
                title={<div style={{fontSize:'20px'}}>fp</div>}>

                </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ height: '300px' }} title={<div style={{ fontSize: '20px' }}>fcp</div>} hoverable>

                    </Card>
                </Col>
            </Row>
            <Row justify='space-around' gutter={[20]} style={{ width: '100%', marginTop: '30px' }}>
                <Col span={8}>
                    <Card style={{ height: '300px' }} hoverable
                        title={<div style={{ fontSize: '20px' }}>Domready</div>}>

                        </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ height: '300px' }} title={<div style={{ fontSize: '20px' }}>dns</div>} hoverable>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ height: '300px' }} title={<div style={{ fontSize: '20px' }}>blankScreenTime</div>} hoverable>

                    </Card>
                </Col>
            </Row>
        </Flex>
    )
}
export default FrontedPerformance;