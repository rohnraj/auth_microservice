import Pool from "../config/db.js";



const getExistingUser = async (email) => {
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await Pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const createNewUser = async (id, username, email, hashedPassword) => {
    try {
        const query = 'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [id, username, email, hashedPassword];
        const result = await Pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const query = 'SELECT id, username, email FROM users';
        const result = await Pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

const getUserbyId = async (id) => {
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        const result = await Pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

export { getExistingUser, createNewUser, getAllUsers, getUserbyId };