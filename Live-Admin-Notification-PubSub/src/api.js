import express from 'express';
import redis from 'redis';

const app = express();
app.use(express.json());
const publisher = new redis(process.env.REDIS_URL || 'redis://localhost:6379');
app.post("/notification", (req, res) => {{
    const payload = {
        title: req.body.title || "Default Title",
        createdAt: new Date().toISOString(),
    }
    publisher.publish("notification", JSON.stringify(payload));

    res.json({message: `Notification sent to ${recivers} subscribers`});
}});

app.listen(3000, ()=>{
    console.log("API server listening on port 3000");
});
