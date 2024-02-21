const returnSliderData = (input: HTMLInputElement) => {
  const sliderMin = parseFloat(input.min)
  const sliderMax = parseFloat(input.max)
  const sliderValue = parseFloat(input.value)

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
    sliderInputs[index].setAttribute('value', newValue.toString())
  }

  if (numberInputs != null && numberInputs[index] != null) {
    numberInputs[index].setAttribute('value', newValue.toString())
  }
}

const unitsToBeChanged = {
  metric: {
    weight: {
      min: 20,
      max: 180,
      unitLabel: '(in kg)',
      step: 1
    },
    height: {
      min: 120,
      max: 220,
      unitLabel: '(in cm)',
      step: 1
    }
  },
  imperial: {
    weight: {
      min: 40,
      max: 400,
      unitLabel: '(in lb)',
      step: 1
    },
    height: {
      min: 4,
      max: 7.2,
      unitLabel: '(in ft)',
      step: 0.1
    }
  }
}

const calculateNewValue = (
  slider: HTMLInputElement,
  newUnit: 'metric' | 'imperial',
  category: 'weight' | 'height'
) => {
  const previousValue = parseFloat(slider.value)
  const previousMaxValue = parseFloat(slider.max)

  return (
    (previousValue * unitsToBeChanged[newUnit][category].max) / previousMaxValue
  )
}

const setInputAttributes = (
  newUnit: 'metric' | 'imperial',
  input: HTMLInputElement
) => {
  const attributesToChange = ['min', 'max', 'step'] as const

  attributesToChange.forEach((attribute) => {
    if (!(input.name === 'weight' || input.name === 'height')) return

    const attributeAsString = unitsToBeChanged[newUnit][input.name][attribute]
      .toFixed(unitsToBeChanged[newUnit][input.name].step === 0.1 ? 1 : 0)
      .toString()

    input.setAttribute(attribute, attributeAsString)
  })
}

export const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
  const weightInputs = document.querySelectorAll('input[name="weight"]')
  const heightInputs = document.querySelectorAll('input[name="height"]')
  const allInputs = [...weightInputs, ...heightInputs] as HTMLInputElement[]

  allInputs.forEach((input) => {
    if (!(input.name === 'weight' || input.name === 'height')) return

    const newValue = calculateNewValue(input, newUnit, input.name)
    const newValueAsString = newValue
      .toFixed(unitsToBeChanged[newUnit][input.name].step === 0.1 ? 1 : 0)
      .toString()

    input.setAttribute('value', newValueAsString)
    input.value = newValueAsString

    const unitLabel = document.querySelector(`[data-span="${input.name}"]`)

    if (unitLabel != null) {
      unitLabel.textContent = unitsToBeChanged[newUnit][input.name].unitLabel
    }

    setInputAttributes(newUnit, input)
  })
}
