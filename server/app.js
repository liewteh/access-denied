import express from "express";
import morgan from "morgan";
import path from "path";
import session from "cookie-session"
import router from "./api";
import { configuredHelmet, httpsOnly, logErrors, pushStateRouting } from "./middleware";

const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(logErrors());
app.use(morgan("dev"));
app.use(session({
	keys: ['keyboard cat'],
	name: 'session',
	maxAge: 24 * 60 * 60 * 1000,
  }))
  
  

if (app.get("env") === "production") {
  app.enable("trust proxy");
  app.use(httpsOnly());
}

app.use(apiRoot, router);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

export default app;
