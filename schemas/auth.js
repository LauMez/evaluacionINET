import { z } from 'zod';

const registerSchema = z.object({
    firstname: z.string().min(1, {message: "El nombre es rquerido"}),
    lastname: z.string().min(1, {message: "El apellido es rquerido"}),
    dni: z.string().min(1, {message: "El DNI es rquerido"}),
    email: z.string().email({ message: "Correo electrónico inválido" }).min(1, { message: "El correo es requerido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
});

const loginSchema = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }).min(1, { message: "El correo es requerido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
});

export function validateLogin (email, password) {
    return loginSchema.parse(email, password);
};

export function validateRegister (firstname, lastname, dni, email, password) {
    return registerSchema.parse(firstname, lastname, dni, email, password);
};