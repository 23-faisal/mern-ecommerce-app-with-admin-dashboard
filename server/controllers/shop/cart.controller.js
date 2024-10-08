import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";

// add to cart

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem) {
      cart.items.push({ productId: product._id, quantity });
    } else {
      existingItem.quantity += 1;
    }

    await cart.save();

    const populatedCart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice", // Ensure these fields are selected
    });

    res.status(200).json({
      success: true,
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// fetch cart items

export const fetchCartItem = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Filter out items where the productId is invalid
    const validCartItems = cart.items.filter((item) => item.productId);

    // If invalid items were found, update the cart
    if (validCartItems.length < cart.items.length) {
      cart.items = validCartItems;
      await cart.save();
    }

    // Populate cart items with product data
    const populatedCartItems = validCartItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity, // Use quantity from the cart, not the product
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populatedCartItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update cart item quantity

export const updateCartItemQuantity = async (req, res) => {
  const { userId, productId, action } = req.body;

  try {
    // Fetch the cart from the database (assuming you have a Cart model)
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId == productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Update quantity based on action
    if (action === "increase") {
      cart.items[itemIndex].quantity += 1;
    } else if (action === "decrease" && cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else if (action === "decrease" && cart.items[itemIndex].quantity === 1) {
      // Optionally: Remove item if quantity goes below 1
      cart.items.splice(itemIndex, 1);
    }

    // Recalculate the total price based on updated cart items
    cart.totalPrice = cart.items.reduce((acc, item) => {
      const productPrice = item.productId.salePrice || item.productId.price;
      return acc + item.quantity * productPrice;
    }, 0);

    // Save the updated cart
    await cart.save();

    // Return the updated cart
    const updatedCart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice quantity",
    });

    res.status(200).json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// remove from cart

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required",
      });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the index of the product in the cart items
    const product = cart.items.find(
      (item) => item.productId._id.toString() === productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart",
      });
    }

    // Remove the product from the cart by filtering it out
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    // Save the updated cart
    await cart.save();

    // re populate the cart and return full product details

    // Re-populate the cart and return full product details
    cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice quantity",
    });

    res.status(200).json({
      success: true,
      message: "Product removed from the cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
