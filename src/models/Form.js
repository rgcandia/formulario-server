const {DataTypes} =  require('sequelize');
module.exports=(sequelize)=>{
    sequelize.define('form',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,

        },
        
        data:{
            type:DataTypes.JSON,           
        },
        model:{
            type:DataTypes.INTEGER,
        },
        pending:{
            type:DataTypes.BOOLEAN,
            defaultValue:true,
        }

    });
}