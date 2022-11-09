const body = document.querySelector('body')
const modeChange = document.querySelector('.header__click')
const whyQuestion = document.querySelector('.main__question-header')

console.log(whyQuestion);

const handleMode = () => {
    const modeImg = document.querySelector('.header__img')
    const spanImg = document.querySelector('.header__mode-color')
    let attributeValue = body.getAttribute('data-mode')

    if (attributeValue === 'dark')
    {
        body.setAttribute('data-mode', 'light')
        modeImg.setAttribute('src', 'dist/img/crescent-moon-and-star.png')
        spanImg.textContent = 'Dark'
    }
    else
    {
        body.setAttribute('data-mode', 'dark')
        modeImg.setAttribute('src', 'dist/img/light.png')
        spanImg.textContent = 'Light'
    }
}

const showReasons = () => {
    const whyReasons = document.querySelector('.main__question-answers')

    whyReasons.classList.toggle('show-height')
}

modeChange.addEventListener('click', handleMode)
whyQuestion.addEventListener('click', showReasons)