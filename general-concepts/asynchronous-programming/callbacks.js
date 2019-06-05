const callbackPosts = [
  { title: 'Callback post No.1!', body: 'This is the first callback post'},
  { title: 'Callback post No.2!', body: 'This is the second callback post'}
]

const getCallbackPosts = () => {
  setTimeout(() => {
    let output = '';
    callbackPosts.forEach((post, index) => {
      output += `<h6>${post.title}</h6>`
    });
    document.body.innerHTML += output;
  }, 1000);
};

const createCallbackPost = (post, callback) => {
  setTimeout(() => {
    callbackPosts.push(post)
    callback();
  }, 2000);
};

createCallbackPost({ title: 'Callback post No.3!', body: 'This is the third callback post'}, getCallbackPosts);