import express from 'express'
import { Schedule, ScheduleStatusEnum, Vaccine } from '../Model'

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

scheduleRoute.get('/api/admin/genderCountsPerVaccine', (_, res) => {
  Schedule.find({
    status: {
      $nin: [ScheduleStatusEnum.Cancelled, ScheduleStatusEnum.Deny],
    },
  })
    .populate('user') // Populates the user field
    .populate('vaccine') // Populates the vaccine field
    .then(async (schedules) => {
      const VaccineCategories = await Vaccine.find()
      const result: Record<string, { male: number; female: number }> = {}
      VaccineCategories.forEach((vaccine) => {
        result[vaccine.name] = {
          male: 0,
          female: 0,
        }
      })
      schedules.forEach((schedule) => {
        // @ts-expect-error
        if (schedule.user.gender) {
          // @ts-expect-error
          result[schedule.vaccine.name][schedule.user.gender.toLowerCase()]++
        }
      })
      return res.json(result)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json('error while fetching schedules')
    })
})

scheduleRoute.get('/api/admin/ageCountsPerVaccine', (_, res) => {
  Schedule.find({
    status: {
      $nin: [ScheduleStatusEnum.Cancelled, ScheduleStatusEnum.Deny],
    },
  })
    .populate('user') // Populates the user field
    .populate('vaccine') // Populates the vaccine field
    .then(async (schedules) => {
      const VaccineCategories = await Vaccine.find()
      const result: Record<string, number[]> = {}
      VaccineCategories.forEach((vaccine) => {
        result[vaccine.name] = [0, 0, 0, 0, 0, 0, 0]
      })
      schedules.forEach((schedule) => {
        let index = 0
        // @ts-expect-error
        const age = schedule.user.age
        if (age || age === 0) {
          if (age < 18) {
            index = 0
          } else if (age < 25) {
            index = 1
          } else if (age < 35) {
            index = 2
          } else if (age < 45) {
            index = 3
          } else if (age < 55) {
            index = 4
          } else if (age < 65) {
            index = 5
          } else {
            index = 6
          }
          // @ts-expect-error
          result[schedule.vaccine.name][index]++
        }
      })
      return res.json(result)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json('error while fetching schedules')
    })
})

scheduleRoute.get('/api/admin/vaccineRegisteredPerMonth2025', (_, res) => {
  Schedule.find({
    status: {
      $nin: [ScheduleStatusEnum.Cancelled, ScheduleStatusEnum.Deny],
    },
  })
    .populate('vaccine') // Populates the vaccine field
    .then((schedules) => {
      const result: Record<string, number> = {}
      result.January = 0
      result.February = 0
      result.March = 0
      result.April = 0
      result.May = 0
      result.June = 0
      result.July = 0
      result.August = 0
      result.September = 0
      result.October = 0
      result.November = 0
      result.December = 0

      schedules.forEach((schedule) => {
        schedule.dates.forEach((date) => {
          // @ts-expect-error
          const year = new Date(date).getFullYear()
          // @ts-expect-error
          const month = new Date(date).getMonth()
          if (year === 2025) {
            month === 0 && result.January++
            month === 1 && result.February++
            month === 2 && result.March++
            month === 3 && result.April++
            month === 4 && result.May++
            month === 5 && result.June++
            month === 6 && result.July++
            month === 7 && result.August++
            month === 8 && result.September++
            month === 9 && result.October++
            month === 10 && result.November++
            month === 11 && result.December++
          }
        })
      })
      return res.json(result)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json('error while fetching schedules')
    })
})

scheduleRoute.get('/api/admin/percentageVaccinatedForAllVaccines', (_, res) => {
  Schedule.find({
    status: {
      $nin: [ScheduleStatusEnum.Cancelled, ScheduleStatusEnum.Deny],
    },
  })
    .populate('vaccine') // Populates the vaccine field
    .then(async (schedules) => {
      const VaccineCategories = await Vaccine.find()
      const result: Record<string, number> = {}
      VaccineCategories.forEach((vaccine) => {
        result[vaccine.name] = 0
      })
      let totalVaccinated = 0
      schedules.forEach((schedule) => {
        // @ts-expect-error
        result[schedule.vaccine.name] = result[schedule.vaccine.name] + schedule.vaccine.dosesRequired
        // @ts-expect-error
        totalVaccinated = totalVaccinated + schedule.vaccine.dosesRequired
      })

      Object.keys(result).forEach((key) => {
        result[key] = (result[key] / totalVaccinated) * 100
      })

      return res.json(result)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json('error while fetching schedules')
    })
})

scheduleRoute.get('/api/admin/preDiseasesCountAcrossAllPatients', (_, res) => {
  Schedule.find({
    status: {
      $nin: [ScheduleStatusEnum.Cancelled, ScheduleStatusEnum.Deny],
    },
  })
    .populate('user') // Populates the user field
    .then((schedules) => {
      const result: Record<string, number> = {}
      schedules.forEach((schedule) => {
        // @ts-expect-error
        if (schedule.user.role === 'Admin') {
          return
        }
        // @ts-expect-error
        schedule.user.medicalCondition.forEach((disease) => {
          if (result[disease]) {
            result[disease]++
          } else {
            result[disease] = 1
          }
        })
      })
      return res.json(result)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json('error while fetching schedules')
    })
})

export { scheduleRoute }
