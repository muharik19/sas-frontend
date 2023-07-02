import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Queries } from "../../config/graphql/index";
import { useLazyQuery } from "@apollo/react-hooks";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import Router from "next/router";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import { setToken, getToken } from "../../lib/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [queryLogin, { loading: loadingLogin, data: dataLogin }] = useLazyQuery(Queries.LOGIN);

  const onSubmit = (data) =>
    queryLogin({
      variables: {
        ...data,
      },
    });

  useEffect(() => {
    const token = getToken();
    if (token !== undefined && !_isEmpty(token)) {
      Router.push({ pathname: "/home" });
    }
  }, []);

  useEffect(() => {
    const token = _get(dataLogin, "login.token");

    if (!_isEmpty(token)) {
      setToken(token);
      Router.push({ pathname: "/home" });
    }
  }, [dataLogin]);

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <img src="vercel.svg"></img>
        <br />
        <Form className="box-form" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Controller name="username" control={control} render={({ field }) => <Input {...field} type="text" id="username" />} />
            {errors.username && <FormText color="warning">This field is required</FormText>}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Controller name="password" control={control} render={({ field }) => <Input {...field} type="password" id="password" />} />
            {errors.password && <FormText color="warning">This field is required</FormText>}
          </FormGroup>
          <Button type="submit">LOGIN</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
