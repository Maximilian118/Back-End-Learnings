const promisePosts = [
  { title: 'Promise post No.1!', body: 'This is the first promise post'},
  { title: 'Promise post No.2!', body: 'This is the second promise post'}
]

const getPromisePosts = () => {
  setTimeout(() => {
    let output = '';
    promisePosts.forEach(post => {
      output += `<h1>${post.title}</h1>`
    });
    document.body.innerHTML += output;
  }, 1000);
};

const createPromisePost = post => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promisePosts.push(post)

      const err = false;

      if (!err) {
        resolve();
      } else {
        reject(`Error`);
      }
    }, 2000);
  });
};

createPromisePost({ title: 'Promise post No.3!', body: 'This is the third promise post'})
  .then(getPromisePosts).catch(res => console.log(res));

// Promise.all
const promise1 = Promise.resolve('Hello World!');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'Goodbye'));
const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json(''))

Promise.all([promise1, promise2, promise3, promise4]).then(values => console.log(values));