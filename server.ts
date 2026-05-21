import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";

// Initialize Stripe (mocking or using env var)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-04-22.dahlia',
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Stripe webhook must use raw body parser
  app.post(
    "/api/webhook/stripe",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];

      let event;
      try {
        // Validate webhook signature if secret exists
        if (process.env.STRIPE_WEBHOOK_SECRET && sig) {
          event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
          );
        } else {
          // Fallback for development without direct webhook secret
          event = JSON.parse(req.body.toString());
        }
      } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;
          const status = subscription.status; // 'active', 'trialing', 'canceled', etc.
          
          console.log(`Subscription for customer ${customerId} updated to: ${status}`);
          
          // In a real application, we would update the psychologist's record using the Supabase Service Role Key:
          /*
          import { createClient } from '@supabase/supabase-js';
          const supabaseAdmin = createClient(
            process.env.VITE_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          );
          
          const isPublic = (status === 'active' || status === 'trialing');

          await supabaseAdmin
            .from('psychologists')
            .update({ 
               subscription_status: status,
               is_public: isPublic
            })
            .eq('stripe_customer_id', customerId);
          */
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    }
  );

  // Parse JSON bodies for other routes
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For Express 4
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
