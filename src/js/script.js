const body = document.querySelector('body')
const modeChange = document.querySelector('.header__click')
const whyQuestion = document.querySelector('.main__question-header')
const sliders = document.querySelectorAll('.main__slider')

const handleMode = () => {
	const modeImg = document.querySelector('.header__img')
	const spanImg = document.querySelector('.header__mode-color')
	let attributeValue = body.getAttribute('data-mode')

	if (attributeValue === 'dark') {
		body.setAttribute('data-mode', 'light')
		modeImg.setAttribute('src', 'dist/img/crescent-moon-and-star.png')
		spanImg.textContent = 'Dark'
	} else {
		body.setAttribute('data-mode', 'dark')
		modeImg.setAttribute('src', 'dist/img/light.png')
		spanImg.textContent = 'Light'
	}
}

const showReasons = () => {
	const whyReasons = document.querySelector('.main__question-answers')

	whyReasons.classList.toggle('show-height')
}

for (let i = 0; i < sliders.length; i++) {
    const handleSlideThumb = () => {
        const inputs = document.querySelectorAll('.main__input')
        
        sliders[i].style.backgroundImage = `linear-gradient(90deg, var(--main-color) ${sliders[i].value}%, var(--slider-color) ${sliders[i].value}%)`
        inputs[i].style.left = `${sliders[i].value}%`
        inputs[i].style.transform = 'translateX(-50%)'
		inputs[i].setAttribute('placeholder', `${sliders[i].value}`)
    }

    sliders[i].addEventListener('input', handleSlideThumb)
}

modeChange.addEventListener('click', handleMode)
whyQuestion.addEventListener('click', showReasons)
