/* global M */
// eslint-disable-next-line no-undef
const dbPromise = idb.openDB('football-data', 1, {
  upgrade (db) {
    const store = db.createObjectStore('teams', { keyPath: 'id', unique: true })
    store.createIndex('name', 'name')
    store.createIndex('id', 'id')
  }
})

// eslint-disable-next-line no-unused-vars
function saveTeam (team) {
  dbPromise
    .then(db => {
      const tx = db.transaction('teams', 'readwrite')
      const store = tx.objectStore('teams')
      store.add(team)
      return tx.complete
    })
    .then(() => {
      M.toast({ html: 'Tim Disimpan' })
    })
    .catch(err => {
      M.toast({ html: err })
    })
}

// eslint-disable-next-line no-unused-vars
function removeTeam (team) {
  dbPromise
    .then(db => {
      const tx = db.transaction('teams', 'readwrite')
      const store = tx.objectStore('teams')
      store.delete(parseInt(team.id, 10))
      return tx.complete
    })
    .then(() => {
      M.toast({ html: 'Tim Dihapus' })
    })
}

// eslint-disable-next-line no-unused-vars
function getAll () {
  return new Promise((resolve, reject) => {
    dbPromise
      .then(db => {
        const tx = db.transaction('teams', 'readonly')
        const store = tx.objectStore('teams')
        return store.getAll()
      })
      .then(teams => {
        resolve(teams)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// eslint-disable-next-line no-unused-vars
function getIndexedId (id) {
  return new Promise((resolve, reject) => {
    dbPromise
      .then(db => {
        const tx = db.transaction('teams', 'readonly')
        const store = tx.objectStore('teams')
        return store.get(parseInt(id, 10))
      })
      .then(team => {
        resolve(team)
      })
      .catch(err => {
        reject(err)
      })
  })
}
