import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

class ExercisesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/exercises/").then((response) => {
      this.setState({
        exercises: response.data,
      }).catch((error) => console.log(error));
    });
  }

  handleDelete = (id) => {
    const { exercises } = this.state;
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      exercises: exercises.filter((exercise) => exercise._id !== id),
    });
  };

  exerciseList = () => {
    const { exercises } = this.state;
    return exercises.map((exercise) => {
      return (
        <Exercise
          key={exercise._id}
          exercise={exercise}
          delete={this.handleDelete}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList}</tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;
