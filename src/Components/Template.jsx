import ReactToPrint from "react-to-print";
import React, { useRef, useState, useEffect } from "react";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Barcode from "react-barcode";

function PdfTemplate(props) {
  const ref = useRef();
  const [openAirPopup, setAirPopup] = useState(false);

  const [Item, setItem] = useState("");
  const [Amount, setAmount] = useState(0);

  const [List, setList] = useState([]);

  const addData = () => {
    List.push({
      product: Item,
      amount: Amount,
    });
    setItem("");
    setAmount("");
    setAirPopup(false);
  };

  let sum = 0;
  List.forEach((amount) => {
    sum += parseInt(amount.amount);
  });

  return (
    <>
      <div className="container" ref={ref}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4 brcode">
                  <Barcode
                    value={`4n%${props.InvoiceNumber}+ut%`}
                    width={1}
                    height={50}
                    displayValue={false}
                  />
                </div>
                <div className="col-md-8 text-right bbc">
                  <h4 style={{ color: "#325aa8" }}>
                    <strong>Company Name</strong>
                  </h4>
                  <p>(+91) 1234567890</p>
                  <p>sample@gmail.com</p>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2 style={{ color: "#325aa8" }}>INVOICE</h2>
                  <h5>Id: {props.InvoiceNumber}</h5>
                </div>
              </div>
              <br />
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <h5>Products</h5>
                      </th>
                      <th>
                        <h5>Amount</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {List.length
                      ? List.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="col-md-9">{items.product}</td>
                              <td className="col-md-3"> ₹ {items.amount}</td>
                            </tr>
                          );
                        })
                      : null}
                    <tr>
                      <td className="text-right">
                        <p>
                          <strong>Total Amount : </strong>
                        </p>
                        <p>
                          <strong>Payable Amount : </strong>
                        </p>
                      </td>
                      <td>
                        <p>
                          <strong> ₹ {sum}</strong>
                        </p>
                        <p>
                          <strong> ₹ {sum}</strong>
                        </p>
                      </td>
                    </tr>
                    <tr style={{ color: "F81d2d" }}>
                      <td className="text-right">
                        <h4>
                          <strong>Total:</strong>
                        </h4>
                      </td>
                      <td className="text-left">
                        <h4>
                          <strong> ₹{sum}</strong>
                        </h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <div className="col-md-12">
                  <p>
                    <b>Data :</b>
                    {props.data}
                  </p>
                  <br />
                  <p>
                    <b>:Your name</b>
                  </p>
                  <p>
                    <b>Contact: (+91) 1234567890</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <ReactToPrint
          trigger={() => (
            <button type="button" class="btn btn-danger">
              Print
            </button>
          )}
          content={() => ref.current}
          documentTitle={`Invoice ${props.InvoiceNumber}`}
        />
        <button
          type="button"
          class="btn btn-success "
          onClick={() => setAirPopup(true)}
        >
          Add products
        </button>
      </div>

      <Dialog open={openAirPopup}>
        <DialogTitle>
          <div className="title">
            <div className="hed">New Product</div>
            <div className="icon-cross" onClick={() => setAirPopup(false)}>
              <Close />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <div className="forms">
              <input
                type="text"
                value={Item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="PR name"
              />
              <input
                type="text"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </div>
            <div className="buttons">
              <button onClick={addData}>Add</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PdfTemplate;
