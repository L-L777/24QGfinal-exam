import { useEffect, useState } from "react"
import { Flex } from "antd"
import PublicMenu from "../../components/menu"
import Performance from "./performance"
import Exception from "./exception"
import PerformanceInfo from "./performanceInfo"
import ExceptionInfo from "./exceptionInfo"
const LogDetail=()=>{
    const [type, setType] = useState('exception')
    useEffect(()=>{
        setType('performance')

    },[])
    return(
        <Flex style={{
            width: "100%",
            minHeight: "100vh",
            margin: "auto",
        }}>
            {/* 引入侧边栏 */}
            <PublicMenu></PublicMenu>
            {/* 项目管理页面主要内容 */}
            <Flex style={{
                width: "calc(100% - 250px)",
                minWidth: '1200px',
                minHeight: "100vh",
                margin: "auto",
                backgroundColor: '#F4F2F9',
                marginLeft: '250px'
            }} vertical align="center">
                <Flex align="center" justify="space-between" style={{
                    width: '100%',
                    height: '100px',
                    paddingLeft: '50px', paddingRight: '50px', boxSizing: 'border-box',
                    borderBottom: '1px solid #d0c8d9',
                }}>
                    <h3 style={{ fontSize: '28px' }}>日志详细</h3>
                </Flex>
                {type === 'performance' && <Performance></Performance>  }
                {type === 'performance' && <PerformanceInfo></PerformanceInfo> }
                {type === 'exception' && <Exception></Exception> }
                {type === 'exception' && <ExceptionInfo></ExceptionInfo> }
            </Flex>
        </Flex>
    )
}
export default LogDetail;