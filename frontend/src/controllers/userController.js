import conection from 'config/Axios';

export const validateUser = async (params) => {
    try {
        return conection.post('/login',params).then((res) => res);
    } catch (error) {
        console.error(error.message)
    }    
};
