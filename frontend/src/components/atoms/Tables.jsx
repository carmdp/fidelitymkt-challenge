import React from 'react'
import {Table} from 'react-bootstrap';
import {EditOperators} from 'components/atoms/Buttons';
import './css/tables.css';

const TableOperators = ({operators, handleClick}) => {
   
    return (<>
        
        <Table responsive bordered className="align-middle" >
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Estado</th>
                    <th>Ultima sesion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            { operators &&
                operators.map((operator, key) =>{
                    if (operator.userName != "admin"){
                        return(<>
                            <tr key={key}>
                                <td><b>{operator.userName}</b></td>
                                <td>{operator.name}</td>
                                <td>{operator.surName}</td>
                                <td>{(operator.status) ? 'Activo' : 'Inactivo' }</td>
                                <td>{DateConvert(operator.lastLoginDate)}</td>
                                <td>
                                    { (operator.id !== 18) &&
                                        <EditOperators handleClick={(e)=>handleClick(operator.id)} />
                                    }
                                    {/* <RemoveOperators id={operator.id} /> */}
                                </td>
                            </tr>
                        </>)
                    }
                })
            }
            </tbody>
        </Table>
      
    </>)
  
}

function DateConvert (params) {
    let date = new Date(params);
   
    let dateMDY = `${formatDate(date)} a las ${formatHours(date)}`;

    return dateMDY;
}

function formatDate(date) {
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function formatHours(date) {
    var hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = date.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
}

export default TableOperators;