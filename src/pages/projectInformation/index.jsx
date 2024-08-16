import React, { useEffect, useState } from "react";
import PublicMenu from "../../components/menu";
import { useRole } from "../../utils/roleContext";
import { Flex } from "antd";
import Top from "./top";
import Number from "./number";
import Data from "./data";
import InfromationCard from "./infromationCard";
import { detaliedInfo, projectPresentationDateOneWeek } from "../../api/index"
import { useLocation, useNavigate } from 'react-router-dom';


const Index = () => {
  const navigate = useNavigate();
  const { role } = useRole()
  const [projectData, setProjectData] = useState({})
  const [weekData, setWeekData] = useState([])
  const { search } = useLocation();
  let receiveProjectId = null
  if (search) {
    const params = new URLSearchParams(search);
    receiveProjectId = params.get('projectId')
  }

  useEffect(() => {
    if (role.role !== '管理员' && role.role !== '用户') {
      navigate('/login')
    }

    const onLoad = async () => {
      try {
        const res = await detaliedInfo(receiveProjectId);
        if (res.code === 1)
          setProjectData(res.data)
      } catch (error) {
        console.log(error)
      }



      try {
        const res = await projectPresentationDateOneWeek(receiveProjectId);
        if (res.code === 1) {
          setWeekData(res.data)
        }
      } catch (error) {
        console.log(error)
      }

    };
    onLoad()
  }, [])



  return (
    <Flex
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: "auto",
      }}
    >
      <PublicMenu></PublicMenu>
      <Flex
        vertical
        style={{
          width: "100%",
          minHeight: "100vh",
          margin: "auto",
          backgroundColor: "#f3ebf7",
          marginLeft: "250px",
          minWidth: "1200px",
        }}
        align={"center"}
      >
        <Top projectData={projectData} receiveProjectId={receiveProjectId} weekData={weekData} />
        <Flex
          style={{
            marginTop: "10px",
            width: "90%",
          }}
          vertical
        >
          <Number weekData={weekData} />
          <InfromationCard receiveProjectId={receiveProjectId} weekData={weekData} />
        </Flex>
        <h1
          style={{
            width: "90%",
            fontSize: "24px",
            marginTop: "25px",
            marginBottom: "25px",
          }}
        >
          日志
        </h1>
        <Data receiveProjectId={receiveProjectId} weekData={weekData} />
      </Flex>
    </Flex>
  );
};

export default Index;
