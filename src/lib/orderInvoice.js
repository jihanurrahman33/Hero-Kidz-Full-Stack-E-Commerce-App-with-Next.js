export const invoiceTemplate = ({ orderId, items, total }) => {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>৳${item.price}</td>
        <td>৳${item.price * item.quantity}</td>
      </tr>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial;padding:20px">
    <h2>Order Invoice</h2>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <img src="https://herokidz.vercel.app/logo.png" alt="Hero Kidz Logo" style="width:150px;height:auto;"/>
    <table border="1" cellpadding="10" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <h3 style="margin-top:20px">Grand Total: ৳${total}</h3>

    <p>Thank you for your order!</p>
  </div>
  `;
};
