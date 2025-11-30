

const sendEmail = require("./sendEmail");

const sendOrderEmail = async (order, user) => {
  const itemsHTML = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.size}</td>
          <td>${item.qty}</td>
          <td>₹${item.price}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="color: #2b6cb0;">Thank you for your order!</h1>

      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>

      <h2 style="color: #2f855a;">Order Summary</h2>

      <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background: #e2e8f0;">
            <th align="left">Product</th>
            <th align="left">Size</th>
            <th align="left">Qty</th>
            <th align="left">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <h2 style="margin-top: 20px;">Total Amount: ₹${order.totalPrice}</h2>

      <p style="margin-top: 30px;">
        We appreciate your business. If you have any questions, feel free to reply to this email.
      </p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: `Order Confirmation - #${order._id}`,
    html,
  });
};

module.exports = sendOrderEmail;
