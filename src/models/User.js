const {DataTypes} =  require('sequelize');
module.exports=(sequelize)=>{
    sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        email:{
            type:DataTypes.STRING,
        },
        name:{
            type:DataTypes.STRING,
       }
    });
}