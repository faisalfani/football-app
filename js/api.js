const base_url = "https://api.football-data.org/v2/competitions/2021/";
const options = {
  headers: {
    "X-Auth-token": "5bcb794019d84ae69b6e136e8603025e",
  },
};

const status = (res) => {
  if (res.status !== 200) {
    console.log("error " + res.status);
    return Promise.reject(new Error(response.statusText()));
  } else {
    return Promise.resolve(res);
  }
};

const json = (res) => {
  return res.json();
};

const error = (err) => {
  console.error(err);
};

const getStandings = () => {
  if ("caches" in window) {
    caches.match(base_url + "standings").then((response) => {
      if (response) {
        response.json().then((jsonData) => {
          let tBody = document.getElementById("tbody");
          let standings = jsonData.standings[0].table;
          let table = "";
          standings.forEach((data) => {
            table += `
              <tr>
              <td width="17" class="center-align">
                <strong>${data.position}.</strong>
              </td>
              <td width="40">
                <div class="center-align">
                  <img src="${data.team.crestUrl.replace(
                    /^http:\/\//i,
                    "https://"
                  )}" height="30" />
                </div>
              </td>
              <td class="hide-on-small-only"><strong>${
                data.team.name
              }</strong></td>
              <td>${data.won} time</td>
              <td>${data.draw} time</td>
              <td>${data.lost} time</td>
              <td style="color : #3B1859"><strong>${
                data.points
              } pts</strong></td>
            </tr>
              `;
          });
          tBody.innerHTML = table;
        });
      }
    });
  }

  fetch(base_url + "standings", options)
    .then(status)
    .then(json)
    .then((jsonData) => {
      let tBody = document.getElementById("tbody");
      let standings = jsonData.standings[0].table;
      let table = "";
      standings.forEach((data) => {
        table += `
          <tr>
          <td width="17" class="center-align">
            <strong>${data.position}.</strong>
          </td>
          <td width="40">
            <div class="center-align">
              <img src="${data.team.crestUrl.replace(
                /^http:\/\//i,
                "https://"
              )}" height="30" />
            </div>
          </td>
          <td class="hide-on-small-only"><strong>${data.team.name}</strong></td>
          <td>${data.won} time</td>
          <td>${data.draw} time</td>
          <td>${data.lost} time</td>
          <td style="color : #3B1859"><strong>${data.points} pts</strong></td>
        </tr>
          `;
      });
      tBody.innerHTML = table;
    })
    .catch(error);
};

const getHallOfFame = () => {
  if ("caches" in window) {
    caches.match(base_url + "scorers").then((response) => {
      if (response) {
        response.json().then((jsonData) => {
          const datas = jsonData.scorers;
          const tbody = document.getElementById("tbody");
          let no = 1;
          let table = "";
          datas.forEach((data) => {
            table += `
              <tr>
                <td  class="center-align">
                  <strong>${no++}.</strong>
                </td>
                <td >
                  ${data.player.name}
                </td>
                <td>${data.team.name} time</td>
                <td style="color : #3B1859"><strong>${
                  data.numberOfGoals
                } </strong></td>
              </tr>`;
          });
          tbody.innerHTML = table;
        });
      }
    });
  }

  fetch(base_url + "scorers", options)
    .then(status)
    .then(json)
    .then((jsonData) => {
      const datas = jsonData.scorers;
      const tbody = document.getElementById("tbody");
      let no = 1;
      let table = "";
      datas.forEach((data) => {
        table += `
        <tr>
          <td  class="center-align">
            <strong>${no++}.</strong>
          </td>
          <td >
            ${data.player.name}
          </td>
          <td>${data.team.name} time</td>
          <td style="color : #3B1859"><strong>${
            data.numberOfGoals
          } </strong></td>
        </tr>`;
      });
      tbody.innerHTML = table;
    });
};

export { getStandings, getHallOfFame };
