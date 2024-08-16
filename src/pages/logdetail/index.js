import { useEffect, useState } from "react"
import { useLocation,useNavigate } from "react-router-dom"
import { useRole } from "../../utils/roleContext";
import { Flex } from "antd"
import PublicMenu from "../../components/menu"
import FrontedPerformance from "./Frontedperformance"
import Exception from "./exception"
import BackendExceptionInfo from "./backendExceptionInfo"
import FrontedPerformanceInfo from "./frontedPerformanceInfo"
import FrontedExceptionInfo from "./FrontedExceptionInfo"
import { showDetaliedLog, showLogNumberOneWeekForGroup } from "../../api"
import AppPerformanceInfo from "./appPerformanceInfo"
import AppExceptionInfo from "./appExceptionInfo"
import BackendPerformanceInfo from "./backendPerformanceInfo"
import BackendSelfDefinedInfo from "./selfDefinedInfo"
const LogDetail=()=>{
    const location=useLocation()
    const { role } = useRole()
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [logType, setLogType] = useState(parseInt(searchParams.get('logType')))
    const [projectId, setProjectId] = useState(parseInt(searchParams.get('projectId')))
    const [logId, setLogId] = useState(parseInt(searchParams.get('logId')))
    const [groupType, setGroupType] = useState(parseInt(searchParams.get('groupType')))
    const [data,setData]=useState({})
    const [logData,setLogData]=useState({})
    const [logNumber,setLogNumber]=useState([])
    const [logInfo,setLogInfo]=useState('')
    const [logTime,setLogTime]=useState('')
    const [logUrl,setLogUrl]=useState('')
    useEffect(()=>{
        document.title="日志详情"
        if (role.role !== '管理员' && role.role !== '用户') {
            navigate('/login')
        }
        setLogType(parseInt(searchParams.get('logType')))
        setLogId(parseInt(searchParams.get('logId')))
        setProjectId(parseInt(searchParams.get('projectId')))
        setGroupType(parseInt(searchParams.get('groupType')))
        async function fetchData() {
            try {
                const logResponse = await showDetaliedLog(groupType, logId, logType)
                const logNumResponse = await showLogNumberOneWeekForGroup(groupType, projectId, logType)
                setLogNumber(logNumResponse.data)
                setLogInfo(logResponse.data.logInfo)
                setData(logResponse.data)
                console.log(logResponse.data.logInfo.logTime);
                setLogData(JSON.parse(logResponse.data.logInfo.data))
                setLogTime(logResponse.data.logInfo.logTime)
                setLogUrl(logResponse.data.logInfo.url)
            } catch (error) {
                // console.log(logNumber);
                

            }
        }
      fetchData()
    }, [groupType, logId, projectId, logType])
    // console.log(JSON.parse(logInfo.data));
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
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <h3
                            style={{
                                fontSize: "28px",
                                position: "relative", // 使文本相对于投影区域
                                zIndex: 1, // 确保文本在投影区域之上
                            }}
                        >
                            日志详细
                        </h3>
                        <div
                            style={{
                                position: "absolute",
                                left: "-11px",
                                bottom: "-5px", // 调整阴影区域的垂直位置
                                width: "127px",
                                height: "12px", // 阴影区域的高度
                                background: "linear-gradient(to right, #C8B5FF, #C496FF)",
                                transform: "skewX(-20deg)", // 使左右边变斜
                                transformOrigin: "bottom", // 设置变换的起点为底部
                                zIndex: 0, // 将阴影区域放在文本下方
                            }}
                        ></div>
                    </div>
                </Flex>
                {(groupType === 1 && logType === 1) ? <FrontedPerformance projectId={projectId}></FrontedPerformance> : <Exception groupType={groupType} logType={logType} projectId={projectId}></Exception> }
                {groupType === 1 && logType === 1 && <FrontedPerformanceInfo logData={logData} logUrl={logUrl} logTime={logTime}></FrontedPerformanceInfo> }
                {groupType === 1 && logType === 0 && <FrontedExceptionInfo logData={logData} logTime={logTime} logUrl={logUrl}></FrontedExceptionInfo> }
            {groupType===2&&logType===1&&<AppPerformanceInfo logInfo={logInfo}></AppPerformanceInfo>}
            {groupType===2&&logType===0&&<AppExceptionInfo logInfo={logInfo}></AppExceptionInfo>}
                {groupType === 0 && logType === 0 && <BackendExceptionInfo logData={data} ></BackendExceptionInfo >}
                {groupType === 0 && logType === 1 && <BackendPerformanceInfo logData={data}></BackendPerformanceInfo>}
                {groupType === 0 && logType === 2 && <BackendSelfDefinedInfo logData={data}></BackendSelfDefinedInfo>}

            </Flex>
        </Flex>
    )
}
export default LogDetail;