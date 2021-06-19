import { gql } from "apollo-boost";

export const GET_LIST_ROLES = gql`
  query roles($orderBy: String, $skip: Int, $limit: Int, $filters: [RoleMasterFilterArgsType]) {
    roles(skip: $skip, limit: $limit, filters: $filters, orderBy: $orderBy) {
      data {
        id
        roleName
        isActive
        createdBy
        createdAt
        modifiedBy
        modifiedAt
        __typename
      }
      total
      __typename
    }
  }
`;
