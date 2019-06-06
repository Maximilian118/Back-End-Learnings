const twitter = require('./twit-auth');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Twitter Bot is starting...');

const post = (text) => {
  twitter.post('statuses/update', {status: text}, err => {
    if (text == '') {
      return;
    } else if (err) {
      if (err.message = 'Status is a duplicate.') {
        console.log("You've just Tweeted that you big dumb dumb...");
      } else {
        console.log(err);
      }
    } else {
      console.log(`Tweet Posted: ${text}`);
    };
  });
};

const get = (search, quantity) => {
  twitter.get('search/tweets', {q: search, count: quantity}, (err, data) => {
    if (search == '') {
      return;
    } else if (quantity > 100) {
      console.log("I'm not searching that many...");
    } else if (err) {
      console.log(err)
    } else {
      console.log('Searching Twitter...')
      const tweets = data.statuses;
      tweets.forEach((tweet) => console.log(tweet.text))
    };
  });
};

const ui = () => {
  readline.question(`Post or Search? `, (answer) => {
    if (answer == 'post' || answer == 'Post' || answer == 'p' || answer == 'P') {
      const tweet = () => {
        readline.question(`What would you like to post? `, (p) => {
          post(p);
          const again = () => {
            readline.question(`Post again? `, (a) => {
              if (a == 'yes' || a == 'Yes' || a == 'y' || a == 'Y') {
                tweet();
              } else if (a == 'no' || a == 'No' || a == 'n' || a == 'N') {
                readline.close();
              } else {
                console.log("I'm sorry. I don't understand. Try saying 'Yes' or 'No'.");
                setTimeout(() => {again()}, 1000);
              }
            });
          };
          setTimeout(() => {again()}, 1000);
        });
      };
      tweet();
    } else if (answer == 'search' || answer == 'Search' || answer == 's' || answer == 'S') {
      const search = () => {
        readline.question(`What would you like to search? `, (s) => {
          readline.question(`How many would you like? `, (q) => {
            get(s, q);
            const sAgain = () => {
              readline.question(`Search again? `, (s) => {
                if (s == 'yes' || s == 'Yes' || s == 'y' || s == 'Y') {
                  search();
                } else if (s == 'no' || s == 'No' || s == 'n' || s == 'N') {
                  readline.close();
                } else {
                  console.log("I'm sorry. I don't understand. Try saying 'Yes' or 'No'.");
                  setTimeout(() => {sAgain()}, 1000);
                }
              });
            };
            setTimeout(() => {sAgain()}, 1000);
          });
        });
      };
      search();
    } else {
      console.log("I'm sorry. I don't understand. Try saying 'Post' or 'Search'.");
      ui();
    }
  });
};

ui();