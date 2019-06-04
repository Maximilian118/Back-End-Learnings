const someAPI = 'someAPI_URL';

const setup = () => {
  let promise = fetch(someAPI);
  promise.then(data => console.log(data));
  promise.catch(err => console.log(err));
};

// Chained
const setupTwo = () => {
  fetch(someAPI)
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

// With JSON conversion
const setupTwo = () => {
  fetch(someAPI)
    .then(data => data.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};