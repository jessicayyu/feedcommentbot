require('dotenv').config();

const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'TeamSkullGrunt',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

var moment = require('moment');
moment().format();

r.getUnreadMessages({ limit: 5})
  .map((msg) => {
    let timestamp = moment.utc(msg.created_utc * 1000).local().format("ddd, MMM Do YYYY h:mmA");
    let truncated = msg.body.length > 150 ? msg.body.slice(1,150) : msg.body;
    console.log(msg.author.name + ' ' + timestamp + ' ' + msg.name + '\n' + msg.body  + '\n')
  })
  .catch(console.error)