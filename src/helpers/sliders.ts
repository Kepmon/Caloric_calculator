const returnSliderData = (input: HTMLInputElement) => {
  const sliderMin = parseInt(input.min, 10)
  const sliderMax = parseInt(input.max, 10)
  const sliderValue = parseInt(input.value, 10)

  return { sliderMin, sliderMax, sliderValue }
}

const returnNewSliderValue = (
  input: HTMLInputElement,
  index: number,
  sliderInputs: HTMLInputElement[]
) => {
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

const checkThumbPositionData = (
  input: HTMLInputElement,
  index: number,
  sliderInputs: HTMLInputElement[]
) => {
  const { inputData, newValue } = returnNewSliderValue(
    input,
    index,
    sliderInputs
  )
  const { sliderMin, sliderMax } = inputData

  if (sliderMin == null || sliderMax == null || newValue == null) return null

  return { sliderMin, sliderMax, newValue }
}

export const setThumbPosition = (
  input: HTMLInputElement,
  index: number,
  sliderInputs: HTMLInputElement[],
  numberInputs?: HTMLInputElement[]
) => {
  const thumbPositionData = checkThumbPositionData(input, index, sliderInputs)

  if (thumbPositionData == null) return

  const sliderInputsWrappers = [
    ...document.querySelectorAll('.slider-inputs')
  ] as HTMLDivElement[]
  const { sliderMin, sliderMax, newValue } = thumbPositionData

  const percentValue = ((newValue - sliderMin) / (sliderMax - sliderMin)) * 100

  sliderInputsWrappers[index]?.style.setProperty(
    '--thumb-position',
    percentValue.toString()
  )

  if (input !== sliderInputs[index]) {
    sliderInputs[index].value = newValue.toString()
  }

  if (numberInputs != null && numberInputs[index] != null) {
    numberInputs[index].value = newValue.toString()
  }
}
