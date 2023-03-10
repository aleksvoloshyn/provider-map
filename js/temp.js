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

// reserve server connection
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
