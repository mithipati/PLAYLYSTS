
const express = require('express');
const axios = require('axios');
const parseURL = require('url-parse');

const logger = require('../../logger');
const SOUNDCLOUD_CLIENT_ID = require('../../../internals/secret').SOUNDCLOUD_CLIENT_ID;
const GOOGLE_API_KEY = require('../../../internals/secret').GOOGLE_API_KEY;

const router = express.Router();

axios.defaults.headers.common['Referer'] = 'localhost';

router.get('/parse/soundcloud', (req, res) => {
  const requestURL = `http://api.soundcloud.com/resolve?url=${req.query.track}&client_id=${SOUNDCLOUD_CLIENT_ID}`;
  axios.get(requestURL)
    .then(track => {
      res.json({ data: track.data });
    })
    .catch(error => {
      logger.error(error);
      res.status(400).end();
    });
});

router.get('/parse/youtube', (req, res) => {
  const parsedTrackURL = parseURL(req.query.track, true);

  if (!parsedTrackURL.query.hasOwnProperty('v')) {
    res.status(400).end();
  }
  const videoID = parsedTrackURL.query.v;

  const requestURL = 'https://www.googleapis.com/youtube/v3/videos?' +
    `part=snippet%2CcontentDetails&id=${videoID}&key=${GOOGLE_API_KEY}`;
  axios.get(requestURL)
    .then(track => {
      res.json({ data: track.data.items[0] });
    })
    .catch(error => {
      logger.error(error);
      res.status(400).end();
    });
});

module.exports = router;
