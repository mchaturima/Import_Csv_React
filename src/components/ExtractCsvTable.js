import React, { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';

function ExtractCsvTable(items) {
    let data = items.tableData ? items.tableData: [];
    let column = [];
    if(data.length > 0){
        column = Object.keys(data[0])
    }
    function checkMandatoryFields(item) {
        if(item === "null" || item === "Invalid"){
            return "Invalid"
        }else{
            return item;
        }
    }

    return (
        <>
          <Table striped bordered hover style={table}>
              <thead>
                  <tr>
                {column.map((item,index)=>{
                    return(
                        <th key={index} className="table-headers">{item.split('_').join(" ")}</th>
                    )
                })}
                </tr>
              </thead>
              <tbody>
         {data.map((item,index)=>{
              return ( 
                <tr key={index}>
                <td key={index+"-username"} className="username">{checkMandatoryFields(item.username ? item.username : "Invalid")}</td>
                <td key={index+"-fname"}>{item.first_name}</td>
                <td key={index+"-lname"}>{item.last_name}</td>
                <td key={index+"-email"} className="">{checkMandatoryFields(item.email)}</td>
                <td key={index+"-phone"} className="unique-fields">{item.phone}</td>
                </tr>
              )
            })}
            </tbody>
            </Table>
        </>
    )
}

var table = {
    "margin" : "10px"
}

export default ExtractCsvTable
