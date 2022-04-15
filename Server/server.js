const express = require('express');
const axios = require('axios');
const app = express();
const path = require("path");

const appID = '{207431578c11ee0f}';
const apiKey = '{327b4def648bf619f2079a54b22723f57607188b}';
const agentUID = '{supportshop}';

const url = '{https://app.cometchat.com/app/207431578c11ee0f}';

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