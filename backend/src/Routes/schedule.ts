import express from 'express'
import { Schedule, ScheduleStatusEnum } from '../Model'

const scheduleRoute = express.Router({ strict: true, caseSensitive: true })

scheduleRoute.post('/api/saveSchedule', (req, res) => {
  const schedule = new Schedule(req.body)
  schedule
    .save()
    .then((schedule) => {
      Schedule.find({ user: schedule.user })
        .populate('user') // Populates the user field
        .populate('vaccine') // Populates the vaccine field
        .populate('hospital')
        .sort({ createdAt: -1 })
        .then((schedules) => {
          res.json(schedules)
        })
    })
    .catch((error) => {
      console.log(error)
      res.json('error while adding schedule')
    })
})

scheduleRoute.post('/api/cancelSchedule', (req, res) => {
  const { _id } = req.body

  Schedule.findByIdAndUpdate(_id, { status: ScheduleStatusEnum.Cancelled }, { new: true })
    .then((schedule) => {
      if (!schedule) {
        return res.json('Error while fetching schedule')
      }
      Schedule.find({ user: schedule.user })
        .populate('user') // Populates the user field
        .populate('vaccine') // Populates the vaccine field
        .populate('hospital')
        .sort({ createdAt: -1 })
        .then((schedules) => {
          res.json(schedules)
        })
    })
    .catch((error) => {
      console.log(error)
      res.json('error while deleting vaccine')
    })
})

scheduleRoute.post('/api/getSchedulesByUserId', (req, res) => {
  const { userId } = req.body
  Schedule.find({ user: userId })
    .populate('user') // Populates the user field
    .populate('vaccine') // Populates the vaccine field
    .populate('hospital')
    .sort({ createdAt: -1 })
    .then((schedules) => {
      res.json(schedules)
    })
    .catch((error) => {
      console.log(error)
      res.json('error while fetching schedules')
    })
})

// Admin

scheduleRoute.get('/api/admin/getAdminSchedules', (_, res) => {
  Schedule.find({ status: { $ne: ScheduleStatusEnum.Cancelled } })
    .populate('user') // Populates the user field
    .populate('vaccine') // Populates the vaccine field
    .populate('hospital')
    .sort({ createdAt: -1 })
    .then((schedules) => {
      res.json(schedules)
    })
    .catch((error) => {
      console.log(error)
      res.json('error while fetching schedules')
    })
})

scheduleRoute.post('/api/admin/approveOrDenySchedule', (req, res) => {
  const { schedule, status } = req.body
  Schedule.findByIdAndUpdate(schedule._id, { status }, { new: true })
    .then((schedule) => {
      if (!schedule) {
        return res.json('Error while fetching schedule')
      }
      Schedule.find({ status: { $ne: ScheduleStatusEnum.Cancelled } })
        .populate('user') // Populates the user field
        .populate('vaccine') // Populates the vaccine field
        .populate('hospital')
        .sort({ createdAt: -1 })
        .then((schedules) => {
          res.json(schedules)
        })
    })
    .catch((error) => {
      console.log(error)
      res.json('error while updating schedule')
    })
})

scheduleRoute.get('/api/admin/patientList', (_, res) => {
  // Example aggregation query
  Schedule.aggregate([
    {
      // Look up the 'user' field in the User collection and populate 'userDetails'
      $lookup: {
        from: 'users', // The collection name for the 'User' model
        localField: 'user', // The field in Schedule collection
        foreignField: '_id', // The field in the User collection to match against
        as: 'userDetails', // Alias for the user details
      },
    },
    {
      // Unwind the 'userDetails' array (since it's an array from $lookup)
      $unwind: {
        path: '$userDetails',
        preserveNullAndEmptyArrays: true, // Optionally keep documents without user details
      },
    },
    {
      // Replace the 'user' field with 'userDetails'
      $set: {
        user: '$userDetails', // Replace the 'user' field with the populated userDetails
      },
    },
    {
      // Remove the 'userDetails' field (since it's no longer needed)
      $unset: 'userDetails',
    },
    {
      // Look up the 'vaccine' field in the Vaccine collection
      $lookup: {
        from: 'vaccines', // The collection name for the 'Vaccine' model
        localField: 'vaccine', // The field in Schedule collection
        foreignField: '_id', // The field in the Vaccine collection to match against
        as: 'vaccineDetails', // Alias for the vaccine details
      },
    },
    {
      // Unwind the 'vaccineDetails' array (since it's an array from $lookup)
      $unwind: {
        path: '$vaccineDetails',
        preserveNullAndEmptyArrays: true, // Optionally keep documents without vaccine details
      },
    },
    {
      // Replace the 'vaccine' field with 'vaccineDetails'
      $set: {
        vaccine: '$vaccineDetails', // Replace the 'vaccine' field with the populated vaccineDetails
      },
    },
    {
      // Remove the 'vaccineDetails' field (since it's no longer needed)
      $unset: 'vaccineDetails',
    },
    {
      // Look up the 'hospital' field in the Hospital collection
      $lookup: {
        from: 'hospitals', // The collection name for the 'Hospital' model
        localField: 'hospital', // The field in Schedule collection
        foreignField: '_id', // The field in the Hospital collection to match against
        as: 'hospitalDetails', // Alias for the hospital details
      },
    },
    {
      // Unwind the 'hospitalDetails' array (since it's an array from $lookup)
      $unwind: {
        path: '$hospitalDetails',
        preserveNullAndEmptyArrays: true, // Optionally keep documents without hospital details
      },
    },
    {
      // Replace the 'hospital' field with 'hospitalDetails'
      $set: {
        hospital: '$hospitalDetails', // Replace the 'hospital' field with the populated hospitalDetails
      },
    },
    {
      // Remove the 'hospitalDetails' field (since it's no longer needed)
      $unset: 'hospitalDetails',
    },
    {
      // Group by 'user' and push all the schedules into an array for each user
      $group: {
        _id: '$user._id', // Group by user ID
        user: { $first: '$user' }, // Keep the user details
        schedules: { $push: '$$ROOT' }, // Push all the schedule details into an array
      },
    },
    {
      // Sort by userName (inside user object)
      $sort: { 'user.userName': 1 }, // Sort in ascending order by userName (use -1 for descending)
    },
    {
      // Project the final result to include user details and schedule details
      $project: {
        _id: 1, // User ID
        user: 1, // User details
        schedules: 1, // Array of schedules for each user
      },
    },
  ])
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err)
    })
})

export { scheduleRoute }
