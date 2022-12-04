const body = document.querySelector('body')
const modeImg = document.querySelector('.header__img')
const spanImg = document.querySelector('.header__mode-color')
const modeChange = document.querySelector('.header__click')
const whyQuestion = document.querySelector('.main__question-header')
const questionButtons = Array.from(document.querySelectorAll('.main__question-option'))
const moreOptions = document.querySelector('.main__lose-options')
const sliders = document.querySelectorAll('.main__slider')
const unitInfo = document.querySelectorAll('.main__unit')
const inputs = document.querySelectorAll('.main__input')
const errors = document.querySelectorAll('.main__error')
const photos = document.querySelector('.main__fat-photos')
const closeBtn = document.querySelectorAll('.close-button')
const photosLink = document.querySelector('.main__charts')
const activityDescription = document.querySelector('.main__activity-examples')
const examplesLink = document.querySelector('.main__examples')
const resultButton = document.querySelector('.main__show-result')
const units = Array.from(document.querySelectorAll('.unit'))
const goals = Array.from(document.querySelectorAll('.goal'))
const genders = Array.from(document.querySelectorAll('.gender'))
const checkboxInput = document.querySelector('.checkbox')
const resultPopup = document.querySelector('.main__result-popup')
let selectedValues = []
let bmrhbe
let bmrce
let bmr
let tdee

const handleMode = () => {
	let attributeValue = body.getAttribute('data-mode')

	if (attributeValue === 'dark') {
		localStorage.setItem('mode', 'light')
		body.setAttribute('data-mode', 'light')
		modeImg.setAttribute('src', 'dist/img/crescent-moon-and-star.png')
		spanImg.textContent = 'Dark'
	} else {
		localStorage.setItem('mode', 'dark')
		body.setAttribute('data-mode', 'dark')
		modeImg.setAttribute('src', 'dist/img/light.png')
		spanImg.textContent = 'Light'
	}
}

const saveMode = () => {
	let currentMode = localStorage.getItem('mode')
	body.setAttribute('data-mode', currentMode)

	if (currentMode !== null)
	{
		if (currentMode === 'dark') {
			modeImg.setAttribute('src', 'dist/img/light.png')
			spanImg.textContent = 'Light'
		} else {
			modeImg.setAttribute('src', 'dist/img/crescent-moon-and-star.png')
			spanImg.textContent = 'Dark'
		}
	}
	else
	{
		body.setAttribute('data-mode', 'dark')
	}
}

const removeUnitColor = () => units.forEach((unit) => unit.classList.remove('clicked-button'))
units.forEach(unit => unit.addEventListener('click', () => {
	removeUnitColor()
	unit.classList.add('clicked-button')
}))

const removeGoalColor = () => goals.forEach((goal) => goal.classList.remove('clicked-button'))
goals.forEach(goal => goal.addEventListener('click', () => {
	removeGoalColor()
	goal.classList.add('clicked-button')
}))

const removeGenderColor = () => genders.forEach((gender) => gender.classList.remove('clicked-button'))
genders.forEach(gender => gender.addEventListener('click', () => {
	removeGenderColor()
	gender.classList.add('clicked-button')
}))

const handleUnits = e => {
	const unitSliders = Array.from(document.querySelectorAll('input[data-slider]'))
	const unitInputs = Array.from(document.querySelectorAll('input[data-input]'))
	const unitInfos = Array.from(document.querySelectorAll('.main__unit'))
	const unitIndex = units.indexOf(e.target);
	const unitValues = [
		{
			values: [
				{
					symbol: 'kg',
					min: 30,
					max: 190,
					value: 110,
					placeholder: 110,
				},
				{
					symbol: 'cm',
					min: 20,
					max: 220,
					value: 120,
					placeholder: 120,
					step: 1,
				}
			]
		},
		{
			values: [
				{
					symbol: 'lb',
					min: 60,
					max: 420,
					value: 240,
					placeholder: 240,
				},
				{
					symbol: 'ft',
					min: 0.6,
					max: 7.2,
					value: 3.9,
					placeholder: 3.9,
					step: 0.1,
				}
			],
		}
	]

	unitInfos.forEach(info => {
		const unitInfosIndex = unitInfos.indexOf(info)

		info.textContent = `in ${unitValues[unitIndex].values[unitInfosIndex].symbol}`
	})
	unitSliders.forEach(slider => {
		const unitSliderIndex = unitSliders.indexOf(slider)

		slider.setAttribute('min', unitValues[unitIndex].values[unitSliderIndex].min)
		slider.setAttribute('max', unitValues[unitIndex].values[unitSliderIndex].max)
		slider.setAttribute('step', unitValues[unitIndex].values[unitSliderIndex].step)
		slider.value = unitValues[unitIndex].values[unitSliderIndex].value
		slider.style.backgroundImage = 'linear-gradient(90deg, var(--main-color) 50%, var(--option-color) 50%)'
	})

	unitInputs.forEach(input => {
		const unitInputIndex = unitInputs.indexOf(input)
		
		input.style.left = '50%'
		input.style.transform = 'translateX(-50%)'
		input.value = ''
		input.setAttribute('placeholder', unitValues[unitIndex].values[unitInputIndex].placeholder)
	})
}

