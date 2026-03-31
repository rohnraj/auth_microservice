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

export { getExistingUser, createNewUser };