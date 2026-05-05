import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cryptoSchema = new Schema({
  name: { type: String, required: true, trim: true },
  symbol: { type: String, required: true, unique: true, uppercase: true, trim: true },
  price: { type: Number, required: true },
  image: { type: String },
  change24h: { type: Number, required: true, default: 0 },
  marketCap: { type: Number },
  volume24h: { type: Number },
  supply: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model('Crypto', cryptoSchema);
