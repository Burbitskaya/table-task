import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { IDataItem } from '../types';
import type { ColumnsType } from 'antd/es/table';

interface DataTableProps {
    data: IDataItem[];
    onEdit: (record: IDataItem) => void;
    onDelete: (id: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
    const columns: ColumnsType<IDataItem> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => text,
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" icon={<EditFilled />} onClick={() => onEdit(record)} />
                    <Button
                        type="link"
                        danger
                        icon={<DeleteFilled />}
                        onClick={() => onDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{ pageSize: 5 }}
        />
    );
};

export default DataTable;