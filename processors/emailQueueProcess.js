const sendEmailCreationEmail = require('../mail/sendAccountCreationEmail')

const emailQueueProcess = async(job,done) => {
    try {
      console.log('emailQueueProcess job user',job.data.user)  
      const {name,email} = job.data.user
      await sendEmailCreationEmail({
        name,
        email
      })
      done();
    } catch(error) {
        console.log('error email queue process',error)
        throw error
    }
}

module.exports = emailQueueProcess;