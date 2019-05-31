const displayHeader = () => {
  const header = document.querySelector('header'); 
  header.innerHTML = `<h1>Testing Node.js Express</h1>`;
};

const displayMain = () => {
  const header = document.querySelector('main'); 
  header.innerHTML = `<h3>Lots of stuff Lots of stuff Lots of stuff 
  Lots of stuff Lots of stuff Lots of stuff Lots of stuff Lots of stuff
  Lots of stuff Lots of stuff Lots of stuff Lots of stuff Lots of stuff
  Lots of stuff Lots of stuff Lots of stuff Lots of stuff Lots of stuff
  Lots of stuff Lots of stuff Lots of stuff Lots of stuff Lots of stuff
  Lots of stuff Lots of stuff Lots of stuff Lots of stuff Lots of stuff
  Lots of stuff Lots of stuff Lots of stuff Lots of stuff Lots of stuff
  Lots of stuff Lots of stuff Lots of stuff Lots of stuff Lots of stuff
  </h3>`;
};

const displayFooter = () => {
  const header = document.querySelector('footer'); 
  header.innerHTML = `<h1>Super Awesome Footer</h1>`;
};
  
displayHeader();
displayMain();
displayFooter();