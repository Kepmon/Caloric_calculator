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
    sliderInputs[index].value = newValue.toString()
  }

  if (numberInputs != null && numberInputs[index] != null) {
    numberInputs[index].value = newValue.toString()
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

const returnUnitRelatedElements = () => {
  const weightSlider = document.querySelector(
    'input[id="weight"]'
  ) as null | HTMLInputElement
  const weightInput = document.querySelector(
    'input[id="weight"] ~ [type="number"]'
  ) as null | HTMLInputElement
  const weightUnitLabel = document.querySelector(
    'label[for="weight"] > span'
  ) as null | HTMLSpanElement
  const heightSlider = document.querySelector(
    'input[id="height"]'
  ) as null | HTMLInputElement
  const heightInput = document.querySelector(
    'input[id="height"] ~ [type="number"]'
  ) as null | HTMLInputElement
  const heightUnitLabel = document.querySelector(
    'label[for="height"] > span'
  ) as null | HTMLSpanElement

  if (
    [
      weightSlider,
      weightInput,
      weightUnitLabel,
      heightSlider,
      heightInput,
      heightUnitLabel
    ].some((element) => element == null)
  )
    return false

  return {
    weightSlider: weightSlider as HTMLInputElement,
    weightInput: weightInput as HTMLInputElement,
    weightUnitLabel: weightUnitLabel as HTMLSpanElement,
    heightSlider: heightSlider as HTMLInputElement,
    heightInput: heightInput as HTMLInputElement,
    heightUnitLabel: heightUnitLabel as HTMLSpanElement
  }
}

const calculateNewValues = (
  weightSlider: HTMLInputElement,
  heightSlider: HTMLInputElement,
  newUnit: 'metric' | 'imperial'
) => {
  const previousWeightValue = parseFloat(weightSlider.value)
  const previousMaxWeightValue = parseFloat(weightSlider.max)
  const previousHeightValue = parseFloat(heightSlider.value)
  const previousMaxHeightValue = parseFloat(heightSlider.max)

  const newWeightValue =
    (previousWeightValue * unitsToBeChanged[newUnit].weight.max) /
    previousMaxWeightValue

  const newHeightValue =
    (previousHeightValue * unitsToBeChanged[newUnit].height.max) /
    previousMaxHeightValue

  return { newWeightValue, newHeightValue }
}

export const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
  const elementsData = returnUnitRelatedElements()

  if (!elementsData) return

  const {
    weightSlider,
    weightInput,
    weightUnitLabel,
    heightSlider,
    heightInput,
    heightUnitLabel
  } = elementsData

  const newValues = calculateNewValues(weightSlider, heightSlider, newUnit)

  if (!newValues) return

  const attributesToChange = ['min', 'max', 'step'] as const

  ;[weightSlider, weightInput].forEach((input) => {
    attributesToChange.forEach((attribute) => {
      const attributeAsString = unitsToBeChanged[newUnit].weight[attribute]
        .toFixed(unitsToBeChanged[newUnit].weight.step === 0.1 ? 1 : 0)
        .toString()

      input.setAttribute(attribute, attributeAsString)

      const valueAsString = newValues.newWeightValue
        .toFixed(unitsToBeChanged[newUnit].weight.step === 0.1 ? 1 : 0)
        .toString()

      input.setAttribute('value', valueAsString)
      input.value = valueAsString
    })
  })
  ;[heightSlider, heightInput].forEach((input) => {
    attributesToChange.forEach((attribute) => {
      const attributeAsString = unitsToBeChanged[newUnit].height[attribute]
        .toFixed(unitsToBeChanged[newUnit].height.step === 0.1 ? 1 : 0)
        .toString()

      input.setAttribute(attribute, attributeAsString)

      const valueAsString = newValues.newHeightValue
        .toFixed(unitsToBeChanged[newUnit].height.step === 0.1 ? 1 : 0)
        .toString()

      input.setAttribute('value', valueAsString)
      input.value = valueAsString
    })
  })

  weightUnitLabel.textContent = unitsToBeChanged[newUnit].weight.unitLabel
  heightUnitLabel.textContent = unitsToBeChanged[newUnit].height.unitLabel
}
