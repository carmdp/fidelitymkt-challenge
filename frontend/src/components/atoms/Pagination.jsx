import React, {useState} from 'react';
import {Pagination, Form} from 'react-bootstrap';

const PaginationTable = ({pageStart,pageEnd, handleCurrentPage}) => {
    let pages = [];

    const [page,setPage] = useState({
        start: pageStart,
        current: pageStart,
        end: pageEnd
    });
    
   
    const handleFirst = () => {
        setPage({
            ...page,
            current: page.start
        })
        
        handleCurrentPage(page.start);
    }
    
    const handlePrev = () => {
        if (page.current > page.start){
           handleCurrentPage(--page.current);
        }else{
            alert("llego al principio de la paginas")
        }
    }

    const handleNext= () => {
       
        if (page.current < page.end){
            handleCurrentPage(++page.current);
        }else{
            alert("llego al final de la paginas")
        } 
            
    }

    const handleLast = () => {
        setPage({
            ...page,
            current: page.end
        })
        
        handleCurrentPage(page.end);
    }

    const handleChange = (numberPage) =>{
       setPage({...page, current:numberPage});
       handleCurrentPage(numberPage);
    }

    
    for (let index = 1; index <= pageEnd; index++) {
        pages.push(<Pagination.Item active={activePage(page.current,index)} onClick={(e)=>handleChange(index)} key={index}>{index}</Pagination.Item>)
    }
   
    return (<>
        <Pagination> 
            <Pagination.First onClick={handleFirst}/>
            <Pagination.Prev  onClick={handlePrev}/>
            {pages}
            <Pagination.Next onClick={handleNext}/>
            <Pagination.Last active={false} disabled={false} onClick={handleLast}/>
        </Pagination> 
    </>)

}

//Resalta pagina activa
function activePage(page,index){
    
    if (page === index){ return true }
    
    return   false;
}


export const PaginationSelect =(props)=>{
    const {name, values, handleChange } = props;
   
    return(<>
        <Form.Label className="mb-0">Mostrar: </Form.Label>
        <Form.Select id={name} name={name} onChange={(e) => handleChange(e.target.value)} className="mx-2">
            {   values &&
                    values.map(
                        (value,key)=><option value={value} key={key}>{value}</option>
                    )
            }
        </Form.Select>
    </>)
}

export default PaginationTable;