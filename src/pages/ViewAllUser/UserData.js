import { Modal, Button, Switch, Input } from "antd";
import { freezeUser } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function UserData({ user }) {  
  const Navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [freezeTime, setFreezeTime] = useState(0);

  const color = user.isOnline === "offline" ? "#CCCCCC" : "#E0D1FF";
  const handleClick = () => {
    Navigate(`/personal?userId=${user.userId}&userName=${user.username}`);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    freezeUser(user.userId, freezeTime);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
  };
  const [open, setOpen] = useState(user.enabled === "冻结");
  const onChange = (checked) => {
    setOpen(checked);
    if (checked) {
      showModal();
    } else {
      freezeUser(user.userId, 0);
    }
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)", // 6列均等
        margin: "18px ",
        fontSize: "18px",
        textAlign: "center",
      }}
    >
      <span>{user.username}</span>
      <span>{user.userId}</span>
      <span>
        <Button
          type="primary"
          style={{
            width: "30%",
            margin: "0 auto",
            color: "#9053C0",
            backgroundColor: color,
            borderRadius: "8px",
          }}
        >
          {user.isOnline}
        </Button>
      </span>
      <span>{user.createTime}</span>

      <Switch
        checked={open}
        onChange={onChange}
        checkedChildren="是"
        unCheckedChildren="否"
        style={{
          width: "20%",
          margin: "0 auto",
        }}
      />
      <Modal
        title="请输入冻结时间"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Input
          value={freezeTime}
          onChange={(e) => {
            // 只允许输入整数
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setFreezeTime(value);
            }
          }}
          //只允许输入数字
          type="text"
        ></Input>
      </Modal>
      <Button
        type="primary"
        style={{
          backgroundColor: "#816AFF",
          borderRadius: "8px",
          width: "30%",
          margin: "0 auto",
        }}
        onClick={handleClick}
      >
        详细
      </Button>
    </div>
  );
}

export default UserData;

//死数据  防止后台数据无法拿到
// <div
//   style={{
//     display: "grid",
//     gridTemplateColumns: "repeat(6, 1fr)", // 6列均等
//     margin: "18px ",
//     fontSize: "18px",
//     textAlign: "center",
//   }}
// >
//   <span>用户名</span>
//   <span>456</span>
//   <span>
//     <Button
//       type="primary"
//       style={{
//         width: "30%",
//         margin: "0 auto",
//         color: "#9053C0",
//         backgroundColor: "#E0D1FF",
//         borderRadius: "8px",
//       }}
//     >
//       在线
//     </Button>
//   </span>
//   <span>2024-07-22 16:30</span>

//   <Switch
//     checked={open}
//     onChange={onChange}
//     checkedChildren="是"
//     unCheckedChildren="否"
//     defaultChecked
//     style={{
//       width: "20%",
//       margin: "0 auto",
//     }}
//   />
//   <Modal
//     title="请输入冻结时间"
//     open={isModalOpen}
//     onOk={handleOk}
//     onCancel={handleCancel}
//     okText="确定"
//     cancelText="取消"
//   >
//     <Input
//       value={freezeTime}
//       onChange={(e) => setFreezeTime(e.target.value)}
//       //只允许输入数字
//       type="number"
//     ></Input>
//   </Modal>
//   <Button
//     type="primary"
//     style={{
//       backgroundColor: "#816AFF",
//       borderRadius: "8px",
//       width: "30%",
//       margin: "0 auto",
//     }}
//     onClick={handleClick}
//   >
//     详细
//   </Button>
// </div>;
