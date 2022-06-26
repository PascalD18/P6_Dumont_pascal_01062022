const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const saucesRoutes = require('./routes/sauce');
//const userRoutes = require('./routes/user');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // Connexion de la base de données 'mongoose' - Projet PASCAL DUMONT 18 - Cluster0
mongoose.connect('mongodb+srv://Dpascal18-2:Mdpmondodbdpascal18-22022@cluster0.tqjqjtr.mongodb.net/?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/api/sauces', saucesRoutes);
//app.use('/api/auth', userRoutes);

module.exports = app;