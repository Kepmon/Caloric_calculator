const body = document.querySelector('body')
const modeChange = document.querySelector('.header__click')

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


modeChange.addEventListener('click', handleMode)