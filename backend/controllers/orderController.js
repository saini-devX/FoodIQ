// export { placeOrder, verifyOrder, userOrders,listOrders , updateStatus};
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Place Order Controller
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  const { items, amount, address } = req.body;
  const userId = req.userId;

  if (!items?.length || !amount || !address || !userId) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  try {
    // Stripe line items - using INR currency with database prices
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Convert rupees to paise (₹1 = 100 paise)
      },
      quantity: item.quantity,
    }));

    // Delivery charges - ₹50
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 5000, // ₹50 in paise
      },
      quantity: 1,
    });

    // ✅ Create Stripe Checkout Session with minimal metadata
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontend_url}/verify?success=false`,
      metadata: {
        userId,
        amount: String(amount),
        address: JSON.stringify({
          name: address.name,
          street: address.street,
          city: address.city,
          pincode: address.pincode,
        }),
        itemInfo: items.map((i) => `${i._id}:${i.quantity}:${i.name}`).join(","),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe session creation error:", error.message);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

// ✅ Verify Stripe Payment
const verifyOrder = async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const metadata = session.metadata;

      // 🔁 Parse itemInfo back to array of {_id, quantity}
      const items = metadata.itemInfo
        .split(",")
        .map((pair) => {
          const [id, qty] = pair.split(":");
          return { _id: id, quantity: Number(qty) };
        });

      const newOrder = new orderModel({
        userId: metadata.userId,
        items,
        amount: Number(metadata.amount),
        address: JSON.parse(metadata.address),
        payment: true,
        date: new Date(),
      });

      await newOrder.save();
      await userModel.findByIdAndUpdate(metadata.userId, { cartData: {} });

      return res.json({ success: true, message: "Order Placed" });
    } else {
      return res.json({ success: false, message: "Payment not completed" });
    }
  } catch (err) {
    console.error("verifyOrder error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Verification failed" });
  }
};

// ✅ Get User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    console.log("Orders fetched:", orders); // 🔍 debug
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("List Order Error:", error); // 🔥 catch error
    res.json({ success: false, message: "Error" });
  }
};

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({ success: true, message: "Status Updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })

  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };