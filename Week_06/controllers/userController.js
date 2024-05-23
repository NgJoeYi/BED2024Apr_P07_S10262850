const User = require('../models/user');

const createUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await User.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating user');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving users');
  }
};

const updatedUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const userData = req.body;
  try {
    const updatedUser = await User.updateUser(userId, userData);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating user');
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const userDeleted = await User.deleteUser(userId);
    if (!userDeleted) {
      return res.status(404).send('User not found');
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user');
  }
};

const searchUsers = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  try {
    const users = await User.searchUsers(searchTerm);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching users' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updatedUser,
  deleteUser,
  searchUsers
};
