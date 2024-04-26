const Queue = require('bull');
const path = require('path');
const User = require("../models/User");

// connect queue with redis
const emailQueue = new Queue("email",{
  redis:{
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT
  }
})

// attch email queue prcoess file and prcoess function run for process the queue 
emailQueue.process(path.join(__dirname,'emailQueueProcess.js'))

// on completed job
emailQueue.on('completed',(job)=>{
  console.log(`complete # ${job.id} job at ${new Date()}`)
  // if job run successfully update status sent
  if(!job.failedReason && job.finishedOn) {
    updateJobStatus(job,'sent')
  }
})

// on failed job
emailQueue.on('failed', (job, err) => {
  console.log(`Job #${job.id} failed with reason: ${err.message}`);
  updateJobStatus(job,'failed')
});

const updateJobStatus = (job,status) => {
  const id = job.data.user._id
  User.findByIdAndUpdate(id,{
    status
  })
  .then((success) => console.log("status upadted"))
  .catch((error) => console.log(`error in status update ${error}`));
}  