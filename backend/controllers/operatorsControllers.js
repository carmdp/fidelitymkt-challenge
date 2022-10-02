const Sequelize = require('sequelize');
const operator = require('../models/operatorsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');      // Añadimos dotenv para utilizar las variables de entorno

/**
 * Validate login session
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function ValidateLogIn(req, res){
    
    // Get data  
    const { userName, password } = req.body;      
    
    // Loading enviroment variable
    dotenv.config();

    try {
      
        //Check if user exists in database
        if ( !(await ValidateUser(userName)))
            throw new Error('');
      
        // Get user hash in DB
        const hashDB = await GetHash(userName);
       
        //Compare password with hash stored in DB
        if (await bcrypt.compare(password+process.env.KEY_PRIVATE, hashDB)) {  
           
            
           
            
            //Update date of last session
            UpdateLastLogin(userName);

            // Generate token for authentication
            const token = jwt.sign( { user:userName }, process.env.API_KEY, { expiresIn: process.env.TOKEN_EXPIRES_IN } );

            // Return token with verification successfully completed
            return res.status(200).send({user:userName, token:token});
                       
        }else{
            //Return error 401 - access not authorized 
            return res.status(401).send();
        }
        
    }catch(error){
        // Return error 400 - Bad request
        return res.status(400).send(error);
    }
}

/**
 * Get list all operators
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function GetListOperators(req, res){
    const currentPage = parseInt(req.body.currentPage);
    const limit = parseInt(req.body.limit);
    const offset = (currentPage*limit)-limit;


    return await operator.findAndCountAll({offset:offset,limit:limit})
        .then(operators => res.status(200).send(operators))
        .catch(error => res.status(400).send(error))
    
}

/**
 * Add operator
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function SetOperator(req,res){
    // Obtenemos datos enviados  
    
    const { name, surname, userName, password, status } = req.body;   
     
    const newPassHash = await bcrypt.hash(password+process.env.KEY_PRIVATE,10); 
  
    return  operator.create ({
                name: name,
                surname: surname,
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

/**
 * Get data by operator
 * @param {Object} req 
 * @param {Object} res 
 * @returns Object
 */
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

/**
 * Update data operator
 * @param {Object} req 
 * @param {Object} res 
 * @returns Object
 */
async function PutOperator(req, res){
    
    // Obtenemos datos enviados   
    const { id, name, surname, status } = req.body;   
    
    return  operator.update ({
                name: name,
                surname: surname,
                status: status,
            },{where:{id:id}})
            .then(operator => res.status(200).send(""))
            .catch(error => res.status(400).send(error))

}


/**
 * Check if user exists in database
 * @param {String} user | Name user
 * @returns Boolean
 */
async function ValidateUser(user){
    
    const user = await operator.findOne({ where:{userName: user, status: 1} });
   
    if (user === null) 
        return false;

    return true;

}

/**
 * Get user hash in db.
 * @param {String} user | Name user   
 * @returns Object
 */
async function GetHash(user){
    
    const hash = await operator.findOne({
        attributes: ['password'], 
        where: { userName: user } 
    });
    
    return hash.dataValues.password;

}

/**
 * Update session login 
 * @param {String} user 
 * @returns Object
 */
async function UpdateLastLogin(user){
    
    return await operator.update({
        lastLoginDate:Date()
    },{
        where:{ userName: user }
    });

}



module.exports = {
    ValidateLogIn,          //Validate login session
    GetListOperators,       //List all operators
    SetOperator,            //Add operator 
    GetOperator,            //Get data by operator
    PutOperator             //Update data operator
    
}