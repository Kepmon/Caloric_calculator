const sliderInputs = [
  ...document.querySelectorAll('[type="range"]')
] as HTMLInputElement[]

const returnSliderData = (input: HTMLInputElement) => {
  const sliderMin = parseInt(input.min, 10)
  const sliderMax = parseInt(input.max, 10)
  const sliderValue = parseInt(input.value, 10)

  return { sliderMin, sliderMax, sliderValue }
}

const returnNewSliderValue = (input: HTMLInputElement, index: number) => {
  const inputData = returnSliderData(input)

  if (
    inputData.sliderMin == null ||
    inputData.sliderMax == null ||
    inputData.sliderValue == null
  )
    return { inputData, newValue: null }

  if (
    inputData.sliderValue < inputData.sliderMin ||
    inputData.sliderValue > inputData.sliderMax
  )
    return {
      inputData,
      newValue: parseInt(sliderInputs[index].value, 10)
    }

  return {
    inputData,
    newValue: inputData.sliderValue
  }
}

export const setThumbPosition = (input: HTMLInputElement, index: number) => {
  const sliderInputsWrappers = [
    ...document.querySelectorAll('.slider-inputs')
  ] as (null | HTMLDivElement)[]

  const { inputData, newValue } = returnNewSliderValue(input, index)
  const { sliderMin, sliderMax, sliderValue } = inputData

  if (
    sliderMin == null ||
    sliderMax == null ||
    sliderValue == null ||
    newValue == null
  )
    return

  const percentValue = ((newValue - sliderMin) / (sliderMax - sliderMin)) * 100

  sliderInputsWrappers[index]?.style.setProperty(
    '--thumb-position',
    percentValue.toString()
  )

  input.value = newValue.toString()
  sliderInputs[index].value = newValue.toString()
}
