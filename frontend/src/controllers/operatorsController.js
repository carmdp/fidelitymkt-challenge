import conection from 'config/Axios';

const url_raiz = '/';

export const GetOperators = (params) => {
    try {
        return conection.post(`${url_raiz}operators`,params).then((res) => res);
    } catch (error) {
        console.error(error.message)
    }    
};

export const SetOperator =  (params) =>{
    try {
        return conection.post(`${url_raiz}operators/add`,params).then((res) => res); 
    } catch (error) {
        console.error(error.message)
    }  
}

export const GetOperatorById = (id) =>{
    try {
        return conection.get(`${url_raiz}operators/get/${id}`).then((res) => res); 
    } catch (error) {
        console.error(error.message)
    }  
}

export const PutOperator = (params) =>{
    try {
        return conection.put(`${url_raiz}operators/update`,params).then((res) => res); 
    } catch (error) {
        console.error(error.message)
    }  
}