const showMoreOptions = () => moreOptions.classList.toggle('show-more-options')

const hideMoreOptions = (e) => {
	const labels = document.querySelectorAll('label')
	const inputs = document.querySelectorAll('input[type="radio"]')
	const inputsTitle = document.querySelector('.main__lose-title')
	const loseOptions = document.querySelector('.main__lose-options')

	if (e.target !== questionButtons[2] && e.target !== inputsTitle && e.target !== loseOptions && e.target !== inputs[0] && e.target !==inputs[1] && e.target !== labels[0] && e.target !== labels[1]) 
	{
		moreOptions.classList.remove('show-more-options')
	}
}

for (let i = 0; i < sliders.length; i++) {
	const handleSlideThumb = () => {
		const percentValue = ((sliders[i].value - sliders[i].getAttribute('min')) / (sliders[i].getAttribute('max') - sliders[i].getAttribute('min'))) * 100

		sliders[i].style.backgroundImage = `linear-gradient(90deg, var(--main-color) ${percentValue}%, var(--option-color) ${percentValue}%)`
		inputs[i].style.left = `${percentValue}%`
		inputs[i].style.transform = 'translateX(-50%)'
		inputs[i].setAttribute('placeholder', sliders[i].value)
	}

	const sliderClick = () => {
		inputs[i].value = ''
		handleSlideThumb()
	}

	const handlePlaceholder = (e) => {
		inputs[i].setAttribute('placeholder', '')

		if (e.key === 'Tab') {
			inputs[i].setAttribute('placeholder', '')
		}
	}

	const showPlaceholder = () => {
		if (inputs[i].value === '') {
			handleSlideThumb()
		}
	}

	const addSliderValue = (e) => {
		if (e.key === 'Enter' || e.key === 'Tab') {
			e.preventDefault()
			if (parseFloat(inputs[i].value) <= parseFloat(sliders[i].getAttribute('max')) && parseFloat(inputs[i].value) >= parseFloat(sliders[i].getAttribute('min'))) {
				sliders[i].value = inputs[i].value
				errors[i].style.display = 'none'
				handleSlideThumb()
			} else {
				errors[i].style.display = 'block'
				errors[i].textContent = `Provide a value within ${sliders[i].getAttribute('min')} - ${sliders[i].getAttribute('max')}.`
			}
		}
	}

	inputs[i].addEventListener('input', handleSlideThumb)
	sliders[i].addEventListener('input', handleSlideThumb)
	sliders[i].addEventListener('click', handleSlideThumb)
	sliders[i].addEventListener('mousedown', sliderClick)
	sliders[i].addEventListener('touchstart', sliderClick)
	inputs[i].addEventListener('click', handlePlaceholder)
	inputs[i].addEventListener('keyup', handlePlaceholder)
	inputs[i].addEventListener('keydown', addSliderValue)
	body.addEventListener('keydown', showPlaceholder)
	window.addEventListener('DOMContentLoaded', handleSlideThumb)
}

const handleThumbDescription = () => {
	const thumbDescription = document.querySelector('.main__input-description')
	const activityValues = [
		'Little or no activity',
		'Light activity',
		'Moderate activity',
		'High activity',
		'Very high activity',
	]
	const inputValues = [0, 25, 50, 75, 100]
	const index = inputValues.indexOf(parseInt(sliders[4].value))

	for (let i = 0; i < inputValues.length; i++) {
		thumbDescription.textContent = activityValues[index]
	}
}

const showPhotos = () => photos.classList.add('photos-visible')

const closePhotos = () => photos.classList.remove('photos-visible')

const closePhotosOnBody = (e) => {
	if (e.target !== photosLink) {
		photos.classList.remove('photos-visible')
	}
}

const showActivityLevels = () =>
	activityDescription.classList.add('photos-visible')

const closeActivityLevels = () =>
	activityDescription.classList.remove('photos-visible')

const closeActivityOnBody = (e) => {
	if (e.target !== examplesLink) {
		activityDescription.classList.remove('photos-visible')
	}
}

const showCaloriesSlider = () => {
	const caloriesSlider = document.querySelector(
		'.main__question-slider--hidden'
	)

	caloriesSlider.classList.toggle('show-calories-burnt')
}

const showResult = e => {
	e.preventDefault()
	
	readSelectedUnits()
	readSelectedGoal()
	readSelectedGender()
	readSlidersValues()

	const generalError = document.querySelector('.main__result-error')

	if (selectedValues.length >= 8) {
		resultPopup.classList.toggle('show-result')
		generalError.classList.remove('show-error')
	} else {
		generalError.classList.add('show-error')
	}
}

const hideResult = (e) => {
	if (e.target !== resultButton) {
		resultPopup.classList.remove('show-result')
	}
}

const readSelectedUnits = () => {
	units.forEach((unit) => {
		if (unit.classList.contains('clicked-button')) {
			const selectedUnit = unit.value
			selectedValues.push(selectedUnit)
		}
	})
}

