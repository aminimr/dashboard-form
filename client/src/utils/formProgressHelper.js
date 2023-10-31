// import {flatten} from 'flatten-anything'
import {isEmptyOrSpaces} from './stringHelper'

function calculate(form) {
  /*const allFields = flatten(form)
  console.log(allFields)*/
  let result = {
    personal: 0,
    address: 0,
    education: 0,
    personalFormat: 0,
    addressFormat: 0,
    educationFormat: 0,
    personalColor: '',
    addressColor: '',
    educationColor: '',
    total: 0
  }

  const percentageVolume = {
    personal: 100 / 7,
    education: 100 / 5,
    address: 100 / 5,
  }

  const increasePersonal = (unit = 1) => {
    result.personal += (percentageVolume.personal * unit)
  }

  const increaseEducation = (unit = 1) => {
    result.education += (percentageVolume.education * unit)
  }

  const increaseAddress = (unit = 1) => {
    result.address += (percentageVolume.address * unit)
  }

  // personal
  if (!isEmptyOrSpaces(form.fullName)) increasePersonal()
  if (!isEmptyOrSpaces(form.email)) increasePersonal()
  if (!isEmptyOrSpaces(form.mobile)) increasePersonal()
  if (!isEmptyOrSpaces(form.about)) increasePersonal()
  if (!isEmptyOrSpaces(form.gender)) increasePersonal()
  if (!isEmptyOrSpaces(form.languages)) increasePersonal()
  if (!isEmptyOrSpaces(form.birthDate)) increasePersonal()

  // education
  if (!isEmptyOrSpaces(form.education?.caption)) increaseEducation()
  if (!isEmptyOrSpaces(form.education?.level)) increaseEducation()
  if (!isEmptyOrSpaces(form.education?.from) && form.education?.from !== null) increaseEducation()
  if (!isEmptyOrSpaces(form.education?.to) && form.education?.to !== null) increaseEducation()
  if (form.education?.media?.length > 0) increaseEducation()

  // address
  if (!isEmptyOrSpaces(form.address?.state)) increaseAddress()
  if (!isEmptyOrSpaces(form.address?.city)) increaseAddress()
  if (!isEmptyOrSpaces(form.address?.description)) increaseAddress()
  if (!isEmptyOrSpaces(form.address?.postalCode)) increaseAddress()
  if (!isEmptyOrSpaces(form.address?.street)) increaseAddress()

  result.total = Math.floor((result.personal + result.education + result.address) / 3)

  result.personalFormat = Math.floor(result.personal)
  result.educationFormat = Math.floor(result.education)
  result.addressFormat = Math.floor(result.address)

  result.personalColor = getColor(result.personal)
  result.addressColor = getColor(result.address)
  result.educationColor = getColor(result.education)

  return result
}

const getColor = (value) => {
  if (value > 70) return 'positive'
  else if (value > 40) return 'orange-7'
  return 'grey-7'
}

export {
  calculate,
  getColor
}
