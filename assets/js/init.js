/* global M, getKlasemen, getTeams, getTeamById, getSavedTeams */
function loadPage (pos, id = null) {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function ors () {
    if (this.readyState === 4) {
      const content = document.querySelector('#body-content')
      if (this.status === 200) {
        if (pos === 'beranda') {
          getKlasemen('beranda')
        } else if (pos === 'klasemen') {
          getKlasemen('klasemen')
        } else if (pos === 'teams') {
          getTeams()
        } else if (pos === 'team') {
          getTeamById(id)
        } else if (pos === 'favorite') {
          getSavedTeams()
        }
        content.innerHTML = xhttp.responseText
      } else if (this.status === 404) {
        content.innerHTML = '<p>Halaman tidak ditemukan.</p>'
      } else {
        content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>'
      }
    }
  }
  xhttp.open('GET', `pages/${pos}.html`, true)
  xhttp.send()
}

function loadNav () { // eslint-disable-line no-unused-vars
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function ors () {
    if (this.readyState === 4) {
      if (this.status !== 200) return

      // Muat daftar tautan menu
      document.querySelectorAll('.topnav, .sidenav').forEach(elm => {
        elm.innerHTML = xhttp.responseText
      })
      // Daftarkan event listener untuk setiap tautan menu
      document.querySelectorAll('.sidenav a, .topnav a').forEach(elm => {
        elm.addEventListener('click', event => {
          // Tutup sidenav
          const sidenav = document.querySelector('.sidenav')
          M.Sidenav.getInstance(sidenav).close()
          const loadedPage = event.target.getAttribute('href').substr(1)
          loadPage(loadedPage)
        })
      })
    }
  }
  xhttp.open('GET', 'components/nav.html', true)
  xhttp.send()
}

function urlBase64ToUint8Array (base64String) { // eslint-disable-line no-unused-vars
  const padding = '='.repeat((4 - base64String.length % 4) % 4) // eslint-disable-line no-mixed-operators
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) { // eslint-disable-line no-plusplus
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
