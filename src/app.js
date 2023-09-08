//  imports

const express =  require('express');
const morgan =  require('morgan');
const cors = require('cors');
const http =  require('http');
const initialSocket = require('./socket.js')
// instancias
const app = express();