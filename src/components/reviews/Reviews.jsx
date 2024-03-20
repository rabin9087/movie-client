import moduleName, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReviewForm from "../reviewForm/ReviewForm";
import api from "../../api/axiosConfig";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;

    try {
      const response = await api.post("/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });
      const updateReviews = [...reviews, { body: rev.value }];

      rev.value = "";
      setReviews(updateReviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieData(movieId);
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "space-around" }}>
        <Col>
          <img src={movie?.poster} alt="" width={"300px"} height={"400px"} />
          <h3>{movie?.title}</h3>
        </Col>

        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handelSubmit={addReview}
                    revText={revText}
                    labelText={"Write a Review"}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r) => {
            return (
              <>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
