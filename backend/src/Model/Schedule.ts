import mongoose from './connection'

// paid status enum
enum PaidStatusEnum {
  Paid = 'Paid',
  Refunded = 'Refunded',
}

// schedule enum
enum ScheduleStatusEnum {
  Approved = 'Approved',
  Scheduled = 'Scheduled',
  Cancelled = 'Cancelled',
}

const scheduleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    vaccine: { type: mongoose.Schema.Types.ObjectId, ref: 'vaccine', required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'hospital', required: true },
    dates: { type: [Date], required: true },
    status: { type: String, enum: Object.values(ScheduleStatusEnum), default: ScheduleStatusEnum.Scheduled },
    paidStatus: { type: String, enum: Object.values(PaidStatusEnum), default: PaidStatusEnum.Paid },
    details: {
      curPrice: { type: Number, required: true },
      doses: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },
  },
  { timestamps: true }
)

const Schedule = mongoose.model('schedule', scheduleSchema)

export { Schedule }
