const man = document.querySelectorAll('.man')
let northAmericaUsers
let europeUsers
let asiaUsers
let southAmeriacaUsers
let australiaUsers

console.log(northAmericaUsers)

man.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (
      item.getAttribute('src') === './images/man_empty.png' &&
      item.classList.contains('man-l')
    ) {
      item.setAttribute('src', './images/man_filled.png')
      item.previousElementSibling.setAttribute('src', './images/man_filled.png')
      item.previousElementSibling.previousElementSibling.setAttribute(
        'src',
        './images/man_filled.png'
      )

      if (item.parentNode.classList.contains('men-northamerica')) {
        northAmericaUsers = 3
      }
      console.log(northAmericaUsers)
    }

    if (
      item.getAttribute('src') === './images/man_empty.png' &&
      item.classList.contains('man-m')
    ) {
      item.setAttribute('src', './images/man_filled.png')
      item.previousElementSibling.setAttribute('src', './images/man_filled.png')
    }

    if (
      item.getAttribute('src') === './images/man_empty.png' &&
      item.classList.contains('man-s')
    ) {
      item.setAttribute('src', './images/man_filled.png')
    }
    //*

    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-m')
    ) {
      item.previousElementSibling.setAttribute('src', './images/man_filled.png')
      item.nextElementSibling.setAttribute('src', './images/man_empty.png')
    }

    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-s')
    ) {
      item.nextElementSibling.setAttribute('src', './images/man_empty.png')
      item.nextElementSibling.nextElementSibling.setAttribute(
        'src',
        './images/man_empty.png'
      )
    }
  })
})
