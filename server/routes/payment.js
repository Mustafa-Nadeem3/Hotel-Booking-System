const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51Ne1tVHwxP60IDF4kCPimjoqxQe0sfJwmE7MHSGbK3e7w2mMHmM1Ntpnz0ANWrXGr9o5QC6TLQkafjXMnZOaT6oO00eIGuB1ne"
);

const storeItems = new Map([
  [1, { name: "Standard", price: 150000 }],
  [2, { name: "Deluxe", price: 250000 }],
  [3, { name: "Executive", price: 350000 }],
  [4, { name: "Business_Suite", price: 550000 }],
  [5, { name: "Deluxe_Suite", price: 750000 }],
]);

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const storeItem = storeItems.get(data.roomType);

    data.price = (storeItem.price * data.quantity) / 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.price,
          },
          quantity: data.quantity,
        },
      ],
      metadata: {
        check_in: data.checkIn,
        check_out: data.checkOut,
      },
      success_url: "http://localhost:3000/booking",
      cancel_url: "http://localhost:3000/booking?payment=cancel",
    });

    const session1 = await stripe.checkout.sessions.retrieve(session.id);
    console.log("Session status:", session1.payment_status);

    res.json({ id: session.id, url: session.url, booked: data });
  } catch (error) {
    console.error("Payment error:", error);
    console.log("Stripe error:", error.raw.message);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

module.exports = router;
