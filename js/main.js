const container = document.querySelector('.container')
const background = document.querySelector('.table-background')
const startAgain = document.querySelector('.start-again ')
const finalDialog = document.querySelector('.final-dialog ')

const users = {
  man: document.querySelectorAll('.man'),
  men: document.querySelectorAll('.men'),
  menNorthamerica: document.querySelector('.men-northamerica'),
  menEurope: document.querySelector('.men-europe'),
  menAsia: document.querySelector('.men-asia'),
  menSouthamerica: document.querySelector('.men-southamerica'),
  menAustralia: document.querySelector('.men-australia'),
}
const device = {
  deviceNorthamerica: document.querySelectorAll('.device-northamerica'),
  deviceEurope: document.querySelectorAll('.device-europe'),
  deviceAsia: document.querySelectorAll('.device-asia'),
  deviceSouthamerica: document.querySelectorAll('.device-southamerica'),
  deviceAustralia: document.querySelectorAll('.device-australia'),
  deviceS: document.querySelectorAll('.device-s'),
  deviceM: document.querySelectorAll('.device-m'),
  deviceL: document.querySelectorAll('.device-l'),
  deviceFill: document.querySelectorAll('.device-fill'),
  deviceFillSmall: document.querySelectorAll('.devices-animation--small'),
}
const servers = {
  germanyServer: document.querySelector('.europe'),
  eastUsaServer: document.querySelector('.east-usa'),
  westUsaServer: document.querySelector('.west-usa'),
  oceaniaServer: document.querySelector('.oceania'),
}
const dialogs = {
  dialogText: document.querySelector('.dialog-text'),
  dialogNextButton: document.querySelector('.dialog-next'),
  dialogStartButton: document.querySelector('.dialog-start'),
}
const circles = {
  circleEmpty: document.querySelectorAll('.circle-empty'),
  circleFilled: document.querySelectorAll('.circle-filled'),
}
const latency = {
  latencyAll: document.querySelectorAll('.latency'),
  latEur: document.querySelector('.latency-europe'),
  latAsia: document.querySelector('.latency-asia'),
  latNorthAm: document.querySelector('.latency-northamerica'),
  latSouthAm: document.querySelector('.latency-southamerica'),
  latOceania: document.querySelector('.latency-oceania'),
}
const time = {
  timeAll: document.querySelectorAll('.time'),
  timeEur: document.querySelector('.time-europe'),
  timeAsia: document.querySelector('.time-asia'),
  timeNorthAm: document.querySelector('.time-northamerica'),
  timeSouthAm: document.querySelector('.time-southamerica'),
  timeOceania: document.querySelector('.time-oceania'),
}
const finTable = {
  finalTable: document.querySelector('.final-table'),
  finalTableByteCloud: document.querySelector('.final-table__bytecloud'),
  finalTableobjectstorage: document.querySelector(
    '.final-table__objectstorage'
  ),
}
let finalServerLocation
let finalServerStart
let northAmericaUsers = 0
let europeUsers = 0
let asiaUsers = 0
let southAmericaUsers = 0
let australiaUsers = 0
let clientsDataChoosen = false
let server = ''
const redServers = []
const blueServers = []
let serverClouds = []
let serverRegions = []
let deviceRegions = []
let redServersSpeed = []
let redServersSpeedMax
let blueServersSpeed = []
let blueServersSpeedMax
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
  circles.circleEmpty.forEach((emptycircle) => {
    emptycircle.classList.remove('hide')
  })
}
// function: change dialog text in header
const changeDialogeText = (text) => {
  dialogs.dialogText.innerText = text
}
// next button handler
const nextButtonHandler = () => {
  hideUnusedUserIcons(northAmericaUsers, users.menNorthamerica)
  hideUnusedUserIcons(europeUsers, users.menEurope)
  hideUnusedUserIcons(asiaUsers, users.menAsia)
  hideUnusedUserIcons(southAmericaUsers, users.menSouthamerica)
  hideUnusedUserIcons(australiaUsers, users.menAustralia)
  showEmptyCircles()
  changeDialogeText(
    'Where is your data? Choose one spot for Object Storage system'
  )
  dialogs.dialogNextButton.classList.add('hide')
}
//eventlistener for next button
dialogs.dialogNextButton.addEventListener('click', nextButtonHandler)
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
    dialogs.dialogNextButton.classList.add('hide')
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
    dialogs.dialogNextButton.classList.remove('hide')
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
        `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="./images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />`
      )
    }
    if (usersQuantity === 2) {
      location.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="./images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />
        <img class="line redServ ${dataServer}_${deviceRegion}_medium" src="./images/arc_${dataServer}_${deviceRegion}_medium.png"  alt="line" />
        `
      )
    }
    if (usersQuantity === 3) {
      location.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="./images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />
          <img class="line redServ ${dataServer}_${deviceRegion}_medium" src="./images/arc_${dataServer}_${deviceRegion}_medium.png"  alt="line" /> 
         <img class="line redServ ${dataServer}_${deviceRegion}_large" src="./images/arc_${dataServer}_${deviceRegion}_large.png"  alt="line" />       `
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
        `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="./images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" /> `
      )
    }
    if (usersQuantity === 2) {
      reserveLocation.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="./images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="./images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />`
      )
    }
    if (usersQuantity === 3) {
      reserveLocation.insertAdjacentHTML(
        'afterend',
        `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="./images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="./images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />
       <img class="line redServ ${reserveServer}_${deviceRegion}_large" src="./images/arc_${reserveServer}_${deviceRegion}_large.png"  alt="line" />       `
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
            <p class="final-table__datasection">${Number(
              item.latency / 1000
            ).toFixed(2)}</p>
          </div>
          <div class="final-table__downloadtime">
            <p class="final-table__topsection">Download time</p>
            <p class="final-table__datasection">${Number(
              item.speed / 1000
            ).toFixed(2)} sec</p>
          </div>
          <div class="final-table__videostreaming">
            <p class="final-table__topsection">Video streaming</p>
            <p class="final-table__datasection">${item.video}</p>
          </div>
        </div>
      </div>`
    )
  })
}
//  function add video rating data to the server (blue or red) connection
const addVideoRatingData = (servArr, speedData) => {
  // console.log(servArr)
  // console.log(speedData)
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
    // console.log(server)
    device.deviceS.forEach((i) => {
      if (
        i.classList.contains('device-s') &&
        !i.classList.contains('hide') &&
        server.region === i.dataset.region
      ) {
        i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
          'hide'
        )
        i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
          server.speed / 10 / 3
        }s device-${sClass} cubic-bezier(0, 0, 1, 1);`
      }
    })
    device.deviceM.forEach((i) => {
      if (
        i.classList.contains('device-m') &&
        !i.classList.contains('hide') &&
        server.region === i.dataset.region
      ) {
        i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
          'hide'
        )
        i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
          server.speed / 10 / 3
        }s device-${mClass} cubic-bezier(0, 0, 1, 1);`
      }
    })
    device.deviceL.forEach((i) => {
      if (
        i.classList.contains('device-l') &&
        !i.classList.contains('hide') &&
        server.region === i.dataset.region
      ) {
        i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
          'hide'
        )
        i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
          server.speed / 10 / 3
        }s device-${lClass} cubic-bezier(0, 0, 1, 1);`
      }
    })
  })
}

// ***blue server functions
// function: create new connections from blue server
const createConnections = () => {
  if (server === 'north-america' && serverRegions.includes('north-america')) {
    finalServerLocation = servers.eastUsaServer
    finalServerStart = 'east-usa'
  }
  if (
    (server === 'north-america' &&
      serverRegions.includes('north-america') &&
      serverClouds.includes('east-usa')) ||
    (server === 'north-america' && !serverRegions.includes('north-america'))
  ) {
    finalServerLocation = servers.westUsaServer
    finalServerStart = 'west-usa'
  }
  if (server === 'europe') {
    finalServerLocation = servers.germanyServer
    finalServerStart = 'germany'
  }
  if (server === 'asia') {
    finalServerLocation = servers.oceaniaServer
    finalServerStart = 'singapore'
  }
  if (server === 'oceania') {
    finalServerLocation = servers.oceaniaServer
    finalServerStart = 'singapore'
  }
  // console.log(finalServerLocation)
  // console.log(finalServerStart)
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
      `<img class="line blueServ ${finalServerStart}_${region}_small" src="./images/arc_${finalServerStart}_${region}_small.png"  alt="line" /> `
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
      `<img class="line blueServ ${finalServerStart}_${region}_small" src="./images/arc_${finalServerStart}_${region}_small.png"  alt="line" />
          <img class="line blueServ ${finalServerStart}_${region}_medium" src="./images/arc_${finalServerStart}_${region}_medium.png"  alt="line" />`
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
      `<img class="line blueServ ${finalServerStart}_${region}_small" src="./images/arc_${finalServerStart}_${region}_small.png"  alt="line" />
          <img class="line blueServ ${finalServerStart}_${region}_medium" src="./images/arc_${finalServerStart}_${region}_medium.png"  alt="line" />
          <img class="line blueServ ${finalServerStart}_${region}_large" src="./images/arc_${finalServerStart}_${region}_large.png"  alt="line" /> `
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
    servers.eastUsaServer, //location
    'west-usa', //reserveServer
    servers.westUsaServer //reserveLocation
  )
  // europe devices
  addLinesToServer(
    'germany',
    'europe',
    europeUsers,
    servers.germanyServer,
    'east-usa',
    servers.eastUsaServer
  )
  // asia devices
  addLinesToServer(
    'singapore',
    'asia',
    asiaUsers,
    servers.oceaniaServer,
    'germany',
    servers.germanyServer
  )
  // south-america devices
  addLinesToServer(
    'west-usa',
    'south-america',
    southAmericaUsers,
    servers.westUsaServer,
    'east-usa',
    servers.eastUsaServer
  )
  // oceania devices
  addLinesToServer(
    'singapore',
    'oceania',
    australiaUsers,
    servers.oceaniaServer,
    'germany',
    servers.germanyServer
  )
  // console.log(`server: ${server}`)
  // console.log(`serverClouds: ${serverClouds}`)
  // console.log(`serverRegions: ${serverRegions}`)
  // console.log(`deviceRegions: ${deviceRegions}`)

  // sort red server connections with user devices by number of users
  sortItems(redServers)
  // add video rating data to redServers connection
  addVideoRatingData(redServers, serversSpeed)

  addFinalTable(redServers, finTable.finalTableByteCloud)

  console.log(` RED SERVERS: `)
  console.log(redServers)

  redServers.map((item) => {
    redServersSpeed.push(item.speed)
    redServersSpeed.sort((a, b) => a - b)

    redServersSpeedMax = redServersSpeed[redServersSpeed.length - 1]
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
  addFinalTable(blueServers, finTable.finalTableobjectstorage)
  console.log(` BLUE SERVERS: `)
  console.log(blueServers)
  blueServers.map((item) => {})
  document
    .querySelector('.devices-northamerica__animation--medium')
    .style.animation.split('s')[0]
  blueServers.map((item) => {
    blueServersSpeed.push(item.speed)
    blueServersSpeed.sort((a, b) => a - b)
    blueServersSpeedMax = blueServersSpeed[blueServersSpeed.length - 1]
  })

  //start device progress animation for blue servers conections
  deviceProgressAnimation(
    blueServers,
    'small--recount',
    'medium--recount',
    'large--recount'
  )
}
// function toggle time & latency labels
const toggleLabels = (servers, region, latency, time) => {
  servers.map((i) => {
    if (i.region === region) {
      latency.innerText = `latency: ${(i.latency / 1000).toFixed(2)}`
      time.innerText = `time: ${(i.speed / 1000).toFixed(2)} sec`
      latency.classList.remove('hide')
      setTimeout(() => {
        latency.classList.add('hide')
        time.classList.remove('hide')
      }, (i.latency / 10 / 3) * 1000)
    }
  })
}
const finalDialogLaunch = () => {
  finalDialog.classList.remove('hide')
}
// function: start calculation
const startCalculation = () => {
  document.query
  console.log('START RED')
  startRedServerConnections()
  toggleLabels(redServers, 'asia', latency.latAsia, time.timeAsia)
  toggleLabels(redServers, 'europe', latency.latEur, time.timeEur)
  toggleLabels(redServers, 'oceania', latency.latOceania, time.timeOceania)
  toggleLabels(
    redServers,
    'north-america',
    latency.latNorthAm,
    time.timeNorthAm
  )
  toggleLabels(
    redServers,
    'south-america',
    latency.latSouthAm,
    time.timeSouthAm
  )
  setTimeout(() => {
    console.log('START BLUE')
    latency.latencyAll.forEach((lat) => lat.classList.add('hide'))
    time.timeAll.forEach((lat) => lat.classList.add('hide'))
    startBlueServerConnections()
    toggleLabels(blueServers, 'asia', latency.latAsia, time.timeAsia)
    toggleLabels(blueServers, 'europe', latency.latEur, time.timeEur)
    toggleLabels(blueServers, 'oceania', latency.latOceania, time.timeOceania)
    toggleLabels(
      blueServers,
      'north-america',
      latency.latNorthAm,
      time.timeNorthAm
    )
    toggleLabels(
      blueServers,
      'south-america',
      latency.latSouthAm,
      time.timeSouthAm
    )
    setTimeout(() => {
      finTable.finalTable.classList.remove('hide')
      background.classList.remove('hide')
      finalDialogLaunch()
    }, ((blueServersSpeedMax / 10) * 1000) / 3 + 1000)
  }, ((redServersSpeedMax / 10) * 1000) / 3 + 1000)
}
// function: hide unused empty circles
const hideUnusedCircles = () => {
  console.log(circles.circleEmpty)
  circles.circleEmpty.forEach((item) => {
    console.log(item)
    if (item.getAttribute('src') === './images/circle_empty.png') {
      console.log(item)
      console.log(true)
      item.classList.add('hide')
    }
  })
}
// function: on start button click
const startButtonHandler = () => {
  hideUnusedCircles()
  changeDialogeText('')
  dialogs.dialogStartButton.classList.add('hide')
  startCalculation()
}

dialogs.dialogStartButton.addEventListener('click', () => startButtonHandler())

// function for adding server icon with filledcircle efect
circles.circleEmpty.forEach((circle) => {
  circle.onmouseover = () => {
    if (circle.getAttribute('src') === './images/circle_empty.png') {
      circle.setAttribute('src', './images/circle_filled.png')
    }
  }
  circle.onmouseout = () => {
    if (circle.getAttribute('src') === './images/circle_filled.png') {
      circle.setAttribute('src', './images/circle_empty.png')
    }
  }

  circle.addEventListener('click', (e) => {
    if (clientsDataChoosen === false) {
      circle.setAttribute('src', './images/server.png')

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
      dialogs.dialogStartButton.classList.remove('hide')
    } else {
      if (circle.getAttribute('src') === './images/server.png') {
        return
      }
      if (circle.getAttribute('src') !== './images/server.png') {
        circle.setAttribute('src', './images/server_ByteCloud.png')
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
        dialogs.dialogStartButton.classList.add('dialog-start--active')
      }
      if (serverClouds.length === 3) {
        changeDialogeText('')
        dialogs.dialogStartButton.classList.add('hide')
        startCalculation()
      }
    }
  })
})
// select users quantity onmouseover - mouseout
users.man.forEach((item) => {
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
users.man.forEach((item) => {
  item.addEventListener('click', () => {
    if (
      item.getAttribute('src') === './images/man_filled.png' &&
      item.classList.contains('man-l')
    ) {
      item.parentNode.classList.toggle('hide')

      if (item.parentNode.classList.contains('men-northamerica')) {
        device.deviceNorthamerica.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        northAmericaUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-europe')) {
        device.deviceEurope.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        europeUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-asia')) {
        device.deviceAsia.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        asiaUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-southamerica')) {
        device.deviceSouthamerica.forEach((dev) => {
          dev.classList.toggle('hide')
        })
        southAmericaUsers = 3
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-australia')) {
        device.deviceAustralia.forEach((dev) => {
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
        device.deviceNorthamerica.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        northAmericaUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-europe')) {
        device.deviceEurope.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        europeUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-asia')) {
        device.deviceAsia.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        asiaUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-southamerica')) {
        device.deviceSouthamerica.forEach((dev) => {
          if (!dev.classList.contains('device-l')) {
            dev.classList.toggle('hide')
          }
        })
        southAmericaUsers = 2
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-australia')) {
        device.deviceAustralia.forEach((dev) => {
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
        device.deviceNorthamerica.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        northAmericaUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-europe')) {
        device.deviceEurope.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        europeUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-asia')) {
        device.deviceAsia.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        asiaUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-southamerica')) {
        device.deviceSouthamerica.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        southAmericaUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
      if (item.parentNode.classList.contains('men-australia')) {
        device.deviceAustralia.forEach((dev) => {
          if (dev.classList.contains('device-s')) dev.classList.toggle('hide')
        })
        australiaUsers = 1
        checkAtleastOneregionChecked()
        checkAllRegionsChecked()
      }
    }
  })
})
