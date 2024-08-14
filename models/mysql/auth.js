import { db } from '../../config.js';

export class AuthModel {
    static async login({ email }) {
        const [Account] = await db.query('SELECT * FROM Account WHERE email = ?', [email]);
        const account = Account[0];

        if (Account.length === 0) return null;

        const [User] = await db.query('SELECT * FROM Client WHERE clientID = ?', account.clientID);
        const user = User[0];

        if(User.length === 0) return null;

        return {
            clientID: user.clientID,
            firstname: user.firstname,
            lastname: user.lastname,
            dni: user.dni,
            email,
            password: account.password
        }
    };


    static async register({ firstname, lastname, dni, email, passwordHaash }) {
        const [uuidClient] = await db.execute('SELECT UUID() clientID;');
        const [{ clientID }] = uuidClient;

        const [uuidAccount] = await db.execute('SELECT UUID() accountID;');
        const [{ accountID }] = uuidAccount;

        await db.execute(`INSERT INTO Client (clientID) VALUES (UUID_TO_BIN("${clientID}"));`);

        await db.execute(`INSERT INTO Personal_Information (clientID, firstname, lastname, dni) VALUES (UUID_TO_BIN("${clientID}"), ?, ?, ?);`, [firstname, lastname, dni]);

        await db.execute(`INSERT INTO Account (accountID, userID, email, password) VALUES (UUID_TO_BIN("${accountID}"), UUID_TO_BIN("${clientID}"), ?, ?);`, [email, passwordHaash]);
    };
};  