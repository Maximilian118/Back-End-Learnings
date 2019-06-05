const asyncPosts = [
  { title: 'Async post No.1!', body: 'This is the first async post'},
  { title: 'Async post No.2!', body: 'This is the second async post'}
]

const getAsyncPosts = () => {
  setTimeout(() => {
    let output = '';
    asyncPosts.forEach(post => {
      output += `<h2>${post.title}</h2>`
    });
    document.body.innerHTML += output;
  }, 1000);
};

const createAsyncPost = post => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      asyncPosts.push(post)

      const err = false;

      if (!err) {
        resolve();
      } else {
        reject(`Error`);
      }
    }, 2000);
  });
};

// async / await
const init = async () => {
  await createAsyncPost({ title: 'Async post No.3!', body: 'This is the second async post'});

  getAsyncPosts();
};

init();

// async / await / fetch
const fetchUsers = async () => {
const res = await fetch('https://jsonplaceholder.typicode.com/users');

const data = await res.json();

console.log(data);
};

fetchUsers();
