const container = document.querySelector('.container')
const man = document.querySelectorAll('.man')
const deviceNorthamerica = document.querySelectorAll('.device-northamerica')
const deviceEurope = document.querySelectorAll('.device-europe')
const deviceAsia = document.querySelectorAll('.device-asia')
const deviceSouthamerica = document.querySelectorAll('.device-southamerica')
const deviceAustralia = document.querySelectorAll('.device-australia')
const deviceS = document.querySelectorAll('.device-s')
const deviceM = document.querySelectorAll('.device-m')
const deviceL = document.querySelectorAll('.device-l')
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
let finalServerLocation
let finalServerStart
const finalTable = document.querySelector('.final-table')
const finalTableByteCloud = document.querySelector('.final-table__bytecloud')
const finalTableobjectstorage = document.querySelector(
  '.final-table__objectstorage'
)
const background = document.querySelector('.table-background')
const startAgain = document.querySelector('.start-again ')
const deviceFill = document.querySelectorAll('.device-fill')
const deviceFillSmall = document.querySelectorAll('.devices-animation--small')
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
const redServers = []
const blueServers = []
let redServersSpeed = []
let redServersSpeedMax
let blueServersSpeed = []
let blueServersSpeedMax
let lastAnimationDelay = blueServersSpeedMax + redServersSpeedMax

