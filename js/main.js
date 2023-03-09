const container = document.querySelector('.container')
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

const finalTable = document.querySelector('.final-table')
const finalTableByteCloud = document.querySelector('.final-table__bytecloud')
const finalTableobjectstorage = document.querySelector(
  '.final-table__objectstorage'
)
const background = document.querySelector('.table-background')

let northAmericaUsers = 0
let europeUsers = 0
let asiaUsers = 0
let southAmericaUsers = 0
let australiaUsers = 0

let clientsDataChoosen = false
let server = ''
let serverClouds = []
let serverRegions = []
let deviceRegions = []

const serversSpeed = [
  {
    region: 'east-usa',
    asia: 268.34,
    'south-america': 143.9,
    europe: 98.87,
    'north-america': 30.77,
    oceania: 218.75,
  },
  {
    region: 'germany',
    asia: 201.46,
    'south-america': 217.16,
    europe: 27.66,
    'north-america': 109.26,
    oceania: 278.06,
  },
  {
    region: 'west-usa',
    asia: 230.28,
    'south-america': 187.64,
    europe: 166.02,
    'north-america': 35.32,
    oceania: 147.78,
  },
  {
    region: 'singapore',
    asia: 27.23,
    'south-america': 365.54,
    europe: 172.86,
    'north-america': 222.49,
    oceania: 82.66,
  },
]

