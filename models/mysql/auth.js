import { db } from '../../config.js';

export class AuthModel {
    static async login({ email }) {
        const [Account] = await db.promise().execute('SELECT * FROM Account WHERE email = ?', [email]);
        const account = Account[0];

        if (Account.length === 0) return null;

        const clientID = account.userID.toString('hex');

        const [User] = await db.promise().execute(`SELECT * FROM Personal_Information WHERE clientID = UUID_TO_BIN("${clientID}")`);
        const user = User[0];

        if(User.length === 0) return [];

        return {
            userID: user.clientID.toString('hex'),
            firstname: user.firstname,
            lastname: user.lastname,
            dni: user.dni,
            email,
            password: account.password
        }
    };


    static async register({ firstname, lastname, dni, email, passwordHaash }) {
        const [uuidClient] = await db.promise().execute('SELECT UUID() clientID;');
        const [{ clientID }] = uuidClient;

        const [uuidAccount] = await db.promise().execute('SELECT UUID() accountID;');
        const [{ accountID }] = uuidAccount;

        const [uuidCart] = await db.promise().execute('SELECT UUID() cartID;');
        const [{ cartID }] = uuidCart;

        await db.promise().execute(`INSERT INTO Client (clientID) VALUES (UUID_TO_BIN("${clientID}"));`);

        await db.promise().execute(`INSERT INTO Personal_Information (clientID, firstname, lastname, dni) VALUES (UUID_TO_BIN("${clientID}"), ?, ?, ?);`, [firstname, lastname, dni]);

        await db.promise().execute(`INSERT INTO Account (accountID, userID, email, password) VALUES (UUID_TO_BIN("${accountID}"), UUID_TO_BIN("${clientID}"), ?, ?);`, [email, passwordHaash]);
        
        await db.promise().execute(`INSERT INTO Cart (cartID, clientID) VALUES (UUID_TO_BIN("${cartID}"), UUID_TO_BIN("${clientID}"));`);
    };
};  