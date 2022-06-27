const mongoose = require("mongoose");

const Message = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	message: {
		type: String,
		required: true,
		trim: true,
	},
	time: {
		type: String,
		required: true,
		trim: true,
	},
});

const MessageModel = mongoose.model("Message", Message);
module.exports = MessageModel;
