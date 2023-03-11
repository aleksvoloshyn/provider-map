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

let redServerSpeed = []
let maxRedServerSpeed
let blueServerSpeed = []
let maxBlueServerSpeed
let lastAnimationDelay = maxBlueServerSpeed + maxRedServerSpeed

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

// *** -
// function addLinesToServer
// const addLinesToServer = (
//   dataServer,
//   deviceRegion,
//   users,
//   location,
//   reserveServer,
//   reserveLocation
// ) => {
//   // nearest server
//   if (
//     (users === 1 && serverClouds.includes(deviceRegion)) ||
//     (users === 1 && serverRegions.includes(deviceRegion)) ||
//     (users === 1 && serverRegions.includes(server) && server === deviceRegion)
//   ) {
//     redServers.push({
//       connectedServer: dataServer,
//       region: deviceRegion,
//       users: users,
//     })
//     deviceRegions.push(deviceRegion)
//     location.insertAdjacentHTML(
//       'afterend',
//       `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />`
//     )
//   }

//   if (
//     (users === 2 && serverClouds.includes(deviceRegion)) ||
//     (users === 2 && serverRegions.includes(deviceRegion)) ||
//     (users === 2 && serverRegions.includes(server) && server === deviceRegion)
//   ) {
//     redServers.push({
//       connectedServer: dataServer,
//       region: deviceRegion,
//       users: users,
//     })
//     deviceRegions.push(deviceRegion)
//     location.insertAdjacentHTML(
//       'afterend',
//       `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />
//         <img class="line redServ ${dataServer}_${deviceRegion}_medium" src="/images/arc_${dataServer}_${deviceRegion}_medium.png"  alt="line" />
//         `
//     )
//   }
//   if (
//     (users === 3 && serverClouds.includes(deviceRegion)) ||
//     (users === 3 && serverRegions.includes(deviceRegion)) ||
//     (users === 3 && serverRegions.includes(server) && server === deviceRegion)
//   ) {
//     redServers.push({
//       connectedServer: dataServer,
//       region: deviceRegion,
//       users: users,
//     })
//     deviceRegions.push(deviceRegion)
//     location.insertAdjacentHTML(
//       'afterend',
//       `<img class="line redServ ${dataServer}_${deviceRegion}_small" src="/images/arc_${dataServer}_${deviceRegion}_small.png"  alt="line" />
//           <img class="line redServ ${dataServer}_${deviceRegion}_medium" src="/images/arc_${dataServer}_${deviceRegion}_medium.png"  alt="line" />
//          <img class="line redServ ${dataServer}_${deviceRegion}_large" src="/images/arc_${dataServer}_${deviceRegion}_large.png"  alt="line" />       `
//     )
//   }

//   // reserve server connection
//   if (users === 1 && !serverRegions.includes(deviceRegion)) {
//     redServers.push({
//       connectedServer: reserveServer,
//       region: deviceRegion,
//       users: users,
//     })
//     deviceRegions.push(deviceRegion)
//     reserveLocation.insertAdjacentHTML(
//       'afterend',
//       `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" /> `
//     )
//   }
//   if (users === 2 && !serverRegions.includes(deviceRegion)) {
//     redServers.push({
//       connectedServer: reserveServer,
//       region: deviceRegion,
//       users: users,
//     })
//     deviceRegions.push(deviceRegion)
//     reserveLocation.insertAdjacentHTML(
//       'afterend',
//       `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
//        <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="/images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />`
//     )
//   }
//   if (users === 3 && !serverRegions.includes(deviceRegion)) {
//     redServers.push({
//       connectedServer: reserveServer,
//       region: deviceRegion,
//       users: users,
//     })
//     deviceRegions.push(deviceRegion)
//     reserveLocation.insertAdjacentHTML(
//       'afterend',
//       `<img class="line redServ ${reserveServer}_${deviceRegion}_small" src="/images/arc_${reserveServer}_${deviceRegion}_small.png"  alt="line" />
//        <img class="line redServ ${reserveServer}_${deviceRegion}_medium" src="/images/arc_${reserveServer}_${deviceRegion}_medium.png"  alt="line" />
//        <img class="line redServ ${reserveServer}_${deviceRegion}_large" src="/images/arc_${reserveServer}_${deviceRegion}_large.png"  alt="line" />       `
//     )
//   }
// }
// *** -

