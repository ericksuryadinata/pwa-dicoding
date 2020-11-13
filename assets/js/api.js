const BASEURL = 'https://api.football-data.org/'
const HEADERS = new Headers()
HEADERS.append('X-Auth-Token', '2d8e9f81155e46d6aa7ffe8e7032c6de')

function status (response) {
  return new Promise((resolve, reject) => {
    if (response.status !== 200) {
      reject(new Error(response.statusText))
    } else {
      resolve(response)
    }
  })
}

function json (response) {
  return response.json()
}

function error (errorMessage) {
  console.log(`Error : ${errorMessage}`) // eslint-disable-line no-console
}

function age (dob) {
  const today = new Date()
  const birthDate = new Date(dob)
  let ageNow = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    ageNow -= 1
  }

  return ageNow
}

function onClick (selector) {
  document.querySelectorAll(selector).forEach(elm => {
    elm.addEventListener('click', event => {
      const location = event.target.hash.split('?')
      const page = location[0].substr(1)
      const number = location[1] !== undefined ? location[1].substr(3) : undefined
      loadPage(page, number) // eslint-disable-line no-undef
    })
  })
}

function onFavorite (selector, team) {
  const elm = document.getElementById(selector)
  elm.addEventListener('click', () => {
    getIndexedId(team.id) // eslint-disable-line no-undef
      .then(t => {
        if (t) {
          alert('team is already favorited') // eslint-disable-line no-alert
        } else {
          saveTeam(team) // eslint-disable-line no-undef
        }
      })
  })
}

function onRemoveFavorite (selector, team) {
  const elm = document.getElementById(selector)
  elm.addEventListener('click', () => {
    removeTeam(team) // eslint-disable-line no-undef
  })
}

function buildTeams (data) {
  let html = ''
  const { teams } = data
  teams.forEach(t => {
    html += `
      <div class="row">
        <div class="col s12 m12">
          <div class="card">
            <div class="card-image grey lighten-4">
              <img src="${t.crestUrl}" class="teams-card">
              <span class="card-title black-text">${t.name}</span>
            </div>
            <div class="card-content black-text">
              <div class="row">
                <div class="col sm12 m6">
                  <p>Nama : ${t.name}</p>
                  <p>Didirikan : ${t.founded}</p>
                  <p>Alamat : ${t.address}</p>
                  <p>Email : ${t.email}</p>
                  <p>Telepon : ${t.founded}</p>
                </div>
                <div class="col sm12 m6">
                  <p>Markas Besar : ${t.venue}</p>
                  <p>Warna Klub : ${t.clubColors}</p>
                  <p>Website : ${t.website}</p>
                </div>
              </div>
            </div>
            <div class="card-action">
              <a href="#team?id=${t.id}" class="waves-effect waves-light btn team-detail"> Detail Tim</a>
            </div>
          </div>
        </div>
      </div>
    `
  })

  document.getElementById('teams').innerHTML = html
  onClick('.team-detail')
}

