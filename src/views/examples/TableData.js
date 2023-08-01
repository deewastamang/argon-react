import React from 'react';
import DataTable from 'react-data-table-component'
import 'react-data-table-component-extensions/dist/index.css';
import { getData } from 'api';
import EditModal from 'components/Modal/EditModal';
import AddModal from 'components/Modal/AddModal';
import LocalStorageService from '../../serviceClass';
import Header from '../../components/Headers/Header'

const LOCAL_STORAGE_KEY = 'apiData';

export default function TableData() {
  const [modal, setModal] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = React.useState(null);
  const [addModal, setAddModal] = React.useState(false)
  
  const storageObj = new LocalStorageService(LOCAL_STORAGE_KEY);
  const [localStorageData, setLocalStorageData] = React.useState(storageObj.getAllData());
  
  React.useEffect(() => {
    setLocalStorageData(storageObj.getAllData())
  },[localStorageData])

  React.useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(storedData === [] || storedData === null || storedData === '[]'){
      getData().then(data => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))});    
    } else {
      setLocalStorageData(JSON.parse(storedData));

      }
    }
  ,[]);
  const handleEdit = (row) => {
    setModal(true);
    setSelectedRowData(row);
  }

  const handleUpdate = (updatedRowData) => {
    storageObj.updateData(updatedRowData.id, updatedRowData)
    setModal(false);
  };

  const handleDelete = (row) => {
    storageObj.deleteData(row.id);
  }

  const handleAdd = (newData) => {
    storageObj.addData(newData);
    setAddModal(false)
  }

  const customStyles = {
        rows: {
          style: {
            fontSize: "14px", // Custom font size for all rows
            fontWeight: "600", // Custom font weight for all rows
            color: '#525f7f'
          },
        },
        cells: {
          style: {
            padding: "12px", // Custom cell padding
          },
        },
        headCells: {
          style: {
            fontSize: "16px", // Custom font size for header cells
            fontWeight: "bold", // Custom font weight for header cells
            background: "", // Custom background color for header cells
            color: '#525f7f'

          },
        },
        pagination: {
          style: {
            textAlign: "center", // Center the pagination component
          },
        },
      };

  const columns = [
    { name: 'Title', selector: 'title', sortable: true },
    { name: 'Price', selector: 'price', sortable: true },
    { name: 'Category', selector: 'category', sortable: true },
    {
        name: 'Actions',
        cell: (row) => (
            <div>
                <button className='btn-primary' style={{padding: '.5em', margin: '0 10px', borderRadius: '5px',}} onClick={() => handleEdit(row)}>Edit</button>

                <button className='btn-primary' style={{padding: '.5em', margin: '0 10px', borderRadius: '5px',}} onClick={() =>  handleDelete(row)}>Delete</button>
            </div>
        )
    },
  ];

  return (
    <div className='table-data'>
        {addModal && <AddModal toggle={() => setAddModal(false)} addDataFun={handleAdd} />}
        {modal && <EditModal rowData={selectedRowData} toggle={() => setModal(false)} onUpdate={handleUpdate} />}
      <Header />
      <div style={{width: '94%',margin: '-6rem 0 0 2.5rem'}}>
        <DataTable title='Data table from API and Local Storage' 
        columns={columns} 
        data={localStorageData} 
        customStyles={customStyles}
        pagination 
        selectableRows
        highlightOnHover
        pointerOnHover
      />

      </div>
        <button className='add-btn btn-primary' onClick={() => setAddModal(true)}>Add New</button>
    </div>
  );
}
