const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const swaggerConfig = require('./swaggerConfig');
const verifyToken = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/userAuth");
const contactRoutes = require("./routes/contactApi");
const methodOverride = require('method-override');
const groupRoutes = require("./routes/groupApi");

// dotenv pour les variables d'environnement
dotenv.config();

const app = express();

//Accédez à la documentation swagger depuis http://localhost:8090/docs
swaggerConfig(app);

// Middleware parsing first
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false })); // 🟢 must come before methodOverride
app.use(bodyParser.json());
app.use(methodOverride('_method')); // 🟢 now it can access req.body._method

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// DB connection
mongoose.connect(process.env.MONGO_CONNECTION, {})
    .then(() => console.log("Connexion à MongoDB a réussie"))
    .catch((error) => console.log("Connexion à MongoDB a échouée : " + error));

app.use('/api', verifyToken);

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.use("/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/group", groupRoutes);


app.listen(8090, () => {
    console.log(`Le serveur est démarré sur : http://localhost:8090`);
    console.log('Accédez à la doc api depus : http://localhost:8090/docs', '(ne renvoie pas de réponse json à cause des redirections)' );
});