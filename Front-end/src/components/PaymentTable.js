import React from 'react'

const PaymentTable = (props) => {
  return (
    <div>
        {
        props.loading ? <div>Loading...</div>
        : 
        props.error ? <div>{props.error}</div>
        : (      
        <table className="table" style={{overflowX: 'scroll !important', whiteSpace: 'nowrap',}}>
          <thead>
            <tr>
              <th scope="col" className="col-sm-2">Date/Time</th>
              <th scope="col" className="col-sm-2">settlement id</th>
              <th scope="col" className="col-sm-2">type</th>
              <th scope="col" className="col-sm-2">order id</th>
              <th scope="col" className="col-sm-2">Sku</th>
              <th scope="col" className="col-sm-2">description</th>
              <th scope="col" className="col-sm-2">quantity</th>
              <th scope="col" className="col-sm-2">marketplace</th>
              <th scope="col" className="col-sm-2">account type</th>
              <th scope="col" className="col-sm-2">fulfillment</th>
              <th scope="col" className="col-sm-4">order city</th>
              <th scope="col" className="col-sm-2">order state</th>
              <th scope="col" className="col-sm-2">order postal</th>
              <th scope="col" className="col-sm-2">product sales</th>
              <th scope="col" className="col-sm-2">shipping credits</th>
              <th scope="col" className="col-sm-2">promotional rebates</th>
              <th scope="col" className="col-sm-2">Total sales</th>
              <th scope="col" className="col-sm-2">TCS CGST</th>
              <th scope="col" className="col-sm-2">TCS SGST</th>
              <th scope="col" className="col-sm-2">TCS IGST</th>
              <th scope="col" className="col-sm-2">selling fees</th>
              <th scope="col" className="col-sm-2">fba fees</th>
              <th scope="col" className="col-sm-2">other transaction fees</th>
              <th scope="col" className="col-sm-2">other</th>
              <th scope="col" className="col-sm-2">total</th>
            </tr>
          </thead>
          <tbody>
            {props.items && props.items.map((d,index)=>{
              return(((props.viewType === "Other")?(!(d.type.includes("Order")||
              d.type.includes("Adjustment")||d.type.includes("FBA Inventory Fee")||d.type.includes("Refund")
              ||d.type.includes("Service Fee")||d.type.includes("Tax Withheld")||
              d.type.includes("Transfer"))):(d.type.includes(props.viewType)))?(
                <tr key={index}>
                  <td>{d.date_time}</td>
                  <td>{d.settlement_id}</td>
                  <td>{d.type}</td>
                  <td>{d.order_id}</td>
                  <td>{d.Sku}</td>
                  <td>{d.description}</td>
                  <td>{d.quantity}</td>
                  <td>{d.marketplace}</td>
                  <td>{d.account_type}</td>
                  <td>{d.fulfillment}</td>
                  <td>{d.order_city}</td>
                  <td>{d.order_state}</td>
                  <td>{d.order_postal}</td>
                  <td>{d.product_sales}</td>
                  <td>{d.shipping_credits}</td>
                  <td>{d.promotional_rebates}</td>
                  <td>{d.Total_sales}</td>
                  <td>{d.TCS_CGST}</td>
                  <td>{d.TCS_SGST}</td>
                  <td>{d.TCS_IGST}</td>
                  <td>{d.selling_fees}</td>
                  <td>{d.fba_fees}</td>
                  <td>{d.other_transaction_fees}</td>
                  <td>{d.other}</td>
                  <td>{d.total}</td>
                </tr>) : ""
              );
            })}
          </tbody>
        </table>
        )
        }
    </div>
  )
}

export default PaymentTable;