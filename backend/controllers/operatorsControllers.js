const Sequelize = require('sequelize');
const operator = require('../models/operatorsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');      // Añadimos dotenv para utilizar las variables de entorno
const KEY_PRIVATE = "mkt2022fidellity"



//Funcion que valida el inicio de sesion
async function ValidateLogIn(req, res){
    
    // Obtenemos datos enviados  
    const { userName, password } = req.body;      
   
    try {
      
        //Verificamos que exista el usuario
        if ( !(await ValidateUser(userName)))
            throw new Error('');
      
        // Solicitamos hash de usuario a la DB
        const hashDB = await GetHash(userName);
       
        //Comparamos password con hash almacenado en DB
        if (await bcrypt.compare(password+KEY_PRIVATE, hashDB)) {  
           
            
            // Cargamos nuestras variables de entorno
            dotenv.config();
            
            //Actualizamos fecha de ultima sesion
            UpdateLastLogin(userName);

            // Generamos token de authentificacion
            const token = jwt.sign( { user:userName }, process.env.API_KEY, { expiresIn: process.env.TOKEN_EXPIRES_IN } );

            // Regresamos el token para verificar que el usuario ha iniciado sesión correctamente
            return res.status(200).send({user:userName, token:token});
                       
        }else{
            //Retornamos acceso no autorizado   
            return res.status(401).send();
        }
        
    }catch(error){
        // Error a la peticion del cliente
        return res.status(400).send(error);
    }
}

//Funcion que retorna el listados de todos los operadores
async function GetListOperators(req, res){
    const currentPage = parseInt(req.body.currentPage);
    const limit = parseInt(req.body.limit);
    const offset = (currentPage*limit)-limit;


    return await operator.findAndCountAll({offset:offset,limit:limit})
        .then(operators => res.status(200).send(operators))
        .catch(error => res.status(400).send(error))
    
}

//Funcion que agrega un nuevo operador
async function SetOperator(req,res){
    // Obtenemos datos enviados  
    
    const { name, surname, userName, password, status } = req.body;   
     
    const newPassHash = await bcrypt.hash(password+KEY_PRIVATE,10); 
  
    return  operator.create ({
                name: name,
                surName: surname,
                userName: userName,
                password: newPassHash,
                status: status.length > 0 ? true : false,
                lastLoginDate: Date(),
            })
            .then(operator => res.status(200).send(""))
            .catch(error =>{
                switch (error.parent.errno){
                    case 1062:  res.status(409).send({title:"Ups! El usuario ya existe", message:"Intente nuevamente con otro nombre."});
                                break;
                    
                    default:    res.status(400).send({title:"Ups! Hubo un error", message:"Estamos trabajando para solucionarlo. Intente nuevamente mas tardes."});
                }
            })

} 

//Funcion que valida el inicio de sesion
async function GetOperator(req, res){
    
    const id = req.params.id;
   
    try {
        const rta = await operator.findOne({ attributes: ['name','surname','status'], where: {id: id} });
        return res.status(200).send(rta.dataValues);

    }catch(error){
        // Error a la peticion del cliente
        return res.status(400).json();
    }
    
}

//Funcion que valida el inicio de sesion
async function PutOperator(req, res){
    
    // Obtenemos datos enviados   
    const { id, name, surname, status } = req.body;   
    
    return  operator.update ({
                name: name,
                surName: surname,
                status: status,
            },{where:{id:id}})
            .then(operator => res.status(200).send(""))
            .catch(error => res.status(400).send(error))
    }


//Comprobamos si el usuario existe en la base de datos
async function ValidateUser(value){
    
    const user = await operator.findOne({ where:{userName: value, status: 1} });
   
    if (user === null) 
        return false;

    return true;

}

//Traemos hash almacenado en la base de datos
async function GetHash(value){
    
    const hash = await operator.findOne({
        attributes: ['password'], 
        where: { userName: value } 
    });
    
    return hash.dataValues.password;

}

//Actulizamos campo lastLoginDate de la base de datos 
async function UpdateLastLogin(user){
    
    return await operator.update({
        lastLoginDate:Date()
    },{
        where:{ userName: user }
    });

}



module.exports = {
    ValidateLogIn,
    GetListOperators,
    SetOperator,
    GetOperator,
    PutOperator
    
    
}