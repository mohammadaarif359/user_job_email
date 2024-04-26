const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    scheduledAt:{
      type: Date,
      required: true
    },
    sentAt:{
      type: Date,
      default:null
    },
    status:{
      type:String,
      default:'scheduled' // 'scheduled', 'sent', 'failed'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
