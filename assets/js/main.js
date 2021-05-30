document.addEventListener('DOMContentLoaded', () => {
  function loadPage (pos) {
    console.log(pos) // eslint-disable-line no-console
    if (pos === 'pesan') {
      document.getElementById('shopping').parentElement.style.visibility = 'hidden'
    } else {
      document.getElementById('shopping').parentElement.style.visibility = 'visible'
    }
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function ors () {
      if (this.readyState === 4) {
        const content = document.querySelector('#body-content')
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText
          const selectIcons = document.querySelectorAll('select')
          M.FormSelect.init(selectIcons) // eslint-disable-line no-undef
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

  function loadNav () {
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
            M.Sidenav.getInstance(sidenav).close() // eslint-disable-line no-undef
            // Muat konten halaman yang dipanggil
            const loadedPage = event.target.getAttribute('href').substr(1)
            loadPage(loadedPage)
          })
        })
      }
    }
    xhttp.open('GET', 'components/nav.html', true)
    xhttp.send()
  }
  // Activate sidebar nav
  const elems = document.querySelectorAll('.sidenav')
  M.Sidenav.init(elems) // eslint-disable-line no-undef
  document.getElementById('logo-container').addEventListener('click', event => {
    const loadedPage = event.target.getAttribute('href').substr(1)
    loadPage(loadedPage)
  })
  document.getElementById('shopping').addEventListener('click', event => {
    const loadedPage = event.target.parentNode.getAttribute('href').substr(1)
    loadPage(loadedPage)
  })

  let page = window.location.hash.substr(1)
  if (page === '') page = 'beranda'
  console.log(page) // eslint-disable-line no-console
  loadNav()
  loadPage(page)
})
