import React from "react";
import { useEffect, useState } from "react";
import PdfTemplate from "./Components/Template";
import "./App.css";

function App() {
  const [InvoiceNumber, setInvoiceNumber] = useState("");
  const [Dates, setDates] = useState("");
  const [view, setView] = useState(true);

  useEffect(() => {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    setDates(date);
  }, []);

  const create = () => {
    // Check if InvoiceNumber is empty
    if (InvoiceNumber.trim() === "") {
      alert("Invoice number cannot be empty!");
      return; // Exit the function if empty
    }
    setView(false);
  };

  return (
    <>
      {view ? (
        <div className="container">
          <div className="form">
            <div className="inputs">
              <input
                type="text"
                placeholder="Invoice number"
                value={InvoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button onClick={create}>Create</button>
            </div>
          </div>
        </div>
      ) : (
        <PdfTemplate InvoiceNumber={InvoiceNumber} date={Dates} />
      )}
    </>
  );
}

export default App;
