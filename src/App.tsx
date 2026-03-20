import React, {useState} from 'react';
import './App.css';
import DataTable from "./components/DataTable";
import { v4 as uuidv4 } from 'uuid';
import {IDataItem} from "./types";

function App() {

  const [data, setData] = useState<IDataItem[]>([
    { id: uuidv4(), name: 'Иван Иванов', date: '2025-03-01', value: 100 },
    { id: uuidv4(), name: 'Мария Петрова', date: '2025-03-15', value: 250 },
  ]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<IDataItem | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (record: IDataItem) => {
    setEditingItem(record);
    setModalVisible(true);
  };

  const filteredData = data.filter(item =>
      Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchText.toLowerCase())
      )
  );

  return (
    <div className="App">
      <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
