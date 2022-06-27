const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Message = require("./Message");

//use CORS middleware
app.use(cors());
//use dotenv
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 5000;

//connect to mongoose
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

app.get("/api/messages", (_, res) => {
	Message.find()
		.then((messages) => {
			res.json(messages);
		})
		.catch((err) => {
			res.status(404).json({ message: err });
		});
});

app.post("/api/message", (req, res) => {
	const { messageInfo} = req.body;
	console.log(messageInfo);
	const message = new Message({
		name: messageInfo.name,
		message: messageInfo.message,
		time: messageInfo.time,
	});
	message
		.save()
		.then((result) => {
			res.json({ message: "Message sent successfully" });
		})
		.catch((err) => {
			res.status(400).json({ message: err });
		});
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
