import PublicMenu from "../../components/menu"
import { Flex } from "antd"
const ProjectShow=()=>{
    return (
        <Flex
            style={{
                width: "100%",
                minHeight: "100vh",
                margin: "auto",
            }}>
            <PublicMenu></PublicMenu>
            <Flex
                style={{
                    width: "calc(100% - 250px)",
                    minHeight: "100vh",
                    margin: "auto",
                    backgroundColor:'#f3ebf7',
                    marginLeft:'250px'
                }}>
1111
            </Flex>
        </Flex>
    )
}
export default ProjectShow