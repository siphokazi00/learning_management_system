const stripe = require('stripe')('YOUR_SECRET_STRIPE_KEY'); // Replace with your actual secret key

exports.processPayment = async (req, res) => {
    const { amount, currency, source } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: source,
            confirm: true,
        });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ error: 'Payment processing error' });
    }
};
