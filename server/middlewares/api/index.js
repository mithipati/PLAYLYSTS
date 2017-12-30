
const express = require('express');
const axios = require('axios');
const queryString = require('query-string');

const logger = require('../../logger');

const SOUNDCLOUD_CLIENT_ID = require('../../../internals/secret').SOUNDCLOUD_CLIENT_ID;
const SOUNDCLOUD_TRACK_ENDPOINT = require('./constants').SOUNDCLOUD_TRACK_ENDPOINT;
const YOUTUBE_API_KEY = require('../../../internals/secret').YOUTUBE_API_KEY;
const YOUTUBE_TRACK_ENDPOINT = require('./constants').YOUTUBE_TRACK_ENDPOINT;
const SPOTIFY_OAUTH_CODE_ENDPOINT = require('./constants').SPOTIFY_OAUTH_CODE_ENDPOINT;
const SPOTIFY_OAUTH_TOKEN_ENDPOINT = require('./constants').SPOTIFY_OAUTH_TOKEN_ENDPOINT;
const SPOTIFY_OAUTH_REDIRECT_URI = require('./constants').SPOTIFY_OAUTH_REDIRECT_URI;
const SPOTIFY_CLIENT_ID = require('../../../internals/secret').SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = require('../../../internals/secret').SPOTIFY_CLIENT_SECRET;

const router = express.Router();

axios.defaults.headers.common['Referer'] = 'http://localhost:3000';

router.get('/parse/soundcloud', (req, res) => {
  axios.get(SOUNDCLOUD_TRACK_ENDPOINT, {
    params: {
      url: req.query.trackURL,
      client_id: SOUNDCLOUD_CLIENT_ID
    }
  })
    .then(track => {
      res.json({ data: track.data });
    })
    .catch(error => {
      logger.error(error);
      res.status(400).end();
    });
});

router.get('/parse/youtube', (req, res) => {
  const params = queryString.parse(queryString.extract(req.query.trackURL));

  if (!params.v) {
    res.status(400).end();
  }
  const videoID = params.v;

  axios.get(YOUTUBE_TRACK_ENDPOINT, {
    params: {
      part: 'snippet%2CcontentDetails',
      id: videoID,
      key: YOUTUBE_API_KEY
    }
  })
    .then(track => {
      res.json({ data: track.data.items[0] });
    })
    .catch(error => {
      logger.error(error);
      res.status(400).end();
    });
});

router.get('/oauth/spotify', (req, res) => {
  const redirectURL = (
    SPOTIFY_OAUTH_CODE_ENDPOINT +
    queryString.stringify({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: SPOTIFY_OAUTH_REDIRECT_URI,
      scope: 'user-modify-playback-state user-read-playback-state'
    })
  );

  logger.print(`REDIRECT to: ${redirectURL}`);

  res.json({ redirectURL });
});

router.get('/oauth/spotify/redirect', (req, res) => {
  logger.print('REDIRECTED');

  const code = req.query.code || null;

  if (code === null) {

    logger.error('Invalid Authorization Code');
    res.status(400).end();

  } else {

    logger.print(`POST to: ${SPOTIFY_OAUTH_TOKEN_ENDPOINT}`);

    axios.post(SPOTIFY_OAUTH_TOKEN_ENDPOINT, queryString.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SPOTIFY_OAUTH_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    }))
      .then(tokens => {
        res.json({
          accessToken: tokens.data.access_token,
          refreshToken: tokens.data.refresh_token,
        });
      })
      .catch(error => {
        logger.error(error);
        res.status(400).end();
      });
  }
});

module.exports = router;
