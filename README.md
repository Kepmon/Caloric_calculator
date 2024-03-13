[This website](https://clever-naiad-d0b904.netlify.app/) was originally written over a year ago, as a part of my learning process, using HTML, SCSS, and JavaScript.

## Refactoring
Just recently (March 2024, as I'm writing this) I refactored the whole website using, this time, Astro, SCSS, and TypeScript.
As always, accessibility was one of my biggest concerns and it was taken care of, this time. This way, the website can be fully navigated through, using only a keyboard or a screen reader.
Even, when some photos are displayed in a popup, I added a screen-reader-friendly description to them, so users that cannot see the content on the photos, still find them usefull.

## Description
However, I found that this kind of website was actually needed since most websites that allowed a user to calculate the caloric demand usually lacked some important questions, such as:
* body fat percentage - this information is important for the calculator's accuracy, particularly for people with low body fat percentage. Even so, most such websites won't ask you about your body fat percentage, probably because most people aren't aware of this value and/or it's hard to evaluate this number, in the first place. That's why I decided to provide some photos, covering wide range of body fat percentages, for both men and women, to help a user to decide on that. The photos were appropriately described, for screen-reader purposes.

* daily caloric exhaust - many people nowadays use some apps that track their caloric exhaust. Since those apps usually ask the user to provide their gender, age, and weight, the accuracy of the calories burnt throughout the day should be fairly good. And, as for calculating caloring intake, this kind of information is much more reliable than estimating the level of activity. Nevertheless, for those who don't know their daily caloric exhaust, I provided a detailed description on the kind of activities that should be assigned to each level of activity.

**Important info:**  
The option "I know my daily caloric expenditure" works ONLY if your browser supports the `:has` selector. You can check for the current support [here](https://caniuse.com/?search=%3Ahas). If you don't know how to find your browser version, check [here](https://www.wikihow.com/Find-Your-Browser-Type-and-Version).

## Sources
The photos of body fat percentage were taken from:
* [Men](https://kubexfitness.com/blog/body-fat-percentages-actually-look-like/)
* [Women](https://pl.pinterest.com/pin/805440714592354881/)

Body fat percentage description, for accessibility purposes: 
* [Men](https://www.mensjournal.com/health-fitness/what-body-fat-percentage-ranges-look-men#gid=ci02b8d174000c2605&pid=18-to-20-body-fat)  
* [Women](https://athleanx.com/articles/women-body-fat-percentage-photos)

Icons:
| Icon                                      | Source      |
| ----------------------------------------- | ----------- |
| Favicon                                   | [icons8.com](https://icons8.com/icon/udLNEDpg6Ek7/healthy-food-calories-calculator) |
| Light mode                                | [svgrepo.com](https://www.svgrepo.com/svg/398422/sun-with-face) |
| Dark mode                                 | [svgrepo.com](https://www.svgrepo.com/svg/396485/first-quarter-moon-face) |
| Checkmark (why-this-calculator-section)   | [svgrepo.com](https://www.svgrepo.com/svg/395995/check-mark-button) |
| Checkmark (daily-expenditure-checkbox)    | [svgrepo.com](https://www.svgrepo.com/svg/474769/checkmark) |
| Close                                     | [svgrepo.com](https://www.svgrepo.com/svg/500512/close-bold) |
| Units                                     | [svgrepo.com](https://www.svgrepo.com/svg/283098/measuring-measurement) |
| Gender                                    | [svgrepo.com](https://www.svgrepo.com/svg/283083/actions-buy) |
| Goal                                      | [svgrepo.com](https://www.svgrepo.com/svg/283103/maps-and-flags-direction) |
| Activity Level                            | [svgrepo.com](https://www.svgrepo.com/svg/283180/sit-down-sofa) |
| Age                                       | [svgrepo.com](https://www.svgrepo.com/svg/283132/sand-clock) |
| Weight                                    | [svgrepo.com](https://www.svgrepo.com/svg/283067/kilograms-grams) |
| Height                                    | [svgrepo.com](https://www.svgrepo.com/svg/283065/graphs-economy) |
| Body Fat                                  | [svgrepo.com](https://www.svgrepo.com/svg/283163/measuring-measure) |