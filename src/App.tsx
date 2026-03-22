import React, {useState} from 'react';
import './App.css';
import DataTable from "./components/DataTable";
import { v4 as uuidv4 } from 'uuid';
import {IDataItem} from "./types";
import { Button, Input, Space } from 'antd';
import ItemModal from "./components/ItemModal";
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

const { Search } = Input;

const App: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([
    { id: uuidv4(), name: 'Иван Иванов', date: '2025-03-01', value: 100 },
    { id: uuidv4(), name: 'Мария Петрова', date: '2025-03-15', value: 250 },
  ]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<IDataItem | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const handleAdd = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (record: IDataItem) => {
    setEditingItem(record);
    setModalVisible(true);
    console.log(editingItem, modalVisible);
  };

  const filteredData = data.filter(item =>
      Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const handleModalSubmit = (values: Omit<IDataItem, 'id'>) => {
    if (editingItem) {
      // редактирование
      setData(prev =>
          prev.map(item =>
              item.id === editingItem.id ? { ...item, ...values } : item
          )
      );
    } else {
      // добавление
      const newItem: IDataItem = { ...values, id: uuidv4() };
      setData(prev => [...prev, newItem]);
    }
    setModalVisible(false);
    setEditingItem(null);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingItem(null);
  };

  return (
     <ConfigProvider locale={ruRU}>
      <div style={{ padding: 20 }}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={handleAdd}>
              Добавить
            </Button>
            <Search
                placeholder="Поиск по всем полям"
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 300 }}
                allowClear
            />
          </div>
          <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
        </Space>
        <ItemModal
            visible={modalVisible}
            onCancel={handleModalCancel}
            onOk={handleModalSubmit}
            initialValues={editingItem}
            title={editingItem ? 'Редактировать запись' : 'Добавить запись'}
        />
      </div>
      </ConfigProvider>
  );
};

export default App;
