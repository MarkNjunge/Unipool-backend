const casual = require('casual')

casual.define('user', () => {
  const firstName = casual.first_name
  const lastName = casual.last_name

  return {
    id: '507f1f77bcf86cd799439011',
    isValidated: casual.boolean,
    studentNumber: casual.numerify('9####'),
    email: (`${firstName}.${lastName}@strathmode.edu`),
    fullname: `${firstName} ${lastName}`,
    phone: `0${casual.integer(700000000, 799999999)}`,
  }
})

casual.define('geolocation', () => {
  return {
    lat: casual.latitude,
    long: casual.longitude,
    region: casual.random_element(['South C', 'Lang\'ata', 'Kilimani', 'South B'])
  }
})

casual.define('vehicle', () => {
  return {
    registrationNumber: casual.numerify('KBC ###D'),
    make: 'Car model name',
    color: casual.color_name,
    capacity: casual.integer(1, 2),
    owner: casual.user
  }
})

casual.define('ride', () => {
  return {
    _id: '507f1f77bcf86cd799439011',
    depatureTime: casual.unix_time,
    arrivalTime: casual.unix_time,
    passengerCount: casual.integer(1, 4)
  }
})

const mocks = {
  String: () => 'value',
  Int: () => casual.integer(100000, 999999),
  Geolocation: () => (casual.geolocation),
  Ride: () => (casual.ride),
  User: () => (casual.user),
  Vehicle: () => (casual.Vehicle)
}

module.exports = mocks