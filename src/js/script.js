const body = document.querySelector('body')
const modeImg = document.querySelector('.header__img')
const spanImg = document.querySelector('.header__mode-color')
const modeChange = document.querySelector('.header__click')
const whyQuestion = document.querySelector('.main__question-header')
const questionButtons = document.querySelectorAll('.main__question-option')
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

	if (currentMode === 'dark') {
		modeImg.setAttribute('src', 'dist/img/light.png')
		spanImg.textContent = 'Light'
	} else {
		modeImg.setAttribute('src', 'dist/img/crescent-moon-and-star.png')
		spanImg.textContent = 'Dark'
	}
}

const showReasons = () => {
	const whyReasons = document.querySelector('.main__question-answers')

	whyReasons.classList.toggle('show-height')
}

for (let i = 0; i < questionButtons.length; i++) {
	const addButtonColor = () =>
		questionButtons[i].classList.toggle('clicked-button')

	questionButtons[i].addEventListener('click', addButtonColor)
}

const handleImperialUnits = () => {
	questionButtons[0].classList.remove('clicked-button')

	unitInfo[0].textContent = 'in lb'
	unitInfo[1].textContent = 'in ft'

	sliders[1].setAttribute('min', 60)
	sliders[1].setAttribute('max', 420)
	sliders[1].setAttribute('value', 240)
	sliders[2].setAttribute('min', .6)
	sliders[2].setAttribute('max', 7.2)
	sliders[2].setAttribute('step', .1)
	sliders[2].setAttribute('value', 3.9)

	inputs[1].setAttribute('placeholder', 240)
	inputs[2].setAttribute('placeholder', 3.9)
}

const handleMetricUnits = () => {
	questionButtons[0].classList.add('clicked-button')
	questionButtons[1].classList.remove('clicked-button')

	unitInfo[0].textContent = 'in kg'
	unitInfo[1].textContent = 'in cm'

	sliders[1].setAttribute('min', 30)
	sliders[1].setAttribute('max', 190)
	sliders[1].setAttribute('value', 110)
	sliders[2].setAttribute('min', 20)
	sliders[2].setAttribute('max', 220)
	sliders[2].setAttribute('value', 120)

	inputs[1].setAttribute('placeholder', 110)
	inputs[2].setAttribute('placeholder', 120)
}



const showMoreOptions = () => moreOptions.classList.toggle('show-more-options')

const hideMoreOptions = (e) => {
	const labels = document.querySelectorAll('label')
	const inputs = document.querySelectorAll('input[type="radio"]')
	const inputsTitle = document.querySelector('.main__lose-title')
	const loseOptions = document.querySelector('.main__lose-options')

	if (e.target !== questionButtons[2] && e.target !== inputsTitle && e.target !== loseOptions && e.target !== inputs[0] && e.target !== inputs[1] && e.target !== labels[0] && e.target !== labels[1]) {
		moreOptions.classList.remove('show-more-options')
	}
}

for (let i = 0; i < sliders.length; i++) {
	const handleSlideThumb = () => {
		const percentValue = ((sliders[i].value - sliders[i].getAttribute('min')) / (sliders[i].getAttribute('max') - sliders[i].getAttribute('min'))) * 100

		sliders[i].style.backgroundImage = `linear-gradient(90deg, var(--main-color) ${percentValue}%, var(--option-color) ${percentValue}%)`
		inputs[i].style.left = `${percentValue}%`
		inputs[i].style.transform = 'translateX(-50%)'
		inputs[i].setAttribute('placeholder', `${sliders[i].value}`)
	}

	const handlePlaceholder = () => inputs[i].setAttribute('placeholder', '')

	const addSliderValue = (e) => {
		if (
			(e.key === 'Enter' &&
				inputs[i].value <= sliders[i].getAttribute('max')) ||
			inputs[i].value >= sliders[i].getAttribute('min')
		) {
			sliders[i].value = inputs[i].value
			handleSlideThumb()
		} else if (e.key === 'Enter') {
			errors[i].textContent = `Provide a value within ${sliders[i].getAttribute(
				'min'
			)} - ${sliders[i].getAttribute('max')}.`
		}
	}

	sliders[i].addEventListener('input', handleSlideThumb)
	inputs[i].addEventListener('click', handlePlaceholder)
	inputs[i].addEventListener('keypress', addSliderValue)
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

modeChange.addEventListener('click', handleMode)
window.addEventListener('DOMContentLoaded', saveMode)
whyQuestion.addEventListener('click', showReasons)
questionButtons[2].addEventListener('click', showMoreOptions)
body.addEventListener('click', hideMoreOptions)
sliders[4].addEventListener('input', handleThumbDescription)
questionButtons[1].addEventListener('click', handleImperialUnits)
questionButtons[0].addEventListener('click', handleMetricUnits)
photosLink.addEventListener('click', showPhotos)
examplesLink.addEventListener('click', showActivityLevels)
closeBtn[0].addEventListener('click', closePhotos)
closeBtn[1].addEventListener('click', closeActivityLevels)
body.addEventListener('click', closePhotosOnBody)
body.addEventListener('click', closeActivityOnBody)
