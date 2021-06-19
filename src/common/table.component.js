import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faEdit, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import PropTypes from "prop-types";

const { SearchBar } = Search;

const defaulSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const TableComponent = ({ handleCreate, tableData, customColumns, buttonCreateTitle, handleDelete, handleDetail, handleEdit }) => {
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      headerStyle: () => {
        return { width: "5%" };
      },
    },
    ...customColumns,
    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div>
            <Button color="dark" className="mr-2" onClick={() => handleDetail(row)}>
              <FontAwesomeIcon icon={faInfo} /> Detail
            </Button>

            <Button color="dark" className="mr-2" onClick={() => handleEdit(row)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>

            <Button color="dark" className="mr-2" onClick={() => handleDelete(row)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      <ToolkitProvider bootstrap4 keyField="id" data={tableData} columns={columns} defaulSorted={defaulSorted} search>
        {(props) => (
          <div>
            <Row>
              <Col>
                <Button type="button" color="dark" className="mr-2" onClick={handleCreate}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  {buttonCreateTitle}
                </Button>
              </Col>
              <Col>
                <div className="float-right">
                  <SearchBar {...props.searchProps} placeholder="Search .." />
                </div>
              </Col>
            </Row>
            <BootstrapTable {...props.baseProps} pagination={paginationFactory()} />
          </div>
        )}
      </ToolkitProvider>
    </Container>
  );
};

export default TableComponent;

TableComponent.defaultProps = {
  tableData: [],
  handleDetail: () => null,
  handleCreate: () => null,
  handleDelete: () => null,
  handleEdit: () => null,
};

TableComponent.propTypes = {
  tableData: PropTypes.array,
  customColumns: PropTypes.object,
  buttonCreateTitle: PropTypes.string,
  handleCreate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleDetail: PropTypes.func,
  handleEdit: PropTypes.func,
};
