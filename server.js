// Generated by CoffeeScript 1.6.3
(function() {
  var Router, WebServer, default_handler, first_handler, http, instance, router, url,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  http = require("http");

  url = require("url");

  Router = (function() {
    function Router(default_handler) {
      this.default_handler = default_handler;
      this.handlers = {};
    }

    Router.prototype.add_view = function(route, handler) {
      return this.handlers[route] = handler;
    };

    Router.prototype.dispatch = function(route, request, response) {
      if (route in this.handlers) {
        return this.handlers[route](request, response);
      } else {
        return this.default_handler(request, response);
      }
    };

    return Router;

  })();

  WebServer = (function() {
    function WebServer(port, router) {
      this.port = port;
      this.router = router;
      this.dispatch = __bind(this.dispatch, this);
    }

    WebServer.prototype.dispatch = function(request, response) {
      var pathname;
      pathname = url.parse(request.url).pathname;
      return this.router.dispatch(pathname, request, response);
    };

    WebServer.prototype.run = function() {
      return http.createServer(this.dispatch).listen(this.port);
    };

    return WebServer;

  })();

  default_handler = function(request, response) {
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write("Default handler");
    return response.end();
  };

  first_handler = function(request, response) {
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write("firsts handler");
    return response.end();
  };

  router = new Router(default_handler);

  router.add_view("/", first_handler);

  instance = new WebServer(8001, router);

  instance.run();

}).call(this);
