import { gql } from "apollo-boost";

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      __typename
    }
  }
`;

export const GET_LIST_USERS = gql`
  query users($skip: Int, $limit: Int, $filters: [UserMasterFilterArgsType], $orderBy: String) {
    users(skip: $skip, limit: $limit, filters: $filters, orderBy: $orderBy) {
      data {
        id
        username
        fullname
        email
        empNo
        grade
        positions
        roleId
        roleName
        photo
        createdBy
        createdAt
        modifiedBy
        modifiedBy
        isDeleted
        __typename
      }
      total
      __typename
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      username
      fullname
      email
      empNo
      grade
      positions
      roleId
      roleName
      photo
      createdBy
      createdAt
      modifiedBy
      modifiedBy
      isDeleted
      __typename
    }
  }
`;
