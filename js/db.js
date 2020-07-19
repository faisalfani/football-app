let dbPromised = idb.open("premier", 1, (upgradeDb) => {
  let favteamOS = upgradeDb.createObjectStore("favteam", {
    keyPath: "id",
  });
  favteamOS.createIndex("teamName", "teamName", { unique: true });
});

const addFav = (data) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("favteam", "readwrite");
      let store = tx.objectStore("favteam");
      store.add(data);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: `<strong>${data.name} has been saved</strong><button onClick="delFav(${data.id})" class="btn-flat toast-action pink-text"><i class="material-icons">undo</i>&nbsp;&nbsp;undo</button>`,
        classes: "green lighten-3 green-text text-darken-4",
      });
    })
    .catch(() => {
      M.toast({
        html: `<strong>${data.name} already exists</strong>`,
        classes: "pink lighten-4 brown-text",
      });
    });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("favteam", "readwrite");
        let store = tx.objectStore("favteam");
        return store.getAll();
      })
      .then((datas) => {
        resolve(datas);
      });
  });
};

const delFav = (id) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("favteam", "readwrite");
      let store = tx.objectStore("favteam");
      store.delete(id.toString());
      return tx.complete;
    })
    .then(() => {
      getFavTeam();
      M.toast({
        html: `<strong>Team remove from favourite</strong>`,
        classes: "yellow lighten-2 orange-text text-darken-4",
      });
      console.log("item terhapus");
    });
};
