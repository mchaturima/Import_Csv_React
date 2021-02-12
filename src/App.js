import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CsvFile from './components/ImportCsv';
import Table from './components/ExtractCsvTable';

function App() {
 const [items,setItems] = useState();
  return (
    <div className="App">
     <CsvFile tableData={items=>setItems(items)}></CsvFile>
     <Table tableData={items}></Table>
    </div>
  );
}

export default App;
