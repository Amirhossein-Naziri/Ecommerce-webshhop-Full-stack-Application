import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    console.log("req body",res.body)
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type:"pay",
        mode:"payment",
        payment_method_types:["card"],
        billing_address_collection:"auto",
        shipping_options:[
            {shipping_rate:"shr_1MZff8DvbBTo182AUP69OpL3"},
            {shipping_rate:"shr_1MZfgiDvbBTo182ARn388Uhc"}
            ],
        line_items: req.body.map((item)=>{
          const img = item.image[1].asset._ref;
          const newImage = img.replace("image-" , "https://cdn.sanity.io/images/b9mt7qjn/production/").replace("webp-" , ".webp");

          console.log("Image: ",newImage);

          return {
            price_data:{
              currency:"eur",
              product_data:{
                name:item.name,
                images:[newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity:{
              enabled:"true",
              minimum:1,
            },
            quantity:item.quantity
          }
        }),
        
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}