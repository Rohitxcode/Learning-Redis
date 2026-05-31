import express from 'express';
import Redis from 'ioredis';

const ap = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

function otpKey(phone){
    return `otp:${phone}`;
}
app.post('/otp', async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP
    await redis.set(otpKey(phone), otp, 'EX', 30); // Set OTP with TTL of 30 sec
    res.json({ otp });
});