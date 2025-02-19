import mongoose from './connection'

const vaccineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "mRNA", "Vector-based"
    price: { type: Number, required: true },
    sideEffects: { type: [String], default: [] }, // e.g., "Headache, Fever"
    origin: { type: String, required: true }, // e.g., "USA", "UK"
    dosesRequired: { type: Number, required: true },
    strainsCovered: { type: [String], default: [] }, // e.g., "COVID-19, Delta, Omicron"
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
)

const Vaccine = mongoose.model('vaccine', vaccineSchema)

export { Vaccine }
