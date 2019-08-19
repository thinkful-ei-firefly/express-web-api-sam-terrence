const express = require('express');

const app = express();

app.get('/sum', (req, res) => {
  const { a, b } = req.query;
  res.send(`The sum of ${a} and ${b} is ${parseInt(a)+parseInt(b)}`);
})

app.get('/cipher', (req, res) => {
  const {text, shift} = req.query;
  const charCodes = [];
  for (let i=0; i<text.length; i++) {
    charCodes.push(text.charCodeAt(i)+parseInt(shift))
  }
  const coded = charCodes.map(item => String.fromCharCode(item));
  res.send(coded.join(''));
})

app.get('/lotto', (req, res) => {
  const objKeys = Object.keys(req.query);
  const objKey = objKeys[0];
  const nums = req.query[objKey];
  function randomNumsGen() {
    const nums = [];
    for (let i=0; i<6; i++) {
      nums.push(Math.floor(Math.random() * 20) + 1);
    }
    return nums;
  }
  const winningNumbers = randomNumsGen();
  const matchingNumbers = nums.filter(element => winningNumbers.includes(parseInt(element)));

  let response = 'error'

  if (nums.length !== 6) {
    response = 'Submit 6 numbers'
  } else if (matchingNumbers.length < 4) {
    response = 'Sorry, you lose'
  } else if (matchingNumbers.length === 4) {
    response = 'Congratulations, you win a free ticket'
  } else if (matchingNumbers.length === 5) {
    response = 'Congratulations! You win $100!'
  } else if (matchingNumbers.length === 6) {
    response = 'Wow! Unbelievable! You could have won the mega millions!'
  }
  res.send(response);
})

app.listen(8080, () => console.log('listening'));