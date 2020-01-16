import moment from 'moment'

const getAge = user => {
  const birthdate = moment(user.birthdate)
  const age = moment().diff(birthdate, 'years')
  return age
}

export default getAge
