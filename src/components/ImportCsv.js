import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export default function ImportCsv(props) {

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        
        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      var data_new = d.reduceRight(function (r, a) {
        r.some(function (b) {
          if(a.phone === b.phone){
             a.phone = "Invalid";
             b.phone = "Invalid";
          }

          if(a.username === b.username){
            a.username = "Invalid";
            b.username = "Invalid";
         }

         if(a.email === b.email){
          a.email = "Invalid";
          b.email = "Invalid";
       }
          
        }) || r.push(a);
        return r;
    }, []);

      props.tableData(data_new);
    });
  };


 
  function fileHandler(event){
    let fileObj = event.target.files[0];
    readExcel(fileObj);
  }

    return (
      <>
       <input type="file" accept=".csv,.xlsx,.xls" onChange={fileHandler.bind(this)} />
      </>
    );
  }
  
  