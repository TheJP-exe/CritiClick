const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = '';

const reviewsContainer = document.getElementById("section");
const movieTitleHeading = document.getElementById("title");

movieTitleHeading.innerText = movieTitle;

const newReviewCard = document.createElement('div');
newReviewCard.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          New Review
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review', 'new_user')">Save</a>
          </p>
      </div>
    </div>
  </div>
`;
reviewsContainer.appendChild(newReviewCard);

returnReviews(APILINK);

function returnReviews(url) {
  fetch(url + "movie/" + movieId)
    .then(res => res.json())
    .then(function(data) {
      console.log(data);
      data.forEach(reviewElement => {
        const reviewCard = document.createElement('div');
        reviewCard.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card" id="${reviewElement._id}">
                <p><strong>Review: </strong>${reviewElement.review}</p>
                <p><strong>User: </strong>${reviewElement.user}</p>
                <p><a href="#" onclick="editReview('${reviewElement._id}','${reviewElement.review}', '${reviewElement.user}')">Edit</a> <a href="#" onclick="deleteReview('${reviewElement._id}')">Delete</a></p>
              </div>
            </div>
          </div>
        `;
        reviewsContainer.appendChild(reviewCard);
      });
    });
}

function editReview(id, reviewText, reviewUser) {
  const card = document.getElementById(id);
  const reviewInputId = "review" + id;
  const userInputId = "user" + id;

  card.innerHTML = `
    <p><strong>Review: </strong>
      <input type="text" id="${reviewInputId}" value="${reviewText}">
    </p>
    <p><strong>User: </strong>
      <input type="text" id="${userInputId}" value="${reviewUser}">
    </p>
    <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')"> Save</a></p>
  `;
}

function saveReview(reviewInputId, userInputId, id = "") {
  const reviewText = document.getElementById(reviewInputId).value;
  const reviewUser = document.getElementById(userInputId).value;

  if (id) {
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": reviewUser, "review": reviewText })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        location.reload();
      });
  } else {
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": reviewUser, "review": reviewText, "movieId": movieId })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        location.reload();
      });
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res);
      location.reload();
    });
}
