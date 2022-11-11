const body = document.querySelector('body')
const modeImg = document.querySelector('.header__img')
const spanImg = document.querySelector('.header__mode-color')
const modeChange = document.querySelector('.header__click')
const whyQuestion = document.querySelector('.main__question-header')
const sliders = document.querySelectorAll('.main__slider')

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

	if (currentMode === 'dark')
	{
		modeImg.setAttribute('src', 'dist/img/light.png')
		spanImg.textContent = 'Light'
	}
	else
	{
		modeImg.setAttribute('src', 'dist/img/crescent-moon-and-star.png')
		spanImg.textContent = 'Dark'
	}
}

const showReasons = () => {
	const whyReasons = document.querySelector('.main__question-answers')

	whyReasons.classList.toggle('show-height')
}

for (let i = 0; i < sliders.length; i++) {
    const handleSlideThumb = () => {
        const inputs = document.querySelectorAll('.main__input')
		const percentValue = (sliders[i].value - sliders[i].getAttribute('min')) / (sliders[i].getAttribute('max') - sliders[i].getAttribute('min')) * 100
        
        sliders[i].style.backgroundImage = `linear-gradient(90deg, var(--main-color) ${percentValue}%, var(--slider-color) ${percentValue}%)`
        inputs[i].style.left = `${percentValue}%`
        inputs[i].style.transform = 'translateX(-50%)'
		inputs[i].setAttribute('placeholder', `${sliders[i].value}`)
    }

    sliders[i].addEventListener('input', handleSlideThumb)
}

const handleThumbDescription = () => {
	const thumbDescription = document.querySelector('.main__input-description')
	const activityValues = ['Little or no activity', 'Light activity', 'Moderate activity', 'High activity', 'Very high activity']
	const inputValues = [0, 25, 50, 75, 100]
	const index = inputValues.indexOf(parseInt(sliders[4].value))

	for (let i=0; i<inputValues.length; i++)
	{
		thumbDescription.textContent = activityValues[index]
	}
}

modeChange.addEventListener('click', handleMode)
window.addEventListener('DOMContentLoaded', saveMode)
whyQuestion.addEventListener('click', showReasons)
sliders[4].addEventListener('input', handleThumbDescription)
