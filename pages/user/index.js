import React from "react";
import { Queries, Mutation } from "../../src/config/graphql/index";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, FormText, Spinner, Row, Col } from "reactstrap";
import NavBar from "../../src/common/navbar.component";
import TableComponent from "../../src/common/table.component";
import ModalComponent from "../../src/common/modal.component";
import { Success } from "../../src/lib/alert";

const User = () => {
  const [tableData, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("Create User");
  const [listRoles, setListRoles] = React.useState([]);
  const [defaultValues, setDefaultValues] = React.useState({});
  const [disableSubmit, setDisableSubmit] = React.useState(false);
  const [inEdit, setInEdit] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    reset,
  } = useForm();

  const {
    loading: loadingGetUsers,
    data: dataGetUsers,
    refetch: refetchListUsers,
  } = useQuery(Queries.GET_LIST_USERS, {
    fetchPolicy: "network-only",
    onCompleted: () => {},
  });

  const { loading: loadingGetRoles, data: dataGetRoles } = useQuery(Queries.GET_LIST_ROLES, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      const dataRoles = _get(dataGetRoles, "roles.data", []);
      setListRoles(dataRoles);
    },
  });

  const [createUser] = useMutation(Mutation.USER_CREATE, {
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      refetchListUsers();
      handleCloseModal();
      Success("User Created");
    },
    onError: (errors) => {},
  });

  const [updateUser] = useMutation(Mutation.USER_UPDATE, {
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      refetchListUsers();
      handleCloseModal();
      Success("User Updated");
    },
    onError: (errors) => {},
  });

  const [deleteUser] = useMutation(Mutation.USER_DELETE, {
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      refetchListUsers();
      Success("User Deleted");
    },
    onError: (errors) => {},
  });

  const handleCloseModal = () => {
    setIsOpen(false);
    clearErrors();
    setDisableSubmit(false);
    setModalTitle("Create User");
    setInEdit(false);
    const editedField = Object.keys(defaultValues); //Get only edited fieldName/Object propertyName
    editedField.forEach((data) => {
      return setValue(data, null);
    }); //Push for each existing property name for 'editedField' array of objects
    setDefaultValues({});
    reset();
  };

  const handleCreateUser = () => {
    setIsOpen(true);
  };

  const handleEditUser = (dataField) => {
    setDefaultValues(dataField);
    const editedField = Object.keys(dataField); //Get only edited fieldName/Object propertyName
    editedField.forEach((data) => {
      return setValue(data, dataField[data]);
    }); //Push for each existing property name for 'editedField' array of objects
    setModalTitle("Edit User");
    setIsOpen(true);
    setInEdit(true);
  };

  const handleDetailUser = (dataField) => {
    setDefaultValues(dataField);
    setDisableSubmit(true);
    setIsOpen(true);
    setModalTitle("Detail User");
  };

  const handleDeleteUser = (dataField) => {
    deleteUser({ variables: { id: dataField.id } });
  };

  const onSubmit = (data) => {
    inEdit ? updateUser({ variables: { id: defaultValues?.id, ...data } }) : createUser({ variables: { ...data } });
  };

  React.useEffect(() => {
    const dataUsers = _get(dataGetUsers, "users.data", []);
    setTableData(dataUsers);
  }, [dataGetUsers]);

  return (
    <React.Fragment>
      <NavBar>
        {loadingGetRoles || loadingGetUsers ? (
          <div className="text-center">
            <Spinner color="dark" />
          </div>
        ) : (
          <TableComponent
            tableData={tableData}
            buttonCreateTitle="Create User"
            customColumns={[
              {
                dataField: "fullname",
                text: "Full Name",
                sort: true,
              },
            ]}
            handleCreate={handleCreateUser}
            handleDelete={handleDeleteUser}
            handleDetail={handleDetailUser}
            handleEdit={handleEditUser}
          />
        )}
      </NavBar>
      <ModalComponent
        isOpen={isOpen}
        modalTitle={modalTitle}
        toggleModal={handleCloseModal}
        handleSubmit={handleSubmit(onSubmit)}
        disableSubmit={disableSubmit}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="sm-6">
              <FormGroup>
                <Label for="username">Username</Label>
                <Input {...register("username", { required: true })} type="text" id="username" defaultValue={defaultValues?.username} />
                {errors.username && <FormText color="danger">This field is required</FormText>}
              </FormGroup>
            </Col>
            <Col className="sm-6">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input {...register("email", { required: true })} type="text" id="email" defaultValue={defaultValues?.email} />
                {errors.email && <FormText color="danger">This field is required</FormText>}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="sm-6">
              <FormGroup>
                <Label for="fullname">Fullname</Label>
                <Input {...register("fullname", { required: true })} type="text" id="fullname" defaultValue={defaultValues?.fullname} />
                {errors.fullname && <FormText color="danger">This field is required</FormText>}
              </FormGroup>
            </Col>
            <Col className="sm-6">
              <FormGroup>
                <Label for="grade">Grade</Label>
                <Input {...register("grade", { required: false })} type="text" id="grade" defaultValue={defaultValues?.grade} />
                {errors.grade && <FormText color="danger">This field is required</FormText>}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="sm-6">
              <FormGroup>
                <Label for="positions">Positions</Label>
                <Input {...register("positions", { required: false })} type="text" id="positions" defaultValue={defaultValues?.positions} />
                {errors.positions && <FormText color="danger">This field is required</FormText>}
              </FormGroup>
            </Col>
            <Col className="sm-6">
              <FormGroup>
                <FormGroup>
                  <Label for="roleId">Role</Label>
                  <Input type="select" {...register("roleId", { required: true })} id="roleId" defaultValue={defaultValues?.roleId}>
                    <option value={null}>{null}</option>
                    {listRoles.map((data) => (
                      <option value={data.id} key={data.id}>
                        {data.roleName}
                      </option>
                    ))}
                  </Input>
                  {errors.roleId && <FormText color="danger">This field is required</FormText>}
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="sm-6">
              <FormGroup>
                <Label for="empNo">NIK</Label>
                <Input {...register("empNo", { required: true })} type="text" id="empNo" defaultValue={defaultValues?.empNo} />
                {errors.empNo && <FormText color="danger">This field is required</FormText>}
              </FormGroup>
            </Col>
            <Col className="sm-6"></Col>
          </Row>
        </Form>
      </ModalComponent>
    </React.Fragment>
  );
};

export default User;
