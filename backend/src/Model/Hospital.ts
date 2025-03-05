import mongoose from './connection'

// Create a enum
enum HospitalEnum {
  Govt = 'Govt',
  Private = 'Private',
}

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: Object.values(HospitalEnum), required: true }, // Type of hospital
    charges: { type: Number, required: true }, // Charges for vaccination
  },
  { timestamps: true }
)

const Hospital = mongoose.model('hospital', hospitalSchema)

export { Hospital }
