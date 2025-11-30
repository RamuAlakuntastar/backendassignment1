
const UserModel = require('../Models/userModel');
const { getAllFactory, createFactory, getFactoryById, deleteFactoryById } = require('../Utilitys/crudFactory');




const getAllUsers = getAllFactory(UserModel);
const createUser = createFactory(UserModel);
const getUserById = getFactoryById(UserModel);
const deleteUserById = deleteFactoryById(UserModel);


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUserById
}