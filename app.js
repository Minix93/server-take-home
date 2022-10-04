var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const db = require('./models');
const api = require('./controllers/api')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.get('/creator', api.getCreatorById);

/**
 * endpoint: "/campaign"
 *
 * function: get all campaigns to render the page
 */

app.route("/campaign")
    .get(api.getCampaign);

/**
 * endpoint: "/deletecampaign"
 *
 * function: delete the relationship between campaign and creator specified in the query
 *
 * params: publisher_id, campaign_id, remove_at
 */


app.route("/deletecampaign")
    .delete(api.deleteCampaign);

/**
 * endpoint: "/deletepublisher"
 *
 * function: delete the publisher that doesn't meet certain traffic breakdowns
 *
 */
app.route("/deletepublisher")
    .delete(api.deletePublisher);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
