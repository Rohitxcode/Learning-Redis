import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const QUEUE_KEY = "queue:emails";

app.post('/email', async (req, res) => {
    const job = {
        to : req.body.to,
        subject : req.body.subject || "No subject",
        body : req.body.body || "No content",
        createdAt : new Date().toISOString()
    }
    await redis.lpush(QUEUE_KEY, JSON.stringify(job));
res.json({ queued: true, job });

})

app.get('/email/process-one', async (req, res) => {
    const raw = await redis.rpop(QUEUE_KEY);    
    if(!raw){
        return res.json({ message: 'No emails to process' });
    }
    const job = JSON.parse(raw);
    res.json({ message: 'Email sent', job });

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
