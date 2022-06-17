const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Student = sequelize.define('Student', {
    school: {
        type: DataTypes.STRING 
    },
    dictrict: {
        type: DataTypes.STRING 
    },
    studentId: {
        type: DataTypes.STRING 
    },
    classroom: {
        type: DataTypes.STRING 
    },
    fullName: {
        type: DataTypes.STRING 
    },
    day: {
        type: DataTypes.NUMBER 
    },
    month: {
        type: DataTypes.NUMBER 
    },
    year: {
        type: DataTypes.NUMBER 
    },
    gender: {
        type: DataTypes.STRING 
    },
    placeOfBirth: {
        type: DataTypes.STRING 
    },
    ethnic: {
        type: DataTypes.STRING 
    },
    placeOfLiving: {
        type: DataTypes.STRING
    },
    phoneNum: {
        type: DataTypes.NUMBER 
    },
    grade1: {
        type: DataTypes.NUMBER 
    },
    grade2: {
        type: DataTypes.NUMBER 
    },
    grade3: {
        type: DataTypes.NUMBER 
    },
    grade4: {
        type: DataTypes.NUMBER 
    },
    grade5: {
        type: DataTypes.NUMBER 
    },
    all5GradePoint: {
        type: DataTypes.NUMBER
    },
    bonusPoint: {
        type: DataTypes.NUMBER    
    },
    totalPoint: {
        type: DataTypes.NUMBER      },
    note: {
        type: DataTypes.STRING 
    }

}, {
    underscored: true
}); 
module.exports = Student;