// {connectedServer: 'east-usa', region: 'europe'}
const redServers = []

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
    redServers.push({ connectedServer: dataServer, region: deviceRegion })
    deviceRegions.push(deviceRegion)
    location.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />`
    )
  }

  if (
    (users === 2 && serverClouds.includes(deviceRegion)) ||
    (users === 2 && serverRegions.includes(deviceRegion)) ||
    (users === 2 && serverRegions.includes(server) && server === deviceRegion)
  ) {
    redServers.push({ connectedServer: dataServer, region: deviceRegion })
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
    redServers.push({ connectedServer: dataServer, region: deviceRegion })
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
    redServers.push({ connectedServer: reserveServer, region: deviceRegion })
    deviceRegions.push(deviceRegion)
    reserveLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" /> `
    )
  }
  if (users === 2 && !serverRegions.includes(deviceRegion)) {
    redServers.push({ connectedServer: reserveServer, region: deviceRegion })
    deviceRegions.push(deviceRegion)
    reserveLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="/images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />`
    )
  }
  if (users === 3 && !serverRegions.includes(deviceRegion)) {
    redServers.push({ connectedServer: reserveServer, region: deviceRegion })
    deviceRegions.push(deviceRegion)
    reserveLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="/images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_large" src="/images/arc_${reserveServer}_${deviceRegion}_large.png"  alt="line" />       `
    )
  }
}

const addFinalTable = (region, speed, latency, video, stars) => {
  const star = '<img class = "star" src = "./images/star.svg"></img>'
  const emptyStar =
    '<img class = "star star-empty" src = "./images/star-empty.svg"></img>'
  const emptStarsResult = 5 - stars

  // background.classList.remove('hide')
  finalTableByteCloud.insertAdjacentHTML(
    'beforeend',
    `<div class="final-table__bytecloudwrapper">
        <div class="final-table__header">
          <p class="final-region">${region.split('-').join(' ')}</p>
          <div class="final-table__rating">${emptyStar.repeat(
            emptStarsResult
          )} ${star.repeat(stars)}</div>
        </div>
        <div class="final-table__data">
          <div class="final-table__latency">
            <p class="final-table__topsection">Latency</p>
            <p class="final-table__datasection">${latency}</p>
          </div>
          <div class="final-table__downloadtime">
            <p class="final-table__topsection">Download time</p>
            <p class="final-table__datasection">${speed}</p>
          </div>
          <div class="final-table__videostreaming">
            <p class="final-table__topsection">Video streaming</p>
            <p class="final-table__datasection">${video}</p>
          </div>
        </div>
      </div>`
  )
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

  redServers.map((red) => {
    serversSpeed.map((speed) => {
      if (speed.region === red.connectedServer) {
        red.speed = speed[red.region].toFixed(1)
        red.latency = ((red.speed + 5) / 3).toFixed(0)
        if (red.speed <= 50) {
          red.video = '4K/216p Ultra HD'
          red.stars = 5
        }
        if (red.speed > 50 && red.speed < 150) {
          red.video = '1080p Full HD'
          red.stars = 4
        }
        if (red.speed > 150) {
          red.video = '480p'
          red.stars = 3
        }
      }
    })
  })

  console.log(redServers)
  redServers.map((item) => {
    addFinalTable(item.region, item.speed, item.latency, item.video, item.stars)
  })
  finalTable.classList.remove('hide')
  // setTimeout(() => {
  //   document.querySelectorAll('.redServ').forEach((serv) => {
  //     serv.classList.add('hide')
  //   })
  //   // src="/images/arc_west-usa_europe_small.png"
  //   let finalServerLocation
  //   let finalServerStart
  //   if (server === 'north-america' && serverRegions.includes('north-america')) {
  //     finalServerLocation = eastUsaServer
  //     finalServerStart = 'east-usa'
  //   }

  //   if (
  //     (server === 'north-america' &&
  //       serverRegions.includes('north-america') &&
  //       serverClouds.includes('east-usa')) ||
  //     (server === 'north-america' && !serverRegions.includes('north-america'))
  //   ) {
  //     finalServerLocation = westUsaServer
  //     finalServerStart = 'west-usa'
  //   }
  //   if (server === 'europe') {
  //     finalServerLocation = germanyServer
  //     finalServerStart = 'germany'
  //   }
  //   if (server === 'asia') {
  //     finalServerLocation = oceaniaServer
  //     finalServerStart = 'singapore'
  //   }
  //   if (server === 'oceania') {
  //     finalServerLocation = oceaniaServer
  //     finalServerStart = 'singapore'
  //   }
  //   console.log(finalServerLocation)

  //   const startRedServer = (regionUsers, region) => {
  //     if (regionUsers === 1 && deviceRegions.includes(region)) {
  //       finalServerLocation.insertAdjacentHTML(
  //         'afterend',
  //         `<img class="line blueServ ${finalServerStart}_${region}_small" src="/images/arc_${finalServerStart}_${region}_small.png"  alt="line" /> `
  //       )
  //     }
  //     if (regionUsers === 2) {
  //       finalServerLocation.insertAdjacentHTML(
  //         'afterend',
  //         `<img class="line blueServ ${finalServerStart}_${region}_small" src="/images/arc_${finalServerStart}_${region}_small.png"  alt="line" />
  //         <img class="line blueServ ${finalServerStart}_${region}_medium" src="/images/arc_${finalServerStart}_${region}_medium.png"  alt="line" />`
  //       )
  //     }
  //     if (regionUsers === 3) {
  //       finalServerLocation.insertAdjacentHTML(
  //         'afterend',
  //         `<img class="line blueServ ${finalServerStart}_${region}_small" src="/images/arc_${finalServerStart}_${region}_small.png"  alt="line" />
  //         <img class="line blueServ ${finalServerStart}_${region}_medium" src="/images/arc_${finalServerStart}_${region}_medium.png"  alt="line" />
  //         <img class="line blueServ ${finalServerStart}_${region}_large" src="/images/arc_${finalServerStart}_${region}_large.png"  alt="line" /> `
  //       )
  //     }
  //   }

  //   startRedServer(northAmericaUsers, 'north-america')
  //   startRedServer(europeUsers, 'europe')
  //   startRedServer(asiaUsers, 'asia')
  //   startRedServer(southAmericaUsers, 'south-america')
  //   startRedServer(australiaUsers, 'oceania')
  // }, 3000)
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
