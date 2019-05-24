const url = require('url');

const myUrl = new URL('http://mynewsite.com:8000/hello.html?id=100&status=active');

console.log(`URL: ${myUrl.href}`);
console.log(`Host: ${myUrl.host}`);
console.log(`Hostname: ${myUrl.hostname}`);
console.log(`Pathname: ${myUrl.pathname}`);
console.log(`Serialized Query: ${myUrl.search}`);
console.log(`Params: ${myUrl.searchParams}`);

myUrl.searchParams.append('abc', '123') // append to url
console.log(`Params: ${myUrl.searchParams}`);

myUrl.searchParams.forEach((value, name) => {
  console.log(`${name}: ${value}`);
});