import React, { useEffect, useState } from "react";
import { Row, Image, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../components/Rating";

// import products from "../products";

const ProductScreen = ({ match }) => {
  //   console.log(match.params.id);

  //   const product = products.find((p) => p._id === match.params.id);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/products/${match.params.id}`
      );
      const data = res.data;
      setProduct(data);
    };
    fetch();
  }, [match.params.id]);
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <ListGroup.Item key={product._id}>
            <Image src={product.image} alt={product.name}></Image>
          </ListGroup.Item>
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item variant="success">
              <Rating
                value={product.rating}
                text={`(${product.numReviews} reviews)`}
                color="orange"
              ></Rating>
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>

                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>

                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