// *** +
// function: add connection-lines to nearest server
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
// *** +

// function: add final table with results template
const addFinalTable = (region, speed, latency, video, stars, insertTo) => {
  const star = '<img class = "star" src = "./images/star.svg"></img>'
  const emptyStar =
    '<img class = "star star-empty" src = "./images/star-empty.svg"></img>'
  const emptStarsResult = 5 - stars

  // background.classList.remove('hide')
  insertTo.insertAdjacentHTML(
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
            <p class="final-table__datasection">${(latency / 1000).toFixed(
              3
            )}</p>
          </div>
          <div class="final-table__downloadtime">
            <p class="final-table__topsection">Download time</p>
            <p class="final-table__datasection">${(speed / 1000).toFixed(
              2
            )} sec</p>
          </div>
          <div class="final-table__videostreaming">
            <p class="final-table__topsection">Video streaming</p>
            <p class="final-table__datasection">${video}</p>
          </div>
        </div>
      </div>`
  )
}

// functions: sortItems
const sortItems = (arr, item) => {
  arr.sort((a, b) => (a.item > b.item ? 1 : -1))
}

//   // function add video rating data to the server (blue or red) connection
const addVideoRatingData = (servArr, speedData) => {
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

// function: start calculation ************************************
const startCalculation = () => {
  console.log('****************************')

  addLinesToServer(
    'east-usa',
    'north-america',
    northAmericaUsers,
    eastUsaServer,
    'west-usa',
    westUsaServer
  )
  addLinesToServer(
    'germany', //dataServer
    'europe', //deviceRegion
    europeUsers, //users
    germanyServer, //location
    'east-usa', //reserveServer
    eastUsaServer //reserveLocation
  )
  addLinesToServer(
    'singapore',
    'asia',
    asiaUsers,
    oceaniaServer,
    'germany',
    germanyServer
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

  // console.log(`server: ${server}`)
  // console.log(`serverClouds: ${serverClouds}`)
  // console.log(`serverRegions: ${serverRegions}`)
  // console.log(`deviceRegions: ${deviceRegions}`)

  // sort red server connections with user devices by number of users
  sortItems(redServers, 'users')
  // add video rating data to redServers connection
  addVideoRatingData(redServers, serversSpeed)
  // **-
  // redServers.map((red) => {
  //   serversSpeed.map((speed) => {
  //     if (speed.region === red.connectedServer) {
  //       red.speed = speed[red.region].toFixed(1)
  //       red.latency = ((red.speed + 5) / 3).toFixed(0)
  //       if (red.speed <= 50) {
  //         red.video = '4K/216p Ultra HD'
  //         red.stars = 5
  //       }
  //       if (red.speed > 50 && red.speed < 100) {
  //         red.video = '1080p Full HD'
  //         red.stars = 4
  //       }
  //       if (red.speed > 100 && red.speed < 150) {
  //         red.video = '480p'
  //         red.stars = 3
  //       }
  //       if (red.speed > 150 && red.speed < 200) {
  //         red.video = '480p'
  //         red.stars = 2
  //       }
  //       if (red.speed > 200) {
  //         red.video = '480p'
  //         red.stars = 1
  //       }
  //     }
  //   })
  // })
  // **-

  console.log(redServers)
  redServers.map((item) => {
    addFinalTable(
      item.region,
      item.speed,
      item.latency,
      item.video,
      item.stars,
      finalTableByteCloud
    )

    //массив скоростей красных серверов
    redServerSpeed.push(+item.speed)
    redServerSpeed.sort((a, b) => a - b)
    maxRedServerSpeed = redServerSpeed[redServerSpeed.length - 1]

    // Запуск анимации синего экрана
    redServers.map((red) => {
      deviceS.forEach((i) => {
        if (
          i.classList.contains('device-s') &&
          !i.classList.contains('hide') &&
          red.region === i.dataset.region
        ) {
          i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
            'hide'
          )
          i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
            red.speed / 10
            // делим на 10 чтобы быстрее работала анимация, пропорции соблюдены
          }s device-small cubic-bezier(0, 0, 1, 1);`
        }
      })
      deviceM.forEach((i) => {
        if (
          i.classList.contains('device-m') &&
          !i.classList.contains('hide') &&
          red.region === i.dataset.region
        ) {
          i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
            'hide'
          )
          i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
            red.speed / 10
          }s device-medium cubic-bezier(0, 0, 1, 1);`
        }
      })
      deviceL.forEach((i) => {
        if (
          i.classList.contains('device-l') &&
          !i.classList.contains('hide') &&
          red.region === i.dataset.region
        ) {
          i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
            'hide'
          )
          i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
            red.speed / 10
          }s device-large cubic-bezier(0, 0, 1, 1);`
        }
      })
      // ***********
    })
  })

  setTimeout(() => {
    // прячем загрузку
    // deviceFill.forEach((d) => {
    //   d.style = 'animation: none'
    // })

    // ****************************
    document.querySelectorAll('.redServ').forEach((serv) => {
      serv.classList.add('hide')
    })
    // src="/images/arc_west-usa_europe_small.png"
    let finalServerLocation
    let finalServerStart
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

    // Рисуем линии от одного сервера
    const startRedServer = (regionUsers, region) => {
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

    // start one serv

    startRedServer(northAmericaUsers, 'north-america')
    startRedServer(europeUsers, 'europe')
    startRedServer(asiaUsers, 'asia')
    startRedServer(southAmericaUsers, 'south-america')
    startRedServer(australiaUsers, 'oceania')

    // sort blueServer connections with user devices by number of users
    sortItems(blueServers, 'users')
    // add video rating data to blueServers connection
    addVideoRatingData(blueServers, serversSpeed)
    // **-
    // blueServers.map((blue) => {
    //   serversSpeed.map((speed) => {
    //     if (speed.region === blue.connectedServer) {
    //       blue.speed = speed[blue.region].toFixed(1)
    //       blue.latency = ((blue.speed + 5) / 3).toFixed(0)
    //       if (blue.speed <= 50) {
    //         blue.video = '4K/216p Ultra HD'
    //         blue.stars = 5
    //       }
    //       if (blue.speed > 50 && blue.speed < 100) {
    //         blue.video = '1080p Full HD'
    //         blue.stars = 4
    //       }
    //       if (blue.speed > 100 && blue.speed < 150) {
    //         blue.video = '480p'
    //         blue.stars = 3
    //       }
    //       if (blue.speed > 150 && blue.speed < 200) {
    //         blue.video = '480p'
    //         blue.stars = 2
    //       }
    //       if (blue.speed > 200) {
    //         blue.video = '480p'
    //         blue.stars = 1
    //       }
    //     }
    //   })
    // })
    // **-

    blueServers.map((item) => {
      addFinalTable(
        item.region,
        item.speed,
        item.latency,
        item.video,
        item.stars,
        finalTableobjectstorage
      )

      console.log(blueServers)

      //массив скоростей синих серверов
      blueServerSpeed.push(+item.speed)
      blueServerSpeed.sort((a, b) => a - b)
      console.log(blueServerSpeed.sort((a, b) => a - b))
      maxBlueServerSpeed = blueServerSpeed[blueServerSpeed.length - 1]

      // Запуск анимации синего экрана **снова
      blueServers.map((blue) => {
        deviceS.forEach((i) => {
          if (
            i.classList.contains('device-s') &&
            !i.classList.contains('hide') &&
            blue.region === i.dataset.region
          ) {
            i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              'hide'
            )
            i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
              blue.speed / 10
            }s device-small--recount cubic-bezier(0, 0, 1, 1);`
          }
        })
        deviceM.forEach((i) => {
          if (
            i.classList.contains('device-m') &&
            !i.classList.contains('hide') &&
            blue.region === i.dataset.region
          ) {
            i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              'hide'
            ) && blue.region === i.dataset.region
            i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
              blue.speed / 10
            }s device-medium--recount cubic-bezier(0, 0, 1, 1);`
          }
        })
        deviceL.forEach((i) => {
          if (
            i.classList.contains('device-l') &&
            !i.classList.contains('hide') &&
            blue.region === i.dataset.region
          ) {
            i.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              'hide'
            ) && blue.region === i.dataset.region
            i.nextElementSibling.nextElementSibling.nextElementSibling.style = `animation: ${
              blue.speed / 10
            }s device-large--recount cubic-bezier(0, 0, 1, 1);`
          }
        })
      })
    })
  }, (maxRedServerSpeed / 10) * 1000 + 2)

  // setTimeout(() => {
  //   finalTable.classList.remove('hide')
  //   background.classList.remove('hide')
  // }, 10000)
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
