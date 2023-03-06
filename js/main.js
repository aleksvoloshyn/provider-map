const man = document.querySelectorAll('.man')
const deviceNorthamerica = document.querySelectorAll('.device-northamerica')
const deviceEurope = document.querySelectorAll('.device-europe')
const deviceAsia = document.querySelectorAll('.device-asia')
const deviceSouthamerica = document.querySelectorAll('.device-southamerica')
const deviceAustralia = document.querySelectorAll('.device-australia')

const menNorthamerica = document.querySelector('.men-northamerica')
const menEurope = document.querySelector('.men-europe')
const menAsia = document.querySelector('.men-asia')
const menSouthamerica = document.querySelector('.men-southamerica')
const menAustralia = document.querySelector('.men-australia')

const dialogText = document.querySelector('.dialog-text')
const dialogNextButton = document.querySelector('.dialog-next')
const dialogStartButton = document.querySelector('.dialog-start')

const circleEmpty = document.querySelectorAll('.circle-empty')
const circleFilled = document.querySelectorAll('.circle-filled')

let northAmericaUsers = 0
let europeUsers = 0
let asiaUsers = 0
let southAmeriacaUsers = 0
let australiaUsers = 0

let clientsDataChoosen = false

let serverByteCloudQuantity = []

// function for hiding unused regions
hideEmptyRegions = () => {
  if (northAmericaUsers === 0) {
    menNorthamerica.classList.add('hide')
  }
  if (europeUsers === 0) {
    menEurope.classList.add('hide')
  }
  if (asiaUsers === 0) {
    menAsia.classList.add('hide')
  }
  if (southAmeriacaUsers === 0) {
    menSouthamerica.classList.add('hide')
  }
  if (australiaUsers === 0) {
    menAustralia.classList.add('hide')
  }
}

// function for showing emptycircles
const showEmptyCircles = () => {
  circleEmpty.forEach((emptycircle) => {
    emptycircle.classList.remove('hide')
  })
}
// function for changing dialog text
const changeDialogeText = (text) => {
  dialogText.innerText = text
}

// on NEXT BUTTON click
dialogNextButton.addEventListener('click', () => {
  hideEmptyRegions()
  showEmptyCircles()
  changeDialogeText(
    'Where is your data? Choose one spot for Object Storage system'
  )
  dialogNextButton.classList.add('hide')
})

// function for checking if all regions selected => auto starting NEXT step
const checkAllRegionsChecked = () => {
  if (
    northAmericaUsers !== 0 &&
    europeUsers !== 0 &&
    asiaUsers !== 0 &&
    southAmeriacaUsers !== 0 &&
    australiaUsers !== 0
  ) {
    changeDialogeText(
      'Where is your data? Choose one spot for Object Storage system'
    )
    showEmptyCircles()
    dialogNextButton.classList.add('hide')
  }
}

// function for checking if at least one user selected => add button next
const checkAtleastOneregionChecked = () => {
  if (
    northAmericaUsers !== 0 ||
    europeUsers !== 0 ||
    asiaUsers !== 0 ||
    southAmeriacaUsers !== 0 ||
    australiaUsers !== 0
  ) {
    dialogNextButton.classList.remove('hide')
  }
}

// function start animation
const startCalculation = () => {
  console.log('calculation - animation is starting now')
}

// function for hide unused empty circles
const hideUnusedCircles = () => {
  circleEmpty.forEach((item) => {
    if (item.getAttribute('src') === '/images/circle_empty.png') {
      item.classList.add('hide')
    }
  })
}

// function on Start BUTTON click
const startButtonHandler = () => {
  hideUnusedCircles()
  changeDialogeText('')
  dialogStartButton.classList.add('hide')
  startCalculation()
}

dialogStartButton.addEventListener('click', () => startButtonHandler())

// function for adding server icon with filledcircle efect
circleEmpty.forEach((circle) => {
  circle.onmouseover = () => {
    if (circle.getAttribute('src') === '/images/circle_empty.png') {
      circle.setAttribute('src', '/images/circle_filled.png')
    }
  }
  circle.onmouseout = () => {
    if (circle.getAttribute('src') === '/images/circle_filled.png')
      circle.setAttribute('src', '/images/circle_empty.png')
  }

  circle.addEventListener('click', () => {
    if (clientsDataChoosen === false) {
      circle.setAttribute('src', '/images/server.png')
      clientsDataChoosen = true
      changeDialogeText(
        'Choose minimum two additional spots for ByteCloud and press '
      )
      dialogStartButton.classList.remove('hide')
    } else {
      if (circle.getAttribute('src') !== '/images/server.png') {
        circle.setAttribute('src', '/images/server_ByteCloud.png')
        serverByteCloudQuantity.push(circle.classList)
      }

      if (new Set(serverByteCloudQuantity).size === 2) {
        dialogStartButton.classList.add('dialog-start--active')
      }
      if (new Set(serverByteCloudQuantity).size === 3) {
        changeDialogeText('')
        dialogStartButton.classList.add('hide')
        startCalculation()
      }
    }
    // startButtonHandler()
  })
})

// log info about quantity of devices in regions
const logQuantityOfUsers = () => {
  console.log('North America :' + ' ' + northAmericaUsers)
  console.log('Europe :' + ' ' + europeUsers)
  console.log('Asia :' + ' ' + asiaUsers)
  console.log('South America :' + ' ' + southAmeriacaUsers)
  console.log('Australia :' + ' ' + australiaUsers)
}

// select users quantity onmouseover - mouseout
man.forEach((item) => {
  item.onmouseover = () => {
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
  }
  item.onmouseout = () => {
    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-l')
    ) {
      item.setAttribute('src', './images/man_empty.png')
      item.previousElementSibling.setAttribute('src', './images/man_empty.png')
      item.previousElementSibling.previousElementSibling.setAttribute(
        'src',
        './images/man_empty.png'
      )
    }
    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-m')
    ) {
      item.setAttribute('src', './images/man_empty.png')
      item.previousElementSibling.setAttribute('src', './images/man_empty.png')
    }

    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-s')
    ) {
      item.setAttribute('src', './images/man_empty.png')
    }
  }
})

// users click - device quantity
man.forEach((item) => {
  item.addEventListener('click', () => {
    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-l')
    ) {
      item.parentNode.classList.toggle('hide')

      if (item.parentNode.classList.contains('men-northamerica')) {
        deviceNorthamerica.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        northAmericaUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-europe')) {
        deviceEurope.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        europeUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-asia')) {
        deviceAsia.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        asiaUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-southamerica')) {
        deviceSouthamerica.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        southAmeriacaUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-australia')) {
        deviceAustralia.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        australiaUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
    }
    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-m')
    ) {
      item.parentNode.classList.toggle('hide')
      if (item.parentNode.classList.contains('men-northamerica')) {
        deviceNorthamerica.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        northAmericaUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-europe')) {
        deviceEurope.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        europeUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-asia')) {
        deviceAsia.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        asiaUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-southamerica')) {
        deviceSouthamerica.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        southAmeriacaUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-australia')) {
        deviceAustralia.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        australiaUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
    }
    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-s')
    ) {
      item.parentNode.classList.toggle('hide')
      if (item.parentNode.classList.contains('men-northamerica')) {
        deviceNorthamerica.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        northAmericaUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-europe')) {
        deviceEurope.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        europeUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-asia')) {
        deviceAsia.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        asiaUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-southamerica')) {
        deviceSouthamerica.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        southAmeriacaUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-australia')) {
        deviceAustralia.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        australiaUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
    }
  })
})
