import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, user } = userDetails;

  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Name"
              value={name}
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter Email"
              value={email}
            ></FormControl>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
