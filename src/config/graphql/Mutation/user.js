import { gql } from "apollo-boost";

export const USER_CREATE = gql`
  mutation userCreate(
    $username: String!
    $empNo: String!
    $fullname: String!
    $grade: String
    $positions: String
    $photo: String
    $roleId: Int!
    $email: String!
  ) {
    userCreate(
      data: { username: $username, email: $email, grade: $grade, positions: $positions, fullname: $fullname, photo: $photo, empNo: $empNo, roleId: $roleId }
    ) {
      id
      username
      fullname
      email
      empNo
      positions
      roleName
      roleId
      grade
      photo
      createdAt
      createdBy
      modifiedAt
      modifiedBy
      isDeleted
      __typename
    }
  }
`;

export const USER_UPDATE = gql`
  mutation userUpdate(
    $photo: String
    $empNo: String!
    $positions: String
    $id: Int!
    $roleId: Int!
    $grade: String
    $email: String!
    $username: String!
    $fullname: String!
  ) {
    userUpdate(
      data: {
        id: $id
        username: $username
        email: $email
        grade: $grade
        positions: $positions
        fullname: $fullname
        photo: $photo
        empNo: $empNo
        roleId: $roleId
      }
    ) {
      id
      username
      fullname
      email
      empNo
      positions
      roleName
      roleId
      grade
      photo
      createdAt
      createdBy
      modifiedAt
      modifiedBy
      isDeleted
      __typename
    }
  }
`;

export const USER_DELETE = gql`
  mutation userDelete($id: Int!) {
    userDelete(id: $id) {
      id
      username
      fullname
      email
      empNo
      positions
      roleName
      roleId
      grade
      photo
      createdAt
      createdBy
      modifiedAt
      modifiedBy
      isDeleted
      __typename
    }
  }
`;
