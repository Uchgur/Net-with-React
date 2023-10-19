import { movieDTO } from "./movies.model";
import css from "./IndividualMovie.module.css";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import CustomConfirm from "../utils/CustomConfirm";
import axios from "axios";
import { URLMovies } from "../Endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";
import Authorized from "../Auth/Authorize";

export default function IndividualMovie(props: movieDTO) {
  const buildLink = () => `/movie/${props.id}`;
  const customAlert = useContext(AlertContext);
  function deleteMovie() {
    axios.delete(`${URLMovies}/${props.id}`).then(() => {
      customAlert();
    });
  }

  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        <img alt="Poster" src={props.poster} />
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
      <Authorized
        role="admin"
        authorized={
          <>
            <div>
              <Link
                style={{ marginRight: "1rem" }}
                className="btn btn-info"
                to={`/movies/edit/${props.id}`}
              >
                Edit
              </Link>
              <Button
                onClick={() => CustomConfirm(() => deleteMovie())}
                className="btn btn-danger"
              >
                Delete
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
}
