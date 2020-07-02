import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

class CreateExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/users").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.username),
          username: response.data[0].username,
        });
      }
    });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      username: value,
    });
  };

  handleChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, description, duration, date } = this.state;

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(exercise);
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  render() {
    const { username, users, description, duration, date } = this.state;
    return (
      <div>
        <h3>Create New Exercise</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select
              ref="userInput"
              className="form-control"
              value={username}
              onChange={this.handleChange}
            >
              {users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={this.handleChange}
              required
            ></input>
          </div>

          <div className="form-group">
            <label>Duration(minutes):</label>
            <input
              type="text"
              className="form-control"
              value={duration}
              onChange={this.handleChange}
              required
            ></input>
          </div>

          <div className="form-group">
            <label>Date:</label>

            <div>
              <DatePicker
                selected={date}
                className="form-control"
                onChange={this.handleChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
