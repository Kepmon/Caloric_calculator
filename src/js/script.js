const body = document.querySelector('body')
const modeButton = document.querySelector('.header__button')

let attributeValue = body.getAttribute('data-mode')

const setModeImg = () => {
    const modeImg = document.querySelector('.header__img')

    if (attributeValue === 'dark')
    {
        modeImg.setAttribute('src', 'dist/img/light.png')
    }
    else
    {
        modeImg.setAttribute('src', 'dist/img/crescent-moon-and-star.png')
    }
}

const changeMode = () => {
    if (attributeValue === 'dark')
    {
        body.setAttribute('data-mode', 'light')
    }
    else
    {
        body.setAttribute('data-mode', 'dark')
    }
}

window.addEventListener('DOMContentLoaded', setModeImg)
modeButton.addEventListener('click', changeMode)