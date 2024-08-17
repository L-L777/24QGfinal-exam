import { Flex, Row, Col, Card } from "antd";
import { useEffect, useState } from "react";
import { queryFrontPerformanceLog } from "../../api";
import Fp from "./Antv/fp";
import Fcp from "./Antv/fcp";
import DomReady from "./Antv/Domready";
import Dns from "./Antv/dns";
import BlankScreenTime from "./Antv/blankScreenTime";

const FrontedPerformance = ({ projectId }) => {
  const [data, setData] = useState([]);
  const [fp, setFp] = useState([]);
  const [fcp, setFcp] = useState([]);
  const [domReady, setDomReady] = useState([]);
  const [dns, setDns] = useState([]);
  const [blankScreenTime, setBlankScreenTime] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await queryFrontPerformanceLog(projectId);
        setData(response.data);
        // const getInformation = JSON.parse(response.data.logInfo.data);
        // // 提取所需的值
        // const { fp, fcp, domReady, dns, blankScreenTime } = getInformation;
        // console.log(response.data)
        // // 确保每个 set 函数调用的值与其对应的状态变量匹配
        // setFp(fp); // 设置 fp 状态
        // setFcp(fcp); // 设置 fcp 状态
        // setDomReady(domReady); // 设置 domReady 状态
        // setDns(dns); // 设置 dns 状态
        // setBlankScreenTime(blankScreenTime); // 设置 blankScreenTime 状态
        response.data.map((item) => {
          const parsedData = JSON.parse(item.data);
          setFp((prevFp) => [...prevFp, parsedData.fp]);
          setFcp((prevFcp) => [...prevFcp, parsedData.fcp]);
          setDomReady((prevDomReady) => [...prevDomReady, parsedData.domReady]);
          setDns((prevDns) => [...prevDns, parsedData.dns]);
          setBlankScreenTime((prevBlackScreenTime) => [
            ...prevBlackScreenTime,
            parsedData.blankScreenTime,
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    return () => {
      setFp([]);
      setFcp([]);
      setDomReady([]);
      setDns([]);
      setBlankScreenTime([]);
    };
  }, [projectId]);

  console.log(dns);

  return (
    <Flex style={{ width: "90%", marginTop: "30px" }} vertical>
      <h3 style={{ color: "#3F1575", fontSize: "24px" }}>performance</h3>
      <Row
        justify="space-around"
        gutter={[20]}
        style={{ width: "100%", marginTop: "30px" }}
      >
        <Col span={12}>
          <Card style={{ height: "300px" }} hoverable>
            <Fp fp={fp} />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ height: "300px" }} hoverable>
            <Fcp fcp={fcp} />
          </Card>
        </Col>
      </Row>
      <Row
        justify="space-around"
        gutter={[20]}
        style={{ width: "100%", marginTop: "30px" }}
      >
        <Col span={8}>
          <Card style={{ height: "300px" }} hoverable>
            <DomReady domReady={domReady} />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: "300px" }} hoverable>
            <Dns dns={dns} />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: "300px" }} hoverable>
            <BlankScreenTime blankScreenTime={blankScreenTime} />
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
export default FrontedPerformance;