const readSelectedGoal = () => {
	goals.forEach((goal) => {
		if (goal.classList.contains('clicked-button')) {
			const selectedGoal = goal.value
			selectedValues.push(selectedGoal)
		}
	})
}

const readSelectedGender = () => {
	genders.forEach((gender) => {
		if (gender.classList.contains('clicked-button')) {
			const selectedGender = gender.value
			selectedValues.push(selectedGender)
		}
	})
}

const readSlidersValues = () => {
	sliders.forEach((slider) => {
		selectedValues.push(slider.value)
	})
}

const calculateBMR = () => {
	readSelectedUnits()
	readSelectedGoal()
	readSelectedGender()
	readSlidersValues()

	if (selectedValues[0] === 'Metric') {
		if (selectedValues[2] === 'Male') {
			bmrhbe = 13.397 * selectedValues[4] + 4.799 * selectedValues[5] - 5.677 * selectedValues[3] + 88.362
			bmrce = 500 + 22 * (1 - selectedValues[6] / 100) * selectedValues[4]
			bmr = (bmrhbe + bmrce) / 2
		} else if (selectedValues[2] === 'Female') {
			bmrhbe = 9.247 * selectedValues[4] + 3.098 * selectedValues[5] - 4.33 * selectedValues[3] + 447.593
			bmrce = 500 + 22 * (1 - selectedValues[6] / 100) * selectedValues[4]
			bmr = (bmrhbe + bmrce) / 2
		}
	} else if (selectedValues[0] === 'Imperial') {
		const weight = selectedValues[4] / 2.2046
		const height = selectedValues[5] * 30.48

		if (selectedValues[2] === 'Male') {
			bmrhbe = 13.397 * weight + 4.799 * height - 5.677 * selectedValues[3] + 88.362
			bmrce = 500 + 22 * (1 - selectedValues[6] / 100) * weight
			bmr = (bmrhbe + bmrce) / 2
		} else if (selectedValues[2] === 'Female') {
			bmrhbe = 9.247 * weight + 3.098 * height - 4.33 * selectedValues[3] + 447.593
			bmrce = 500 + 22 * (1 - selectedValues[6] / 100) * weight
			bmr = (bmrhbe + bmrce) / 2
		}
	}

	selectedValues = []
}

const totalExpenditure = () => {
	calculateBMR()
	readSlidersValues()

	const selectedCaloricNumber = parseInt(selectedValues[5])
	const selectedActivityValue = parseInt(selectedValues[4])

	if (checkboxInput.checked) {
		tdee = bmr + selectedCaloricNumber
	} else {
		switch (selectedActivityValue) {
			case 0:
				tdee = bmr * 1.15
				break
			case 25:
				tdee = bmr * 1.30
				break
			case 50:
				tdee = bmr * 1.40
				break
			case 75:
				tdee = bmr * 1.475
				break
			case 100:
				tdee = bmr * 1.80
				break
		}
	}

	selectedValues = []
}

const calculateCaloricIntake = () => {
	calculateBMR()
	totalExpenditure()
	readSelectedGoal()

	const loseOption = document.querySelectorAll('.lose-option')
	const resultValue = document.querySelector('.main__result-value')
	let selectedLoseOption
	let caloricIntake

	if (selectedValues[0] === 'Lose weight') {
		loseOption.forEach((option) => {
			if (option.checked) {
				selectedLoseOption = option
			}
		})

		if (selectedLoseOption.getAttribute('id') === 'faster') {
			caloricIntake = tdee - 500
		} else if (selectedLoseOption.getAttribute('id') === 'slower') {
			caloricIntake = tdee - 250
		}
	} else if (selectedValues[0] === 'Gain muscle') {
		caloricIntake = tdee + 200
	} else if (selectedValues[0] === 'Maintain') {
		caloricIntake = tdee
	}

	resultValue.textContent = `${parseInt(caloricIntake)} kcal`
}

const displayYear = () => {
	const year = document.querySelector('.footer__year')

	const currentYear = new Date().getFullYear()
	year.textContent = currentYear
}

modeChange.addEventListener('click', handleMode)
window.addEventListener('DOMContentLoaded', saveMode)
questionButtons[2].addEventListener('click', showMoreOptions)
body.addEventListener('click', hideMoreOptions)
sliders[4].addEventListener('input', handleThumbDescription)
units.forEach(unit => unit.addEventListener('click', handleUnits))
photosLink.addEventListener('click', showPhotos)
examplesLink.addEventListener('click', showActivityLevels)
closeBtn[0].addEventListener('click', closePhotos)
closeBtn[1].addEventListener('click', closeActivityLevels)
body.addEventListener('click', closePhotosOnBody)
body.addEventListener('click', closeActivityOnBody)
checkboxInput.addEventListener('change', showCaloriesSlider)
resultButton.addEventListener('click', calculateCaloricIntake)
resultButton.addEventListener('click', showResult)
sliders.forEach((slider) => slider.addEventListener('change', hideResult))
body.addEventListener('click', hideResult)
window.addEventListener('DOMContentLoaded', displayYear)

