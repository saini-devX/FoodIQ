import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "Missing itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it's undefined
    let cartData = userData.cartData || {};

    // Treat cartData as an object (itemId: quantity)
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log("addToCart error:", error.message);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "Missing itemId" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Removed from cart", cartData });
  } catch (error) {
    console.error("removeFromCart error:", error.message);
    res.status(500).json({ success: false, message: "Error" });
  }
};


//fetch user cart data

const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || [];
    res.json({ success: true, cartData });
  } catch (error) {
    console.log("getCart error:", error.message);
    res.status(500).json({ success: false, message: "Error retrieving cart" });
  }
};

export { addToCart, removeFromCart, getCart }