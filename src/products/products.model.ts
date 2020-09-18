// import all from mongoose module
import * as mongoose from 'mongoose';

// /!\ in declaration for mongoose is javascript type of variable ex: String not string
// id is not set
export const ProductSchema = new mongoose.Schema({
    // title: String,
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
}