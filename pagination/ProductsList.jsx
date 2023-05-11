import React, { useEffect, useRef, useState } from "react";
import { Table, Row, Col, Card, ListGroup, Form } from "react-bootstrap";
import { BsPencilSquare, BsFillTrashFill, BsSearch } from "react-icons/bs";
import { BiBarcodeReader } from "react-icons/bi";
import { IoMdRefreshCircle } from "react-icons/io";
import JsBarcode from "jsbarcode";
import { useReactToPrint } from "react-to-print";
import {
  getAllData,
  deleteISale,
  getSelectData,
} from "../../services/itemSaleService";
import Paginate from "../pagination";

const ItemList = ({ edit, updatePanel }) => {
  const [itemSaleData, setItemSaleData] = useState([]);
  const [barcode, setBarCode] = useState(0);
  const [hideshow, setHideShow] = useState(false);
  const [deleteUpdate, setDeleteUpdate] = useState({});
  const [alert, setAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    getAllItemSales();
  }, [alert, updatePanel]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteUpdate({});
    }, 2500);
    setAlert(false);
  }, [alert]);

  const getAllItemSales = async () => {
    const data1 = await getAllData();
    console.log(data1.data);
    setItemSaleData(data1.data);
  };

  useEffect(() => {
    JsBarcode(".barcode").init();
  });

  const deleteItemSale = async (value) => {
    const data1 = await deleteISale(value._id);

    setDeleteUpdate(data1.data);
    setAlert(true);
  };

  const handelprintbarcode = (item) => {
    const bCode = item.barCode;
    // console.log(bCode);
    setBarCode(bCode);
    barcodefun();
  };

  function barcodefun() {
    setTimeout(() => {
      print();
      JsBarcode(".barcode").init();
    }, 100);
  }

  const componentRef = useRef();
  const print = useReactToPrint({ content: () => componentRef.current });

  const [rowIndex, setRowIndex] = useState(false);
  const rowEx = (item, index) => {
    // rowIndex && setRowIndex(false);
    // !rowIndex && setRowIndex(true);
    setRowIndex(index);
    hideshow === false ? setHideShow(true) : setHideShow(false);
  };

  //const [searchItem, setSearchItem] = useState({ name: "" });

  const handleOnChange = (e) => {
    const data1 =
      e.target.value !== ""
        ? itemSaleData.filter((value) =>
            value.itemName.includes(e.target.value)
          )
        : itemSaleData;
    setItemSaleData(data1);
    if (e.target.value === "") {
      getAllItemSales();
    }

    // console.log(data1);
  };

  const reset = (e) => {
    getAllItemSales();
  };

  const handleOnChangeData = async (e) => {
    console.log(e.target.value);
    if (e.target.value === "all") {
      getAllItemSales();
    } else {
      const data1 = await getSelectData(e.target.value);
      console.log(data1.data);
      setItemSaleData(data1.data);
    }
  };

  const indexOfLastAdd = currentPage * pageSize;
  const indexOfFirstAdd = indexOfLastAdd - pageSize;

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="l-wrapper">
      <div className="l-contents">
        <div className="row">
          <div className="col-md-24 mx-auto">
            <Row className="px-3">
              <Col>
                <strong>
                  <h5 className="mt-2">
                    Item Sales List{" "}
                    <IoMdRefreshCircle
                      size={25}
                      className="me-auto mb-1 pointer"
                      onClick={(e) => reset(e)}
                    />
                  </h5>{" "}
                </strong>
              </Col>
              <Col className="my-2">
                <Row className="">
                  <Col className="col-md-18">
                    <Form className="d-flex">
                      <Form.Control
                        size="sm"
                        name="name"
                        placeholder="Search"
                        className="me-auto shadow5"
                        onChange={handleOnChange}
                      />
                      <BsSearch className="mx-2 mt-1 pointer" size={25} />
                    </Form>
                  </Col>{" "}
                  <Col className="col-md-6 px-1">
                    <Form.Group>
                      <Form.Select
                        className="border-1 shadow5"
                        size="sm"
                        name="title"
                        onChange={handleOnChangeData}
                      >
                        <option>all</option>
                        <option>2</option>
                        <option>5</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            {deleteUpdate.status === "error" ? (
              <small className="text-danger text-center">
                {deleteUpdate.message}
              </small>
            ) : (
              <small className="text-success text-center">
                {deleteUpdate.message}
              </small>
            )}
            <Table size="sm" hover className="table-bordered table-sm mb-3 p-1">
              <thead className="small mb-5 bg-veryLight">
                <tr className="text-secondary text-center">
                  <th className="col-md-5">Item Name</th>
                  <th scope="col">Item Code</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col">S Total</th>
                  <th scope="col">Dis</th>
                  <th className="col-md-3">Qty InStock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itemSaleData
                  .slice(indexOfFirstAdd, indexOfLastAdd)
                  .map((value, index) => (
                    <>
                      <tr key={index} className={"pointer"}>
                        <td
                          className="col-md-5"
                          onClick={(event) => rowEx(value, index)}
                        >
                          {value.itemName}
                        </td>
                        <td onClick={(event) => rowEx(value, index)}>
                          {value.itemCode}
                        </td>
                        <td onClick={(event) => rowEx(value, index)}>
                          {value.price}
                        </td>
                        <td onClick={(event) => rowEx(value, index)}>
                          {value.quantity}
                        </td>
                        <td onClick={(event) => rowEx(value, index)}>
                          {value.subTotal}
                        </td>
                        <td onClick={(event) => rowEx(value, index)}>
                          {value.discount}
                        </td>
                        <td
                          className="col-md-2"
                          onClick={(event) => rowEx(value, index)}
                        >
                          {value.quantityInStock}
                        </td>
                        <td className="col-md-3">
                          <BsPencilSquare
                            onClick={() => edit(value)}
                            className="text-success mx-1"
                            size={20}
                          />
                          <BsFillTrashFill
                            onClick={() => deleteItemSale(value)}
                            className="text-danger mx-1"
                            size={20}
                          />
                          <BiBarcodeReader
                            size={20}
                            className="mx-1"
                            onClick={() => handelprintbarcode(value)}
                          />
                        </td>
                      </tr>
                      {hideshow && rowIndex === index && (
                        <tr>
                          <td colspan="8">
                            <div>
                              <Card style={{ width: "100%" }}>
                                <Card.Body className="p-1">
                                  <ListGroup variant="flush">
                                    <strong>{value.itemName}</strong>
                                    <ListGroup.Item>
                                      <Row>
                                        <Col>
                                          Item Code :-
                                          {value.itemCode}
                                        </Col>
                                        <Col>Price :- {value.price}</Col>
                                        <Col>
                                          Quantity :-
                                          {value.quantity}
                                        </Col>
                                        <Col>
                                          Sub Total :-
                                          {value.subTotal}
                                        </Col>
                                      </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      <Row>
                                        <Col>
                                          Discount :-
                                          {value.discount}
                                        </Col>
                                        <Col>
                                          Whole Sale Dis :-
                                          {value.wholeSalesDiscount}
                                        </Col>
                                        <Col>
                                          Retailer Dis :-
                                          {value.retailerDiscount}
                                        </Col>
                                        <Col>
                                          Batch :-
                                          {value.batch}
                                        </Col>
                                      </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      <Row>
                                        <Col>
                                          Expiry :-
                                          {value.expiry}
                                        </Col>
                                        <Col>
                                          Expiry Date :- {value.expiryDate}
                                        </Col>
                                        <Col>
                                          Qty in Stock :-
                                          {value.quantityInStock}
                                        </Col>
                                        <Col>
                                          Qty Remained :-
                                          {value.quantityRemained}
                                        </Col>
                                      </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      <Row>
                                        <Col>
                                          Barcode :-
                                          {value.barCode}
                                        </Col>
                                        <Col>
                                          Status:-
                                          {value.status}
                                        </Col>
                                        <Col></Col>
                                        <Col></Col>
                                      </Row>
                                    </ListGroup.Item>
                                  </ListGroup>
                                </Card.Body>
                              </Card>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
              </tbody>
            </Table>
            <Paginate
              pageSize={pageSize}
              totalAdd={itemSaleData.length}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
      <div className="barcodediv text-center" ref={componentRef}>
        <Row>
          <Col>
            <svg
              className="barcode"
              jsbarcode-value={barcode}
              jsbarcode-textmargin="0"
              jsbarcode-fontoptions="bold"
            ></svg>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ItemList;
