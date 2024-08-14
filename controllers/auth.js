import bcryptjs from 'bcryptjs';
import { validateLogin, validateRegister } from "../schemas/auth.js";

export class AuthController {
    constructor ({ authModel }) {
      this.authModel = authModel;
    };

    index = async(req, res) => {
        return res.render('index', {
            login: req.session.loggedin || false,
        });
    };

    logedIn = async(req, res) => {
        return res.render('login');
    };

    logIn = async(req, res) => {
        const { email, password } = req.body;

        if(!validateLogin(email, password)) {
            return res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Correo y/o contraseña incorrecta",
                alertIcon: 'warning',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }

        try {
            const login = await this.authModel.login({ email });

            if (login.length === 0 || !(await bcryptjs.compare(password, login[0].password))) {
                return res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Correo y/o contraseña incorrecta",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            }

            const user = login[0];
            req.session.loggedin = true;
            req.session.user = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                dni: user.dni,
                email: user.email
            };

            return res.render('login', {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "¡LOGIN CORRECTO!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessage = error.errors.map(e => e.message).join(', ');
                return res.render('login', {
                    alert: true,
                    alertTitle: "Error de validación",
                    alertMessage: errorMessage,
                    alertIcon: 'warning',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            }
    
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    };

    registered = async(req, res) => {
        return res.render('register');
    };

    register = async(req, res) => {
        const { firstname, lastname, dni, email, password } = req.body;
        console.log(firstname, lastname, dni, email, password);

        if(!validateRegister({firstname, lastname, dni, email, password})) {
            return res.render('register', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Porfavor ingrese todos los datos",
                alertIcon: 'warning',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            });
        };

        try {
            const passwordHaash = await bcryptjs.hash(password, 10);
            await this.authModel.register({ firstname, lastname, dni, email, passwordHaash });

            return res.render('register', {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "¡Successful Registration!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        } catch(error) {
            // if (error instanceof z.ZodError) {
            //     const errorMessage = error.errors.map(e => e.message).join(', ');
            //     return res.render('login', {
            //         alert: true,
            //         alertTitle: "Error de validación",
            //         alertMessage: errorMessage,
            //         alertIcon: 'warning',
            //         showConfirmButton: true,
            //         timer: false,
            //         ruta: 'login'
            //     });
            // }
    
            console.error(error);
            return res.status(500).send('Internal Server Error');
        };
    };

    logOut = async(req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
                return res.status(500).send('Error al cerrar sesión');
            }
            return res.redirect('/');
        });
    };
};