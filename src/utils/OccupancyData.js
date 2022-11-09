/**
 * @Author Oskar Wiiala
 * Data for restaurant occupancy histogram to be used with thermal camera data.
 * Currently dummy data, but would eventually get values from thermal camera.
 * @param {string} day of week
 * @returns an array of objects with time, predicted value and actual value.
 */
export const getOccupancyData = (day) => {
  /**
   * Gets random number based on priority. Higher priority -> higher number
   * @param {number} priority determines the magnitude of the number
   * @returns randomNumber
   */
  const getRandomNumberByPriority = (priority) => {
    let randomNumber = 0
    switch (priority) {
      case 1:
        randomNumber = Math.random() * (10 - 0) + 0
        break
      case 2:
        randomNumber = Math.random() * (15 - 10) + 10
        break
      case 3:
        randomNumber = Math.random() * (20 - 15) + 15
        break
      case 4:
        randomNumber = Math.random() * (25 - 20) + 20
        break
      case 5:
        randomNumber = Math.random() * (30 - 25) + 25
        break
      case 6:
        randomNumber = Math.random() * (35 - 30) + 30
        break
      case 7:
        randomNumber = Math.random() * (40 - 35) + 35
        break
      case 8:
        randomNumber = Math.random() * (45 - 40) + 40
        break
      case 9:
        randomNumber = Math.random() * (50 - 45) + 45
        break
      case 10:
        randomNumber = Math.random() * (55 - 50) + 50
        break
      default: console.log('something went wrong, priority', priority, ' is unknown')
    }
    return randomNumber
  }

  /**
   * Gets occupancy of a particular time of day
   * @param {string} day of week
   * @param {string} time of day in hours quartered, e.g. '12:15' or '13'
   * @returns randomized number based on time
   */
  const getOccupancy = (day, time) => {
    let occupancy = 0
    if (
      day === 'monday' ||
      day === 'tuesday' ||
      day === 'wednesday' ||
      day === 'thursday' ||
      day === 'friday'
    ) {
      switch (time) {
        case '11':
          occupancy = getRandomNumberByPriority(1)
          break
        case '11:15':
          occupancy = getRandomNumberByPriority(2)
          break
        case '11:30':
          occupancy = getRandomNumberByPriority(3)
          break
        case '11:45':
          occupancy = getRandomNumberByPriority(4)
          break
        case '12':
          occupancy = getRandomNumberByPriority(5)
          break
        case '12:15':
          occupancy = getRandomNumberByPriority(6)
          break
        case '12:30':
          occupancy = getRandomNumberByPriority(7)
          break
        case '12:45':
          occupancy = getRandomNumberByPriority(4)
          break
        case '13':
          occupancy = getRandomNumberByPriority(2)
          break
        case '13:15':
          occupancy = getRandomNumberByPriority(1)
          break
        default:
          console.log('something went wrong, time', time, ' is unknown')
      }
    }
    return occupancy
  }
  return [
    {
      time: '11',
      valuePrediction: getOccupancy(day, '11'),
      valueActual: getOccupancy(day, '11')
    },
    {
      time: '11:15',
      valuePrediction: getOccupancy(day, '11:15'),
      valueActual: getOccupancy(day, '11:15')
    },
    {
      time: '11:30',
      valuePrediction: getOccupancy(day, '11:30'),
      valueActual: getOccupancy(day, '11:30')
    },
    {
      time: '11:45',
      valuePrediction: getOccupancy(day, '11:45'),
      valueActual: getOccupancy(day, '11:45')
    },
    {
      time: '12',
      valuePrediction: getOccupancy(day, '12'),
      valueActual: getOccupancy(day, '12')
    },
    {
      time: '12:15',
      valuePrediction: getOccupancy(day, '12:15'),
      valueActual: getOccupancy(day, '12:15')
    },
    {
      time: '12:30',
      valuePrediction: getOccupancy(day, '12:30'),
      valueActual: getOccupancy(day, '12:30')
    },
    {
      time: '12:45',
      valuePrediction: getOccupancy(day, '12:45'),
      valueActual: getOccupancy(day, '12:45')
    },
    {
      time: '13',
      valuePrediction: getOccupancy(day, '13'),
      valueActual: getOccupancy(day, '13')
    },
    {
      time: '13:15',
      valuePrediction: getOccupancy(day, '13:15'),
      valueActual: getOccupancy(day, '13:15')
    }
  ]
}
