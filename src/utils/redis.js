const {createClient} = require('redis');

const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient(redisURL);
redisClient.on('error', (err) => {
  console.log('Something went wrong ' + err);
});

const getRediwClient = async () => {
  if(!redisClient.isReady){
    console.log('connecting to redis');
    await redisClient.connect();
  }
  return redisClient;
};

const disconnectRedisClient = async () => {
  if(redisClient.isReady){
    console.log('disconnecting from redis');
    await redisClient.disconnect();
  }
};


module.exports = {
  getRediwClient,
  disconnectRedisClient
};
