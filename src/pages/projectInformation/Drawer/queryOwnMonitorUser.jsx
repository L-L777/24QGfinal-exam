import React from 'react';
import { Drawer, Table, Tag } from 'antd';



export default function Error({ open, onClose, user }) {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tags🤐',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },

    ];
    function getRandomTags(tags) {
        // 随机打乱数组
        const shuffled = tags.sort(() => 0.5 - Math.random());
        // 返回前两个标签
        return shuffled.slice(0, 2);
    }

    const tages = ['nice', 'good', 'cool']
    const data = user.map((item) => {
        const truncatedName = item.username.length > 6
            ? item.username.substring(0, 6) + '...' // 如果名字超过 8 个字符，则截断并添加省略号
            : item.username;

        return {
            id: item.userId,
            name: truncatedName,
            tags: getRandomTags(tages) // 为每个用户生成两个随机标签
        };
    });

    // 输出结果


    return (
        <Drawer
            onClose={onClose}
            open={open}
            title={'监控已有用户'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ minHeight: '600px', height: 'calc(100% - 50px)' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        position: ['bottomCenter'], // 确保分页器在底部中央
                    }}
                    scroll={{ x: 'max-content' }} // 根据需要设置滚动
                />
                <style>
                    {`
                    .ant-pagination {
                        display: flex;
                        justify-content: center;
                    }
                `}
                </style>
            </div>

        </Drawer>
    );
}