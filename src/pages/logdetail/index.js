import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Flex } from "antd"
import PublicMenu from "../../components/menu"
import Performance from "./performance"
import Exception from "./exception"
import PerformanceInfo from "./performanceInfo"
import ExceptionInfo from "./exceptionInfo"
import { showDetaliedLog, showLogNumberOneWeekForGroup } from "../../api"
const LogDetail=()=>{
    const [type, setType] = useState('exception')
    const location=useLocation()
    const searchParams = new URLSearchParams(location.search);
    const [logType, setLogType] = useState(parseInt(searchParams.get('logType')))
    const [projectId, setProjectId] = useState(parseInt(searchParams.get('projectId')))
    const [logId, setLogId] = useState(parseInt(searchParams.get('logId')))
    const [groupType, setGroupType] = useState(parseInt(searchParams.get('groupType')))
    const [logData,setLogData]=useState({})
    const [logNumber,setLogNumber]=useState([])
    const [logInfo,setLogInfo]=useState('')
    useEffect(()=>{
        document.title="日志详情"
        setType('performance')
        setLogType(parseInt(searchParams.get('logType')))
        setLogId(parseInt(searchParams.get('logId')))
        setProjectId(parseInt(searchParams.get('projectId')))
        setGroupType(parseInt(searchParams.get('groupType')))
        async function fetchData() {
            try {
                const logResponse = await showDetaliedLog(groupType, logId, logType)
                const logNumResponse = await showLogNumberOneWeekForGroup(groupType, projectId, logType)
                setLogData(logResponse.data)
                setLogNumber(logNumResponse.data)
                setLogInfo(logResponse.data.logInfo)
                
            } catch (error) {
                console.log(logData);
                console.log(logNumber);
                

            }
        }
      fetchData()
    },[])
    // console.log(logInfo);
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
                {groupType === 1 && logType === 1 && <PerformanceInfo logInfo={logInfo}></PerformanceInfo> }
                {type === 'exception' && <Exception></Exception> }
                {type === 'exception' && <ExceptionInfo></ExceptionInfo> }
            </Flex>
        </Flex>
    )
}
export default LogDetail;