// data about speed between regions from https://wondernetwork.com/pings
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
// function: hide unused user icons in regions
const hideUnusedUserIcons = (users, region) => {
  users === 0 ? region.classList.add('hide') : false
}
// function: show empty circles icons
const showEmptyCircles = () => {
  circleEmpty.forEach((emptycircle) => {
    emptycircle.classList.remove('hide')
  })
}
// function: change dialog text in header
const changeDialogeText = (text) => {
  dialogText.innerText = text
}
// NEXT BUTTON handler
const nextButtonHandler = () => {
  hideUnusedUserIcons(northAmericaUsers, menNorthamerica)
  hideUnusedUserIcons(europeUsers, menEurope)
  hideUnusedUserIcons(asiaUsers, menAsia)
  hideUnusedUserIcons(southAmericaUsers, menSouthamerica)
  hideUnusedUserIcons(australiaUsers, menAustralia)
  showEmptyCircles()
  changeDialogeText(
    'Where is your data? Choose one spot for Object Storage system'
  )
  dialogNextButton.classList.add('hide')
}
//eventlistener for next button
dialogNextButton.addEventListener('click', nextButtonHandler)
// function: checking if all regions selected => auto starting NEXT step
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
// function: check if at least one user selected => add button next
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
const addNearestServerLines = (
  usersQuantity,
  users,
  serverClouds,
  deviceRegion,
  dataServer,
  location
) => {
  if (
    (users === usersQuantity && serverClouds.includes(deviceRegion)) ||
    (users === usersQuantity && serverRegions.includes(deviceRegion)) ||
    (users === usersQuantity &&
      serverRegions.includes(server) &&
      server === deviceRegion)
  ) {
    redServers.push({
      connectedServer: dataServer,
      region: deviceRegion,
      users: users,
    })
    deviceRegions.push(deviceRegion)
    if (usersQuantity === 1) {
      location.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />`
      )
    }
    if (usersQuantity === 2) {
      location.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />
        <img class="line redServ ${dataServer}_${deviceRegion}_medium" src="/images/arc_${dataServer}_${deviceRegion}_medium.png"  alt="line" />
        `
      )
    }
    if (usersQuantity === 3) {
      location.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />
          <img class="line redServ ${dataServer}_${deviceRegion}_medium" src="/images/arc_${dataServer}_${deviceRegion}_medium.png"  alt="line" /> 
         <img class="line redServ ${dataServer}_${deviceRegion}_large" src="/images/arc_${dataServer}_${deviceRegion}_large.png"  alt="line" />       `
      )
    }
  }
}
// function: add connection-lines to reserve server
const addReserveServerLines = (
  usersQuantity,
  users,
  deviceRegion,
  reserveServer,
  reserveLocation
) => {
  if (users === usersQuantity && !serverRegions.includes(deviceRegion)) {
    redServers.push({
      connectedServer: reserveServer,
      region: deviceRegion,
      users: users,
    })
    deviceRegions.push(deviceRegion)
    if (usersQuantity === 1) {
      reserveLocation.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" /> `
      )
    }
    if (usersQuantity === 2) {
      reserveLocation.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="/images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />`
      )
    }
    if (usersQuantity === 3) {
      reserveLocation.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="/images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_large" src="/images/arc_${reserveServer}_${deviceRegion}_large.png"  alt="line" />       `
      )
    }
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
  addNearestServerLines(
    1,
    users,
    serverClouds,
    deviceRegion,
    dataServer,
    location
  )
  addNearestServerLines(
    2,
    users,
    serverClouds,
    deviceRegion,
    dataServer,
    location
  )
  addNearestServerLines(
    3,
    users,
    serverClouds,
    deviceRegion,
    dataServer,
    location
  )

  addReserveServerLines(1, users, deviceRegion, reserveServer, reserveLocation)
  addReserveServerLines(2, users, deviceRegion, reserveServer, reserveLocation)
  addReserveServerLines(3, users, deviceRegion, reserveServer, reserveLocation)
}
// function: sortItems by users
const sortItems = (arr) => {
  arr.sort((a, b) => a.users - b.users)
}
// function: add final table with results template
const addFinalTable = (servArr, insertTo) => {
  const star = '<img class = "star" src = "./images/star.svg"></img>'
  const emptyStar =
    '<img class = "star star-empty" src = "./images/star-empty.svg"></img>'

  servArr.map((item) => {
    insertTo.insertAdjacentHTML(
      'beforeend',
      `<div class="final-table__bytecloudwrapper">
        <div class="final-table__header">
          <p class="final-region">${item.region.split('-').join(' ')}</p>
          <div class="final-table__rating">${emptyStar.repeat(
            5 - item.stars
          )} ${star.repeat(item.stars)}</div>
        </div>
        <div class="final-table__data">
          <div class="final-table__latency">
            <p class="final-table__topsection">Latency</p>
            <p class="final-table__datasection">${(item.latency / 1000).toFixed(
              3
            )}</p>
          </div>
          <div class="final-table__downloadtime">
            <p class="final-table__topsection">Download time</p>
            <p class="final-table__datasection">${(item.speed / 1000).toFixed(
              2
            )} sec</p>
          </div>
          <div class="final-table__videostreaming">
            <p class="final-table__topsection">Video streaming</p>
            <p class="final-table__datasection">${item.video}</p>
          </div>
        </div>
      </div>`
    )
    // serverSpeed.push(+item.speed)
    // serverSpeed.sort((a, b) => a - b)
    // serverSpeedMax = serverSpeed[serverSpeed.length - 1]
  })
}
//  function add video rating data to the server (blue or red) connection
const addVideoRatingData = (servArr, speedData) => {
  console.log(servArr)
  console.log(speedData)
  servArr.map((serv) => {
    speedData.map((speed) => {
      if (speed.region === serv.connectedServer) {
        serv.speed = speed[serv.region].toFixed(1)
        serv.latency = ((serv.speed + 5) / 3).toFixed(0)
        if (serv.speed <= 50) {
          serv.video = '4K/216p Ultra HD'
          serv.stars = 5
        }
        if (serv.speed > 50 && serv.speed < 100) {
          serv.video = '1080p Full HD'
          serv.stars = 4
        }
        if (serv.speed > 100 && serv.speed < 150) {
          serv.video = '480p'
          serv.stars = 3
        }
        if (serv.speed > 150 && serv.speed < 200) {
          serv.video = '480p'
          serv.stars = 2
        }
        if (serv.speed > 200) {
          serv.video = '480p'
          serv.stars = 1
        }
      }
    })
  })
}
//function: start device progress filling color animation
const deviceProgressAnimation = (servAr, sClass, mClass, lClass) => {
  servAr.map((server) => {
    console.log(server)
    deviceS.forEach((i) => {
      if (
        i.classList.contains('device-s') &&
        !i.classList.contains('hide') &&
        server.region === i.dataset.region
      ) {
        i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
          'hide'
        )
        i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
          server.speed / 10
          // делим на 10 чтобы быстрее работала анимация, пропорции соблюдены
        }s device-${sClass} cubic-bezier(0, 0, 1, 1);`
      }
    })
    deviceM.forEach((i) => {
      if (
        i.classList.contains('device-m') &&
        !i.classList.contains('hide') &&
        server.region === i.dataset.region
      ) {
        i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
          'hide'
        )
        i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
          server.speed / 10
        }s device-${mClass} cubic-bezier(0, 0, 1, 1);`
      }
    })
    deviceL.forEach((i) => {
      if (
        i.classList.contains('device-l') &&
        !i.classList.contains('hide') &&
        server.region === i.dataset.region
      ) {
        i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
          'hide'
        )
        i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
          server.speed / 10
        }s device-${lClass} cubic-bezier(0, 0, 1, 1);`
      }
    })
  })
}

