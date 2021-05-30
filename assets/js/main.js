/* global loadNav, loadPage, M */
document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.sidenav')
  M.Sidenav.init(elems)
  document.getElementById('logo-container').addEventListener('click', event => {
    const loadedPage = event.target.getAttribute('href').substr(1)
    loadPage(loadedPage)
  })

  const location = window.location.hash.split('?')
  let page = location[0].substr(1)
  const number = location[1] !== undefined ? location[1].substr(3) : undefined
  if (page === '') page = 'beranda'
  loadNav()
  loadPage(page, number)
})
