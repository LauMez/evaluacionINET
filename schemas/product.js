import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(1, {message: "El nombre es rquerido"}),
    description: z.string().min(1, {message: "El apellido es rquerido"}),
    price: z.number().refine((val) => val % 1 !== 0),
    quantity: z.number().min(1, { message: "El correo es requerido" })
});

export function validateProduct (name, description, price, quantity) {
    return productSchema.parse(name, description, price, quantity);
};