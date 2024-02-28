export const closeWeightLossSpeedPopup = (wasEscPressed?: true) => {
  const weigthLossPreference = document.querySelector(
    '[data-popup="weight-loss-preference"]'
  )

  const loseWeightRadioBtn = document.querySelector(
    '#lose-weight'
  ) as null | HTMLInputElement

  if (
    !weigthLossPreference?.classList.contains('show-options') ||
    (loseWeightRadioBtn?.checked && !wasEscPressed)
  )
    return

  weigthLossPreference.classList.remove('show-options')
}
