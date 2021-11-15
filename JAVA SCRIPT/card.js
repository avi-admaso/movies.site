let x = "https://moviesmern.herokuapp.com/movies/all";

async function moviesApi() {
  try {
    return await fetch(x)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.data;
      });
  } catch (err) {
    return err;
  }
}
moviesApi()
  .then((res) => {
    showTheMovies(res);
  })
  .catch((rej) => {
    console.log(rej);
  });
function showTheMovies(x) {
  for (const details of x) {
    container.innerHTML += `<div id="theCards"><h2 id = "nameHeadLine" >${details.movieName}</h2><button id="infoBtn">More Info</button>
    <button onclick ="deleteMovie('${details._id}')" id="deleteBtn">Delete</button>
    <img id="imgCard" src = "${details.image}"width = "150px"><p id="ratingNum" >${details.rating}</p></div>`;
  }
}

///////////ORDER THE MOVIES///////////
///////////ORDER BY DATE///////////
function orderByDate(x) {
  x.sort((a, b) => a.date - b.date);
  for (const details of x) {
    container.innerHTML += `<div id="theCards"><h2 id = "nameHeadLine" >${details.movieName}</h2>
      <img id="imgCard" src = "${details.image}"width = "150px"><p id="ratingNum" >${details.rating}</p></div>`;
  }
}
///////////ORDER BY NAME///////////
function orderByName(x) {
  x.sort((a, b) => a.movieName - b.movieName);
  for (const details of x) {
    container.innerHTML += `<div id="theCards"><h2 id = "nameHeadLine" >${details.movieName}</h2>
      <img id="imgCard" src = "${details.image}"width = "150px"><p id="ratingNum" >${details.rating}</p></div>`;
  }
}

///////////ORDER BY RATING///////////

function orderByRating(x) {
  x.sort((a, b) => a.rating - b.rating).reverse();
  for (const details of x) {
    container.innerHTML += `<div id="theCards"><h2 id = "nameHeadLine" >${details.movieName}</h2>
      <img id="imgCard" src = "${details.image}"width = "150px"><p id="ratingNum" >${details.rating}</p></div>`;
  }
}

function showGif(){
  theGif.style.display = "block"
}
function hideGif(){
  theGif.style.display = "none"
}
document.getElementById("rating");
document.getElementById("movieName");
document.getElementById("userSelect");
document.getElementById("_id");
document.getElementById("searchBtn");

orderBtn.onclick = function () {
  container.innerHTML = "";
  showGif()
  setTimeout(()=>{
    hideGif()
  switch (userSelect.value) {
    case "movieName":
      moviesApi(x.data);
      break;
    case "rating":
      
      moviesApi(x.data)
        .then((res) => {
          orderByRating(res)
          
          
        })
        .catch((rej) => {
          console.log(rej);
        });

      break;
    case "date":
      container.innerHTML = "";
      moviesApi(x.data)
        .then((res) => {
          orderByDate(res);
          console.log(res);
        })
        .catch((rej) => {
          console.log(rej);
        });
      console.log(res);
      break;
  } },3000)
};
////////////////THE DELETE////////////////////////

function deleteMovie(theId) {
  let options = {
    method: "DELETE",
  };

  let theUrl = "https://moviesmern.herokuapp.com/movies/movie";

  deleteTheMovie = async () => {
    try {
      return await fetch(`${theUrl}/${theId}`, options).then((res) =>
        res.json()
      );
    } catch (err) {
      return err;
    }
  };

  deleteTheMovie().then((data) => console.log(data));
}
