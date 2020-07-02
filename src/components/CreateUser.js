import React from "react";
import axios from "axios";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      username: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username } = this.state;

    const user = {
      username,
    };

    // console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  };
  render() {
    const { username } = this.state;
    return (
      <div>
        <h3>Create New Exercise</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={this.handleChange}
              required
            ></input>
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
