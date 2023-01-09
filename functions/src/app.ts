//const functions = require("firebase-functions");
import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import Shopify, { ApiVersion } from "@shopify/shopify-api"
import { AuthQuery } from "@shopify/shopify-api";

const app = express();
dotenv.config();

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST, HOST_SCHEME } = process.env;

console.log(API_KEY);
console.log(API_SECRET_KEY);
console.log(SCOPES);
console.log(SHOP);
console.log(HOST);
console.log(HOST_SCHEME);

Shopify.Context.initialize({
  API_KEY: API_KEY ? API_KEY : "",
  API_SECRET_KEY: API_SECRET_KEY ? API_SECRET_KEY : "",
  SCOPES: SCOPES ? [SCOPES]: [],
  HOST_NAME: HOST ? HOST.replace(/https?:\/\//, ""): "",
  HOST_SCHEME,
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.July22 // all supported versions are available, as well as "unstable" and "unversioned"
});

const ACTIVE_SHOPIFY_SHOPS: { [key: string]: string | undefined } = {};

app.use(express.json());
app.use(cors());


app.get('/ping', (req, res) => {
    console.log(req.body);
    console.log('someone pinged here!!!')  
    res.send('pong')
})

app.get("/", async (req, res) => {
    if (SHOP !== undefined) {
        if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
            // not logged in, redirect to login
           res.redirect(`/login`);
         } else {
           res.send("Hello world!");
           // Load your app skeleton page with App Bridge, and do something amazing!
           res.end();
         }
    }
    // This shop hasn't been seen yet, go through OAuth to create a session
 });

app.get('/login', async (req, res) => {
    console.log("Login", SHOP)
    if (SHOP !== undefined) {
        let authRoute = await Shopify.Auth.beginAuth(
          req,
          res,
          SHOP,
          '/auth/callback',
          false,
        );
        console.log("login despues")
        return res.redirect(authRoute);
    }
});

app.get('/auth/callback', async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query as unknown as AuthQuery,
      ); // req.query must be cast to unkown and then AuthQuery in order to be accepted
      console.log("Callback", SHOP)
        ACTIVE_SHOPIFY_SHOPS["coffeemondoprueba1.myshopify.com"] = session.scope;
        console.log("Active Shopify shops", ACTIVE_SHOPIFY_SHOPS);
        console.log("Access token",session.accessToken);
        return res.redirect(`/products/${SHOP}/${session.accessToken}`); // wherever you want your user to end up after OAuth completes
    } catch (error) {
      console.error(error); // in practice these should be handled more gracefully
    }
  });

app.get('/products/:shop/:accessToken', async (req,res) => {
  const shop = req.params.shop
  const accesstoken = req.params.accessToken
    // Load the current session to get the `accessToken`.
    
    console.log("Entrando a productos");
    //const session = await Shopify.Utils.loadCurrentSession(req, res);
    // Create a new client for the specified shop.
    if (shop !== undefined && accesstoken !== undefined) {
        const client = new Shopify.Clients.Rest(shop, accesstoken);
        // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
        const response = await client.get<any>({
            path: 'products',
        });
        console.log("Respuesta",response.body.products)
        res.send(response.body.products)
    } else {
      res.send("Fallo con penita");
    }
   
})

app.listen(3000, () => {console.log("Esta vivo")})
//exports.app = functions.https.onRequest(app);


