import mongoose from './connection'

// a gender enum
enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

// a role enum
enum RoleEnum {
  Admin = 'Admin',
  User = 'User',
}

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    profession: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: Object.values(GenderEnum), required: true },
    medicalCondition: { type: [String], default: [] }, // e.g., "Diabetes, Asthma"
    medicalCertificate: { type: String }, // Link to a document or text data
    role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.User },
  },
  { timestamps: true }
)

const User = mongoose.model('user', userSchema)

export default User
