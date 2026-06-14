import Redis from 'ioredis';

const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

subscriber.subscribe("notificiation" , (err) => {
    if(err){
        console.error("Failed to subscribe: %s", err.message);
        return;
    }
    console.log("Successfully subscribed to notification channel");

});

subscriber.on("message",(channel, message) =>{
    
    console.log(`Recived message from Channel ${channel}: ${message}`);
});
