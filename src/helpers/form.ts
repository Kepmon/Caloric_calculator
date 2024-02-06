type AllFormData = {
  activity: 'little-or-none' | 'light' | 'moderate' | 'high' | 'very-high'
  age: string
  bodyFat: string
  gender: 'male' | 'female'
  goal: 'lose-weight' | 'maintain' | 'gain-muscle'
  height: {
    unit: 'cm' | 'ft'
    value: string
  }
  weight: {
    unit: 'kg' | 'lb'
    value: string
  }
}

const validateForm = (formDataObj: { [k: string]: string | File }) => {
  const formDataKeys = Object.keys(formDataObj)

  return formDataKeys.every((key) => formDataObj[key] != null)
}

const returnFormData = (formDataObj: { [k: string]: string | File }) => {
  const checkedRadioBtns = [
    ...document.querySelectorAll('input[type="radio"]:checked')
  ] as HTMLInputElement[]

  const unitInputValue = checkedRadioBtns.find((btn) => btn.name === 'units')

  if (unitInputValue?.name == null) return false

  const allRadioBtnsButUnit = checkedRadioBtns.filter(
    (btn) => btn.name !== 'units'
  )

  const radioBtnsArrays = allRadioBtnsButUnit.map((btn) => [btn.name, btn.id])
  const radioBtnsData = Object.fromEntries(radioBtnsArrays)

  const slidersData = {
    age: formDataObj.age,
    weight: {
      unit: unitInputValue.id === 'metric' ? 'kg' : 'lb',
      value: formDataObj.weight
    },
    height: {
      unit: unitInputValue.id === 'metric' ? 'cm' : 'ft',
      value: formDataObj.height
    },
    bodyFat: formDataObj.bodyFat
  }

  return { ...radioBtnsData, ...slidersData } as AllFormData
}

const calculateBMR = (formData: AllFormData) => {
  const age = parseFloat(formData.age)
  const bodyFat = parseFloat(formData.bodyFat)
  const height =
    formData.height.unit === 'cm'
      ? parseFloat(formData.height.value)
      : parseFloat(formData.height.value) * 30.48
  const weight =
    formData.weight.unit === 'kg'
      ? parseFloat(formData.weight.value)
      : parseFloat(formData.weight.value) / 2.205

  const brmValues = {
    harrisBenedictFormula: {
      male: 13.397 * weight + 4.799 * height - 5.677 * age + 88.362,
      female: 9.247 * weight + 3.098 * height - 4.33 * age + 447.593
    },
    katchMcArdleFormula: 370 + 21.6 * (1 - bodyFat / 100) * weight
  }

  return (
    (brmValues.harrisBenedictFormula[formData.gender] +
      brmValues.katchMcArdleFormula) /
    2
  )
}

export const handleSubmit: boolean = () => {
  const form = document.querySelector(
    '[data-form="caloric-intake"]'
  ) as null | HTMLFormElement

  if (form == null) return false

  const formDataConstructor = new FormData(form)
  const formDataObj = Object.fromEntries(formDataConstructor)

  const isFormValid = validateForm(formDataObj)

  if (!isFormValid) return false

  const formData = returnFormData(formDataObj)

  if (!formData) return false

  const BMR = calculateBMR(formData)
}
