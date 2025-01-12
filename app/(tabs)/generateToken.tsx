import jwt from 'jsonwebtoken';

const payload = {
  mode: 'embedded',
  origin: 'http://localhost:8081',
};

const token = jwt.sign(payload, 'c8436ccaec144269a4535a3cbfb601b1', {
  issuer: '6783652c59c0ed0a63cd6024',
});

console.log(token);