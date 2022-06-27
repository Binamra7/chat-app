import React from "react";
import axios from "axios";
import "./App.css";

const App = () => {
	const [user, setUser] = React.useState(localStorage.getItem("user"));

	return <div className="App">{user ? <Chat /> : <Login />}</div>;
};

export default App;

const Chat = () => {
	const temp = React.useRef();

	const [change, setChange] = React.useState(false);
	const [allMessages, setAllMessages] = React.useState([{}]);
	React.useEffect(() => {
		axios
			.get("http://localhost:5000/api/messages")
			.then((res) => {
				setAllMessages(res.data);
			})
			.catch((err) => {
				console.error(err.message);
			});
	}, [change]);

	const user = localStorage.getItem("user");
	const [message, setMessage] = React.useState("");

	setTimeout(() => {
		setChange((prevState) => !prevState);
	}, 3000);

	const changeHandler = (e) => {
		setMessage(e.target.value);
	};
	const sendHandler = (e) => {
		e.preventDefault();
		setAllMessages([
			...allMessages,
			{ name: user, message: message, time: new Date().toLocaleTimeString() },
		]);
		axios
			.post("http://localhost:5000/api/message", {
				messageInfo: {
					name: user,
					message: message,
					time: new Date().toLocaleTimeString(),
				},
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		setMessage("");
		temp.current.scrollIntoView({ behavior: "smooth" });
		// window.scrollTo(0, 0);
	};
	return (
		<div className="container">
			<p>
				Signed in as <b>{user}</b>
			</p>
			<div className="msg_box">
				{allMessages.map((msg) => (
					<div key={msg.id} className={msg.name === user ? "you" : "other"}>
						<div>Username: {msg.name}</div>
						<div>Message: {msg.message}</div>
						<div>Time: {msg.time}</div>
					</div>
				))}
				<div ref={temp} className="ref"></div>
			</div>
			<form onSubmit={sendHandler}>
				<input
					onChange={changeHandler}
					type="text"
					placeholder="Message"
					value={message}
				/>
				<button value="submit">Send</button>
			</form>
		</div>
	);
};

const Login = () => {
	const [username, setUsername] = React.useState("");
	// const [user, setUser] = React.useState("");
	const changeHandler = (e) => {
		setUsername(e.target.value);
	};
	return (
		<>
			<h1>Login</h1>
			<input
				onChange={changeHandler}
				type="text"
				placeholder="Username"
				value={username}
			/>
			<button
				onClick={() => {
					localStorage.setItem("user", username);
					//reload the webpage
					window.location.reload();
					// setUser(username);
				}}
			>
				Login
			</button>
		</>
	);
};
