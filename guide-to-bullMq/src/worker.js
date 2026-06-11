import {connection} from './queue.js';
import {Worker} from 'bullmq';

const worker = new Worker('email', async (job) => {
    console.log("Processing job:", job.id, job.name, job.data);
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Job completed.", job.id, job.name, job.data);
},
{connection});

worker.on('completed', (job) => {
    console.log("job completed:", job.id, job.name, job.data);
});
worker.on('failed', (job, err) => {
    console.error("Job failed:", job.id, job.name, job.data, err);
});