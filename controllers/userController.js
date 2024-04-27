const User = require("../models/User");
const sendEmailCreationEmail = require("../mail/sendAccountCreationEmail");
const Queue = require('bull');
const { use } = require("../mail/transporter");

const emailQueue = new Queue("email",{
  redis:{
    host:'127.0.0.1',
    port:6379
  }
})
// path:/users/ method:POST work:add new
exports.create = async (req, res) => {
  const { name, email,scheduledAt } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      scheduledAt,
      stauts:'scheduled'
    });
    const scheduledTime = new Date(scheduledAt);
    const delay = Math.max(scheduledTime - Date.now(), 0);
    console.log(`delay millsecond = ${delay}  delay in second = ${delay/1000}`)
    const job = await emailQueue.add({user},{delay:15000})
    res.status(200).json({"message":"email scheduled successfully",user});
  } catch (error) {
    console.log(error);
    res.status(500).json({"message":"server error"});
  }
};

// path:/users/ method:GET work:get list
exports.get = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({"message":"data get successfully",data:users});
  } catch (error) {
    res.status(500).json({"message":"server error"});
  }
};

// path:/users/:id method:GET work:get single by id
exports.getById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id);
    res.status(200).json({"message":"data get successfully",data:user});
  } catch (error) {
    res.status(500).json({"message":"server error"});
  }
};

// path:/users/:id method:PUT work:delete single by id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const {name,email,scheduledAt} = req.body
    if(!name && !email && !scheduledAt) {
      return res.status(400).json({"message":"name or email or scheduledAt is required"});
    }
    const user = await User.findById(id);
    if(user) {
      // check
      user.name = name || user.name
      user.email = email || user.email
      user.scheduledAt = scheduledAt || user.scheduledAt
      const updatedUser = await user.save();
      if(scheduledAt) {
        const scheduledTime = new Date(scheduledAt);
        const delay = Math.max(scheduledTime - Date.now(), 0);
        console.log(`delay millsecond = ${delay}  delay in second = ${delay/1000}`)
        const job = await emailQueue.add({user:updatedUser},{delay})
      } 
      res.status(200).json({"message":"email updated scheduled if given new schedule time",data:updatedUser});
    } else {
      res.status(400).json({"message":"not found"});
    }
  } catch (error) {
    console.log('error update',error)
    res.status(500).json({"message":"server error"});
  }
};

// path:/users/:id method:DELETE work:delete single by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id);
    if(user) {
      res.status(200).json({"message":"data delete successfully",data:[]});
    } else {
      res.status(400).json({"message":"not found"});
    }
  } catch (error) {
    res.status(500).json({"message":"server error"});
  }
};

// path:/users/job/:status method:GET work:get list by status
exports.getByStatus = async (req, res) => {
  try {
    const status = req.params.status
    const users = await User.find({status});
    res.status(200).json({"message":"data get successfully",data:users});
  } catch (error) {
    res.status(500).json({"message":"server error"});
  }
};