import React from "react";
import { Link } from "react-router-dom";

const Exercise = ({ exercise, handleDelete }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + exercise._id} className="btn btn-info btn-sm">
        Edit
      </Link>{" "}
      |{" "}
      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(exercise._id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default Exercise;
