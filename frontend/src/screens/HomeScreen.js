import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";

// (12 / 3 = 4 products) - xl
// (12 / 4 = 3 products) - lg

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      const data = res.data;
      // console.log(data);
      setProducts(data);
    };
    fetch();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
