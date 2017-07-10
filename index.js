import React from "react";
import ReactDOM from "react-dom";

const mountNode = document.getElementById("root");

class Todo extends React.Component {
	constructor(props) {
		super(props);

		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.pushItem = this.pushItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.textChange = this.textChange.bind(this);

		this.state = {
			todo: [],
			text: ""
		};

		window.todo = this;
	}

	textChange(event) {
		this.setState({
			text: event.target.value
		});
	}

	handleKeyPress(event) {
		if(event.key == "Enter") {
			this.pushItem();
		}
	}

	pushItem() {
		if(this.state.text == "") {
			return;
		}

		const newItem = {
			text: this.state.text,
			key: Date.now()
		};

		this.setState((prevState) => ({
			todo: prevState.todo.concat(newItem),
			text: ""
		}));
	}

	removeItem(i) {
		this.setState((prevState) => {
			const { todo } = prevState;

			todo.splice(i, 1);

			return { todo };
		});
	}

	render() {
		return <div>
			<ul className="items">
				{this.state.todo.map((item, i) => (
					<li key={item.key}>
						<h4 className="left">{item.text}</h4>
						<a href="#" className="right" onClick={() => this.removeItem(i)} item={item.key}>Remove</a>
					</li>
				))}
			</ul>

			<input onKeyPress={this.handleKeyPress} onChange={this.textChange} value={this.state.text} />
		</div>;
	}
}

ReactDOM.render(<Todo />, mountNode);