// ***blue server functions
// function: create new connections from blue server
const createConnections = () => {
  if (server === 'north-america' && serverRegions.includes('north-america')) {
    finalServerLocation = eastUsaServer
    finalServerStart = 'east-usa'
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
  console.log(finalServerStart)
}
// function hide server connections
const hideServerConnections = (server) => {
  document.querySelectorAll(server).forEach((serv) => {
    serv.classList.add('hide')
  })
}
// function: add blue server lines to region devices
const addLinesToBlueServer = (regionUsers, region) => {
  if (regionUsers === 1 && deviceRegions.includes(region)) {
    blueServers.push({
      connectedServer: finalServerStart,
      region: region,
      users: regionUsers,
    })
    finalServerLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line blueServ ${finalServerStart}_${region}_small" src="/images/arc_${finalServerStart}_${region}_small.png"  alt="line" /> `
    )
  }
  if (regionUsers === 2) {
    blueServers.push({
      connectedServer: finalServerStart,
      region: region,
      users: regionUsers,
    })
    finalServerLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line blueServ ${finalServerStart}_${region}_small" src="/images/arc_${finalServerStart}_${region}_small.png"  alt="line" />
          <img class="line blueServ ${finalServerStart}_${region}_medium" src="/images/arc_${finalServerStart}_${region}_medium.png"  alt="line" />`
    )
  }
  if (regionUsers === 3) {
    blueServers.push({
      connectedServer: finalServerStart,
      region: region,
      users: regionUsers,
    })
    finalServerLocation.insertAdjacentHTML(
      'afterend',
      `<img class="line blueServ ${finalServerStart}_${region}_small" src="/images/arc_${finalServerStart}_${region}_small.png"  alt="line" />
          <img class="line blueServ ${finalServerStart}_${region}_medium" src="/images/arc_${finalServerStart}_${region}_medium.png"  alt="line" />
          <img class="line blueServ ${finalServerStart}_${region}_large" src="/images/arc_${finalServerStart}_${region}_large.png"  alt="line" /> `
    )
  }
}
// function red server connections start!
const startRedServerConnections = () => {
  // north-america devices
  addLinesToServer(
    'east-usa', //dataServer
    'north-america', //deviceRegion
    northAmericaUsers, //users
    eastUsaServer, //location
    'west-usa', //reserveServer
    westUsaServer //reserveLocation
  )
  // europe devices
  addLinesToServer(
    'germany',
    'europe',
    europeUsers,
    germanyServer,
    'east-usa',
    eastUsaServer
  )
  // asia devices
  addLinesToServer(
    'singapore',
    'asia',
    asiaUsers,
    oceaniaServer,
    'germany',
    germanyServer
  )
  // south-america devices
  addLinesToServer(
    'west-usa',
    'south-america',
    southAmericaUsers,
    westUsaServer,
    'east-usa',
    eastUsaServer
  )
  // oceania devices
  addLinesToServer(
    'singapore',
    'oceania',
    australiaUsers,
    oceaniaServer,
    'germany',
    germanyServer
  )
  // console.log(`server: ${server}`)
  // console.log(`serverClouds: ${serverClouds}`)
  // console.log(`serverRegions: ${serverRegions}`)
  // console.log(`deviceRegions: ${deviceRegions}`)

  // sort red server connections with user devices by number of users
  sortItems(redServers)
  // add video rating data to redServers connection
  addVideoRatingData(redServers, serversSpeed)

  addFinalTable(redServers, finalTableByteCloud)

  console.log(`*** RED SERVERS: `)
  console.log(redServers)

  redServers.map((item) => {
    redServersSpeed.push(item.speed)
    redServersSpeed.sort((a, b) => a - b)
    console.log(redServersSpeed)
    redServersSpeedMax = redServersSpeed[redServersSpeed.length - 1]
    console.log(redServersSpeedMax)
  })
  // start device progress animation for red servers conections
  deviceProgressAnimation(redServers, 'small', 'medium', 'large')

  // *********

  // ***********************
}
// function blue server connections start!
const startBlueServerConnections = () => {
  createConnections()
  hideServerConnections('.redServ')
  addLinesToBlueServer(northAmericaUsers, 'north-america')
  addLinesToBlueServer(europeUsers, 'europe')
  addLinesToBlueServer(asiaUsers, 'asia')
  addLinesToBlueServer(southAmericaUsers, 'south-america')
  addLinesToBlueServer(australiaUsers, 'oceania')
  // sort blueServer connections with user devices by number of users
  sortItems(blueServers)
  // add video rating data to blueServers connection
  addVideoRatingData(blueServers, serversSpeed)
  addFinalTable(blueServers, finalTableobjectstorage)
  console.log(`*** BLUE SERVERS: `)
  console.log(blueServers)

  blueServers.map((item) => {})

  document
    .querySelector('.devices-northamerica__animation--medium')
    .style.animation.split('s')[0]
  blueServers.map((item) => {
    blueServersSpeed.push(item.speed)
    blueServersSpeed.sort((a, b) => a - b)
    console.log(blueServersSpeed)
    blueServersSpeedMax = blueServersSpeed[blueServersSpeed.length - 1]
    console.log(blueServersSpeedMax)
  })

  //start device progress animation for blue servers conections
  deviceProgressAnimation(
    blueServers,
    'small--recount',
    'medium--recount',
    'large--recount'
  )
}
// function: start calculation ************************************
const startCalculation = () => {
  console.log('*****START*******')
  startRedServerConnections()

  setTimeout(() => {
    startBlueServerConnections()
  }, (redServersSpeedMax / 10) * 1000 + 2000)

  setTimeout(() => {
    finalTable.classList.remove('hide')
    background.classList.remove('hide')

    console.log(
      document
        .querySelector('.devices-northamerica__animation--medium')
        .style.animation.split('s')[0]
    )
  }, document.querySelector('.devices-northamerica__animation--medium').style.animation.split('s')[0])
}

// *******************************************************************************

// function: hide unused empty circles
const hideUnusedCircles = () => {
  circleEmpty.forEach((item) => {
    if (item.getAttribute('src') === '/images/circle_empty.png') {
      item.classList.add('hide')
    }
  })
}

// function: on Start BUTTON click
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

// startAgain.addEventListener('click', () => {
//   const line = document.querySelectorAll('.line')
//   background.classList.add('hide')
//   finalTable.classList.add('hide')
//   germanyServer.classList.add('hide')
//   eastUsaServer.classList.add('hide')
//   westUsaServer.classList.add('hide')
//   oceaniaServer.classList.add('hide')
//   menNorthamerica.classList.remove('hide')
//   menEurope.classList.remove('hide')
//   menAsia.classList.remove('hide')
//   menAsia.classList.remove('hide')
//   menAsia.classList.remove('hide')
//   menSouthamerica.classList.remove('hide')
//   menAustralia.classList.remove('hide')
//   deviceAsia.forEach((item) => {
//     item.classList.add('hide')
//   })
//   deviceSouthamerica.forEach((item) => {
//     item.classList.add('hide')
//   })
//   deviceAustralia.forEach((item) => {
//     item.classList.add('hide')
//   })
//   deviceEurope.forEach((item) => {
//     item.classList.add('hide')
//   })
//   deviceNorthamerica.forEach((item) => {
//     item.classList.add('hide')
//   })

//   deviceFill.forEach((item) => {
//     item.classList.add('hide')
//   })
//   line.forEach((item) => {
//     item.classList.add('hide')
//   })
//   dialogText.classList.remove('hide')
// })
