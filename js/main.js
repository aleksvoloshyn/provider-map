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

const germanyServer = document.querySelector('.europe')
const eastUsaServer = document.querySelector('.east-usa')
const westUsaServer = document.querySelector('.west-usa')
const oceaniaServer = document.querySelector('.oceania')

let northAmericaUsers = 0
let europeUsers = 0
let asiaUsers = 0
let southAmericaUsers = 0
let australiaUsers = 0
const usersQuantity = {
  northAmericaUsers: 0,
  europeUsers: 0,
  asiaUsers: 0,
  southAmericaUsers: 0,
  australiaUsers: 0,
}

let clientsDataChoosen = false
let server = ''
let serverClouds = []
let serverRegions = []
let deviceRegions = []

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
  if (southAmericaUsers === 0) {
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
    southAmericaUsers !== 0 &&
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
    southAmericaUsers !== 0 ||
    australiaUsers !== 0
  ) {
    dialogNextButton.classList.remove('hide')
  }
}

// function addLinesToServer
const addLinesToServer = (
  dataServer,
  deviceRegion,
  users,
  location,
  reserveServer,
  reserveLocation
) => {
  // nearest server
  if (
    (users === 1 && serverClouds.includes(deviceRegion)) ||
    (users === 1 && serverRegions.includes(deviceRegion)) ||
    (users === 1 && serverRegions.includes(server) && server === deviceRegion)
  ) {
    deviceRegions.push(deviceRegion)
    location.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />`
    )
  }

  // if(){}

  if (
    (users === 2 && serverClouds.includes(deviceRegion)) ||
    (users === 2 && serverRegions.includes(deviceRegion)) ||
    (users === 2 && serverRegions.includes(server) && server === deviceRegion)
  ) {
    deviceRegions.push(deviceRegion)
    location.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />
        <img class="line redServ ${dataServer}_${deviceRegion}_medium" src="/images/arc_${dataServer}_${deviceRegion}_medium.png"  alt="line" />
        `
    )
  }
  if (
    (users === 3 && serverClouds.includes(deviceRegion)) ||
    (users === 3 && serverRegions.includes(deviceRegion)) ||
    (users === 3 && serverRegions.includes(server) && server === deviceRegion)
  ) {
    deviceRegions.push(deviceRegion)
    location.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />
          <img class="line redServ ${dataServer}_${deviceRegion}_medium" src="/images/arc_${dataServer}_${deviceRegion}_medium.png"  alt="line" /> 
         <img class="line redServ ${dataServer}_${deviceRegion}_large" src="/images/arc_${dataServer}_${deviceRegion}_large.png"  alt="line" />       `
    )
  }

  // reserve server connection
  if (users === 1 && !serverRegions.includes(deviceRegion)) {
    deviceRegions.push(deviceRegion)
    reserveLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" /> `
    )
  }
  if (users === 2 && !serverRegions.includes(deviceRegion)) {
    deviceRegions.push(deviceRegion)
    reserveLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="/images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />`
    )
  }
  if (users === 3 && !serverRegions.includes(deviceRegion)) {
    deviceRegions.push(deviceRegion)
    reserveLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="/images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_large" src="/images/arc_${reserveServer}_${deviceRegion}_large.png"  alt="line" />       `
    )
  }
}

// function start animation ************************************
const startCalculation = () => {
  console.log('****************************')
  addLinesToServer(
    'germany', //dataServer
    'europe', //deviceRegion
    europeUsers, //users
    germanyServer, //location
    'east-usa', //reserveServer
    eastUsaServer //reserveLocation
  )

  addLinesToServer(
    'east-usa',
    'north-america',
    northAmericaUsers,
    eastUsaServer,
    'west-usa',
    westUsaServer
  )
  addLinesToServer(
    'west-usa',
    'south-america',
    southAmericaUsers,
    westUsaServer,
    'east-usa',
    eastUsaServer
  )

  addLinesToServer(
    'singapore',
    'oceania',
    australiaUsers,
    oceaniaServer,
    'germany',
    germanyServer
  )
  addLinesToServer(
    'singapore',
    'asia',
    asiaUsers,
    oceaniaServer,
    'germany',
    germanyServer
  )
  console.log(`server: ${server}`)
  console.log(`serverClouds: ${serverClouds}`)
  console.log(`serverRegions: ${serverRegions}`)
  console.log(`deviceRegions: ${deviceRegions}`)

  setTimeout(() => {
    document.querySelectorAll('.redServ').forEach((serv) => {
      serv.classList.add('hide')
    })
    // src="/images/arc_west-usa_europe_small.png"
    let finalServerLocation
    let finalServerStart
    if (server === 'north-america' && serverRegions.includes('north-america')) {
      finalServerLocation = eastUsaServer
      finalServerLocation = 'east-usa'
    }

    if (
      (server === 'north-america' &&
        serverRegions.includes('north-america') &&
        serverClouds.includes('east-usa')) ||
      (server === 'north-america' && !serverRegions.includes('north-america'))
    ) {
      finalServerLocation = westUsaServer
      finalServerStart = 'west-usa'
    }
    if (server === 'europe') {
      finalServerLocation = germanyServer
      finalServerStart = 'germany'
    }
    if (server === 'asia') {
      finalServerLocation = oceaniaServer
      finalServerStart = 'singapore'
    }
    if (server === 'oceania') {
      finalServerLocation = oceaniaServer
      finalServerStart = 'singapore'
    }
    console.log(finalServerLocation)

    const startRedServer = (regionUsers) => {
      if (regionUsers === 1) {
        finalServerLocation.insertAdjacentHTML(
          'afterend',
          `<img class="line blueServ ${finalServerStart}_${item}_small" src="/images/arc_${finalServerStart}_${item}_small.png"  alt="line" /> `
        )
      }
      if (regionUsers === 2) {
        finalServerLocation.insertAdjacentHTML(
          'afterend',
          `<img class="line blueServ ${finalServerStart}_${item}_small" src="/images/arc_${finalServerStart}_${item}_small.png"  alt="line" /> 
          <img class="line blueServ ${finalServerStart}_${item}_medium" src="/images/arc_${finalServerStart}_${item}_medium.png"  alt="line" />`
        )
      }
      if (regionUsers === 3) {
        finalServerLocation.insertAdjacentHTML(
          'afterend',
          `<img class="line blueServ ${finalServerStart}_${item}_small" src="/images/arc_${finalServerStart}_${item}_small.png"  alt="line" /> 
          <img class="line blueServ ${finalServerStart}_${item}_medium" src="/images/arc_${finalServerStart}_${item}_medium.png"  alt="line" /> 
          <img class="line blueServ ${finalServerStart}_${item}_large" src="/images/arc_${finalServerStart}_${item}_large.png"  alt="line" /> `
        )
      }
    }

    startRedServer(northAmericaUsers)
    startRedServer(europeUsers)
    startRedServer(asiaUsers)
    startRedServer(southAmericaUsers)
    startRedServer(australiaUsers)
  }, 3000)
}

// *******************************************************************************

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
    if (circle.getAttribute('src') === '/images/circle_filled.png') {
      circle.setAttribute('src', '/images/circle_empty.png')
    }
  }

  circle.addEventListener('click', (e) => {
    console.log(e.target)
    // console.log(e.target.classList)
    // console.log(clientsDataChoosen)
    // console.log(serverClouds)

    if (clientsDataChoosen === false) {
      circle.setAttribute('src', '/images/server.png')

      if (e.target.classList.contains('europe')) {
        server = 'europe'
        serverRegions.push(circle.dataset.region)
        serverRegions.push(circle.dataset.secregion)
      }
      if (e.target.classList.contains('east-usa')) {
        server = 'north-america'
        serverRegions.push(circle.dataset.region)
        serverRegions.push(circle.dataset.secregion)
      }
      if (e.target.classList.contains('west-usa')) {
        server = 'north-america'
        serverRegions.push(circle.dataset.region)
        serverRegions.push(circle.dataset.secregion)
      }
      if (e.target.classList.contains('oceania')) {
        server = 'oceania'
        serverRegions.push(circle.dataset.region)
        serverRegions.push(circle.dataset.secregion)
      }
      clientsDataChoosen = true
      changeDialogeText(
        'Choose minimum two additional spots for ByteCloud and press '
      )
      dialogStartButton.classList.remove('hide')
    } else {
      if (circle.getAttribute('src') === '/images/server.png') {
        return
      }
      if (circle.getAttribute('src') !== '/images/server.png') {
        circle.setAttribute('src', '/images/server_ByteCloud.png')
        if (serverClouds.includes(circle.classList[2])) {
          return
        } else {
          serverClouds.push(circle.classList[2])
          // console.log(serverClouds.length)
        }
        if (serverRegions.includes(circle.dataset.region)) {
          return
        } else {
          serverRegions.push(circle.dataset.region)
          serverRegions.push(circle.dataset.secregion)
        }
      }

      if (serverClouds.length === 2) {
        dialogStartButton.classList.add('dialog-start--active')
      }
      if (serverClouds.length === 3) {
        changeDialogeText('')
        dialogStartButton.classList.add('hide')
        startCalculation()
      }
    }
  })
})

// log info about quantity of devices in regions
const logQuantityOfUsers = () => {
  console.log('North America :' + ' ' + northAmericaUsers)
  console.log('Europe :' + ' ' + europeUsers)
  console.log('Asia :' + ' ' + asiaUsers)
  console.log('South America :' + ' ' + southAmericaUsers)
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
        southAmericaUsers = 3
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
        southAmericaUsers = 2
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
        southAmericaUsers = 1
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
