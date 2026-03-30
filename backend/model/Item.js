import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['Spell', 'Potion'],
        required: true,
    },
    element: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    rarity: {
        type: String,
        enum: ['Common', 'Rare', 'Epic', 'Legendary', 'Wow'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Unlearned', 'Learned', 'Unbrewed', 'Brewed']
    }
}, { timestamps: true });

export default mongoose.model('Item', schema);