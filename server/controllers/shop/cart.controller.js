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

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId: product._id, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// fetch cart items
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

export const updateCartItemQuantity = async () => {
  try {
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
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the index of the product in the cart items
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart",
      });
    }

    // Remove the product from the cart
    cart.items.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

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
