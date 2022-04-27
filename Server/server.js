const express = require('express');
const axios = require('axios');
const app = express();
const path = require("path");

const appID = '{208217638ad90a1c}';
const apiKey = '{1e559c254d43bdd5f3ff7edd103ed637fe630ff3}';
const agentUID = '{ecommence-agent}';

const url = '{https://app.cometchat.com/app/208217638ad90a1c}';

const headers = {
  'Content-Type': 'application/json',
  appid: appID,
  apikey: apiKey,
};

app.get('/api/create', (req, res) => {
  const data = {
    uid: new Date().getTime(),
    name: 'customer',
  };
  axios
    .post(`${url}/users`, JSON.stringify(data), {
      headers,
    })
    .then(response => {
      requestAuthToken(response.data.data.uid)
        .then(token => {
          console.log('Success:' + JSON.stringify(token));
          res.json(token);
        })
        .catch(error => console.error('Error: requestAuthToken', error));
    })
    .catch(error => console.error('Error: post', error));
});

app.get('/api/auth', (req, res) => {
  const uid = req.query.uid;
  requestAuthToken(uid)
    .then(token => {
      console.log('Success:' + JSON.stringify(token));
      res.json(token);
    })
    .catch(error => console.error('Error:', error));
});

const requestAuthToken = uid => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/users/${uid}/auth_tokens`, null, {
        headers,
      })
      .then(response => {
        console.log('New Auth Token:', response.data);
        resolve(response.data.data);
      })
      .catch(error => reject(error));
  });
};

app.get('/api/users', (req, res) => {
  axios
    .get(`${url}/users`, {
      headers,
    })
    .then(response => {
      const { data } = response.data;
      const filterAgentData = data.filter(data => {
        return data.uid !== agentUID;
      });
      res.json(filterAgentData);
    })
    .catch(error => console.error('Error:', error));
});

const publicPath = path.join(__dirname,"../build");


const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req,res) =>{
  res.sendFile(path.join(publicPath,'../src/index.js'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});