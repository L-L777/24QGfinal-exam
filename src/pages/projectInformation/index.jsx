import React, { useEffect, useState } from "react";
import PublicMenu from "../../components/menu";
import { Flex } from "antd";
import Top from "./top";
import Number from "./number";
import Data from "./data";
import InfromationCard from "./infromationCard";
import { detaliedInfo, projectPresentationDateOneWeek } from "../../api/index"
import { useLocation } from 'react-router-dom';


const Index = () => {

  const [projectData, setProjectData] = useState({})
  const { search } = useLocation();
  let receiveProjectId = null
  if (search) {
    const params = new URLSearchParams(search);
    receiveProjectId = params.get('projectId')
    console.log(receiveProjectId)
  }

  useEffect(() => {
    const onLoad = async () => {
      try {
        const res = await detaliedInfo(receiveProjectId);
        setProjectData(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    onLoad()

    const onLoadCard = async () => {
      try {
        const res = await projectPresentationDateOneWeek(receiveProjectId);
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    };
    onLoadCard()

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
        <Top projectData={projectData} receiveProjectId={receiveProjectId} />
        <Flex
          style={{
            marginTop: "10px",
            width: "90%",
          }}
          vertical
        >
          <Number />
          <InfromationCard receiveProjectId={receiveProjectId} />
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
        <Data receiveProjectId={receiveProjectId} />
      </Flex>
    </Flex>
  );
};

export default Index;
