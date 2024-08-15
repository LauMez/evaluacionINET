import bcryptjs from 'bcryptjs';
import { validateLogin, validateRegister } from "../schemas/auth.js";

export class AccountController {
    constructor ({ accountModel }) {
      this.accountModel = accountModel;
    };

    account = async(req, res) => {
        return res.render('account', {
            login: true,
            firstname: req.session.user.firstname,
            lastname: req.session.user.lastname,
            dni: req.session.user.dni,
            email: req.session.user.email,
        });
    };

    getCreate = async(req, res) => {
        return res.render('create_data', {
            firstname: req.session.firstname,
            lastname: req.session.lastname,
            dni: req.session.dni
        });
    };

    create = async(req, res) => {

    };

    getEdit = async(req, res) => {

    };

    edit = async(req, res) => {

    };
};