function buildTeamById (t) {
  let teamMember = ''
  t.squad.forEach(s => {
    teamMember += `
      <tr>
        <td>${s.role === 'PLAYER' ? s.position : s.role}</td>
        <td>${s.name}</td>
        <td>${s.nationality}</td>
        <td>${age(s.dateOfBirth)} Tahun</td>
      <tr>
    `
  })
  const html = `
    <div class="row">
      <div class="col s12 m12">
        <div class="card">
          <div class="card-image grey lighten-4">
            <img src="${t.crestUrl}" class="teams-card">
            <span class="card-title black">${t.name}</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red" id="favorite"><i class="material-icons">favorite</i></a>
          </div>
          <div class="card-content">
            <div class="row">
              <div class="col sm12 m6">
                <p>Nama : ${t.name}</p>
                <p>Didirikan : ${t.founded}</p>
                <p>Alamat : ${t.address}</p>
                <p>Email : ${t.email}</p>
                <p>Telepon : ${t.founded}</p>
              </div>
              <div class="col sm12 m6">
                <p>Markas Besar : ${t.venue}</p>
                <p>Warna Klub : ${t.clubColors}</p>
                <p>Website : ${t.website}</p>
              </div>
            </div>
            <div class="row">
              <div class="col s12 m12">
                <table class="responsive-table">
                  <thead>
                    <tr>
                      <th>Posisi</th>
                      <th>Nama</th>
                      <th>Kebangsaan</th>
                      <th>Usia</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${teamMember}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  document.getElementById('detail-team').innerHTML = html
  onFavorite('favorite', t)
}

function buildTableKlasemen (data, pos) {
  let tbody = ''
  const standings = data.standings[0]
  standings.table.forEach(t => {
    tbody += `
      <tr>
        <td>${t.position}</td>
        <td> <a href="#team?id=${t.team.id}" class="team-detail"><img src="${t.team.crestUrl}" class="small-teams-card"> ${t.team.name}</a></td>
        <td>${t.playedGames}</td>
        <td>${t.won}</td>
        <td>${t.draw}</td>
        <td>${t.lost}</td>
        <td>${t.goalsFor}</td>
        <td>${t.goalsAgainst}</td>
        <td>${t.goalDifference}</td>
        <td>${t.points}</td>
      <tr>
    `
  })
  document.getElementById(`klasemen-${pos}`).innerHTML = tbody
  onClick('.team-detail')
}

/* eslint-disable-next-line no-unused-vars */
function getSavedTeams () {
  getAll() // eslint-disable-line no-undef
    .then(teams => {
      let html = ''
      teams.forEach(t => {
        html += `
          <div class="row">
            <div class="col s12 m12">
              <div class="card">
                <div class="card-image grey lighten-4">
                  <img src="${t.crestUrl}" class="teams-card">
                  <span class="card-title black-text">${t.name}</span>
                </div>
                <div class="card-content black-text">
                  <div class="row">
                    <div class="col sm12 m6">
                      <p>Nama : ${t.name}</p>
                      <p>Didirikan : ${t.founded}</p>
                      <p>Alamat : ${t.address}</p>
                      <p>Email : ${t.email}</p>
                      <p>Telepon : ${t.founded}</p>
                    </div>
                    <div class="col sm12 m6">
                      <p>Markas Besar : ${t.venue}</p>
                      <p>Warna Klub : ${t.clubColors}</p>
                      <p>Website : ${t.website}</p>
                    </div>
                  </div>
                </div>
                <div class="card-action">
                  <a href="#team?id=${t.id}&saved=true" class="waves-effect waves-light btn team-detail"> Detail Tim</a>
                </div>
              </div>
            </div>
          </div>
        `
      })

      document.getElementById('favorite-teams').innerHTML = html
      onClick('.team-detail')
    })
}

/* eslint-disable-next-line no-unused-vars */
function getKlasemen (pos) {
  if ('caches' in window) {
    caches.match(`${BASEURL}v2/competitions/2021/standings`).then(response => {
      if (response) {
        response.json().then(data => {
          buildTableKlasemen(data, pos)
        })
      }
    })
  }

  fetch(`${BASEURL}v2/competitions/2021/standings`, {
    method: 'GET',
    headers: HEADERS
  }).then(status)
    .then(json)
    .then(data => {
      buildTableKlasemen(data, pos)
    })
    .catch(error)
}

/* eslint-disable-next-line no-unused-vars */
function getTeams () {
  if ('caches' in window) {
    caches.match(`${BASEURL}v2/competitions/2021/teams`).then(response => {
      if (response) {
        response.json().then(data => {
          buildTeams(data)
        })
      }
    })
  }

  fetch(`${BASEURL}v2/competitions/2021/teams`, {
    method: 'GET',
    headers: HEADERS
  }).then(status)
    .then(json)
    .then(data => {
      buildTeams(data)
    })
    .catch(error)
}

function getTeamByIndexedDb (id) {
  getIndexedId(id) // eslint-disable-line no-undef
    .then(t => {
      let teamMember = ''
      t.squad.forEach(s => {
        teamMember += `
          <tr>
            <td>${s.role === 'PLAYER' ? s.position : s.role}</td>
            <td>${s.name}</td>
            <td>${s.nationality}</td>
            <td>${age(s.dateOfBirth)} Tahun</td>
          <tr>
        `
      })
      const html = `
        <div class="row">
          <div class="col s12 m12">
            <div class="card">
              <div class="card-image grey lighten-4">
                <img src="${t.crestUrl}" class="teams-card">
                <span class="card-title black">${t.name}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red" id="favorite"><i class="material-icons">delete</i></a>
              </div>
              <div class="card-content">
                <div class="row">
                  <div class="col sm12 m6">
                    <p>Nama : ${t.name}</p>
                    <p>Didirikan : ${t.founded}</p>
                    <p>Alamat : ${t.address}</p>
                    <p>Email : ${t.email}</p>
                    <p>Telepon : ${t.founded}</p>
                  </div>
                  <div class="col sm12 m6">
                    <p>Markas Besar : ${t.venue}</p>
                    <p>Warna Klub : ${t.clubColors}</p>
                    <p>Website : ${t.website}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 m12">
                    <table class="responsive-table">
                      <thead>
                        <tr>
                          <th>Posisi</th>
                          <th>Nama</th>
                          <th>Kebangsaan</th>
                          <th>Usia</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${teamMember}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `

      document.getElementById('detail-team').innerHTML = html
      onRemoveFavorite('favorite', t)
    })
}

function getTeamByFetchOrCache (id) {
  if ('caches' in window) {
    caches.match(`${BASEURL}v2/teams/${id}`).then(response => {
      if (response) {
        response.json().then(t => {
          buildTeamById(t)
        })
      }
    })
  }

  fetch(`${BASEURL}v2/teams/${id}`, {
    method: 'GET',
    headers: HEADERS
  }).then(status)
    .then(json)
    .then(t => {
      buildTeamById(t)
    })
    .catch(error)
}

/* eslint-disable-next-line no-unused-vars */
function getTeamById (id) {
  const teamIdSaved = id.split('&')
  const teamId = teamIdSaved[0]

  if (teamIdSaved[1] !== undefined) { // kita ambil dari indexed db
    getTeamByIndexedDb(teamId)
  } else { // karena bisa jadi ini dari tabel klasemen
    getTeamByFetchOrCache(teamId)
  }
}
