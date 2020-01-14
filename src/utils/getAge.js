import moment from 'moment'

const getAge = user => {
  const birthdate = moment(user.birthdate)
  const now = moment()
  const dateDiff = now.diff(birthdate)
  const dateDiffDuration = moment.duration(dateDiff)
  const age = dateDiffDuration.years()
  return age
}

export default getAge
