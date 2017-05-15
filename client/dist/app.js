angular.module('directives.gravatar', [])

// A simple directive to display a gravatar image given an email
.directive('gravatar', ['md5', function(md5) {

  return {
    restrict: 'E',
    template: '<img ng-src="http://www.gravatar.com/avatar/{{hash}}{{getParams}}"/>',
    replace: true,
    scope: {
      email: '=',
      size: '=',
      defaultImage: '=',
      forceDefault: '='
    },
    link: function(scope, element, attrs) {
      scope.options = {};
      scope.$watch('email', function(email) {
        if ( email ) {
          scope.hash = md5(email.trim().toLowerCase());
        }
      });
      scope.$watch('size', function(size) {
        scope.options.s = (angular.isNumber(size)) ? size : undefined;
        generateParams();
      });
      scope.$watch('forceDefault', function(forceDefault) {
        scope.options.f = forceDefault ? 'y' : undefined;
        generateParams();
      });
      scope.$watch('defaultImage', function(defaultImage) {
        scope.options.d = defaultImage ? defaultImage : undefined;
        generateParams();
      });
      function generateParams() {
        var options = [];
        scope.getParams = '';
        angular.forEach(scope.options, function(value, key) {
          if ( value ) {
            options.push(key + '=' + encodeURIComponent(value));
          }
        });
        if ( options.length > 0 ) {
          scope.getParams = '?' + options.join('&');
        }
      }
    }
  };
}])

.factory('md5', function() {
  function md5cycle(x, k) {
    var a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);

  }

  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }

  function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  function md51(s) {
    txt = '';
    var n = s.length,
      state = [1732584193, -271733879, -1732584194, 271733878],
      i;
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++) {
      tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    }
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) {
        tail[i] = 0;
      }
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }

  /* there needs to be support for Unicode here,
   * unless we pretend that we can redefine the MD-5
   * algorithm for multi-byte characters (perhaps
   * by adding every four 16-bit characters and
   * shortening the sum to 32 bits). Otherwise
   * I suggest performing MD-5 as if every character
   * was two bytes--e.g., 0040 0025 = @%--but then
   * how will an ordinary MD-5 sum be matched?
   * There is no way to standardize text to something
   * like UTF-8 before transformation; speed cost is
   * utterly prohibitive. The JavaScript standard
   * itself needs to look at this: it should start
   * providing access to strings as preformed UTF-8
   * 8-bit unsigned value arrays.
   */

  function md5blk(s) { /* I figured global was faster.   */
    var md5blks = [],
      i; /* Andy King said do it this way. */
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }

  var hex_chr = '0123456789abcdef'.split('');

  function rhex(n) {
    var s = '', j = 0;
    for (; j < 4; j++) {
      s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
    }
    return s;
  }

  function hex(x) {
    for (var i = 0; i < x.length; i++) {
      x[i] = rhex(x[i]);
    }
    return x.join('');
  }

  function md5(s) {
    return hex(md51(s));
  }

  /* this function is much faster,
  so if possible we use it. Some IEs
  are the only ones I know of that
  need the idiotic second function,
  generated by an if clause.  */

  add32 = function(a, b) {
    return (a + b) & 0xFFFFFFFF;
  };

  if (md5('hello') !== '5d41402abc4b2a76b9719d911017c592') {
    add32 = function (x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    };
  }

  return md5;
});
// A simple directive to handle server side form validation
// http://codetunes.com/2013/server-form-validation-with-angular/
angular.module('directives.serverError', [])
  .directive('serverError', [ function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      replace: true,
      link: function (scope, element, attrs, ctrl) {
        element.on('change', function(){
          scope.$apply(function(){
            ctrl.$setValidity('server', true);
          });
        });
      }
    };
  }]);

angular.module('security.authorization', ['security.service', 'config'])

// This service provides guard methods to support AngularJS routes.
// You can add them as resolves to routes to require authorization levels
// before allowing a route change to complete
.provider('securityAuthorization', {

  requireAdminUser: ['securityAuthorization', function(securityAuthorization) {
    return securityAuthorization.requireAdminUser();
  }],

  requireAuthenticatedUser: ['securityAuthorization', function(securityAuthorization) {
    return securityAuthorization.requireAuthenticatedUser();
  }],

  requireUnauthenticatedUser: ['securityAuthorization', function(securityAuthorization) {
    return securityAuthorization.requireUnauthenticatedUser();
  }],

  requireVerifiedUser: [ 'securityAuthorization', function(securityAuthorization){
    return securityAuthorization.requireVerifiedUser();
  }],

  requireUnverifiedUser: [ 'securityAuthorization', function(securityAuthorization){
    return securityAuthorization.requireUnverifiedUser();
  }],

  $get: ['$log', '$q', '$location', 'security', 'securityRetryQueue', 'REQUIRE_ACCOUNT_VERIFICATION', function($log, $q, $location, security, queue, requireAccountVerification) {
    var service = {

      // Require that there is an authenticated user
      // (use this in a route resolve to prevent non-authenticated users from entering that route)
      requireAuthenticatedUser: function() {
        var promise = security.requestCurrentUser().then(function(userInfo) {
          if ( !security.isAuthenticated() ) {
            return queue.pushRetryFn('unauthenticated-client', service.requireAuthenticatedUser);
          }
        });
        return promise;
      },

      requireUnauthenticatedUser: function(){
        var promise = security.requestCurrentUser().then(function(userInfo){
          if( security.isAuthenticated() ){
            return $q.reject('authenticated-client');
          }
        });
        return promise;
      },

      // Require that there is an administrator logged in
      // (use this in a route resolve to prevent non-administrators from entering that route)
      requireAdminUser: function() {
        var promise = security.requestCurrentUser().then(function(userInfo) {
          if ( !security.isAuthenticated() ) {
            return queue.pushRetryFn('unauthenticated-client', service.requireAdminUser);
          }else if( !security.isAdmin() ){
            return $q.reject('unauthorized-client');
          }
        });
        return promise;
      },

      requireVerifiedUser: function(){
        var promise = security.requestCurrentUser().then(function(userInfo){
          if( !security.isAuthenticated() ){
            return queue.pushRetryFn('unauthenticated-client', service.requireVerifiedUser);
          }
          if(requireAccountVerification && userInfo && !userInfo.isVerified){
            return $q.reject('unverified-client');
          }
        });
        return promise;
      },

      requireUnverifiedUser: function(){
        var promise = security.requestCurrentUser().then(function(userInfo){
          if( !security.isAuthenticated() ){
            return queue.pushRetryFn('unauthenticated-client', service.requireUnverifiedUser);
          }
          if(requireAccountVerification && userInfo && userInfo.isVerified){
            return $q.reject('verified-client');
          }
        });
        return promise;
      }

    };

    return service;
  }]
});
// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security', [
  'security.service',
  'security.interceptor',
  'security.login',
  'security.authorization']);

angular.module('security.interceptor', ['security.retryQueue'])

// This http interceptor listens for authentication failures
.factory('securityInterceptor', ['$q', '$log', '$injector', 'securityRetryQueue', function($q, $log, $injector, queue) {
  return {
    'responseError': function(response){
      if(response.status === 401){
        // The request bounced because it was not authorized - add a new request to the retry queue
        // and return a new promise that will be resolved or rejected after calling retryItem's retry or cancel method
        // eg. retryRequest is the retryFn that will be called later
        return queue.pushRetryFn('unauthorized-server', function retryRequest(){
          return $injector.get('$http')(response.config);
        });
      }
      //if not 401 then forward the error to next error handler
      return $q.reject(response);
    }
  };
  //return function(promise) {
  //  // Intercept failed requests
  //  return promise.then(null, function(originalResponse) {
  //    if(originalResponse.status === 401) {
  //      // The request bounced because it was not authorized - add a new request to the retry queue
  //      promise = queue.pushRetryFn('unauthorized-server', function retryRequest() {
  //        // We must use $injector to get the $http service to prevent circular dependency
  //        return $injector.get('$http')(originalResponse.config);
  //      });
  //    }
  //    return promise;
  //  });
  //};
}])

// We have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
.config(['$httpProvider', function($httpProvider) {
  //$httpProvider.responseInterceptors.push('securityInterceptor');
  $httpProvider.interceptors.push('securityInterceptor');
}]);
angular.module('security.login.form', ['services.localizedMessages', 'ui.bootstrap'])

// The LoginFormController provides the behaviour behind a reusable form to allow users to authenticate.
// This controller and its template (login/form.tpl.html) are used in a modal dialog box by the security service.
.controller('LoginFormController', ['$scope', 'security', 'localizedMessages', function($scope, security, localizedMessages) {
  // The model for this form 
  $scope.user = {};
  $scope.alerts = [{
    type: 'info',
    msg: 'Please enter your login details'
  }];
  // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
  // We could do something different for each reason here but to keep it simple...
  if(security.getLoginReason()){
    $scope.alerts.push({
      type: 'warning',
      msg: security.isAuthenticated()?
        localizedMessages.get('login.reason.notAuthorized') :
        localizedMessages.get('login.reason.notAuthenticated')
    });
  }

  // Attempt to authenticate the user specified in the form's model
  $scope.login = function() {
    // Clear any previous security errors
    $scope.alerts = [];

    // Try to login
    security.login($scope.user.email, $scope.user.password).then(function(data) {
      if ( !data.success ) {
        // If we get here then the login failed due to bad credentials
        $scope.alerts.push({
          type: 'danger',
          msg: localizedMessages.get('login.error.invalidCredentials')
        });
      }
    }, function(x) {
      // If we get here then there was a problem with the login request to the server
      $scope.alerts.push({
        type: 'danger',
        msg: localizedMessages.get('login.error.serverError', {exception: x})
      });
    });
  };

  $scope.clearForm = function() {
    $scope.user = {};
  };

  $scope.cancelLogin = function() {
    security.cancelLogin();
  };

  $scope.closeAlert = function(ind){
    $scope.alerts.splice(ind, 1);
  };
}]);

angular.module('security.login', ['security.login.form', 'security.login.toolbar']);
angular.module('security.login.toolbar', [])

// The loginToolbar directive is a reusable widget that can show login or logout buttons
// and information the current authenticated user
.directive('loginToolbar', ['security', function(security) {
  var directive = {
    templateUrl: 'security/login/toolbar.tpl.html',
    restrict: 'E',
    replace: true,
    scope: true,
    link: function($scope, $element, $attrs, $controller) {
      $scope.isAuthenticated = security.isAuthenticated;
      $scope.login = security.showLogin;
      $scope.logout = security.logout;
      $scope.$watch(function() {
        return security.currentUser;
      }, function(currentUser) {
        $scope.currentUser = currentUser;
      });
    }
  };
  return directive;
}]);
angular.module('security.retryQueue', [])

// This is a generic retry queue for security failures.  Each item is expected to expose two functions: retry and cancel.
.factory('securityRetryQueue', ['$q', '$log', function($q, $log) {
  var retryQueue = [];
  var service = {
    // The security service puts its own handler in here!
    onItemAddedCallbacks: [],
    
    hasMore: function() {
      return retryQueue.length > 0;
    },
    push: function(retryItem) {
      retryQueue.push(retryItem);
      // Call all the onItemAdded callbacks
      angular.forEach(service.onItemAddedCallbacks, function(cb) {
        try {
          cb(retryItem);
        } catch(e) {
          $log.error('securityRetryQueue.push(retryItem): callback threw an error' + e);
        }
      });
    },
    pushRetryFn: function(reason, retryFn) {
      // The reason parameter is optional
      if ( arguments.length === 1) {
        retryFn = reason;
        reason = undefined;
      }

      // The deferred object that will be resolved or rejected by calling retry or cancel
      var deferred = $q.defer();
      var retryItem = {
        reason: reason,
        retry: function() {
          // Wrap the result of the retryFn into a promise if it is not already
          $q.when(retryFn()).then(function(value) {
            // If it was successful then resolve our deferred
            deferred.resolve(value);
          }, function(value) {
            // Othewise reject it
            deferred.reject(value);
          });
        },
        cancel: function() {
          // Give up on retrying and reject our deferred
          deferred.reject();
        }
      };
      service.push(retryItem);
      return deferred.promise;
    },
    retryReason: function() {
      return service.hasMore() && retryQueue[0].reason;
    },
    cancelAll: function() {
      while(service.hasMore()) {
        retryQueue.shift().cancel();
      }
    },
    retryAll: function() {
      while(service.hasMore()) {
        retryQueue.shift().retry();
      }
    }
  };
  return service;
}]);

// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', [
  'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
  'security.login',         // Contains the login form template and controller
  'ui.bootstrap.modal'     // Used to display the login form as a modal dialog.
])

.factory('security', ['$http', '$q', '$location', 'securityRetryQueue', '$modal', function($http, $q, $location, queue, $modal) {

  // Redirect to the given url (defaults to '/')
  function redirect(url) {
    url = url || '/';
    $location.path(url);
  }

  // Login form dialog stuff
  var loginDialog = null;
  function openLoginDialog() {
    if ( loginDialog ) {
      throw new Error('Trying to open a dialog that is already open!');
    }
    //loginDialog = $modal.dialog();
    //loginDialog.open('security/login/form.tpl.html', 'LoginFormController').then(onLoginDialogClose);
    loginDialog = $modal.open({
      templateUrl: 'security/login/form.tpl.html',
      controller: 'LoginFormController'
    });
    loginDialog.result.then(onLoginDialogClose, onLoginDialogDismiss);
  }
  function closeLoginDialog(success) {
    if (loginDialog) {
      loginDialog.close(success);
    }
  }
  function dismissLoginDialog(reason){
    if(loginDialog){
      loginDialog.dismiss(reason);
    }
  }
  function onLoginDialogClose(success) {
    loginDialog = null;
    if ( success ) {
      queue.retryAll();
    } else {
      queue.cancelAll();
      redirect();
    }
  }
  //modal is dismissed because escape key press or mouse click outside
  function onLoginDialogDismiss(reason){
    loginDialog = null;
    queue.cancelAll();
    redirect();
  }

  // Register a handler for when an item is added to the retry queue
  queue.onItemAddedCallbacks.push(function(retryItem) {
    if ( queue.hasMore() ) {
      service.showLogin();
    }
  });

  function processResponse(res){
    return res.data;
  }

  function processError(e){
    var msg = [];
    if(e.status)         { msg.push(e.status); }
    if(e.statusText)     { msg.push(e.statusText); }
    if(msg.length === 0) { msg.push('Unknown Server Error'); }
    return $q.reject(msg.join(' '));
  }
  var deferredCurrentUser;

  // The public API of the service
  var service = {

    signup: function(data){
      return $http.post('/api/signup', data).then(processResponse, processError);
    },

    // Get the first reason for needing a login
    getLoginReason: function() {
      return queue.retryReason();
    },

    // Show the modal login dialog
    showLogin: function() {
      openLoginDialog();
    },

    socialDisconnect: function(provider){
      var url = '/api/account/settings/' + provider.toLowerCase() + '/disconnect';
      return $http.get(url).then(function(res){ return res.data; });
    },

    socialConnect: function(provider, code){
      var url = '/api/account/settings/' + provider.toLowerCase() + '/callback';
      if(code){
        url += '?code=' + code;
      }
      return $http.get(url).then(function(res){ return res.data; });
    },

    socialLogin: function(provider, code){
      var url = '/api/login/' + provider.toLowerCase() + '/callback';
      if(code){
        url += '?code=' + code;
      }
      var promise = $http.get(url).then(function(res){
        var data = res.data;
        if (data.success) {
          closeLoginDialog(true);
          service.currentUser = data.user;
        }
        return data;
      });
      return promise;
    },

    // Attempt to authenticate a user by the given username and password
    login: function(username, password) {
      var request = $http.post('/api/login', {
        username: username,
        password: password
      });
      return request.then(function(response) {
        var data = response.data;
        if(data.success){
          closeLoginDialog(true);
          service.currentUser = data.user;
        }
        return data;
      });
    },

    // Give up trying to login and clear the retry queue
    cancelLogin: function() {
      //closeLoginDialog(false);
      //redirect();
      dismissLoginDialog('cancel button clicked');
    },

    // Logout the current user and redirect
    logout: function(redirectTo) {
      $http.post('/api/logout').then(function() {
        service.currentUser = null;
        redirect('/login');
      });
    },

    loginForgot: function(data){
      return $http.post('/api/login/forgot', data).then(processResponse, processError);
    },

    loginReset: function(id, email, data){
      var url = '/api/login/reset/' + email + '/' + id;
      return $http.put(url, data).then(processResponse, processError);
    },

    // Ask the backend to see if a user is already authenticated - this may be from a previous session.
    requestCurrentUser: function() {
      if ( service.isAuthenticated() ) {
        // local currentUser is available
        return $q.when(service.currentUser);
      } else if(deferredCurrentUser) {
        // already an outstanding backend request for currentUser
        return deferredCurrentUser.promise;
      } else {
        // no outstanding backend call nor local currentUser
        deferredCurrentUser = $q.defer();
        $http.get('/api/current-user').then(function(response){
          service.currentUser = response.data.user;
          deferredCurrentUser.resolve(service.currentUser);
          deferredCurrentUser = null;
        }, function(x){
          deferredCurrentUser.reject(x);
          deferredCurrentUser = null;
        });
        return deferredCurrentUser.promise;
      }
    },

    setCurrentUser: function(user){
      service.currentUser = user;
    },

    // Information about the current user
    currentUser: null,

    // Is the current user authenticated?
    isAuthenticated: function(){
      return !!service.currentUser;
    },
    
    // Is the current user an administrator?
    isAdmin: function() {
      return !!(service.currentUser && service.currentUser.admin);
    }
  };

  return service;
}]);

angular.module('services.accountResource', ['security.service']).factory('accountResource', ['$http', '$q', '$log', 'security', function ($http, $q, $log, security) {
  // local variable
  var baseUrl = '/api';
  var processResponse = function(res){
    return res.data;
  };
  var processError = function(e){
    var msg = [];
    if(e.status)         { msg.push(e.status); }
    if(e.statusText)     { msg.push(e.statusText); }
    if(msg.length === 0) { msg.push('Unknown Server Error'); }
    return $q.reject(msg.join(' '));
  };
  // public api
  var resource = {};
  resource.sendMessage = function(data){
    return $http.post(baseUrl + '/sendMessage', data).then(processResponse, processError);
  };

  resource.getAccountDetails = function(){
    return $http.get(baseUrl + '/account/settings').then(processResponse, processError);
  };
  resource.setAccountDetails = function(data){
    return $http.put(baseUrl + '/account/settings', data).then(processResponse, processError);
  };
  resource.setIdentity = function(data){
    return $http.put(baseUrl + '/account/settings/identity', data).then(processResponse, processError);
  };
  resource.setPassword = function(data){
    return $http.put(baseUrl + '/account/settings/password', data).then(processResponse, processError);
  };

  resource.resendVerification = function(email){
    return $http.post(baseUrl + '/account/verification', {email: email}).then(processResponse, processError);
  };

  resource.upsertVerification = function(){
    return $http.get(baseUrl + '/account/verification').then(processResponse, processError);
  };

  resource.verifyAccount = function(token){
    return $http.get(baseUrl + '/account/verification/' + token)
      .then(processResponse, processError)
      .then(function(data){
        //this saves us another round trip to backend to retrieve the latest currentUser obj
        if(data.success && data.user){
          security.setCurrentUser(data.user);
        }
        return data;
      });
  };
  return resource;
}]);

angular.module('services.adminResource', []).factory('adminResource', ['$http', '$q', function ($http, $q) {
  // local variable
  var baseUrl = '/api';
  var userUrl = baseUrl + '/admin/users';
  var accountUrl = baseUrl + '/admin/accounts';
  var administratorUrl = baseUrl + '/admin/administrators';
  var adminGroupUrl = baseUrl + '/admin/admin-groups';
  var adminStatusesUrl = baseUrl + '/admin/statuses';
  var adminCategoriesUrl = baseUrl + '/admin/categories';

  var processResponse = function(res){
    return res.data;
  };
  var processError = function(e){
    var msg = [];
    if(e.status)         { msg.push(e.status); }
    if(e.statusText)     { msg.push(e.statusText); }
    if(msg.length === 0) { msg.push('Unknown Server Error'); }
    return $q.reject(msg.join(' '));
  };
  // public api
  var resource = {};
  resource.getStats = function(){
    return $http.get(baseUrl + '/admin').then(processResponse, processError);
  };
  resource.search = function(query){
    return $http.get(baseUrl + '/admin/search', { params: { q: query }} ).then(processResponse, processError);
  };

  // ----- users api -----
  resource.findUsers = function(filters){
    if(angular.equals({}, filters)){
      filters = undefined;
    }
    return $http.get(userUrl, { params: filters }).then(processResponse, processError);
  };
  resource.addUser = function(username){
    return $http.post(userUrl, { username: username }).then(processResponse, processResponse);
  };
  resource.findUser = function(_id){
    var url = userUrl + '/' + _id;
    return $http.get(url).then(processResponse, processError);
  };
  resource.updateUser = function(_id, data){
    var url = userUrl + '/' + _id;
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.setPassword = function(_id, data){
    var url = userUrl + '/' + _id + '/password';
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.linkAdmin = function(_id, data){
    var url = userUrl + '/' + _id + '/role-admin';
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.unlinkAdmin = function(_id){
    var url = userUrl + '/' + _id + '/role-admin';
    return $http.delete(url).then(processResponse, processError);
  };
  resource.linkAccount = function(_id, data){
    var url = userUrl + '/' + _id + '/role-account';
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.unlinkAccount = function(_id){
    var url = userUrl + '/' + _id + '/role-account';
    return $http.delete(url).then(processResponse, processError);
  };
  resource.deleteUser = function(_id){
    var url = userUrl + '/' + _id;
    return $http.delete(url).then(processResponse, processError);
  };

  // ----- accounts api -----
  resource.findAccounts = function(filters){
    if(angular.equals({}, filters)){
      filters = undefined;
    }
    return $http.get(accountUrl, { params: filters }).then(processResponse, processError);
  };
  resource.addAccount = function(fullname){
    return $http.post(accountUrl, { 'name.full': fullname }).then(processResponse, processResponse);
  };
  resource.findAccount = function(_id){
    var url = accountUrl + '/' + _id;
    return $http.get(url).then(processResponse, processError);
  };
  resource.updateAccount = function(_id, data){
    var url = accountUrl + '/' + _id;
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.linkUser = function(_id, data){
    var url = accountUrl + '/' + _id + '/user';
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.unlinkUser = function(_id){
    var url = accountUrl + '/' + _id + '/user';
    return $http.delete(url).then(processResponse, processError);
  };
  resource.newAccountNote = function(_id, data){
    var url = accountUrl + '/' + _id + '/notes';
    return $http.post(url, data).then(processResponse, processError);
  };
  resource.newAccountStatus = function(_id, data){
    var url = accountUrl + '/' + _id + '/status';
    return $http.post(url, data).then(processResponse, processError);
  };
  resource.deleteAccount = function(_id){
    var url = accountUrl + '/' + _id;
    return $http.delete(url).then(processResponse, processError);
  };

  // ----- administrators api -----
  resource.findAdministrators = function(filters){
    if(angular.equals({}, filters)){
      filters = undefined;
    }
    return $http.get(administratorUrl, { params: filters }).then(processResponse, processError);
  };
  resource.addAdministrator = function(fullname){
    return $http.post(administratorUrl, { 'name.full': fullname }).then(processResponse, processResponse);
  };
  resource.findAdministrator = function(_id){
    var url = administratorUrl + '/' + _id;
    return $http.get(url).then(processResponse, processError);
  };
  resource.updateAdministrator = function(_id, data){
    var url = administratorUrl + '/' + _id;
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.adminLinkUser = function(_id, data){
    var url = administratorUrl + '/' + _id + '/user';
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.adminUnlinkUser = function(_id){
    var url = administratorUrl + '/' + _id + '/user';
    return $http.delete(url).then(processResponse, processError);
  };
  resource.saveAdminGroups = function(_id, data){
    var url = administratorUrl + '/' + _id + '/groups';
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.saveAdminPermissions = function(_id, data){
    var url = administratorUrl + '/' + _id + '/permissions';
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.deleteAdministrator = function(_id){
    var url = administratorUrl + '/' + _id;
    return $http.delete(url).then(processResponse, processError);
  };

  // ----- admin-groups api -----
  resource.findAdminGroups = function(filters){
    if(angular.equals({}, filters)){
      filters = undefined;
    }
    return $http.get(adminGroupUrl, { params: filters }).then(processResponse, processError);
  };
  resource.addAdminGroup = function(name){
    return $http.post(adminGroupUrl, { name: name }).then(processResponse, processResponse);
  };
  resource.findAdminGroup = function(_id){
    var url = adminGroupUrl + '/' + _id;
    return $http.get(url).then(processResponse, processError);
  };
  resource.updateAdminGroup = function(_id, data){
    var url = adminGroupUrl + '/' + _id;
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.saveAdminGroupPermissions = function(_id, data){
    var url = adminGroupUrl + '/' + _id + '/permissions';
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.deleteAdminGroup = function(_id){
    var url = adminGroupUrl + '/' + _id;
    return $http.delete(url).then(processResponse, processError);
  };

  // ----- statuses api -----
  resource.findStatuses = function(filters){
    if(angular.equals({}, filters)){
      filters = undefined;
    }
    return $http.get(adminStatusesUrl, { params: filters }).then(processResponse, processError);
  };
  resource.addStatus = function(data){
    return $http.post(adminStatusesUrl, data).then(processResponse, processResponse);
  };
  resource.findStatus = function(_id){
    var url = adminStatusesUrl + '/' + _id;
    return $http.get(url).then(processResponse, processError);
  };
  resource.updateStatus = function(_id, data){
    var url = adminStatusesUrl + '/' + _id;
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.deleteStatus = function(_id){
    var url = adminStatusesUrl + '/' + _id;
    return $http.delete(url).then(processResponse, processError);
  };

  // ----- categories api -----
  resource.findCategories = function(filters){
    if(angular.equals({}, filters)){
      filters = undefined;
    }
    return $http.get(adminCategoriesUrl, { params: filters }).then(processResponse, processError);
  };
  resource.addCategory = function(data){
    return $http.post(adminCategoriesUrl, data).then(processResponse, processResponse);
  };
  resource.findCategory = function(_id){
    var url = adminCategoriesUrl + '/' + _id;
    return $http.get(url).then(processResponse, processError);
  };
  resource.updateCategory = function(_id, data){
    var url = adminCategoriesUrl + '/' + _id;
    return $http.put(url, data).then(processResponse, processError);
  };
  resource.deleteCategory = function(_id){
    var url = adminCategoriesUrl + '/' + _id;
    return $http.delete(url).then(processResponse, processError);
  };
  return resource;
}]);

angular.module('services.httpRequestTracker', []);
angular.module('services.httpRequestTracker').factory('httpRequestTracker', ['$http', function($http){

  var httpRequestTracker = {};
  httpRequestTracker.hasPendingRequests = function() {
    return $http.pendingRequests.length > 0;
  };

  return httpRequestTracker;
}]);
angular.module('services.i18nNotifications', ['services.notifications', 'services.localizedMessages']);
angular.module('services.i18nNotifications').factory('i18nNotifications', ['localizedMessages', 'notifications', function (localizedMessages, notifications) {

  var prepareNotification = function(msgKey, type, interpolateParams, otherProperties) {
     return angular.extend({
       message: localizedMessages.get(msgKey, interpolateParams),
       type: type
     }, otherProperties);
  };

  var I18nNotifications = {
    pushSticky:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushSticky(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    pushForCurrentRoute:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushForCurrentRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    pushForNextRoute:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushForNextRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    getCurrent:function () {
      return notifications.getCurrent();
    },
    remove:function (notification) {
      return notifications.remove(notification);
    }
  };

  return I18nNotifications;
}]);
angular.module('services.localizedMessages', []).factory('localizedMessages', ['$interpolate', 'I18N.MESSAGES', function ($interpolate, i18nmessages) {

  var handleNotFound = function (msg, msgKey) {
    return msg || '?' + msgKey + '?';
  };

  return {
    get : function (msgKey, interpolateParams) {
      var msg =  i18nmessages[msgKey];
      if (msg) {
        return $interpolate(msg)(interpolateParams);
      } else {
        return handleNotFound(msg, msgKey);
      }
    }
  };
}]);
angular.module('services.notifications', []).factory('notifications', ['$rootScope', function ($rootScope) {

  var notifications = {
    'STICKY' : [],
    'ROUTE_CURRENT' : [],
    'ROUTE_NEXT' : []
  };
  var notificationsService = {};

  var addNotification = function (notificationsArray, notificationObj) {
    if (!angular.isObject(notificationObj)) {
      throw new Error("Only object can be added to the notification service");
    }
    notificationsArray.push(notificationObj);
    return notificationObj;
  };

  $rootScope.$on('$routeChangeSuccess', function () {
    notifications.ROUTE_CURRENT.length = 0;

    notifications.ROUTE_CURRENT = angular.copy(notifications.ROUTE_NEXT);
    notifications.ROUTE_NEXT.length = 0;
  });

  notificationsService.getCurrent = function(){
    return [].concat(notifications.STICKY, notifications.ROUTE_CURRENT);
  };

  notificationsService.pushSticky = function(notification) {
    return addNotification(notifications.STICKY, notification);
  };

  notificationsService.pushForCurrentRoute = function(notification) {
    return addNotification(notifications.ROUTE_CURRENT, notification);
  };

  notificationsService.pushForNextRoute = function(notification) {
    return addNotification(notifications.ROUTE_NEXT, notification);
  };

  notificationsService.remove = function(notification){
    angular.forEach(notifications, function (notificationsByType) {
      var idx = notificationsByType.indexOf(notification);
      if (idx>-1){
        notificationsByType.splice(idx,1);
      }
    });
  };

  notificationsService.removeAll = function(){
    angular.forEach(notifications, function (notificationsByType) {
      notificationsByType.length = 0;
    });
  };

  return notificationsService;
}]);
'use strict';
// alert('inside service out')
console.log('inside service out')
angular.module('services.PostsFactory', ['ngResource'])
angular.module('services.PostsFactory')
.constant("baseURL", 'http://localhost:3000/')
.factory('PostsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        console.log(document.URL)
        var parts = document.URL.split('/')
        console.log('parts ', parts);
        var Id = parts[4]
        console.log(baseURL);
        return $resource(baseURL + "posts", null, {
            'update': {
                method: 'PUT'
            }
        });

}])


angular.module('services.utility', []).factory('utility', [function () {

  var utility = {};
  utility.hasError = function(ngModelCtrl){
    return ngModelCtrl.$dirty && ngModelCtrl.$invalid;
  };
  utility.showError = function(ngModelCtrl, err){
    return ngModelCtrl.$dirty && ngModelCtrl.$error[err];
  };
  utility.canSave = function(ngFormCtrl){
    return ngFormCtrl.$dirty && ngFormCtrl.$valid;
  };
  return utility;
}]);
angular.module('account.index', ['ngRoute', 'security.authorization']);
angular.module('account.index').config(['$routeProvider', 'securityAuthorizationProvider', function($routeProvider, securityAuthorizationProvider){
  $routeProvider
    .when('/account', {
      templateUrl: 'account/account.tpl.html',
      controller: 'AccountCtrl',
      title: 'Account Area',
      resolve: {
        authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
      }
    });
}]);
angular.module('account.index').controller('AccountCtrl', [ '$scope',
  function($scope){
    $scope.dayOfYear = moment().format('DDD');
    $scope.dayOfMonth = moment().format('D');
    $scope.weekOfYear = moment().format('w');
    $scope.dayOfWeek = moment().format('d');
    $scope.weekYear = moment().format('gg');
    $scope.hourOfDay = moment().format('H');
  }]);

angular.module('account', [
  'account.index',
  'account.settings',
  'account.verification'
]);
angular.module('account.settings', ['config', 'account.settings.social', 'security.service', 'security.authorization', 'services.accountResource', 'services.utility','ui.bootstrap', 'directives.serverError']);
angular.module('account.settings').config(['$routeProvider', 'securityAuthorizationProvider', function($routeProvider){
  $routeProvider
    .when('/account/settings', {
      templateUrl: 'account/settings/account-settings.tpl.html',
      controller: 'AccountSettingsCtrl',
      title: 'Account Settings',
      resolve: {
        accountDetails: ['$q', '$location', 'securityAuthorization', 'accountResource' ,function($q, $location, securityAuthorization, accountResource){
          //get account details only for verified-user, otherwise redirect to /account/verification
          var redirectUrl;
          var promise = securityAuthorization.requireVerifiedUser()
            .then(accountResource.getAccountDetails, function(reason){
              //rejected either user is unverified or un-authenticated
              redirectUrl = reason === 'unverified-client'? '/account/verification': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('account.settings').controller('AccountSettingsCtrl', [ '$scope', '$location', '$log', 'security', 'utility', 'accountResource', 'accountDetails', 'SOCIAL',
  function($scope, $location, $log, security, utility, restResource, accountDetails, SOCIAL){
    //local vars
    var account = accountDetails.account;
    var user = accountDetails.user;
    var submitDetailForm = function(){
      $scope.alerts.detail = [];
      restResource.setAccountDetails($scope.userDetail).then(function(data){
        if(data.success){
          $scope.alerts.detail.push({
            type: 'success',
            msg: 'Account detail is updated.'
          });
        }else{
          angular.forEach(data.errors, function(err, index){
            $scope.alerts.detail.push({
              type: 'danger',
              msg: err
            });
          });
        }
      }, function(x){
        $scope.alerts.detail.push({
          type: 'danger',
          msg: 'Error updating account details: ' + x
        });
      });
    };

    var submitIdentityForm = function(){
      $scope.alerts.identity = [];
      restResource.setIdentity($scope.user).then(function(data){
        if(data.success){
          $scope.alerts.identity.push({
            type: 'success',
            msg: 'User identity is updated.'
          });
        }else{
          //error due to server side validation
          $scope.errfor = data.errfor;
          angular.forEach(data.errfor, function(err, field){
            $scope.identityForm[field].$setValidity('server', false);
          });
          angular.forEach(data.errors, function(err, index){
            $scope.alerts.identity.push({
              type: 'danger',
              msg: err
            });
          });
        }
      }, function(x){
        $scope.alerts.identity.push({
          type: 'danger',
          msg: 'Error updating user identity: ' + x
        });
      });
    };

    var submitPasswordForm = function(){
      $scope.alerts.pass = [];
      restResource.setPassword($scope.pass).then(function(data){
        $scope.pass = {};
        $scope.passwordForm.$setPristine();
        if(data.success){
          $scope.alerts.pass.push({
            type: 'success',
            msg: 'Password is updated.'
          });
        }else{
          //error due to server side validation
          angular.forEach(data.errors, function(err, index){
            $scope.alerts.pass.push({
              type: 'danger',
              msg: err
            });
          });
        }
      }, function(x){
        $scope.alerts.pass.push({
          type: 'danger',
          msg: 'Error updating password: ' + x
        });
      });
    };

    var disconnect = function(provider){
      var errorAlert = {
        type: 'warning',
        msg: 'Error occurred when disconnecting your '+ provider + ' account. Please try again later.'
      };
      $scope.socialAlerts = [];
      security.socialDisconnect(provider).then(function(data){
        if(data.success){
          $scope.social[provider]['connected'] = false;
          $scope.socialAlerts.push({
            type: 'info',
            msg: 'Successfully disconnected your '+ provider +' account.'
          });
        }else{
          $scope.socialAlerts.push(errorAlert);
        }
      }, function(x){
        $scope.socialAlerts.push(errorAlert);
      });
    };

    //model def
    $scope.errfor = {}; //for identity server-side validation
    $scope.alerts = {
      detail: [], identity: [], pass: []
    };
    $scope.userDetail = {
      first:  account.name.first,
      middle: account.name.middle,
      last:   account.name.last,
      company:account.company,
      phone:  account.phone,
      zip:    account.zip
    };
    $scope.user = {
      username: user.username,
      email:    user.email
    };
    $scope.pass = {};
    $scope.social = null;
    if(!angular.equals({}, SOCIAL)){
      $scope.social = SOCIAL;
      if(user.google && user.google.id){
        $scope.social.google.connected = true;
      }
      if(user.facebook && user.facebook.id){
        $scope.social.facebook.connected = true;
      }
    }

    $scope.socialAlerts = [];

    //initial behavior
    var search = $location.search();
    if(search.provider){
      if(search.success === 'true'){
        $scope.socialAlerts.push({
          type: 'info',
          msg: 'Successfully connected your '+ search.provider +' account.'
        });
      }else{
        $scope.socialAlerts.push({
          type: 'warning',
          msg: 'Unable to connect your '+ search.provider + ' account. ' + search.reason
        });
      }
    }

    // method def
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.canSave = utility.canSave;
    $scope.closeAlert = function(key, ind){
      $scope.alerts[key].splice(ind, 1);
    };
    $scope.closeSocialAlert = function(ind){
      $scope.socialAlerts.splice(ind, 1);
    };
    $scope.submit = function(ngFormCtrl){
      switch (ngFormCtrl.$name){
        case 'detailForm':
          submitDetailForm();
          break;
        case 'identityForm':
          submitIdentityForm();
          break;
        case 'passwordForm':
          submitPasswordForm();
          break;
        default:
          return;
      }
    };
    $scope.disconnect = function(provider){
      if($scope.social){
        disconnect(provider);
      }
    };
  }
]);

angular.module('account.settings.social.facebook', ['security']);
angular.module('account.settings.social.facebook').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/account/settings/facebook/callback', {
      resolve: {
        connect: ['$log', '$q', '$location', '$route', 'security', function($log, $q, $location, $route, security){
          var code = $route.current.params.code || '';
          var search = {};
          var promise = security.socialConnect('facebook', code)
            .then(function(data){
              if(data.success){
                search.success = 'true';
              }else{
                search.success = 'false';
                search.reason = data.errors[0];
              }
              return $q.reject();
            })
            .catch(function(){
              search.provider = 'facebook';
              search.success = search.success || 'false';
              $location.search({}); //remove search param "code" added by facebook
              $location.search(search);
              $location.path('/account/settings');
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    });
}]);
angular.module('account.settings.social.google', ['security']);
angular.module('account.settings.social.google').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/account/settings/google/callback', {
      resolve: {
        connect: ['$log', '$q', '$location', '$route', 'security', function($log, $q, $location, $route, security){
          var code = $route.current.params.code || '';
          var search = {};
          var promise = security.socialConnect('google', code)
            .then(function(data){
              if(data.success){
                search.success = 'true';
              }else{
                search.success = 'false';
                search.reason = data.errors[0];
              }
              return $q.reject();
            })
            .catch(function(){
              search.provider = 'google';
              search.success = search.success || 'false';
              $location.search({}); //remove search param "code" added by google
              $location.search(search);
              $location.path('/account/settings');
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    });
}]);
angular.module('account.settings.social', [
  'account.settings.social.google',
  'account.settings.social.facebook'
]);
angular.module('account.verification', ['security', 'services.utility', 'services.accountResource', 'directives.serverError', 'ui.bootstrap']);
angular.module('account.verification').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/account/verification', {
      templateUrl: 'account/verification/account-verification.tpl.html',
      controller: 'AccountVerificationCtrl',
      title: 'Verification Required',
      resolve: {
        upsertVerificationToken: ['$q', '$location', 'accountResource', 'securityAuthorization', function($q, $location, restResource, securityAuthorization){
          //lazy upsert verification only for un-verified user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireUnverifiedUser()
            .then(restResource.upsertVerification, function(reason){
              //rejected either user is verified already or isn't authenticated
              redirectUrl = reason === 'verified-client'? '/account': '/login';
              return $q.reject();
            })
            .then(function(data){
              if(!data.success){
                return $q.reject();
              }
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise; //promise resolved if data.success == true
        }]
      }
    })
    .when('/account/verification/:token', {
      resolve: {
        verify: ['$q', '$location', '$route', 'accountResource', 'securityAuthorization', function($q, $location, $route, restResource, securityAuthorization){
          //attemp to verify account only for un-verified user
          var redirectUrl;
          var promise = securityAuthorization.requireUnverifiedUser()
            .then(function(){
              return restResource.verifyAccount($route.current.params.token);
            }, function(){
              redirectUrl = '/account';
              return $q.reject();
            })
            .then(function(data){
              if(data.success) {
                redirectUrl = '/account';
              }
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account/verification';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise; //promise never resolves, will always redirect
        }]
      }
    })
  ;
}]);
angular.module('account.verification').controller('AccountVerificationCtrl', [ '$scope', '$location', '$log', 'accountResource', 'security', 'utility',
  function($scope, $location, $log, restResource, security, utility){
    //model def
    $scope.formVisible = false;
    $scope.email = security.currentUser.email;
    $scope.errfor = {}; //for email server-side validation
    $scope.alerts = [];

    // method def
    $scope.showForm = function(){
      $scope.formVisible = true;
    };
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.closeAlert = function(ind){
      $scope.alerts.splice(ind, 1);
    };
    $scope.submit = function(){
      $scope.alerts = [];
      restResource.resendVerification($scope.email).then(function (data) {
        if (data.success) {
          $scope.alerts.push({
            type: 'success',
            msg: 'Verification email successfully re-sent.'
          });
          $scope.formVisible = false;
          $scope.verificationForm.$setPristine();
        } else {
          //error due to server side validation
          $scope.errfor = data.errfor;
          angular.forEach(data.errfor, function (err, field) {
            $scope.verificationForm[field].$setValidity('server', false);
          });
        }
      }, function (x) {
        $scope.alerts.push({
          type: 'danger',
          msg: 'Error sending verification email: ' + x
        });
      });
    };
  }
]);

angular.module('admin.accounts.detail', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'directives.serverError', 'ui.bootstrap']);
angular.module('admin.accounts.detail').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/accounts/:id', {
      templateUrl: 'admin/accounts/admin-account.tpl.html',
      controller: 'AccountsDetailCtrl',
      title: 'Accounts / Details',
      resolve: {
        account: ['$q', '$route', '$location', 'securityAuthorization', 'adminResource', function($q, $route, $location, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              var id = $route.current.params.id || '';
              if(id){
                return adminResource.findAccount(id);
              }else{
                redirectUrl = '/admin/accounts';
                return $q.reject();
              }
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('admin.accounts.detail').controller('AccountsDetailCtrl', ['$scope', '$route', '$location', 'utility', 'adminResource', 'account',
  function($scope, $route, $location, utility, adminResource, data) {
    // local vars
    var deserializeData = function(data){
      $scope.statuses = data.statuses;
      deserializeAccount(data.record);
    };
    var deserializeAccount = function(account){
      $scope.account = account;
      $scope.selectedStatus = {
        "_id": account.status.id,
        "name": account.status.name
      };
    };
    var closeAlert = function(alert, ind){
      alert.splice(ind, 1);
    };

    // $scope vars
    $scope.contactAlerts = [];
    $scope.loginAlerts = [];
    $scope.deleteAlerts = [];
    $scope.statusAlerts = [];
    $scope.noteAlerts = [];
    $scope.canSave = utility.canSave;
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.closeContactAlert = function(ind){
      closeAlert($scope.contactAlerts, ind);
    };
    $scope.closeLoginAlert = function(ind){
      closeAlert($scope.loginAlerts, ind);
    };
    $scope.closeDeleteAlert = function(ind){
      closeAlert($scope.deleteAlerts, ind);
    };
    $scope.closeStatusAlert = function(ind){
      closeAlert($scope.statusAlerts, ind);
    };
    $scope.closeNoteAlert = function(ind){
      closeAlert($scope.noteAlerts, ind);
    };
    $scope.formatTime = function(timestamp, replace){
      var res = moment(timestamp).from();
      return replace? res.replace('ago', replace): res;
    };
    $scope.updateAccount = function(){
      var data = {
        first:   $scope.account.name.first,
        middle:  $scope.account.name.middle,
        last:    $scope.account.name.last,
        company: $scope.account.company,
        phone:   $scope.account.phone,
        zip:     $scope.account.zip
      };
      $scope.contactAlerts = [];
      adminResource.updateAccount($scope.account._id, data).then(function(result){
        if(result.success){
          deserializeAccount(result.account);
          $scope.contactAlerts.push({ type: 'info', msg: 'Changes have been saved.'});
        }else{
          angular.forEach(result.errors, function(err, index){
            $scope.contactAlerts.push({ type: 'danger', msg: err });
          });
        }
      }, function(x){
        $scope.contactAlerts.push({ type: 'danger', msg: 'Error updating account: ' + x });
      });
    };
    $scope.linkUser = function () {
      $scope.loginAlerts = [];
      var newUsername = $scope.account.newUsername;
      $scope.account.newUsername = '';
      adminResource.linkUser($scope.account._id, { newUsername: newUsername }).then(function (result) {
        $scope.loginForm.$setPristine();
        if (result.success) {
          deserializeAccount(result.account);
        } else {
          angular.forEach(result.errors, function (err, index) {
            $scope.loginAlerts.push({ type: 'danger', msg: err });
          });
        }
      }, function (x) {
        $scope.loginAlerts.push({ type: 'danger', msg: 'Error linking user: ' + x });
      });
    };
    $scope.unlinkUser = function () {
      $scope.loginAlerts = [];
      if (confirm('Are you sure?')) {
        adminResource.unlinkUser($scope.account._id).then(function (result) {
          if (result.success) {
            deserializeAccount(result.account);
          } else {
            angular.forEach(result.errors, function (err, index) {
              $scope.loginAlerts.push({type: 'danger', msg: err});
            });
          }
        }, function (x) {
          $scope.loginAlerts.push({ type: 'danger', msg: 'Error unlinking user: ' + x });
        });
      }
    };
    $scope.deleteAccount = function(){
      $scope.deleteAlerts =[];
      if(confirm('Are you sure?')){
        adminResource.deleteAccount($scope.account._id).then(function(result){
          if(result.success){
            // redirect to admin users index page
            $location.path('/admin/accounts');
          }else{
            //error due to server side validation
            angular.forEach(result.errors, function(err, index){
              $scope.deleteAlerts.push({ type: 'danger', msg: err});
            });
          }
        }, function(x){
          $scope.deleteAlerts.push({ type: 'danger', msg: 'Error deleting account: ' + x });
        });
      }
    };
    $scope.changeStatus = function(){
      $scope.statusAlerts = [];
      if($scope.selectedStatus && $scope.selectedStatus._id){
        if($scope.selectedStatus._id === $scope.account.status.id){
          // status selected is the current status
          $scope.statusAlerts.push({ type: 'danger', msg: 'That is the current status.'});
        }else{
          // update status
          var data = {
            id: $scope.selectedStatus._id,
            name: $scope.selectedStatus.name
          };
          adminResource.newAccountStatus($scope.account._id, data).then(function(result){
            if(result.success){
              deserializeAccount(result.account);
            }else{
              //error due to server side validation
              angular.forEach(result.errors, function(err, index){
                $scope.statusAlerts.push({ type: 'danger', msg: err});
              });
            }
          }, function(x){
            $scope.statusAlerts.push({ type: 'danger', msg: 'Error adding new status: ' + x});
          });
        }
      }else{ //no status is selected
        $scope.statusAlerts.push({ type: 'danger', msg: 'Please choose a status.'});
      }
    };
    $scope.addNote = function(){
      $scope.noteAlerts = [];
      if($scope.newNote){
        var data = { data: $scope.newNote };
        $scope.newNote = undefined;  //reset $scope.newNote
        adminResource.newAccountNote($scope.account._id, data).then(function(result){
          if(result.success){
            deserializeAccount(result.account);
          }else{
            //error due to server side validation
            angular.forEach(result.errors, function(err, index){
              $scope.noteAlerts.push({ type: 'danger', msg: err});
            });
          }
        }, function(x){
          $scope.noteAlerts.push({ type: 'danger', msg: 'Error adding new note: ' + x});
        });
      }else{
        // new note is empty
        $scope.noteAlerts.push({ type: 'danger', msg: 'Please enter some notes.' });
      }
    };
    //initialize
    deserializeData(data);
  }
]);
angular.module('admin.accounts.index', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource']);
angular.module('admin.accounts.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/accounts', {
      templateUrl: 'admin/accounts/admin-accounts.tpl.html',
      controller: 'AccountsIndexCtrl',
      title: 'Manage Accounts',
      resolve: {
        accounts: ['$q', '$location', '$log', 'securityAuthorization', 'adminResource', function($q, $location, $log, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              //handles url with query(search) parameter
              return adminResource.findAccounts($location.search());
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.search({});
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    });
}]);
angular.module('admin.accounts.index').controller('AccountsIndexCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'accounts',
  function($scope, $route, $location, $log, utility, adminResource, data){
    //// local var
    var deserializeData = function(data){
      var results = data.results;
      $scope.statuses = data.statuses;
      $scope.items = results.items;
      $scope.pages = results.pages;
      $scope.filters = results.filters;
      $scope.accounts = results.data;
    };

    var fetchAccounts = function(){
      adminResource.findAccounts($scope.filters).then(function(data){
        deserializeData(data);

        // update url in browser addr bar
        $location.search($scope.filters);
      }, function(e){
        $log.error(e);
      });
    };

    // $scope methods
    $scope.canSave = utility.canSave;
    $scope.formatTime = function(timestamp, replace){
      var res = moment(timestamp).from();
      return replace? res.replace('ago', replace): res;
    };
    $scope.filtersUpdated = function(){
      //reset pagination after filter(s) is updated
      $scope.filters.page = undefined;
      fetchAccounts();
    };
    $scope.prev = function(){
      $scope.filters.page = $scope.pages.prev;
      fetchAccounts();
    };
    $scope.next = function(){
      $scope.filters.page = $scope.pages.next;
      fetchAccounts();
    };
    $scope.addAccount = function(){
      adminResource.addAccount($scope.fullname).then(function(data){
        $scope.fullname = '';
        if(data.success){
          $route.reload();
        }else if (data.errors && data.errors.length > 0){
          alert(data.errors[0]);
        }else {
          alert('unknown error.');
        }
      }, function(e){
        $scope.fullname = '';
        $log.error(e);
      });
    };

    // $scope vars
    //select elements and their associating options
    $scope.statuses = [];
    $scope.sorts = [
      {label: "id \u25B2", value: "_id"},
      {label: "id \u25BC", value: "-_id"},
      {label: "name \u25B2", value: "name"},
      {label: "name \u25BC", value: "-name"},
      {label: "company \u25B2", value: "company"},
      {label: "company \u25BC", value: "-company"}
    ];
    $scope.limits = [
      {label: "10 items", value: 10},
      {label: "20 items", value: 20},
      {label: "50 items", value: 50},
      {label: "100 items", value: 100}
    ];

    //initialize $scope variables
    deserializeData(data);
  }
]);
angular.module('admin.accounts', [
  'admin.accounts.index',
  'admin.accounts.detail'
]);
angular.module('admin.admin-groups.detail', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'directives.serverError', 'ui.bootstrap']);
angular.module('admin.admin-groups.detail').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/admin-groups/:id', {
      templateUrl: 'admin/admin-groups/admin-group.tpl.html',
      controller: 'AdminGroupsDetailCtrl',
      title: 'Admin Groups / Details',
      resolve: {
        group: ['$q', '$route', '$location', 'securityAuthorization', 'adminResource', function($q, $route, $location, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              var id = $route.current.params.id || '';
              if(id){
                return adminResource.findAdminGroup(id);
              }else{
                redirectUrl = '/admin/admin-groups';
                return $q.reject();
              }
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('admin.admin-groups.detail').controller('AdminGroupsDetailCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'group',
  function($scope, $route, $location, $log, utility, adminResource, data) {
    // local vars
    var deserializeData = function(data){
      $scope.group = data;
    };
    var closeAlert = function(alert, ind){
      alert.splice(ind, 1);
    };
    var isExistingPermission = function(newPermission){
      var flag = false;
      angular.forEach($scope.group.permissions, function(permission, ind){
        if(permission.name === newPermission){
          flag = true;
        }
      });
      return flag;
    };
    //$scope vars
    $scope.detailAlerts = [];
    $scope.deleteAlerts = [];
    $scope.permissionAlerts = [];
    $scope.canSave = utility.canSave;
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.closeDetailAlert = function(ind){
      closeAlert($scope.detailAlerts, ind);
    };
    $scope.closeDeleteAlert = function(ind){
      closeAlert($scope.deleteAlerts, ind);
    };
    $scope.closePermissionAlert = function(ind){
      closeAlert($scope.permissionAlerts, ind);
    };
    $scope.update = function(){
      $scope.detailAlerts = [];
      adminResource.updateAdminGroup($scope.group._id, { name: $scope.group.name }).then(function(result){
        if(result.success){
          deserializeData(result.adminGroup);
          $scope.detailAlerts.push({ type: 'info', msg: 'Changes have been saved.'});
        }else{
          angular.forEach(result.errors, function(err, index){
            $scope.detailAlerts.push({ type: 'danger', msg: err });
          });
        }
      }, function(x){
        $scope.detailAlerts.push({ type: 'danger', msg: 'Error updating admin group: ' + x });
      });
    };
    $scope.addPermission = function(){
      if(!$scope.newPermission){
        alert('Please enter a name.');
      } else if(isExistingPermission($scope.newPermission)){
        alert('That name already exists.');
      }else{
        $scope.group.permissions.push({
          name: angular.copy($scope.newPermission),
          permit: true
        });
      }
      $scope.newPermission = null;  //reset newPermission after user interaction
    };
    $scope.togglePermission = function(index){
      $scope.group.permissions[index]['permit'] = !$scope.group.permissions[index]['permit'];
    };
    $scope.deletePermission = function(index){
      if(confirm('Are you sure?')){
        $scope.group.permissions.splice(index, 1);
      }
    };
    $scope.saveSettings = function(){
      $scope.permissionAlerts = [];
      var permissions = $scope.group.permissions;
      adminResource.saveAdminGroupPermissions($scope.group._id, {permissions: permissions}).then(function (result) {
        if (result.success) {
          $scope.permissionAlerts.push({type: 'info', msg: 'Changes have been saved.'});
          deserializeData(result.adminGroup);
        } else {
          //error due to server side validation
          angular.forEach(result.errors, function (err, index) {
            $scope.permissionAlerts.push({type: 'danger', msg: err});
          });
        }
      }, function (x) {
        $scope.permissionAlerts.push({type: 'danger', msg: 'Error saving admin group permissions: ' + x});
      });
    };
    $scope.deleteAdminGroup = function(){
      $scope.deleteAlerts =[];
      if(confirm('Are you sure?')){
        adminResource.deleteAdminGroup($scope.group._id).then(function(result){
          if(result.success){
            //redirect to admin admin-groups index page
            $location.path('/admin/admin-groups');
          }else{
            //error due to server side validation
            angular.forEach(result.errors, function(err, index){
              $scope.deleteAlerts.push({ type: 'danger', msg: err});
            });
          }
        }, function(x){
          $scope.deleteAlerts.push({ type: 'danger', msg: 'Error deleting admin group: ' + x });
        });
      }
    };

    //initialize
    deserializeData(data);
  }
]);
angular.module('admin.admin-groups.index', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource']);
angular.module('admin.admin-groups.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/admin-groups', {
      templateUrl: 'admin/admin-groups/admin-groups.tpl.html',
      controller: 'AdminGroupsIndexCtrl',
      title: 'Manage Admin Groups',
      resolve: {
        groups: ['$q', '$location', '$log', 'securityAuthorization', 'adminResource', function($q, $location, $log, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              //handles url with query(search) parameter
              return adminResource.findAdminGroups($location.search());
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.search({});
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    });
}]);
angular.module('admin.admin-groups.index').controller('AdminGroupsIndexCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'groups',
  function($scope, $route, $location, $log, utility, adminResource, data){
    // local var
    var deserializeData = function(data){
      $scope.items = data.items;
      $scope.pages = data.pages;
      $scope.filters = data.filters;
      $scope.groups = data.data;
    };

    var fetchAdminGroups = function(){
      adminResource.findAdminGroups($scope.filters).then(function(data){
        deserializeData(data);

        //update url in browser addr bar
        $location.search($scope.filters);
      }, function(e){
        $log.error(e);
      });
    };

    // $scope methods
    $scope.canSave = utility.canSave;
    $scope.filtersUpdated = function(){
      //reset pagination after filter(s) is updated
      $scope.filters.page = undefined;
      fetchAdminGroups();
    };
    $scope.prev = function(){
      $scope.filters.page = $scope.pages.prev;
      fetchAdminGroups();
    };
    $scope.next = function(){
      $scope.filters.page = $scope.pages.next;
      fetchAdminGroups();
    };
    $scope.addGroup = function(){
      adminResource.addAdminGroup($scope.groupname).then(function(data){
        $scope.groupname = '';
        if(data.success){
          $route.reload();
        }else if (data.errors && data.errors.length > 0){
          alert(data.errors[0]);
        }else {
          alert('unknown error.');
        }
      }, function(e){
        $scope.groupname = '';
        $log.error(e);
      });
    };

    // $scope vars
    //select elements and their associating options
    $scope.sorts = [
      {label: "id \u25B2", value: "_id"},
      {label: "id \u25BC", value: "-_id"},
      {label: "name \u25B2", value: "name"},
      {label: "name \u25BC", value: "-name"}
    ];
    $scope.limits = [
      {label: "10 items", value: 10},
      {label: "20 items", value: 20},
      {label: "50 items", value: 50},
      {label: "100 items", value: 100}
    ];

    //initialize $scope variables
    deserializeData(data);
  }
]);
angular.module('admin.admin-groups', [
  'admin.admin-groups.index',
  'admin.admin-groups.detail'
]);
angular.module('admin.index', ['ngRoute', 'security.authorization', 'services.adminResource']);
angular.module('admin.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin', {
      templateUrl: 'admin/admin.tpl.html',
      controller: 'AdminCtrl',
      title: 'Admin Area',
      resolve: {
        stats: ['$q', '$location', 'securityAuthorization', 'adminResource', function($q, $location, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(adminResource.getStats, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('admin.index').controller('AdminCtrl', ['$scope', '$log', 'stats',
  function($scope, $log, stats){
    $scope.user = {
      users: stats['User'],
      accounts: stats['Account'],
      admins: stats['Admin'],
      groups: stats['AdminGroup']
    };
    $scope.pivoted = {
      categories: stats['Category'],
      statuses: stats['Status']
    };
  }]);
angular.module('admin.administrators.detail', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'directives.serverError', 'ui.bootstrap']);
angular.module('admin.administrators.detail').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/administrators/:id', {
      templateUrl: 'admin/administrators/admin-administrator.tpl.html',
      controller: 'AdministratorsDetailCtrl',
      title: 'Administrators / Details',
      resolve: {
        administrator: ['$q', '$route', '$location', 'securityAuthorization', 'adminResource', function($q, $route, $location, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /administrator
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              var id = $route.current.params.id || '';
              if(id){
                return adminResource.findAdministrator(id);
              }else{
                redirectUrl = '/admin/administrators';
                return $q.reject();
              }
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('admin.administrators.detail').controller('AdministratorsDetailCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'administrator',
  function($scope, $route, $location, $log, utility, adminResource, data) {
    // local vars
    var deserializeData = function(data){
      $scope.groups = data.adminGroups;
      deserializeAdministrator(data.record);
    };
    var deserializeAdministrator = function(administrator){
      $scope.selectedNewGroup = null;
      $scope.administrator = administrator;
    };
    var closeAlert = function(alert, ind){
      alert.splice(ind, 1);
    };
    var isExistingGroup = function(selectedGroup){
      var flag = false;
      var groups = $scope.administrator.groups;
      angular.forEach(groups, function(group, ind){
        if(group._id === selectedGroup._id){
          flag = true;
        }
      });
      return flag;
    };
    var isExistingPermission = function(newPermission){
      var flag = false;
      var permissions = $scope.administrator.permissions;
      angular.forEach(permissions, function(permission, ind){
        if(permission.name === newPermission){
          flag = true;
        }
      });
      return flag;
    };
    // $scope vars
    $scope.contactAlerts = [];
    $scope.loginAlerts = [];
    $scope.deleteAlerts = [];
    $scope.groupAlerts = [];
    $scope.permissionAlerts = [];
    $scope.canSave = utility.canSave;
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.closeContactAlert = function(ind){
      closeAlert($scope.contactAlerts, ind);
    };
    $scope.closeLoginAlert = function(ind){
      closeAlert($scope.loginAlerts, ind);
    };
    $scope.closeDeleteAlert = function(ind){
      closeAlert($scope.deleteAlerts, ind);
    };
    $scope.closeGroupAlert = function(ind){
      closeAlert($scope.groupAlerts, ind);
    };
    $scope.closePermissionAlert = function(ind){
      closeAlert($scope.permissionAlerts, ind);
    };
    $scope.updateAdmin = function(){
      var data = {
        first:   $scope.administrator.name.first,
        middle:  $scope.administrator.name.middle,
        last:    $scope.administrator.name.last
      };
      $scope.contactAlerts = [];
      adminResource.updateAdministrator($scope.administrator._id, data).then(function(result){
        if(result.success){
          deserializeAdministrator(result.admin);
          $scope.contactAlerts.push({ type: 'info', msg: 'Changes have been saved.'});
        }else{
          angular.forEach(result.errors, function(err, index){
            $scope.contactAlerts.push({ type: 'danger', msg: err });
          });
        }
      }, function(x){
        $scope.contactAlerts.push({ type: 'danger', msg: 'Error updating administrator: ' + x });
      });
    };
    $scope.linkUser = function () {
      $scope.loginAlerts = [];
      var newUsername = $scope.administrator.newUsername;
      $scope.administrator.newUsername = '';
      adminResource.adminLinkUser($scope.administrator._id, { newUsername: newUsername }).then(function (result) {
        $scope.loginForm.$setPristine();
        if (result.success) {
          deserializeAdministrator(result.admin);
        } else {
          angular.forEach(result.errors, function (err, index) {
            $scope.loginAlerts.push({ type: 'danger', msg: err });
          });
        }
      }, function (x) {
        $scope.loginAlerts.push({ type: 'danger', msg: 'Error linking user: ' + x });
      });
    };
    $scope.unlinkUser = function () {
      $scope.loginAlerts = [];
      if (confirm('Are you sure?')) {
        adminResource.adminUnlinkUser($scope.administrator._id).then(function (result) {
          if (result.success) {
            deserializeAdministrator(result.admin);
          } else {
            angular.forEach(result.errors, function (err, index) {
              $scope.loginAlerts.push({type: 'danger', msg: err});
            });
          }
        }, function (x) {
          $scope.loginAlerts.push({ type: 'danger', msg: 'Error unlinking user: ' + x });
        });
      }
    };
    $scope.addGroup = function(){
      if(!$scope.selectedNewGroup){
        alert('Please select a group.');
      } else if(isExistingGroup($scope.selectedNewGroup)){
        alert('That group already exists.');
      }else{
        $scope.administrator.groups.push(angular.copy($scope.selectedNewGroup));
      }
      $scope.selectedNewGroup = null;  //reset selectedGroup after user interaction
    };
    $scope.deleteGroup = function(index){
      if(confirm('Are you sure?')){
        $scope.administrator.groups.splice(index, 1);
      }
    };
    $scope.saveGroups = function(){
      $scope.groupAlerts = [];
      var groups = $scope.administrator.groups;
      adminResource.saveAdminGroups($scope.administrator._id, {groups: groups}).then(function (result) {
        if (result.success) {
          $scope.groupAlerts.push({type: 'info', msg: 'Changes have been saved.'});
          deserializeAdministrator(result.admin);
        } else {
          //error due to server side validation
          angular.forEach(result.errors, function (err, index) {
            $scope.groupAlerts.push({type: 'danger', msg: err});
          });
        }
      }, function (x) {
        $scope.groupAlerts.push({type: 'danger', msg: 'Error saving admin groups: ' + x});
      });
    };
    $scope.addPermission = function(){
      if(!$scope.newPermission){
        alert('Please enter a name.');
      } else if(isExistingPermission($scope.newPermission)){
        alert('That name already exists.');
      }else{
        $scope.administrator.permissions.push({
          name: angular.copy($scope.newPermission),
          permit: true
        });
      }
      $scope.newPermission = null;  //reset newPermission after user interaction
    };
    $scope.togglePermission = function(index){
      $scope.administrator.permissions[index]['permit'] = !$scope.administrator.permissions[index]['permit'];
    };
    $scope.deletePermission = function(index){
      if(confirm('Are you sure?')){
        $scope.administrator.permissions.splice(index, 1);
      }
    };
    $scope.saveSettings = function(){
      $scope.permissionAlerts = [];
      var permissions = $scope.administrator.permissions;
      adminResource.saveAdminPermissions($scope.administrator._id, {permissions: permissions}).then(function (result) {
        if (result.success) {
          $scope.permissionAlerts.push({type: 'info', msg: 'Changes have been saved.'});
          deserializeAdministrator(result.admin);
        } else {
          //error due to server side validation
          angular.forEach(result.errors, function (err, index) {
            $scope.permissionAlerts.push({type: 'danger', msg: err});
          });
        }
      }, function (x) {
        $scope.permissionAlerts.push({type: 'danger', msg: 'Error saving admin permissions: ' + x});
      });
    };
    $scope.deleteAdministrator = function(){
      $scope.deleteAlerts =[];
      if(confirm('Are you sure?')){
        adminResource.deleteAdministrator($scope.administrator._id).then(function(result){
          if(result.success){
            // redirect to admin administrators index page
            $location.path('/admin/administrators');
          }else{
            //error due to server side validation
            angular.forEach(result.errors, function(err, index){
              $scope.deleteAlerts.push({ type: 'danger', msg: err});
            });
          }
        }, function(x){
          $scope.deleteAlerts.push({ type: 'danger', msg: 'Error deleting administrator: ' + x });
        });
      }
    };

    //initialize
    deserializeData(data);
  }
]);
angular.module('admin.administrators.index', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource']);
angular.module('admin.administrators.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/administrators', {
      templateUrl: 'admin/administrators/admin-administrators.tpl.html',
      controller: 'AdministratorsIndexCtrl',
      title: 'Manage Administrators',
      resolve: {
        administrators: ['$q', '$location', '$log', 'securityAuthorization', 'adminResource', function($q, $location, $log, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              //handles url with query(search) parameter
              return adminResource.findAdministrators($location.search());
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.search({});
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    });
}]);
angular.module('admin.administrators.index').controller('AdministratorsIndexCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'administrators',
  function($scope, $route, $location, $log, utility, adminResource, data){
    // local var
    var deserializeData = function(data){
      $scope.items = data.items;
      $scope.pages = data.pages;
      $scope.filters = data.filters;
      $scope.administrators = data.data;
    };

    var fetchAdministrators = function(){
      adminResource.findAdministrators($scope.filters).then(function(data){
        deserializeData(data);

        //update url in browser addr bar
        $location.search($scope.filters);
      }, function(e){
        $log.error(e);
      });
    };

    // $scope methods
    $scope.canSave = utility.canSave;
    $scope.filtersUpdated = function(){
      //reset pagination after filter(s) is updated
      $scope.filters.page = undefined;
      fetchAdministrators();
    };
    $scope.prev = function(){
      $scope.filters.page = $scope.pages.prev;
      fetchAdministrators();
    };
    $scope.next = function(){
      $scope.filters.page = $scope.pages.next;
      fetchAdministrators();
    };
    $scope.addAdmin = function(){
      adminResource.addAdministrator($scope.fullname).then(function(data){
        $scope.fullname = '';
        if(data.success){
          $route.reload();
        }else if (data.errors && data.errors.length > 0){
          alert(data.errors[0]);
        }else {
          alert('unknown error.');
        }
      }, function(e){
        $scope.fullname = '';
        $log.error(e);
      });
    };

    // $scope vars
    //select elements and their associating options
    $scope.sorts = [
      {label: "id \u25B2", value: "_id"},
      {label: "id \u25BC", value: "-_id"},
      {label: "name \u25B2", value: "name"},
      {label: "name \u25BC", value: "-name"}
    ];
    $scope.limits = [
      {label: "10 items", value: 10},
      {label: "20 items", value: 20},
      {label: "50 items", value: 50},
      {label: "100 items", value: 100}
    ];

    //initialize $scope variables
    deserializeData(data);
  }
]);
angular.module('admin.administrators', [
  'admin.administrators.index',
  'admin.administrators.detail'
]);
angular.module('admin.categories.index', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource']);
angular.module('admin.categories.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/categories', {
      templateUrl: 'admin/categories/admin-categories.tpl.html',
      controller: 'CategoriesIndexCtrl',
      title: 'Manage Categories',
      resolve: {
        categories: ['$q', '$location', '$log', 'securityAuthorization', 'adminResource', function($q, $location, $log, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              //handles url with query(search) parameter
              return adminResource.findCategories($location.search());
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.search({});
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    });
}]);
angular.module('admin.categories.index').controller('CategoriesIndexCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'categories',
  function($scope, $route, $location, $log, utility, adminResource, data){
    // local var
    var deserializeData = function(data){
      $scope.items = data.items;
      $scope.pages = data.pages;
      $scope.filters = data.filters;
      $scope.categories = data.data;
    };

    var fetchCategories = function(){
      adminResource.findCategories($scope.filters).then(function(data){
        deserializeData(data);

        //update url in browser addr bar
        $location.search($scope.filters);
      }, function(e){
        $log.error(e);
      });
    };

    // $scope methods
    $scope.canSave = utility.canSave;
    $scope.filtersUpdated = function(){
      //reset pagination after filter(s) is updated
      $scope.filters.page = undefined;
      fetchCategories();
    };
    $scope.prev = function(){
      $scope.filters.page = $scope.pages.prev;
      fetchCategories();
    };
    $scope.next = function(){
      $scope.filters.page = $scope.pages.next;
      fetchCategories();
    };
    $scope.addCategory = function(){
      adminResource.addCategory($scope.add).then(function(data){
        $scope.add = {};
        if(data.success){
          $route.reload();
        }else if (data.errors && data.errors.length > 0){
          alert(data.errors[0]);
        }else {
          alert('unknown error.');
        }
      }, function(e){
        $scope.add = {};
        $log.error(e);
      });
    };

    // $scope vars
    //select elements and their associating options
    $scope.sorts = [
      {label: "id \u25B2", value: "_id"},
      {label: "id \u25BC", value: "-_id"},
      {label: "name \u25B2", value: "name"},
      {label: "name \u25BC", value: "-name"}
    ];
    $scope.limits = [
      {label: "10 items", value: 10},
      {label: "20 items", value: 20},
      {label: "50 items", value: 50},
      {label: "100 items", value: 100}
    ];

    //initialize $scope variables
    deserializeData(data);
  }
]);
angular.module('admin.categories.detail', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'ui.bootstrap']);
angular.module('admin.categories.detail').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/categories/:id', {
      templateUrl: 'admin/categories/admin-category.tpl.html',
      controller: 'AdminCategoriesDetailCtrl',
      title: 'Categories / Details',
      resolve: {
        category: ['$q', '$route', '$location', 'securityAuthorization', 'adminResource', function($q, $route, $location, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              var id = $route.current.params.id || '';
              if(id){
                return adminResource.findCategory(id);
              }else{
                redirectUrl = '/admin/categories';
                return $q.reject();
              }
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('admin.categories.detail').controller('AdminCategoriesDetailCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'category',
  function($scope, $route, $location, $log, utility, adminResource, data) {
    // local vars
    var deserializeData = function(data){
      $scope.category = data;
    };
    var closeAlert = function(alert, ind){
      alert.splice(ind, 1);
    };
    //$scope vars
    $scope.detailAlerts = [];
    $scope.deleteAlerts = [];
    $scope.canSave = utility.canSave;
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.closeDetailAlert = function(ind){
      closeAlert($scope.detailAlerts, ind);
    };
    $scope.closeDeleteAlert = function(ind){
      closeAlert($scope.deleteAlerts, ind);
    };
    $scope.update = function(){
      $scope.detailAlerts = [];
      var data = {
        name: $scope.category.name,
        pivot: $scope.category.pivot
      };
      adminResource.updateCategory($scope.category._id, data).then(function(result){
        if(result.success){
          deserializeData(result.category);
          $scope.detailAlerts.push({ type: 'info', msg: 'Changes have been saved.'});
        }else{
          angular.forEach(result.errors, function(err, index){
            $scope.detailAlerts.push({ type: 'danger', msg: err });
          });
        }
      }, function(x){
        $scope.detailAlerts.push({ type: 'danger', msg: 'Error updating category: ' + x });
      });
    };
    $scope.deleteCategory = function(){
      $scope.deleteAlerts =[];
      if(confirm('Are you sure?')){
        adminResource.deleteCategory($scope.category._id).then(function(result){
          if(result.success){
            //redirect to admin categories index page
            $location.path('/admin/categories');
          }else{
            //error due to server side validation
            angular.forEach(result.errors, function(err, index){
              $scope.deleteAlerts.push({ type: 'danger', msg: err});
            });
          }
        }, function(x){
          $scope.deleteAlerts.push({ type: 'danger', msg: 'Error deleting category: ' + x });
        });
      }
    };

    //initialize
    deserializeData(data);
  }
]);
angular.module('admin.categories', [
  'admin.categories.index',
  'admin.categories.detail'
]);
angular.module('admin', [
  'admin.index',
  'admin.users',
  'admin.accounts',
  'admin.administrators',
  'admin.admin-groups',
  'admin.statuses',
  'admin.categories'
]);
angular.module('admin.statuses.detail', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'ui.bootstrap']);
angular.module('admin.statuses.detail').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/statuses/:id', {
      templateUrl: 'admin/statuses/admin-status.tpl.html',
      controller: 'AdminStatusesDetailCtrl',
      title: 'Statuses / Details',
      resolve: {
        status: ['$q', '$route', '$location', 'securityAuthorization', 'adminResource', function($q, $route, $location, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              var id = $route.current.params.id || '';
              if(id){
                return adminResource.findStatus(id);
              }else{
                redirectUrl = '/admin/statuses';
                return $q.reject();
              }
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('admin.statuses.detail').controller('AdminStatusesDetailCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'status',
  function($scope, $route, $location, $log, utility, adminResource, data) {
    // local vars
    var deserializeData = function(data){
      $scope.status = data;
    };
    var closeAlert = function(alert, ind){
      alert.splice(ind, 1);
    };
    //$scope vars
    $scope.detailAlerts = [];
    $scope.deleteAlerts = [];
    $scope.canSave = utility.canSave;
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.closeDetailAlert = function(ind){
      closeAlert($scope.detailAlerts, ind);
    };
    $scope.closeDeleteAlert = function(ind){
      closeAlert($scope.deleteAlerts, ind);
    };
    $scope.update = function(){
      $scope.detailAlerts = [];
      var data = {
        name: $scope.status.name,
        pivot: $scope.status.pivot
      };
      adminResource.updateStatus($scope.status._id, data).then(function(result){
        if(result.success){
          deserializeData(result.status);
          $scope.detailAlerts.push({ type: 'info', msg: 'Changes have been saved.'});
        }else{
          angular.forEach(result.errors, function(err, index){
            $scope.detailAlerts.push({ type: 'danger', msg: err });
          });
        }
      }, function(x){
        $scope.detailAlerts.push({ type: 'danger', msg: 'Error updating status: ' + x });
      });
    };
    $scope.deleteStatus = function(){
      $scope.deleteAlerts =[];
      if(confirm('Are you sure?')){
        adminResource.deleteStatus($scope.status._id).then(function(result){
          if(result.success){
            //redirect to admin statuses index page
            $location.path('/admin/statuses');
          }else{
            //error due to server side validation
            angular.forEach(result.errors, function(err, index){
              $scope.deleteAlerts.push({ type: 'danger', msg: err});
            });
          }
        }, function(x){
          $scope.deleteAlerts.push({ type: 'danger', msg: 'Error deleting status: ' + x });
        });
      }
    };

    //initialize
    deserializeData(data);
  }
]);
angular.module('admin.statuses.index', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource']);
angular.module('admin.statuses.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/statuses', {
      templateUrl: 'admin/statuses/admin-statuses.tpl.html',
      controller: 'StatusesIndexCtrl',
      title: 'Manage Statuses',
      resolve: {
        statuses: ['$q', '$location', '$log', 'securityAuthorization', 'adminResource', function($q, $location, $log, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              //handles url with query(search) parameter
              return adminResource.findStatuses($location.search());
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.search({});
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    });
}]);
angular.module('admin.statuses.index').controller('StatusesIndexCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'statuses',
  function($scope, $route, $location, $log, utility, adminResource, data){
    // local var
    var deserializeData = function(data){
      $scope.items = data.items;
      $scope.pages = data.pages;
      $scope.filters = data.filters;
      $scope.statuses = data.data;
    };

    var fetchStatuses = function(){
      adminResource.findStatuses($scope.filters).then(function(data){
        deserializeData(data);

        //update url in browser addr bar
        $location.search($scope.filters);
      }, function(e){
        $log.error(e);
      });
    };

    // $scope methods
    $scope.canSave = utility.canSave;
    $scope.filtersUpdated = function(){
      //reset pagination after filter(s) is updated
      $scope.filters.page = undefined;
      fetchStatuses();
    };
    $scope.prev = function(){
      $scope.filters.page = $scope.pages.prev;
      fetchStatuses();
    };
    $scope.next = function(){
      $scope.filters.page = $scope.pages.next;
      fetchStatuses();
    };
    $scope.addStatus = function(){
      adminResource.addStatus($scope.add).then(function(data){
        $scope.add = {};
        if(data.success){
          $route.reload();
        }else if (data.errors && data.errors.length > 0){
          alert(data.errors[0]);
        }else {
          alert('unknown error.');
        }
      }, function(e){
        $scope.add = {};
        $log.error(e);
      });
    };

    // $scope vars
    //select elements and their associating options
    $scope.sorts = [
      {label: "id \u25B2", value: "_id"},
      {label: "id \u25BC", value: "-_id"},
      {label: "name \u25B2", value: "name"},
      {label: "name \u25BC", value: "-name"}
    ];
    $scope.limits = [
      {label: "10 items", value: 10},
      {label: "20 items", value: 20},
      {label: "50 items", value: 50},
      {label: "100 items", value: 100}
    ];

    //initialize $scope variables
    deserializeData(data);
  }
]);
angular.module('admin.statuses', [
  'admin.statuses.index',
  'admin.statuses.detail'
]);
angular.module('admin.users.detail', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'directives.serverError', 'ui.bootstrap']);
angular.module('admin.users.detail').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/users/:id', {
      templateUrl: 'admin/users/admin-user.tpl.html',
      controller: 'UsersDetailCtrl',
      title: 'Users / Details',
      resolve: {
        user: ['$q', '$route', '$location', 'securityAuthorization', 'adminResource', function($q, $route, $location, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              var id = $route.current.params.id || '';
              if(id){
                return adminResource.findUser(id);
              }else{
                redirectUrl = '/admin/users';
                return $q.reject();
              }
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('admin.users.detail').controller('UsersDetailCtrl', ['$scope', '$route', '$location', 'utility', 'adminResource', 'user',
  function($scope, $route, $location, utility, adminResource, user) {
    // local vars
    var closeAlert = function(alert, ind){
      alert.splice(ind, 1);
    };
    var link = function(type){
      $scope.roleAlerts = [];
      var resource, data;
      if(type === 'admin'){ //linkAdmin
        resource = adminResource.linkAdmin;
        data = { newAdminId: $scope.role.newAdminId };
      } else{ //linkAccount
        resource = adminResource.linkAccount;
        data = { newAccountId: $scope.role.newAccountId };
      }
      resource($scope.user._id, data).then(function (result) {
        $scope.role = {};
        $scope.roleForm.$setPristine();
        if (result.success) {
          $scope.user = result.user; //update $scope user model
        } else {
          angular.forEach(result.errors, function (err, index) {
            $scope.roleAlerts.push({type: 'danger', msg: err});
          });
        }
      }, function (x) {
        $scope.roleAlerts.push({
          type: 'danger',
          msg: 'Error linking ' + type + ': ' + x
        });
      });
    };
    var unlink = function(type){
      $scope.roleAlerts = [];
      var resource = type === 'admin'? adminResource.unlinkAdmin: adminResource.unlinkAccount;
      if(confirm('Are you sure?')){
        resource($scope.user._id).then(function(result){
          if(result.success){
            $scope.user = result.user; //update $scope user model
          }else{
            angular.forEach(result.errors, function(err, index){
              $scope.roleAlerts.push({ type: 'danger', msg: err });
            });
          }
        }, function(x){
          $scope.roleAlerts.push({
            type: 'danger',
            msg: 'Error unlinking ' + type + ': '  + x
          });
        });
      }
    };

    // $scope vars
    $scope.role = {};
    $scope.identityAlerts = [];
    $scope.passwordAlerts = [];
    $scope.roleAlerts = [];
    $scope.deleteAlerts = [];
    $scope.errfor = {};
    $scope.isActives = ["yes", "no"];
    $scope.canSave = utility.canSave;
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.closeIdentityAlert = function(ind){
      closeAlert($scope.identityAlerts, ind);
    };
    $scope.closePasswordAlert = function(ind){
      closeAlert($scope.passwordAlerts, ind);
    };
    $scope.closeRoleAlert = function(ind){
      closeAlert($scope.roleAlerts, ind);
    };
    $scope.closeDeleteAlert = function(ind){
      closeAlert($scope.deleteAlerts, ind);
    };
    $scope.updateIdentity = function(){
      var data = {
        username: $scope.user.username,
        email: $scope.user.email
      };
      if($scope.user.isActive){
        data['isActive'] = $scope.user.isActive;
      }
      $scope.identityAlerts = [];
      adminResource.updateUser($scope.user._id, data).then(function(result){
        if(result.success){
          $scope.user = result.user; //update $scope user model
          $scope.identityAlerts.push({ type: 'info', msg: 'Changes have been saved.'});
        }else{
          $scope.errfor = result.errfor;
          angular.forEach(result.errfor, function(err, field){
            $scope.identityForm[field].$setValidity('server', false);
          });
          angular.forEach(result.errors, function(err, index){
            $scope.identityAlerts.push({ type: 'danger', msg: err });
          });
        }
      }, function(x){
        $scope.identityAlerts.push({
          type: 'danger',
          msg: 'Error updating user identity: ' + x
        });
      });
    };
    $scope.unlinkAdmin = function(){
      unlink('admin');
    };
    $scope.linkAdmin = function(){
      link('admin');
    };
    $scope.unlinkAccount = function(){
      unlink('account');
    };
    $scope.linkAccount = function(){
      link('account');
    };
    $scope.setPassword = function(){
      $scope.passwordAlerts = [];
      adminResource.setPassword($scope.user._id, $scope.pass).then(function(result){
        $scope.pass = {};
        $scope.passwordForm.$setPristine();
        if(result.success){
          $scope.user = result.user; //update $scope user model (why password hash is sent to front-end?)
          $scope.passwordAlerts.push({ type: 'info', msg: 'A new password has been set.' });
        }else{
          //error due to server side validation
          angular.forEach(result.errors, function(err, index){
            $scope.passwordAlerts.push({ type: 'danger', msg: err});
          });
        }
      }, function(x){
        $scope.passwordAlerts.push({ type: 'danger', msg: 'Error updating password: ' + x });
      });
    };
    $scope.deleteUser = function(){
      $scope.deleteAlerts =[];
      if(confirm('Are you sure?')){
        adminResource.deleteUser($scope.user._id).then(function(result){
          if(result.success){
            // redirect to admin users index page
            $location.path('/admin/users');
          }else{
            //error due to server side validation
            angular.forEach(result.errors, function(err, index){
              $scope.deleteAlerts.push({ type: 'danger', msg: err});
            });
          }
        }, function(x){
          $scope.deleteAlerts.push({ type: 'danger', msg: 'Error deleting user: ' + x });
        });
      }
    };
    //initialize
    $scope.user = user; //from resolved data
    $scope.user.isActive = $scope.user.isActive || null;
  }
]);
angular.module('admin.users.index', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource']);
angular.module('admin.users.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/users', {
      templateUrl: 'admin/users/admin-users.tpl.html',
      controller: 'UsersIndexCtrl',
      title: 'Manage Users',
      resolve: {
        users: ['$q', '$location', '$log', 'securityAuthorization', 'adminResource', function($q, $location, $log, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              //handles url with query(search) parameter
              return adminResource.findUsers($location.search());
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.search({});
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    });
}]);
angular.module('admin.users.index').controller('UsersIndexCtrl', ['$scope', '$route', '$location', '$log', 'utility', 'adminResource', 'users',
  function($scope, $route, $location, $log, utility, adminResource, data){
    // local var
    var deserializeData = function(data){
      $scope.items = data.items;
      $scope.pages = data.pages;
      $scope.filters = data.filters;
      $scope.users = data.data;
    };

    var fetchUsers = function(){
      adminResource.findUsers($scope.filters).then(function(data){
        deserializeData(data);

        // update url in browser addr bar
        $location.search($scope.filters);
      }, function(e){
        $log.error(e);
      });
    };

    // $scope methods
    $scope.canSave = utility.canSave;
    $scope.filtersUpdated = function(){
      //reset pagination after filter(s) is updated
      $scope.filters.page = undefined;
      fetchUsers();
    };
    $scope.prev = function(){
      $scope.filters.page = $scope.pages.prev;
      fetchUsers();
    };
    $scope.next = function(){
      $scope.filters.page = $scope.pages.next;
      fetchUsers();
    };
    $scope.addUser = function(){
      adminResource.addUser($scope.username).then(function(data){
        $scope.username = '';
        if(data.success){
          $route.reload();
        }else if (data.errors && data.errors.length > 0){
          alert(data.errors[0]);
        }else {
          alert('unknown error.');
        }
      }, function(e){
        $scope.username = '';
        $log.error(e);
      });
    };

    // $scope vars
    //select elements and their associating options
    $scope.roles = [{label: "any", value: ""}, {label: "admin", value: "admin"}, {label: "account", value: "account"}];
    $scope.isActives =[{label: "either", value: ""}, {label: "yes", value: "yes"}, {label: "no", value: "no"}];
    $scope.sorts = [
      {label: "id \u25B2", value: "_id"},
      {label: "id \u25BC", value: "-_id"},
      {label: "username \u25B2", value: "username"},
      {label: "username \u25BC", value: "-username"},
      {label: "email \u25B2", value: "email"},
      {label: "email \u25BC", value: "-email"}
    ];
    $scope.limits = [
      {label: "10 items", value: 10},
      {label: "20 items", value: 20},
      {label: "50 items", value: 50},
      {label: "100 items", value: 100}
    ];

    //initialize $scope variables
    deserializeData(data);
  }
]);
angular.module('admin.users', [
  'admin.users.index',
  'admin.users.detail'
]);
angular.module('app', [
  'ngRoute',
  'config',
  'base',
  'signup',
  'login',
  'account',
  'admin',
  'services.i18nNotifications',
  'services.httpRequestTracker',
  'security',
  'templates.app',
  'templates.common',
  'ui.bootstrap',
  'ngResource',
  'services.PostsFactory'
]);


// Node.js Express backend csurf module csrf/xsrf token cookie name
angular.module('app').config(['$httpProvider', 'XSRF_COOKIE_NAME', function($httpProvider, XSRF_COOKIE_NAME){
  $httpProvider.defaults.xsrfCookieName = XSRF_COOKIE_NAME;
}]);

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });
  $routeProvider
    .when('/', {
      templateUrl: 'main.tpl.html',
      controller: 'AppCtrl'
    })
    .when('/contact', {
      templateUrl: 'contact.tpl.html',
      controller: 'ContactCtrl',
      title: 'Contact Us'
    })
    .when('/about', {
      templateUrl: 'about.tpl.html',
      title: 'About Us'
    })
    .otherwise({
      templateUrl: '404.tpl.html',
      title: 'Page Not Found'
    });
}]);

angular.module('app').run(['$location', '$rootScope', 'security','$window', function($location, $rootScope, security, $window) {
  // Get the current user when the application starts
  // (in case they are still logged in from a previous session)
  security.requestCurrentUser();

 $rootScope.$on('$routeChangeStart', function (event) {

        if (!security.isAuthenticated() && $location.url() != "/signup" && $location.url() != "/login" && $location.url() != "/account") {
          console.log('DENY : Redirecting to Login' , security.isAuthenticated());
          event.preventDefault();
          //$window.location.href = '/login';
          $location.path('/signup');
        }
        
  });
  // add a listener to $routeChangeSuccess
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    $rootScope.title = current.$$route && current.$$route.title? current.$$route.title: 'Drywall is Running';
  });
}]);

angular.module('app').controller('AppCtrl', ['$scope', 'i18nNotifications', 'localizedMessages','PostsFactory', function($scope, i18nNotifications, localizedMessages,PostsFactory) {

  $scope.notifications = i18nNotifications;

  $scope.removeNotification = function (notification) {
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });

  PostsFactory.query(
    function(response){
      $scope.posts = response;
    })


}]);

angular.module('base',['ngRoute', 'security', 'services.utility', 'services.accountResource', 'services.adminResource', 'ui.bootstrap']);
angular.module('base').controller('HeaderCtrl', ['$scope', '$location', 'security',
  function ($scope, $location, security) {
    $scope.isAuthenticated = function(){
      return security.isAuthenticated();
    };
    $scope.isAdmin = function(){
      if($location.path().indexOf('/admin') === -1){
        return false;
      }else{
        return security.isAdmin();
      }
    };
    $scope.logout = function(){
      return security.logout();
    };
    $scope.isActive = function(viewLocation){
      return $location.path() === viewLocation;
    };
  }
]);
angular.module('base').controller('AdminHeaderCtrl' ,['$scope', 'adminResource',
  function($scope, adminResource){

    var clearSearchDropdown = function(){
      $scope.resultIsOpen = false;
      $scope.result = {};
    };
    var showSearchDropdown = function(data){
      $scope.result = data;
      $scope.resultIsOpen = true;
    };

    $scope.showDropdownHeader = function(header){
      var users = $scope.result.users;
      var accounts = $scope.result.accounts;
      var administrators = $scope.result.administrators;
      if(!(users && accounts && administrators)) {
        return false;
      }
      switch(header){
        case 'noDocsMatched':
          return users.length === 0 && accounts.length === 0 && administrators.length === 0;
        case 'Users':
          return users.length !== 0;
        case 'Accounts':
          return accounts.length !== 0;
        case 'Administrators':
          return administrators.length !== 0;
        default:
          return false;
      }
    };

    $scope.update = function(){
      clearSearchDropdown();
      if ($scope.query) {
        // no need to search backend if query string is empty
        adminResource.search($scope.query).then(function (data) {
          showSearchDropdown(data);
        }, function (e) {
          clearSearchDropdown();
        });
      }
    };

    $scope.closeAdminMenu = function(){
      $scope.adminMenuCollapsed = true;
    };

    $scope.toggleAdminMenu = function(){
      $scope.adminMenuCollapsed = !$scope.adminMenuCollapsed;
    };

    // set $scope vars initial value
    $scope.resultIsOpen = false;
    $scope.query = "";
    $scope.result = {};
    $scope.adminMenuCollapsed = true;
  }
]);
angular.module('base').controller('FooterCtrl', ['$scope', 'security',
  function($scope, security){
    $scope.isAuthenticated = function(){
      return security.isAuthenticated();
    };
    //$scope.isAdmin = security.isAdmin;
    $scope.logout = function(){
      return security.logout();
    };
  }
]);

angular.module('base').controller('ContactCtrl', ['$scope', 'utility', 'accountResource',
  function($scope, utility, restResource){
    // local var
    var successAlert = { type: 'success', msg: 'We have received your message. Thank you.' };
    var errorAlert = { type: 'warning', msg: 'Error submitting your message. Please try again.' };

    // model def
    $scope.msg = {};
    $scope.alerts = [];

    // method def
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.canSave = utility.canSave;
    $scope.closeAlert = function(ind){
      $scope.alerts.splice(ind, 1);
    };
    $scope.submit = function(){
      var msg = $scope.msg;
      $scope.alerts = [];
      restResource.sendMessage({
        name: msg.name,
        email: msg.email,
        message: msg.message
      }).then(function(data){
        $scope.msgForm.$setPristine();
        $scope.msg = {};
        if(data.success){
          $scope.alerts.push(successAlert);
        }else{
          //TODO: optionally do case study errfor/errors
          $scope.alerts.push(errorAlert);
        }
      }, function(x){
        $scope.msgForm.$setPristine();
        $scope.msg = {};
        $scope.alerts.push(errorAlert);
      });
    };
  }
]);

//----- angular app configuration-----
angular.module('config', []);
angular.module('config')
  .constant('ENABLE_SOCIAL', {
    facebook: false,
    google: false
  })
  .constant('REQUIRE_ACCOUNT_VERIFICATION', false)
;
//----- end of configuration -----
angular.module('config')
  .constant('XSRF_COOKIE_NAME', '_csrfToken')
  .constant('I18N.MESSAGES', {
    'errors.route.changeError':'Route change error',
    'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
    'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
    'crud.user.remove.error':"Something went wrong when removing user with id '{{id}}'.",
    'crud.user.save.error':"Something went wrong when saving a user...",
    'crud.project.save.success':"A project with id '{{id}}' was saved successfully.",
    'crud.project.remove.success':"A project with id '{{id}}' was removed successfully.",
    'crud.project.save.error':"Something went wrong when saving a project...",
    'login.reason.notAuthorized':"You do not have the necessary access permissions.  Do you want to login as someone else?",
    'login.reason.notAuthenticated':"You must be logged in to access this part of the application.",
    'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
    'login.error.serverError': "There was a problem with authenticating: {{exception}}."
  })
;
angular.module('config').config(['$provide', 'ENABLE_SOCIAL', function($provide, ENABLE_SOCIAL){
  var setting = {
    'facebook': {
      text: 'Facebook',
      icon: 'fa-facebook-square',
      login: '/login/facebook',
      connect: '/account/settings/facebook/'
    },
    'google': {
      text: 'Google',
      icon: 'fa-google-plus-square',
      login: '/login/google',
      connect: '/account/settings/google/'
    }
  };
  var social = {};
  angular.forEach(ENABLE_SOCIAL, function(enable, key){
    if(enable){
      social[key] = setting[key];
    }
  });

  // programmatically set constant, 'SOCIAL', in config module
  $provide.constant('SOCIAL', social);
}]);
angular.module('login.forgot', ['security.service', 'services.utility', 'ui.bootstrap']);
angular.module('login.forgot').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/login/forgot', {
      templateUrl: 'login/forgot/login-forgot.tpl.html',
      controller: 'LoginForgotCtrl',
      title: 'Forgot Your Password?'
    });
}]);
angular.module('login.forgot').controller('LoginForgotCtrl', [ '$scope', '$location', '$log', 'security', 'utility',
  function($scope, $location, $log, security, utility){
    // local variable
    var resetSuccess = function(data){
      $scope.loginForgotForm.$setPristine();
      $scope.user = {};
      if(data.success){
        $scope.alerts.push({
          type: 'info',
          msg: 'If an account matched that address, an email will be sent with instructions.'
        });
      }else{
        angular.forEach(data.errors, function(err, index){
          $scope.alerts.push({
            type: 'danger',
            msg: err
          });
        });
      }
    };
    var resetError = function(){
      $scope.alerts.push({
        type: 'danger',
        msg: 'Error resetting your account, Please try again'
      });
    };
    // model def
    $scope.user = {};
    $scope.alerts = [];

    // method def
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.canSave = utility.canSave;
    $scope.closeAlert = function(ind){
      $scope.alerts.splice(ind, 1);
    };
    $scope.submit = function(){
      security.loginForgot($scope.user).then(resetSuccess, resetError);
    };
  }]);

angular.module('login', [
  'login.index',
  'login.forgot',
  'login.reset',
  'login.social'
]);
angular.module('login.index', ['ngRoute', 'config', 'security.service', 'directives.serverError', 'services.utility', 'ui.bootstrap']);
angular.module('login.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/login', {
      templateUrl: 'login/login.tpl.html',
      controller: 'LoginCtrl',
      title: 'Login',
      resolve: {
        UnauthenticatedUser: ['$q', '$location', 'securityAuthorization', function($q, $location, securityAuthorization){
          var promise = securityAuthorization.requireUnauthenticatedUser()
            .catch(function(){
              // user is authenticated, redirect
              $location.path('/');
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('login.index').controller('LoginCtrl', [ '$scope', '$location', '$log', 'security', 'utility', 'SOCIAL',
  function($scope, $location, $log, security, utility, SOCIAL){
    // local variable
    var loginSuccess = function(data){
      if(data.success){
        //account/user created, redirect...
        var url = data.defaultReturnUrl || '/';
        return $location.path('/');
      }else{
        //error due to server side validation
        $scope.errfor = data.errfor;
        angular.forEach(data.errfor, function(err, field){
          $scope.loginForm[field].$setValidity('server', false);
        });
        angular.forEach(data.errors, function(err, index){
          $scope.alerts.push({
            type: 'danger',
            msg: err
          });
        });
      }
    };
    var loginError = function(){
      $scope.alerts.push({
        type: 'danger',
        msg: 'Error logging you in, Please try again'
      });
    };
    // model def
    $scope.user = {};
    $scope.alerts = [];
    $scope.errfor = {};
    $scope.social = angular.equals({}, SOCIAL)? null: SOCIAL;

    // method def
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.canSave = utility.canSave;
    $scope.closeAlert = function(ind){
      $scope.alerts.splice(ind, 1);
    };
    $scope.submit = function(){
      $scope.alerts = [];
      security.login($scope.user.username, $scope.user.password).then(loginSuccess, loginError);
    };
  }]);

angular.module('login.reset', ['security.service', 'services.utility', 'ui.bootstrap']);
angular.module('login.reset').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/login/reset', {
      templateUrl: 'login/reset/login-reset.tpl.html',
      controller: 'LoginResetCtrl',
      title: 'Reset Your Password'
    })
    .when('/login/reset/:email/:token', {
      templateUrl: 'login/reset/login-reset.tpl.html',
      controller: 'LoginResetCtrl'
    });
}]);
angular.module('login.reset').controller('LoginResetCtrl', [ '$scope', '$location', '$routeParams', '$log', 'security', 'utility',
  function($scope, $location, $routeParams, $log, security, utility){
    // local variable
    var warningAlert = {
      type: 'warning',
      msg:  'You do not have a valid reset request.'
    };
    var successAlert = {
      type: 'info',
      msg:  'Your password has been reset. Please login to confirm.'
    };
    var resetSuccess = function(data){
      $scope.resetForm.$setPristine();
      $scope.user = {};
      if(data.success){
        $scope.success = true;
        $scope.alerts.push(successAlert);
      }else{
        angular.forEach(data.errors, function(err, index){
          $scope.alerts.push({
            type: 'danger',
            msg: err
          });
        });
      }
    };
    var resetError = function(){
      $scope.alerts.push({
        type: 'danger',
        msg: 'Error resetting your password, Please try again'
      });
    };
    // model def
    $scope.user = {};
    $scope.alerts = [];
    $scope.email = $routeParams.email;
    $scope.id = $routeParams.token;
    $scope.success = false;

    //initial behavior
    if(!($scope.email && $scope.id)){
      $scope.alerts.push(warningAlert);
    }

    // method def
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.canSave = utility.canSave;
    $scope.closeAlert = function(ind){
      $scope.alerts.splice(ind, 1);
    };
    $scope.submit = function(){
      security.loginReset($scope.id, $scope.email, $scope.user).then(resetSuccess, resetError);
    };
  }]);

angular.module('login.social', [
  'login.social.google',
  'login.social.facebook'
]);

angular.module('login.social.facebook', ['security.service']);
angular.module('login.social.facebook').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/login/facebook/callback', {
      resolve: {
        verify: ['$log', '$q', '$location', '$route', 'security', function($log, $q, $location, $route, security){
          var redirectUrl;
          var code = $route.current.params.code || '';
          var promise = security.socialLogin('facebook', code)
            .then(function(data){
              if(data.success) {
                // redirectUrl = data.defaultReturnUrl || '/account'
                redirectUrl = '/account';
              }
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/login';
              $location.search({}); //remove search params added by passport/facebook
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    })
  ;
}]);

angular.module('login.social.google', ['security.service']);
angular.module('login.social.google').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/login/google/callback', {
      resolve: {
        verify: ['$log', '$q', '$location', '$route', 'security', function($log, $q, $location, $route, security){
          var redirectUrl;
          var code = $route.current.params.code || '';
          var promise = security.socialLogin('google', code)
            .then(function(data){
              if(data.success) {
                // redirectUrl = data.defaultReturnUrl || '/account'
                redirectUrl = '/account';
              }
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/login';
              $location.search({}); //remove search params added by passport/google
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      },
      reloadOnSearch: false
    })
  ;
}]);

angular.module('signup', ['ngRoute', 'config', 'services.utility', 'security.service', 'directives.serverError', 'ui.bootstrap']);
angular.module('signup').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/signup', {
      templateUrl: 'signup/signup.tpl.html',
      controller: 'SignupCtrl',
      title: 'Sign Up',
      resolve: {
        UnauthenticatedUser: ['$q', '$location', 'securityAuthorization', function($q, $location, securityAuthorization){
          var promise = securityAuthorization.requireUnauthenticatedUser()
            .catch(function(){
              // user is authenticated, redirect
              console.log(' catch');
              $location.path('/');
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('signup').controller('SignupCtrl', [ '$scope', '$location', '$log', 'utility', 'security', 'SOCIAL',
  function($scope, $location, $log, utility, security, SOCIAL){
    // local variable
    var signupSuccess = function(data){
      if(data.success){
        console.log('signup success');
        //account/user created, redirect...
        var url = data.defaultReturnUrl || '/';
        return $location.path('/login');
      }else{
        //error due to server side validation
        $scope.errfor = data.errfor;
        angular.forEach(data.errfor, function(err, field){
          $scope.signupForm[field].$setValidity('server', false);
        });
      }
    };
    var signupError = function(){
      console.log('error');
      $scope.alerts.push({
        type: 'danger',
        msg: 'Error creating account, Please try again'
      });
    };
    // model def
    $scope.user = {};
    $scope.alerts = [];
    $scope.errfor = {};
    $scope.social = angular.equals({}, SOCIAL)? null: SOCIAL;

    // method def
    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.canSave = utility.canSave;
    $scope.closeAlert = function(ind){
      $scope.alerts.splice(ind, 1);
    };
    $scope.submit = function(){
      security.signup($scope.user).then(signupSuccess, signupError);
    };
  }]);
angular.module('templates.app', ['404.tpl.html', 'about.tpl.html', 'account/account.tpl.html', 'account/settings/account-settings.tpl.html', 'account/verification/account-verification.tpl.html', 'admin/accounts/admin-account.tpl.html', 'admin/accounts/admin-accounts.tpl.html', 'admin/admin-groups/admin-group.tpl.html', 'admin/admin-groups/admin-groups.tpl.html', 'admin/admin.tpl.html', 'admin/administrators/admin-administrator.tpl.html', 'admin/administrators/admin-administrators.tpl.html', 'admin/categories/admin-categories.tpl.html', 'admin/categories/admin-category.tpl.html', 'admin/statuses/admin-status.tpl.html', 'admin/statuses/admin-statuses.tpl.html', 'admin/users/admin-user.tpl.html', 'admin/users/admin-users.tpl.html', 'contact.tpl.html', 'footer.tpl.html', 'header.tpl.html', 'login/forgot/login-forgot.tpl.html', 'login/login.tpl.html', 'login/reset/login-reset.tpl.html', 'main.tpl.html', 'signup/signup.tpl.html']);

angular.module("404.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("404.tpl.html",
    "<h1>Page Not Found</h1>\n" +
    "<p class=\"lead\">The resource you requested doesn't exist.</p>\n" +
    "");
}]);

angular.module("about.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("about.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <h1>About Us</h1>\n" +
    "        </div>\n" +
    "        <div class=\"media\">\n" +
    "            <a href=\"#\" class=\"pull-left\">\n" +
    "                <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAG/0lEQVR4Xu2d+U8USxDHC+VQQLmRQ+NPBhGIQCB4Rf92jngggkpAIMYQBIyigHiDwnvfzut9s8Muu9ayO5vqbycmMDPVdtX3M91VNSZWbG9vHwlHsBGoIADBau8cJwBh608AAtefABAAJoFBM8AcIGj5mQQGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM8AcIGj5WQYGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM8AcIGj5WQYGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM1BWOcDPnz9lY2ND/k1MnShnz56VpqYmuXLlilRWVuYUCrZ//vxJPdfW1ibnz5/PaZfPA+W8tnzWn+2ZsgFgfX1dlpaWsvrS398vHR0dWe9D/FevXqXdv3HjhnR1dRUSH2dbzmsr1LmyAODjx4/y/PnznL6Mjo5KQ0PDsed+//4tExMTcnh4mHavr69POjs7c8570gPlvLaCHPvPOHEAsGVPTk4KRPQD23Z7e7usra3J0dH//69lS0uLDA0NHfN7fn5e3r9/f+x6oQCU89pOQ3zMkTgA8Tesurpa7t27J2fOnJGvX7/K48ePU74iJ3jw4IG758fu7q7MzMy4a9l2AFzf2dmRiooKZ4bfL1y4IDU1Nal5cN/D5u9/+fIlbWcqxtpOS0jtPIkDgHMfZ6wfIyMj0tjYmPr927dvLrGDOFVVVVJbW5u6h2sPHz6UHz9+uGu49/3799R9vwPs7++7XSa6m5w7d07u3r3roHj37p0sLCykxRD5w97eXtHXphXutOwSB+DRo0cCkTGQ6Q8PDwvearz9EOzixYsukcPbHx9v376V5eVldxlvJ0SL5hLRI2Bzc1MWFxfTpujp6ZHLly/L+Ph42hEEAAFiqdZ2WmJq5kkcAGzxEDvTFh51aGBgQC5dupS6hLd6amoqte3fvHnTQfD06dNjO4C/8OzZM3cU+AHgUCpiB/ADO8L9+/fdblPKtWnEOw2bRAE4ODhwIkZr95OcGhwclNbWVvfIixcvZGtry/1cX18vt27dcv2D2dnZrADEocn0d/ldo9RrOw0xNXMkCkA2QXCW44z2DSHvGK7duXNHPn/+LHib/YD4gCAXAHg+U7/Az9Pc3OyOIIwk1qYRsFCbsgMAXT+czRgfPnyQly9fpvkIACD+r1+/3PXu7m7p7e11P8cBiB8bfqK5uTn59OlT2rw4DlB9+I5jJgBKsbZCBf1b+0QBiGfxyANw/kbbvtPT0y4b9wMdQSRz0ZIPOwMGegnRfgLmwx+AgB6CH+gvrKyspMUKuw7g8iOptf2tgIU+nygAWHw0046WZt4xiI0M3g9k+igd4zX/SYGIVgPo6aN0zGR/7do1uXr1amqqUq+tUDE19okDEO/i3b59W+rq6pwveAuRJPrtHtfGxsYEu0K0ps/lePSbAKoE5BCZBioA9Ab8jlLqteXyoxj3Ewcgfs5jK0YNjpJudXVVXr9+nfLbl2goG+NvMO6hf/DmzZvU88gPUDqil4BjJdo3yBZMJJOADPOVcm3FEDefORMHAG9yvBGDhaMORykWHdGEL5Nzvi3s70WTQHQLsfVHdw4kdcgN4h+i/FFQqrXlI1SxnkkcADgWz94zOQsgkKVn6gj657OVgRDyyZMnruHkB95wfFfAzhA963Ef91Ba4igq9tqKJWy+85YFAFgsPgqh5MuUnOEfheArYPQjUCYHs5WB6P5F+wawvX79umsDY6DKQF4RHfiMjOSx2GvLV6hiPVc2AHgHkaDh24AHAeL7pLBYQch33nJeW74+xJ8rOwC0jtBOFwECoIubGSsCYEZKnSMEQBc3M1YEwIyUOkcIgC5uZqwIgBkpdY4QAF3czFgRADNS6hwhALq4mbEiAGak1DlCAHRxM2NFAMxIqXOEAOjiZsaKAJiRUucIAdDFzYwVATAjpc4RAqCLmxkrAmBGSp0jBEAXNzNWBMCMlDpHCIAubmasCIAZKXWOEABd3MxYEQAzUuocIQC6uJmxIgBmpNQ5QgB0cTNjRQDMSKlzhADo4mbGigCYkVLnCAHQxc2MFQEwI6XOEQKgi5sZKwJgRkqdIwRAFzczVgTAjJQ6RwiALm5mrAiAGSl1jhAAXdzMWBEAM1LqHCEAuriZsSIAZqTUOUIAdHEzY0UAzEipc4QA6OJmxooAmJFS5wgB0MXNjBUBMCOlzhECoIubGSsCYEZKnSMEQBc3M1YEwIyUOkcIgC5uZqwIgBkpdY78A7hAWkz2lAp/AAAAAElFTkSuQmCC\"\n" +
    "                style=\"width: 64px; height: 64px;\" class=\"media-object\">\n" +
    "            </a>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\">Leo Damon</h4>\n" +
    "\n" +
    "                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin\n" +
    "                    commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"media text-right\">\n" +
    "            <a href=\"#\" class=\"pull-right\">\n" +
    "                <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAG/0lEQVR4Xu2d+U8USxDHC+VQQLmRQ+NPBhGIQCB4Rf92jngggkpAIMYQBIyigHiDwnvfzut9s8Muu9ayO5vqbycmMDPVdtX3M91VNSZWbG9vHwlHsBGoIADBau8cJwBh608AAtefABAAJoFBM8AcIGj5mQQGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM8AcIGj5WQYGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM8AcIGj5WQYGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM1BWOcDPnz9lY2ND/k1MnShnz56VpqYmuXLlilRWVuYUCrZ//vxJPdfW1ibnz5/PaZfPA+W8tnzWn+2ZsgFgfX1dlpaWsvrS398vHR0dWe9D/FevXqXdv3HjhnR1dRUSH2dbzmsr1LmyAODjx4/y/PnznL6Mjo5KQ0PDsed+//4tExMTcnh4mHavr69POjs7c8570gPlvLaCHPvPOHEAsGVPTk4KRPQD23Z7e7usra3J0dH//69lS0uLDA0NHfN7fn5e3r9/f+x6oQCU89pOQ3zMkTgA8Tesurpa7t27J2fOnJGvX7/K48ePU74iJ3jw4IG758fu7q7MzMy4a9l2AFzf2dmRiooKZ4bfL1y4IDU1Nal5cN/D5u9/+fIlbWcqxtpOS0jtPIkDgHMfZ6wfIyMj0tjYmPr927dvLrGDOFVVVVJbW5u6h2sPHz6UHz9+uGu49/3799R9vwPs7++7XSa6m5w7d07u3r3roHj37p0sLCykxRD5w97eXtHXphXutOwSB+DRo0cCkTGQ6Q8PDwvearz9EOzixYsukcPbHx9v376V5eVldxlvJ0SL5hLRI2Bzc1MWFxfTpujp6ZHLly/L+Ph42hEEAAFiqdZ2WmJq5kkcAGzxEDvTFh51aGBgQC5dupS6hLd6amoqte3fvHnTQfD06dNjO4C/8OzZM3cU+AHgUCpiB/ADO8L9+/fdblPKtWnEOw2bRAE4ODhwIkZr95OcGhwclNbWVvfIixcvZGtry/1cX18vt27dcv2D2dnZrADEocn0d/ldo9RrOw0xNXMkCkA2QXCW44z2DSHvGK7duXNHPn/+LHib/YD4gCAXAHg+U7/Az9Pc3OyOIIwk1qYRsFCbsgMAXT+czRgfPnyQly9fpvkIACD+r1+/3PXu7m7p7e11P8cBiB8bfqK5uTn59OlT2rw4DlB9+I5jJgBKsbZCBf1b+0QBiGfxyANw/kbbvtPT0y4b9wMdQSRz0ZIPOwMGegnRfgLmwx+AgB6CH+gvrKyspMUKuw7g8iOptf2tgIU+nygAWHw0046WZt4xiI0M3g9k+igd4zX/SYGIVgPo6aN0zGR/7do1uXr1amqqUq+tUDE19okDEO/i3b59W+rq6pwveAuRJPrtHtfGxsYEu0K0ps/lePSbAKoE5BCZBioA9Ab8jlLqteXyoxj3Ewcgfs5jK0YNjpJudXVVXr9+nfLbl2goG+NvMO6hf/DmzZvU88gPUDqil4BjJdo3yBZMJJOADPOVcm3FEDefORMHAG9yvBGDhaMORykWHdGEL5Nzvi3s70WTQHQLsfVHdw4kdcgN4h+i/FFQqrXlI1SxnkkcADgWz94zOQsgkKVn6gj657OVgRDyyZMnruHkB95wfFfAzhA963Ef91Ba4igq9tqKJWy+85YFAFgsPgqh5MuUnOEfheArYPQjUCYHs5WB6P5F+wawvX79umsDY6DKQF4RHfiMjOSx2GvLV6hiPVc2AHgHkaDh24AHAeL7pLBYQch33nJeW74+xJ8rOwC0jtBOFwECoIubGSsCYEZKnSMEQBc3M1YEwIyUOkcIgC5uZqwIgBkpdY4QAF3czFgRADNS6hwhALq4mbEiAGak1DlCAHRxM2NFAMxIqXOEAOjiZsaKAJiRUucIAdDFzYwVATAjpc4RAqCLmxkrAmBGSp0jBEAXNzNWBMCMlDpHCIAubmasCIAZKXWOEABd3MxYEQAzUuocIQC6uJmxIgBmpNQ5QgB0cTNjRQDMSKlzhADo4mbGigCYkVLnCAHQxc2MFQEwI6XOEQKgi5sZKwJgRkqdIwRAFzczVgTAjJQ6RwiALm5mrAiAGSl1jhAAXdzMWBEAM1LqHCEAuriZsSIAZqTUOUIAdHEzY0UAzEipc4QA6OJmxooAmJFS5wgB0MXNjBUBMCOlzhECoIubGSsCYEZKnSMEQBc3M1YEwIyUOkcIgC5uZqwIgBkpdY78A7hAWkz2lAp/AAAAAElFTkSuQmCC\"\n" +
    "                style=\"width: 64px; height: 64px;\" class=\"media-object\">\n" +
    "            </a>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\">Mathew DiCaprio</h4>\n" +
    "\n" +
    "                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin\n" +
    "                    commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"media\">\n" +
    "            <a href=\"#\" class=\"pull-left\">\n" +
    "                <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAG/0lEQVR4Xu2d+U8USxDHC+VQQLmRQ+NPBhGIQCB4Rf92jngggkpAIMYQBIyigHiDwnvfzut9s8Muu9ayO5vqbycmMDPVdtX3M91VNSZWbG9vHwlHsBGoIADBau8cJwBh608AAtefABAAJoFBM8AcIGj5mQQGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM8AcIGj5WQYGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM8AcIGj5WQYGLj8BIADsA4TNAHOAsPVnGRi4/gSAALAPEDQDzAGClp9lYODyEwACwD5A2AwwBwhbf5aBgetPAAgA+wBBM1BWOcDPnz9lY2ND/k1MnShnz56VpqYmuXLlilRWVuYUCrZ//vxJPdfW1ibnz5/PaZfPA+W8tnzWn+2ZsgFgfX1dlpaWsvrS398vHR0dWe9D/FevXqXdv3HjhnR1dRUSH2dbzmsr1LmyAODjx4/y/PnznL6Mjo5KQ0PDsed+//4tExMTcnh4mHavr69POjs7c8570gPlvLaCHPvPOHEAsGVPTk4KRPQD23Z7e7usra3J0dH//69lS0uLDA0NHfN7fn5e3r9/f+x6oQCU89pOQ3zMkTgA8Tesurpa7t27J2fOnJGvX7/K48ePU74iJ3jw4IG758fu7q7MzMy4a9l2AFzf2dmRiooKZ4bfL1y4IDU1Nal5cN/D5u9/+fIlbWcqxtpOS0jtPIkDgHMfZ6wfIyMj0tjYmPr927dvLrGDOFVVVVJbW5u6h2sPHz6UHz9+uGu49/3799R9vwPs7++7XSa6m5w7d07u3r3roHj37p0sLCykxRD5w97eXtHXphXutOwSB+DRo0cCkTGQ6Q8PDwvearz9EOzixYsukcPbHx9v376V5eVldxlvJ0SL5hLRI2Bzc1MWFxfTpujp6ZHLly/L+Ph42hEEAAFiqdZ2WmJq5kkcAGzxEDvTFh51aGBgQC5dupS6hLd6amoqte3fvHnTQfD06dNjO4C/8OzZM3cU+AHgUCpiB/ADO8L9+/fdblPKtWnEOw2bRAE4ODhwIkZr95OcGhwclNbWVvfIixcvZGtry/1cX18vt27dcv2D2dnZrADEocn0d/ldo9RrOw0xNXMkCkA2QXCW44z2DSHvGK7duXNHPn/+LHib/YD4gCAXAHg+U7/Az9Pc3OyOIIwk1qYRsFCbsgMAXT+czRgfPnyQly9fpvkIACD+r1+/3PXu7m7p7e11P8cBiB8bfqK5uTn59OlT2rw4DlB9+I5jJgBKsbZCBf1b+0QBiGfxyANw/kbbvtPT0y4b9wMdQSRz0ZIPOwMGegnRfgLmwx+AgB6CH+gvrKyspMUKuw7g8iOptf2tgIU+nygAWHw0046WZt4xiI0M3g9k+igd4zX/SYGIVgPo6aN0zGR/7do1uXr1amqqUq+tUDE19okDEO/i3b59W+rq6pwveAuRJPrtHtfGxsYEu0K0ps/lePSbAKoE5BCZBioA9Ab8jlLqteXyoxj3Ewcgfs5jK0YNjpJudXVVXr9+nfLbl2goG+NvMO6hf/DmzZvU88gPUDqil4BjJdo3yBZMJJOADPOVcm3FEDefORMHAG9yvBGDhaMORykWHdGEL5Nzvi3s70WTQHQLsfVHdw4kdcgN4h+i/FFQqrXlI1SxnkkcADgWz94zOQsgkKVn6gj657OVgRDyyZMnruHkB95wfFfAzhA963Ef91Ba4igq9tqKJWy+85YFAFgsPgqh5MuUnOEfheArYPQjUCYHs5WB6P5F+wawvX79umsDY6DKQF4RHfiMjOSx2GvLV6hiPVc2AHgHkaDh24AHAeL7pLBYQch33nJeW74+xJ8rOwC0jtBOFwECoIubGSsCYEZKnSMEQBc3M1YEwIyUOkcIgC5uZqwIgBkpdY4QAF3czFgRADNS6hwhALq4mbEiAGak1DlCAHRxM2NFAMxIqXOEAOjiZsaKAJiRUucIAdDFzYwVATAjpc4RAqCLmxkrAmBGSp0jBEAXNzNWBMCMlDpHCIAubmasCIAZKXWOEABd3MxYEQAzUuocIQC6uJmxIgBmpNQ5QgB0cTNjRQDMSKlzhADo4mbGigCYkVLnCAHQxc2MFQEwI6XOEQKgi5sZKwJgRkqdIwRAFzczVgTAjJQ6RwiALm5mrAiAGSl1jhAAXdzMWBEAM1LqHCEAuriZsSIAZqTUOUIAdHEzY0UAzEipc4QA6OJmxooAmJFS5wgB0MXNjBUBMCOlzhECoIubGSsCYEZKnSMEQBc3M1YEwIyUOkcIgC5uZqwIgBkpdY78A7hAWkz2lAp/AAAAAElFTkSuQmCC\"\n" +
    "                style=\"width: 64px; height: 64px;\" class=\"media-object\">\n" +
    "            </a>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\">Nick Jackson</h4>\n" +
    "\n" +
    "                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin\n" +
    "                    commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6 special\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <h1>Prestige Worldwide</h1>\n" +
    "        </div>\n" +
    "        <p class=\"lead\">The first name in entertainment.</p><i class=\"fa fa-volume-up super-awesome\"></i>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("account/account.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("account/account.tpl.html",
    "<div class=\"row\" id=\"account\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"page-header\"><h1>My Account</h1></div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value day-of-year\" ng-bind=\"dayOfYear\"></div>\n" +
    "                    <div class=\"stat-label\">Day of Year</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value day-of-month\" ng-bind=\"dayOfMonth\"></div>\n" +
    "                    <div class=\"stat-label\">Day of Month</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value week-of-year\" ng-bind=\"weekOfYear\"></div>\n" +
    "                    <div class=\"stat-label\">Week of Year</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value day-of-week\" ng-bind=\"dayOfWeek\"></div>\n" +
    "                    <div class=\"stat-label\">Day of Week</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value week-year\" ng-bind=\"weekYear\"></div>\n" +
    "                    <div class=\"stat-label\">Week Year</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value hour-of-day\" ng-bind=\"hourOfDay\"></div>\n" +
    "                    <div class=\"stat-label\">Hour of Day</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6 special\">\n" +
    "        <div class=\"page-header\"><h1>Go Faster Everyday</h1></div>\n" +
    "        <i class=\"fa fa-dashboard super-awesome\"></i></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("account/settings/account-settings.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("account/settings/account-settings.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\"><h1>Account Settings</h1></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <form name=\"detailForm\">\n" +
    "            <legend>Contact Info</legend>\n" +
    "            <alert ng-repeat=\"alert in alerts.detail\" type=\"{{alert.type}}\" close=\"closeAlert('detail', $index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.first)}\">\n" +
    "                <label class=\"control-label\" for=\"first\">First Name:</label>\n" +
    "                <input type=\"text\" name=\"first\" id=\"first\" class=\"form-control\" ng-model=\"userDetail.first\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(detailForm.first, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.middle)}\">\n" +
    "                <label class=\"control-label\" for=\"middle\">Middle Name:</label>\n" +
    "                <input type=\"text\" name=\"middle\" id=\"middle\" class=\"form-control\" ng-model=\"userDetail.middle\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.last)}\">\n" +
    "                <label class=\"control-label\" for=\"last\">Last Name:</label>\n" +
    "                <input type=\"text\" name=\"last\" id=\"last\" class=\"form-control\" ng-model=\"userDetail.last\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(detailForm.last, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.company)}\">\n" +
    "                <label class=\"control-label\" for=\"company\">Company Name:</label>\n" +
    "                <input type=\"text\" name=\"company\" id=\"company\" class=\"form-control\" ng-model=\"userDetail.company\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.phone)}\">\n" +
    "                <label class=\"control-label\" for=\"phone\">Phone:</label>\n" +
    "                <input type=\"text\" name=\"phone\" id=\"phone\" class=\"form-control\" ng-model=\"userDetail.phone\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.zip)}\">\n" +
    "                <label class=\"control-label\" for=\"zip\">Zip:</label>\n" +
    "                <input type=\"text\" name=\"zip\" id=\"zip\" class=\"form-control\" ng-model=\"userDetail.zip\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-update\" ng-disabled=\"!canSave(detailForm)\" ng-click=\"submit(detailForm)\">Update</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <form name=\"identityForm\">\n" +
    "            <legend>Identity</legend>\n" +
    "            <alert ng-repeat=\"alert in alerts.identity\" type=\"{{alert.type}}\" close=\"closeAlert('identity', $index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(identityForm.username)}\">\n" +
    "                <label class=\"control-label\" for=\"username\">Username:</label>\n" +
    "                <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"user.username\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.username, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.username, 'server')\">{{errfor.username}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(identityForm.email)}\">\n" +
    "                <label class=\"control-label\" for=\"email\">Email:</label>\n" +
    "                <input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"user.email\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.email, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.email, 'email')\">Please enter a valid email</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.email, 'server')\">{{errfor.email}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-update\" ng-disabled=\"!canSave(identityForm)\" ng-click=\"submit(identityForm)\">Update</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <form name=\"passwordForm\">\n" +
    "            <legend>Set Password</legend>\n" +
    "            <alert ng-repeat=\"alert in alerts.pass\" type=\"{{alert.type}}\" close=\"closeAlert('pass', $index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(passwordForm.password)}\">\n" +
    "                <label class=\"control-label\" for=\"password\">New Password:</label>\n" +
    "                <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"pass.newPassword\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(passwordForm.password, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(passwordForm.confirm)}\">\n" +
    "                <label class=\"control-label\" for=\"confirm\">Confirm Password:</label>\n" +
    "                <input type=\"password\" name=\"confirm\" id=\"confirm\" class=\"form-control\" ng-model=\"pass.confirm\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(passwordForm.confirm, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-password\" ng-disabled=\"!canSave(passwordForm)\" ng-click=\"submit(passwordForm)\">Set Password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-3\" ng-if=\"social\">\n" +
    "        <legend>Social Connections</legend>\n" +
    "        <alert ng-repeat=\"alert in socialAlerts\" type=\"{{alert.type}}\" close=\"closeSocialAlert($index)\">{{alert.msg}}</alert>\n" +
    "        <a ng-repeat-start=\"(provider, property) in social\" ng-if=\"property.connected\" ng-click=\"disconnect(provider)\" class=\"btn btn-block btn-danger\"><i ng-class=\"'fa ' + property.icon + ' fa-lg'\"></i> Disconnect {{property.text}}</a>\n" +
    "        <a ng-repeat-end target=\"_self\" href=\"{{property.connect}}\" ng-if=\"!property.connected\" class=\"btn btn-block btn-default\"><i ng-class=\"'fa ' + property.icon + ' fa-lg'\"></i> Connect {{property.text}}</a>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("account/verification/account-verification.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("account/verification/account-verification.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"page-header\"><h1>Verification Required</h1></div>\n" +
    "        <div class=\"alert alert-warning\">Your account is nearly ready. Check your inbox for next steps.</div>\n" +
    "        <div id=\"verify\"></div>\n" +
    "        <form name=\"verificationForm\">\n" +
    "            <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"not-received\" ng-show=\"!formVisible\">\n" +
    "                <a class=\"btn btn-link btn-resend\" ng-click=\"showForm()\">I checked my email and spam folder, nothing yet.</a>\n" +
    "            </div>\n" +
    "            <div class=\"verify-form\" ng-show=\"formVisible\">\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': hasError(verificationForm.email)}\">\n" +
    "                    <label class=\"control-label\" for=\"email\">Your Email:</label>\n" +
    "                    <input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"email\" required server-error>\n" +
    "                    <span class=\"help-block\" ng-show=\"showError(verificationForm.email, 'required')\">This field is required</span>\n" +
    "                    <span class=\"help-block\" ng-show=\"showError(verificationForm.email, 'email')\">Please enter a valid email</span>\n" +
    "                    <span class=\"help-block\" ng-show=\"showError(verificationForm.email, 'server')\">{{errfor.email}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-verify\" ng-click=\"submit()\">Re-Send Verification</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6 special\">\n" +
    "        <div class=\"page-header\"><h1>You're Almost Done</h1></div>\n" +
    "        <i class=\"fa fa-key super-awesome\"></i></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("admin/accounts/admin-account.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/accounts/admin-account.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <h1><a ng-href=\"/admin/accounts\">Accounts</a> / {{account.name.full}}</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"row\" id=\"admin-accounts-detail\">\n" +
    "    <div class=\"col-sm-8\">\n" +
    "        <form name=\"contactForm\"><fieldset>\n" +
    "            <legend>Contact Info</legend>\n" +
    "            <alert ng-repeat=\"alert in contactAlerts\" type=\"{{alert.type}}\" close=\"closeContactAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.first)}\">\n" +
    "                <label class=\"control-label\" for=\"first\">First Name:</label>\n" +
    "                <input type=\"text\" name=\"first\" id=\"first\" class=\"form-control\" ng-model=\"account.name.first\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(contactForm.first, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.middle)}\">\n" +
    "                <label class=\"control-label\" for=\"middle\">Middle Name:</label>\n" +
    "                <input type=\"text\" name=\"middle\" id=\"middle\" class=\"form-control\" ng-model=\"account.name.middle\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.last)}\">\n" +
    "                <label class=\"control-label\" for=\"last\">Last Name:</label>\n" +
    "                <input type=\"text\" name=\"last\" id=\"last\" class=\"form-control\" ng-model=\"account.name.last\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(contactForm.last, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.company)}\">\n" +
    "                <label class=\"control-label\" for=\"company\">Company Name:</label>\n" +
    "                <input type=\"text\" name=\"company\" id=\"company\" class=\"form-control\" ng-model=\"account.company\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.phone)}\">\n" +
    "                <label class=\"control-label\" for=\"phone\">Phone:</label>\n" +
    "                <input type=\"text\" name=\"phone\" id=\"phone\" class=\"form-control\" ng-model=\"account.phone\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.zip)}\">\n" +
    "                <label class=\"control-label\" for=\"zip\">Zip:</label>\n" +
    "                <input type=\"text\" name=\"zip\" id=\"zip\" class=\"form-control\" ng-model=\"account.zip\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(contactForm)\" ng-click=\"updateAccount()\">Update</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"loginForm\"><fieldset>\n" +
    "            <legend>Login</legend>\n" +
    "            <alert ng-repeat=\"alert in loginAlerts\" type=\"{{alert.type}}\" close=\"closeLoginAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': loginForm.newUsername && hasError(loginForm.newUsername)}\">\n" +
    "                <label class=\"control-label\">Username:</label>\n" +
    "                <!-- show this div if there is an user linked to this account -->\n" +
    "                <div class=\"input-group\" ng-show=\"account.user && account.user.name\">\n" +
    "                    <input type=\"text\" name=\"username\" class=\"form-control\" ng-model=\"account.user.name\" disabled>\n" +
    "                    <div class=\"input-group-btn\" >\n" +
    "                        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"unlinkUser()\">Unlink</button>\n" +
    "                        <a type=\"button\" class=\"btn btn-default\" ng-href=\"/admin/users/{{account.user.id}}\">Open</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!-- show this div if there isn't an user linked to this account -->\n" +
    "                <div class=\"input-group\" ng-if=\"!(account.user && account.user.name)\">\n" +
    "                    <input type=\"text\" name=\"newUsername\" placeholder=\"enter a username\" class=\"form-control\" ng-model=\"account.newUsername\" required>\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!(loginForm.newUsername.$dirty && loginForm.newUsername.$valid)\" ng-click=\"linkUser()\">Link</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <span class=\"help-block\" ng-if=\"!(account.user && account.user.name)\" ng-show=\"showError(loginForm.newUsername, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"deleteForm\"><fieldset>\n" +
    "            <legend>Danger Zone</legend>\n" +
    "            <alert ng-repeat=\"alert in deleteAlerts\" type=\"{{alert.type}}\" close=\"closeDeleteAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <span class=\"help-block\">\n" +
    "                    <span class=\"label label-danger\">If you do this, it cannot be undone.</span>&nbsp;<span class=\"text-muted\">You may also create orphaned document relationships too.</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"deleteAccount()\">Delete</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "        <fieldset>\n" +
    "            <div class=\"status-new\">\n" +
    "                <legend>Status</legend>\n" +
    "                <alert ng-repeat=\"alert in statusAlerts\" type=\"{{alert.type}}\" close=\"closeStatusAlert($index)\">{{alert.msg}}</alert>\n" +
    "                <div class=\"input-group\">\n" +
    "                    <select name=\"statusSelect\" class=\"form-control\" ng-model=\"selectedStatus\" ng-options=\"status.name for status in statuses track by status._id\">\n" +
    "                        <option value=\"\">-- choose --</option>\n" +
    "                    </select>\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button class=\"btn btn-default\" ng-click=\"changeStatus()\">Change</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"status-items\">\n" +
    "                <div class=\"status\" ng-repeat=\"status in account.statusLog | orderBy:'-_id'\">\n" +
    "                    <div class=\"pull-right badge author\">{{status.userCreated.name}} -&nbsp;<span class=\"timeago\" ng-bind=\"formatTime(status.userCreated.time)\"></span></div>\n" +
    "                    <div ng-bind=\"status.name\"></div>\n" +
    "                    <div class=\"clearfix\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "        <fieldset>\n" +
    "            <div class=\"notes-new\">\n" +
    "                <legend>Notes</legend>\n" +
    "                <alert ng-repeat=\"alert in noteAlerts\" type=\"{{alert.type}}\" close=\"closeNoteAlert($index)\">{{alert.msg}}</alert>\n" +
    "                <textarea rows=\"3\" name=\"note\" placeholder=\"enter notes\" class=\"form-control\" ng-model=\"newNote\"></textarea>\n" +
    "                <button class=\"btn btn-default btn-block\" ng-click=\"addNote()\">Add New Note</button>\n" +
    "            </div>\n" +
    "            <div class=\"notes-items\">\n" +
    "                <div class=\"note\" ng-repeat=\"note in account.notes | orderBy: '-_id'\">\n" +
    "                    <div class=\"force-wrap\" ng-bind=\"note.data\"></div>\n" +
    "                    <div class=\"pull-right badge author\">{{note.userCreated.name}} -&nbsp;<span class=\"timeago\" ng-bind=\"formatTime(note.userCreated.time)\"></span></div>\n" +
    "                    <div class=\"clearfix\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"note text-muted\" ng-show=\"account.notes.length === 0\">no notes found</div>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/accounts/admin-accounts.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/accounts/admin-accounts.tpl.html",
    "<div class=\"row\" id=\"admin-accounts-index\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <form class=\"form-inline pull-right\" name=\"addAccountForm\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input name=\"name\" type=\"text\" placeholder=\"enter a name\" class=\"form-control\" ng-model=\"fullname\" required>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(addAccountForm)\" ng-click=\"addAccount()\">Add New</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <h1>Accounts</h1>\n" +
    "        </div>\n" +
    "        <form class=\"filters\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Search</label>\n" +
    "                    <input name=\"search\" type=\"text\" class=\"form-control\" ng-model=\"filters.search\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"filtersUpdated()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Status</label>\n" +
    "                    <select name=\"status\" class=\"form-control\" ng-model=\"filters.status\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"status._id as status.name for status in statuses\" ng-change=\"filtersUpdated()\">\n" +
    "                        <option value=\"\">-- any --</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Sort By</label>\n" +
    "                    <select name=\"sort\" class=\"form-control\" ng-model=\"filters.sort\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"sort.value as sort.label for sort in sorts\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"_id\">id &#9650;</option>-->\n" +
    "                        <!--<option value=\"-_id\">id &#9660;</option>-->\n" +
    "                        <!--<option value=\"name\">name &#9650;</option>-->\n" +
    "                        <!--<option value=\"-name\">name &#9660;</option>-->\n" +
    "                        <!--<option value=\"company\">company &#9650;</option>-->\n" +
    "                        <!--<option value=\"-company\">company &#9660;</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Limit</label>\n" +
    "                    <select name=\"limit\" class=\"form-control\" ng-model=\"filters.limit\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"limit.value as limit.label for limit in limits\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"10\">10 items</option>-->\n" +
    "                        <!--<option value=\"20\" selected=\"selected\">20 items</option>-->\n" +
    "                        <!--<option value=\"50\">50 items</option>-->\n" +
    "                        <!--<option value=\"100\">100 items</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th></th>\n" +
    "                <th>name<span class=\"pull-right\">age</span></th>\n" +
    "                <th>phone</th>\n" +
    "                <th>status</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"account in accounts\">\n" +
    "                <td><a class=\"btn btn-default btn-sm\" ng-href=\"/admin/accounts/{{account._id}}\">Edit</a></td>\n" +
    "                <td class=\"stretch\"><span class=\"badge badge-clear pull-right\" ng-bind=\"formatTime(account.userCreated.time, 'old')\"></span>{{account.name.full}}</td>\n" +
    "                <td class=\"nowrap\" ng-bind=\"account.phone\"></td>\n" +
    "                <td class=\"nowrap\">\n" +
    "                    <div ng-bind=\"account.status.name\"></div>\n" +
    "                    <div ng-bind=\"formatTime(account.status.userCreated.time)\"></div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr ng-show=\"accounts.length === 0\">\n" +
    "                <td colspan=\"4\">no documents matched</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"well\" ng-if=\"pages.total > 1\">\n" +
    "            <div class=\"btn-group pull-left\">\n" +
    "                <button disabled class=\"btn btn-default\">Page {{pages.current}} of {{pages.total}}</button>\n" +
    "                <button disabled class=\"btn btn-default\">Rows {{items.begin}} - {{items.end}} of {{items.total}}</button>\n" +
    "            </div>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasPrev}\" ng-click=\"prev()\">Prev</button>\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasNext}\" ng-click=\"next()\"> Next</button>\n" +
    "            </div>\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/admin-groups/admin-group.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/admin-groups/admin-group.tpl.html",
    "<div class=\"row\" id=\"admin-groups-detail\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <h1><a href=\"/admin/admin-groups\">Admin Groups</a> / {{group.name}}</h1>\n" +
    "        </div>\n" +
    "        <form name=\"detailForm\"><fieldset>\n" +
    "            <legend>Details</legend>\n" +
    "            <alert ng-repeat=\"alert in detailAlerts\" type=\"{{alert.type}}\" close=\"closeDetailAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.name)}\">\n" +
    "                <label class=\"control-label\" for=\"name\">Name:</label>\n" +
    "                <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" ng-model=\"group.name\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(detailForm.name, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(detailForm)\" ng-click=\"update()\">Update</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"permissionForm\"><fieldset>\n" +
    "            <legend>Permissions</legend>\n" +
    "            <alert ng-repeat=\"alert in permissionAlerts\" type=\"{{alert.type}}\" close=\"closePermissionAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"control-label\">New Setting:</label>\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input name=\"permission\" type=\"text\" placeholder=\"enter a name\" class=\"form-control\" ng-model=\"newPermission\">\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button type=\"button\" class=\"btn btn-success\" ng-click=\"addPermission()\">Add</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>Settings:</label>\n" +
    "                <div class=\"permissions\">\n" +
    "                    <div class=\"input-group\" ng-repeat=\"permission in group.permissions\">\n" +
    "                        <input disabled ng-model=\"permission.name\" class=\"form-control\" disabled>\n" +
    "                        <div class=\"input-group-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-class=\"{disabled: permission.permit}\" ng-click=\"togglePermission($index)\">Allow</button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-class=\"{disabled: !permission.permit}\" ng-click=\"togglePermission($index)\">Deny</button>\n" +
    "                            <button type=\"button\" class=\"btn btn-danger btn-delete\" ng-click=\"deletePermission($index)\"><i class=\"fa fa-trash-o fa-inverse\"></i></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <span class=\"badge\" ng-show=\"group.permissions.length === 0\">no permissions defined</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"saveSettings()\">Save Settings</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"deleteForm\"><fieldset>\n" +
    "            <legend>Danger Zone</legend>\n" +
    "            <alert ng-repeat=\"alert in deleteAlerts\" type=\"{{alert.type}}\" close=\"closeDeleteAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <span class=\"help-block\">\n" +
    "                    <span class=\"label label-danger\">If you do this, it cannot be undone.</span>&nbsp;<span class=\"text-muted\">You may also create orphaned document relationships too.</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-danger btn-delete\" ng-click=\"deleteAdminGroup()\">Delete</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/admin-groups/admin-groups.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/admin-groups/admin-groups.tpl.html",
    "<div class=\"row\" id=\"admin-groups-index\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <form class=\"form-inline pull-right\" name=\"addGroupForm\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input name=\"name\" type=\"text\" placeholder=\"enter a name\" class=\"form-control\" ng-model=\"groupname\" required>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(addGroupForm)\" ng-click=\"addGroup()\">Add New</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <h1>Admin Groups</h1>\n" +
    "        </div>\n" +
    "        <form class=\"filters\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <label>Name Search</label>\n" +
    "                    <input name=\"search\" type=\"text\" class=\"form-control\" ng-model=\"filters.name\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"filtersUpdated()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <label>Sort By</label>\n" +
    "                    <select name=\"sort\" class=\"form-control\" ng-model=\"filters.sort\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"sort.value as sort.label for sort in sorts\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"_id\">id &#9650;</option>-->\n" +
    "                        <!--<option value=\"-_id\">id &#9660;</option>-->\n" +
    "                        <!--<option value=\"name\">name &#9650;</option>-->\n" +
    "                        <!--<option value=\"-name\">name &#9660;</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <label>Limit</label>\n" +
    "                    <select name=\"limit\" class=\"form-control\" ng-model=\"filters.limit\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"limit.value as limit.label for limit in limits\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"10\">10 items</option>-->\n" +
    "                        <!--<option value=\"20\" selected=\"selected\">20 items</option>-->\n" +
    "                        <!--<option value=\"50\">50 items</option>-->\n" +
    "                        <!--<option value=\"100\">100 items</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th></th>\n" +
    "                <th class=\"stretch\">name</th>\n" +
    "                <th>id</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"group in groups\">\n" +
    "                <td><a class=\"btn btn-default btn-sm\" ng-href=\"/admin/admin-groups/{{group._id}}\">Edit</a></td>\n" +
    "                <td ng-bind=\"group.name\"></td>\n" +
    "                <td class=\"nowrap\" ng-bind=\"group._id\"></td>\n" +
    "            </tr>\n" +
    "            <tr ng-show=\"groups.length === 0\">\n" +
    "                <td colspan=\"3\">no documents matched</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"well\" ng-if=\"pages.total > 1\">\n" +
    "            <div class=\"btn-group pull-left\">\n" +
    "                <button disabled class=\"btn btn-default\">Page {{pages.current}} of {{pages.total}}</button>\n" +
    "                <button disabled class=\"btn btn-default\">Rows {{items.begin}} - {{items.end}} of {{items.total}}</button>\n" +
    "            </div>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasPrev}\" ng-click=\"prev()\">Prev</button>\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasNext}\" ng-click=\"next()\"> Next</button>\n" +
    "            </div>\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/admin.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/admin.tpl.html",
    "<div class=\"row\" id=\"admin\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"page-header\"><h1>Admin Area</h1></div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value\" ng-bind=\"user.users\"></div>\n" +
    "                    <div class=\"stat-label\">Users</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value\" ng-bind=\"user.accounts\"></div>\n" +
    "                    <div class=\"stat-label\">Accounts</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value\" ng-bind=\"user.admins\"></div>\n" +
    "                    <div class=\"stat-label\">Admins</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value\" ng-bind=\"user.groups\"></div>\n" +
    "                    <div class=\"stat-label\">Groups</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value\" ng-bind=\"pivoted.categories\"></div>\n" +
    "                    <div class=\"stat-label\">Categories</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4\">\n" +
    "                <div class=\"well stat\">\n" +
    "                    <div class=\"stat-value\" ng-bind=\"pivoted.statuses\"></div>\n" +
    "                    <div class=\"stat-label\">Statuses</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6 special\">\n" +
    "        <div class=\"page-header\"><h1>Super Dashboard</h1></div>\n" +
    "        <i class=\"fa fa-gears super-awesome\"></i></div>\n" +
    "</div>");
}]);

angular.module("admin/administrators/admin-administrator.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/administrators/admin-administrator.tpl.html",
    "<div class=\"row\" id=\"admin-administrators-detail\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <h1><a href=\"/admin/administrators\">Administrators</a> / {{administrator.name.full}}</h1>\n" +
    "        </div>\n" +
    "        <form name=\"contactForm\"><fieldset>\n" +
    "            <legend>Contact Info</legend>\n" +
    "            <alert ng-repeat=\"alert in contactAlerts\" type=\"{{alert.type}}\" close=\"closeContactAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.first)}\">\n" +
    "                <label class=\"control-label\" for=\"first\">First Name:</label>\n" +
    "                <input type=\"text\" name=\"first\" id=\"first\" class=\"form-control\" ng-model=\"administrator.name.first\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(contactForm.first, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.middle)}\">\n" +
    "                <label class=\"control-label\" for=\"middle\">Middle Name:</label>\n" +
    "                <input type=\"text\" name=\"middle\" id=\"middle\" class=\"form-control\" ng-model=\"administrator.name.middle\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(contactForm.last)}\">\n" +
    "                <label class=\"control-label\" for=\"last\">Last Name:</label>\n" +
    "                <input type=\"text\" name=\"last\" id=\"last\" class=\"form-control\" ng-model=\"administrator.name.last\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(contactForm.last, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(contactForm)\" ng-click=\"updateAdmin()\">Update</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"loginForm\"><fieldset>\n" +
    "            <legend>Login</legend>\n" +
    "            <alert ng-repeat=\"alert in loginAlerts\" type=\"{{alert.type}}\" close=\"closeLoginAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': loginForm.newUsername && hasError(loginForm.newUsername)}\">\n" +
    "                <label class=\"control-label\">Username:</label>\n" +
    "                <!-- show this div if there is an user linked to this administrator -->\n" +
    "                <div class=\"input-group\" ng-show=\"administrator.user && administrator.user.name\">\n" +
    "                    <input type=\"text\" name=\"username\" class=\"form-control\" ng-model=\"administrator.user.name\" disabled>\n" +
    "                    <div class=\"input-group-btn\" >\n" +
    "                        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"unlinkUser()\">Unlink</button>\n" +
    "                        <a type=\"button\" class=\"btn btn-default\" ng-href=\"/admin/users/{{administrator.user.id}}\">Open</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!-- show this div if there isn't an user linked to this administrator -->\n" +
    "                <div class=\"input-group\" ng-if=\"!(administrator.user && administrator.user.name)\">\n" +
    "                    <input type=\"text\" name=\"newUsername\" placeholder=\"enter a username\" class=\"form-control\" ng-model=\"administrator.newUsername\" required>\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!(loginForm.newUsername.$dirty && loginForm.newUsername.$valid)\" ng-click=\"linkUser()\">Link</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <span class=\"help-block\" ng-if=\"!(administrator.user && administrator.user.name)\" ng-show=\"showError(loginForm.newUsername, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"groupForm\"><fieldset>\n" +
    "            <legend>Groups</legend>\n" +
    "            <alert ng-repeat=\"alert in groupAlerts\" type=\"{{alert.type}}\" close=\"closeGroupAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"control-label\">Add Membership:</label>\n" +
    "                <div class=\"input-group\">\n" +
    "                    <select name=\"newMembership\" class=\"form-control\" ng-options=\"group as group.name for group in groups\" ng-model=\"selectedNewGroup\"></select>\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button type=\"button\" class=\"btn btn-success\" ng-click=\"addGroup()\">Add</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"control-label\">Memberships:</label>\n" +
    "                <div class=\"groups\">\n" +
    "                    <div class=\"input-group\" ng-repeat=\"group in administrator.groups\">\n" +
    "                        <input disabled class=\"form-control\" ng-model=\"group.name\">\n" +
    "                        <div class=\"input-group-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-danger btn-delete\" ng-click=\"deleteGroup($index)\"><i class=\"fa fa-trash-o fa-inverse\"></i></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <span class=\"badge\" ng-show=\"administrator.groups.length === 0\">no memberships defined</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"saveGroups()\">Save Groups</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"permissionForm\"><fieldset>\n" +
    "            <legend>Permissions</legend>\n" +
    "            <alert ng-repeat=\"alert in permissionAlerts\" type=\"{{alert.type}}\" close=\"closePermissionAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"control-label\">New Setting:</label>\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input name=\"permission\" type=\"text\" placeholder=\"enter a name\" class=\"form-control\" ng-model=\"newPermission\">\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button type=\"button\" class=\"btn btn-success\" ng-click=\"addPermission()\">Add</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>Settings:</label>\n" +
    "                <div class=\"permissions\">\n" +
    "                    <div class=\"input-group\" ng-repeat=\"permission in administrator.permissions\">\n" +
    "                        <input disabled ng-model=\"permission.name\" class=\"form-control\" disabled>\n" +
    "                        <div class=\"input-group-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-class=\"{disabled: permission.permit}\" ng-click=\"togglePermission($index)\">Allow</button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-class=\"{disabled: !permission.permit}\" ng-click=\"togglePermission($index)\">Deny</button>\n" +
    "                            <button type=\"button\" class=\"btn btn-danger btn-delete\" ng-click=\"deletePermission($index)\"><i class=\"fa fa-trash-o fa-inverse\"></i></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <span class=\"badge\" ng-show=\"administrator.permissions.length === 0\">no permissions defined</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"saveSettings()\">Save Settings</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"deleteForm\"><fieldset>\n" +
    "            <legend>Danger Zone</legend>\n" +
    "            <alert ng-repeat=\"alert in deleteAlerts\" type=\"{{alert.type}}\" close=\"closeDeleteAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <span class=\"help-block\">\n" +
    "                    <span class=\"label label-danger\">If you do this, it cannot be undone.</span>&nbsp;<span class=\"text-muted\">You may also create orphaned document relationships too.</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-danger btn-delete\" ng-click=\"deleteAdministrator()\">Delete</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("admin/administrators/admin-administrators.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/administrators/admin-administrators.tpl.html",
    "<div class=\"row\" id=\"admin-administrators-index\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <form class=\"form-inline pull-right\" name=\"addAdminForm\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input name=\"name\" type=\"text\" placeholder=\"enter a name\" class=\"form-control\" ng-model=\"fullname\" required>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(addAdminForm)\" ng-click=\"addAdmin()\">Add New</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <h1>Administrators</h1>\n" +
    "        </div>\n" +
    "        <form class=\"filters\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <label>Name Search</label>\n" +
    "                    <input name=\"search\" type=\"text\" class=\"form-control\" ng-model=\"filters.search\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"filtersUpdated()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <label>Sort By</label>\n" +
    "                    <select name=\"sort\" class=\"form-control\" ng-model=\"filters.sort\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"sort.value as sort.label for sort in sorts\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"_id\">id &#9650;</option>-->\n" +
    "                        <!--<option value=\"-_id\">id &#9660;</option>-->\n" +
    "                        <!--<option value=\"name\">name &#9650;</option>-->\n" +
    "                        <!--<option value=\"-name\">name &#9660;</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <label>Limit</label>\n" +
    "                    <select name=\"limit\" class=\"form-control\" ng-model=\"filters.limit\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"limit.value as limit.label for limit in limits\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"10\">10 items</option>-->\n" +
    "                        <!--<option value=\"20\" selected=\"selected\">20 items</option>-->\n" +
    "                        <!--<option value=\"50\">50 items</option>-->\n" +
    "                        <!--<option value=\"100\">100 items</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th></th>\n" +
    "                <th class=\"stretch\">name</th>\n" +
    "                <th>id</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"administrator in administrators\">\n" +
    "                <td><a class=\"btn btn-default btn-sm\" ng-href=\"/admin/administrators/{{administrator._id}}\">Edit</a></td>\n" +
    "                <td class=\"nowrap\" ng-bind=\"administrator.name.full\"></td>\n" +
    "                <td ng-bind=\"administrator._id\"></td>\n" +
    "            </tr>\n" +
    "            <tr ng-show=\"administrators.length === 0\">\n" +
    "                <td colspan=\"3\">no documents matched</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"well\" ng-if=\"pages.total > 1\">\n" +
    "            <div class=\"btn-group pull-left\">\n" +
    "                <button disabled class=\"btn btn-default\">Page {{pages.current}} of {{pages.total}}</button>\n" +
    "                <button disabled class=\"btn btn-default\">Rows {{items.begin}} - {{items.end}} of {{items.total}}</button>\n" +
    "            </div>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasPrev}\" ng-click=\"prev()\">Prev</button>\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasNext}\" ng-click=\"next()\"> Next</button>\n" +
    "            </div>\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/categories/admin-categories.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/categories/admin-categories.tpl.html",
    "<div class=\"row\" id=\"admin-categories-index\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <form class=\"form-inline pull-right\" name=\"addCategoryForm\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input name=\"pivot\" type=\"text\" placeholder=\"pivot\" class=\"form-control\" ng-model=\"add.pivot\" required>\n" +
    "                    <input name=\"name\" type=\"text\" placeholder=\"name\" class=\"form-control\" ng-model=\"add.name\" required>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(addCategoryForm)\" ng-click=\"addCategory()\">Add New</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <h1>Categories</h1>\n" +
    "        </div>\n" +
    "        <form class=\"filters\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Pivot Search</label>\n" +
    "                    <input name=\"pivot\" type=\"text\" class=\"form-control\" ng-model=\"filters.pivot\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"filtersUpdated()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Name Search</label>\n" +
    "                    <input name=\"name\" type=\"text\" class=\"form-control\" ng-model=\"filters.name\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"filtersUpdated()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Sort By</label>\n" +
    "                    <select name=\"sort\" class=\"form-control\" ng-model=\"filters.sort\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"sort.value as sort.label for sort in sorts\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"_id\">id &#9650;</option>-->\n" +
    "                        <!--<option value=\"-_id\">id &#9660;</option>-->\n" +
    "                        <!--<option value=\"name\">name &#9650;</option>-->\n" +
    "                        <!--<option value=\"-name\">name &#9660;</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Limit</label>\n" +
    "                    <select name=\"limit\" class=\"form-control\" ng-model=\"filters.limit\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"limit.value as limit.label for limit in limits\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"10\">10 items</option>-->\n" +
    "                        <!--<option value=\"20\" selected=\"selected\">20 items</option>-->\n" +
    "                        <!--<option value=\"50\">50 items</option>-->\n" +
    "                        <!--<option value=\"100\">100 items</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th></th>\n" +
    "                <th>pivot</th>\n" +
    "                <th class=\"stretch\">name</th>\n" +
    "                <th>id</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"category in categories\">\n" +
    "                <td><a class=\"btn btn-default btn-sm\" ng-href=\"/admin/categories/{{category._id}}\">Edit</a></td>\n" +
    "                <td ng-bind=\"category.pivot\"></td>\n" +
    "                <td ng-bind=\"category.name\"></td>\n" +
    "                <td class=\"nowrap\" ng-bind=\"category._id\"></td>\n" +
    "            </tr>\n" +
    "            <tr ng-show=\"categories.length === 0\">\n" +
    "                <td colspan=\"4\">no documents matched</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"well\" ng-if=\"pages.total > 1\">\n" +
    "            <div class=\"btn-group pull-left\">\n" +
    "                <button disabled class=\"btn btn-default\">Page {{pages.current}} of {{pages.total}}</button>\n" +
    "                <button disabled class=\"btn btn-default\">Rows {{items.begin}} - {{items.end}} of {{items.total}}</button>\n" +
    "            </div>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasPrev}\" ng-click=\"prev()\">Prev</button>\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasNext}\" ng-click=\"next()\"> Next</button>\n" +
    "            </div>\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/categories/admin-category.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/categories/admin-category.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <h1><a href=\"/admin/categories\">Categories</a> / {{category.name}}</h1>\n" +
    "        </div>\n" +
    "        <form name=\"detailForm\"><fieldset>\n" +
    "            <legend>Details</legend>\n" +
    "            <alert ng-repeat=\"alert in detailAlerts\" type=\"{{alert.type}}\" close=\"closeDetailAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.pivot)}\">\n" +
    "                <label class=\"control-label\" for=\"pivot\">pivot:</label>\n" +
    "                <input type=\"text\" name=\"pivot\" id=\"pivot\" class=\"form-control\" ng-model=\"category.pivot\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(detailForm.pivot, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.name)}\">\n" +
    "                <label class=\"control-label\" for=\"name\">Name:</label>\n" +
    "                <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" ng-model=\"category.name\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(detailForm.name, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(detailForm)\" ng-click=\"update()\">Update</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"deleteForm\"><fieldset>\n" +
    "            <legend>Danger Zone</legend>\n" +
    "            <alert ng-repeat=\"alert in deleteAlerts\" type=\"{{alert.type}}\" close=\"closeDeleteAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <span class=\"help-block\">\n" +
    "                    <span class=\"label label-danger\">If you do this, it cannot be undone.</span>&nbsp;<span class=\"text-muted\">You may also create orphaned document relationships too.</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-danger btn-delete\" ng-click=\"deleteCategory()\">Delete</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/statuses/admin-status.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/statuses/admin-status.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <h1><a href=\"/admin/statuses\">Statuses</a> / {{status.name}}</h1>\n" +
    "        </div>\n" +
    "        <form name=\"detailForm\"><fieldset>\n" +
    "            <legend>Details</legend>\n" +
    "            <alert ng-repeat=\"alert in detailAlerts\" type=\"{{alert.type}}\" close=\"closeDetailAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.pivot)}\">\n" +
    "                <label class=\"control-label\" for=\"pivot\">pivot:</label>\n" +
    "                <input type=\"text\" name=\"pivot\" id=\"pivot\" class=\"form-control\" ng-model=\"status.pivot\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(detailForm.pivot, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(detailForm.name)}\">\n" +
    "                <label class=\"control-label\" for=\"name\">Name:</label>\n" +
    "                <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" ng-model=\"status.name\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(detailForm.name, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(detailForm)\" ng-click=\"update()\">Update</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"deleteForm\"><fieldset>\n" +
    "            <legend>Danger Zone</legend>\n" +
    "            <alert ng-repeat=\"alert in deleteAlerts\" type=\"{{alert.type}}\" close=\"closeDeleteAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <span class=\"help-block\">\n" +
    "                    <span class=\"label label-danger\">If you do this, it cannot be undone.</span>&nbsp;<span class=\"text-muted\">You may also create orphaned document relationships too.</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-danger btn-delete\" ng-click=\"deleteStatus()\">Delete</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/statuses/admin-statuses.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/statuses/admin-statuses.tpl.html",
    "<div class=\"row\" id=\"admin-statuses-index\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <form class=\"form-inline pull-right\" name=\"addStatusForm\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input name=\"pivot\" type=\"text\" placeholder=\"pivot\" class=\"form-control\" ng-model=\"add.pivot\" required>\n" +
    "                    <input name=\"name\" type=\"text\" placeholder=\"name\" class=\"form-control\" ng-model=\"add.name\" required>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(addStatusForm)\" ng-click=\"addStatus()\">Add New</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <h1>Statuses</h1>\n" +
    "        </div>\n" +
    "        <form class=\"filters\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Pivot Search</label>\n" +
    "                    <input name=\"pivot\" type=\"text\" class=\"form-control\" ng-model=\"filters.pivot\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"filtersUpdated()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Name Search</label>\n" +
    "                    <input name=\"name\" type=\"text\" class=\"form-control\" ng-model=\"filters.name\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"filtersUpdated()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Sort By</label>\n" +
    "                    <select name=\"sort\" class=\"form-control\" ng-model=\"filters.sort\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"sort.value as sort.label for sort in sorts\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"_id\">id &#9650;</option>-->\n" +
    "                        <!--<option value=\"-_id\">id &#9660;</option>-->\n" +
    "                        <!--<option value=\"name\">name &#9650;</option>-->\n" +
    "                        <!--<option value=\"-name\">name &#9660;</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Limit</label>\n" +
    "                    <select name=\"limit\" class=\"form-control\" ng-model=\"filters.limit\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"limit.value as limit.label for limit in limits\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"10\">10 items</option>-->\n" +
    "                        <!--<option value=\"20\" selected=\"selected\">20 items</option>-->\n" +
    "                        <!--<option value=\"50\">50 items</option>-->\n" +
    "                        <!--<option value=\"100\">100 items</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th></th>\n" +
    "                <th>pivot</th>\n" +
    "                <th class=\"stretch\">name</th>\n" +
    "                <th>id</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"status in statuses\">\n" +
    "                <td><a class=\"btn btn-default btn-sm\" ng-href=\"/admin/statuses/{{status._id}}\">Edit</a></td>\n" +
    "                <td ng-bind=\"status.pivot\"></td>\n" +
    "                <td ng-bind=\"status.name\"></td>\n" +
    "                <td class=\"nowrap\" ng-bind=\"status._id\"></td>\n" +
    "            </tr>\n" +
    "            <tr ng-show=\"statuses.length === 0\">\n" +
    "                <td colspan=\"4\">no documents matched</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"well\" ng-if=\"pages.total > 1\">\n" +
    "            <div class=\"btn-group pull-left\">\n" +
    "                <button disabled class=\"btn btn-default\">Page {{pages.current}} of {{pages.total}}</button>\n" +
    "                <button disabled class=\"btn btn-default\">Rows {{items.begin}} - {{items.end}} of {{items.total}}</button>\n" +
    "            </div>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasPrev}\" ng-click=\"prev()\">Prev</button>\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasNext}\" ng-click=\"next()\"> Next</button>\n" +
    "            </div>\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/users/admin-user.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/users/admin-user.tpl.html",
    "<div class=\"row\" id=\"admin-users-detail\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <h1><a ng-href=\"/admin/users\">Users</a> / {{user.username}}</h1>\n" +
    "        </div>\n" +
    "        <form name=\"identityForm\"><fieldset>\n" +
    "            <legend>Identity</legend>\n" +
    "            <alert ng-repeat=\"alert in identityAlerts\" type=\"{{alert.type}}\" close=\"closeIdentityAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(identityForm.isActive)}\">\n" +
    "                <label class=\"control-label\" for=\"isActive\">Is Active:</label>\n" +
    "                <select name=\"isActive\" id=\"isActive\" class=\"form-control\" ng-model=\"user.isActive\" ng-options=\"active for active in isActives\" server-error></select>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.isActive, 'server')\">{{errfor.isActive}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(identityForm.username)}\">\n" +
    "                <label class=\"control-label\" for=\"username\">Username:</label>\n" +
    "                <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"user.username\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.username, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.username, 'server')\">{{errfor.username}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(identityForm.email)}\">\n" +
    "                <label class=\"control-label\" for=\"email\">Email:</label>\n" +
    "                <input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"user.email\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.email, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.email, 'email')\">Please enter a valid email</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(identityForm.email, 'server')\">{{errfor.email}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(identityForm)\" ng-click=\"updateIdentity()\">Update</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"roleForm\"><fieldset>\n" +
    "            <legend>Roles</legend>\n" +
    "            <alert ng-repeat=\"alert in roleAlerts\" type=\"{{alert.type}}\" close=\"closeRoleAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': roleForm.newAdminId && hasError(roleForm.newAdminId)}\">\n" +
    "                <label class=\"control-label\">Admin:</label>\n" +
    "                <!-- show this div if there is an admin linked to this user -->\n" +
    "                <div class=\"input-group\" ng-show=\"user.roles && user.roles.admin\">\n" +
    "                    <input type=\"text\" name=\"adminId\" class=\"form-control\" ng-model=\"user.roles.admin.name.full\" disabled>\n" +
    "                    <div class=\"input-group-btn\" >\n" +
    "                        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"unlinkAdmin()\">Unlink</button>\n" +
    "                        <a type=\"button\" class=\"btn btn-default\" ng-href=\"/admin/administrators/{{user.roles.admin._id}}\">Open</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!-- show this div if there isn't an admin linked to this user -->\n" +
    "                <div class=\"input-group\" ng-if=\"!(user.roles && user.roles.admin)\">\n" +
    "                    <input type=\"text\" name=\"newAdminId\" placeholder=\"enter admin id\" class=\"form-control\" ng-model=\"role.newAdminId\" required>\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!(roleForm.newAdminId.$dirty && roleForm.newAdminId.$valid)\" ng-click=\"linkAdmin()\">Link</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <span class=\"help-block\" ng-if=\"!(user.roles && user.roles.admin)\" ng-show=\"showError(roleForm.newAdminId, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': roleForm.newAccountId && hasError(roleForm.newAccountId)}\">\n" +
    "                <label class=\"control-label\">Account:</label>\n" +
    "                <!-- show this div if there is an account linked to this user -->\n" +
    "                <div class=\"input-group\" ng-show=\"user.roles && user.roles.account\">\n" +
    "                    <input type=\"text\" name=\"accountId\" class=\"form-control\" ng-model=\"user.roles.account.name.full\" disabled>\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"unlinkAccount()\">Unlink</button>\n" +
    "                        <a type=\"button\" class=\"btn btn-default\" ng-href=\"/admin/accounts/{{user.roles.account._id}}\">Open</a>\n" +
    "                    </div>\n" +
    "                    </div>\n" +
    "                <!-- show this div if there isn't an account linked to this user -->\n" +
    "                <div class=\"input-group\" ng-if=\"!(user.roles && user.roles.account)\">\n" +
    "                    <input type=\"text\" name=\"newAccountId\" placeholder=\"enter account id\" class=\"form-control\" ng-model=\"role.newAccountId\" required>\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!(roleForm.newAccountId.$dirty && roleForm.newAccountId.$valid)\" ng-click=\"linkAccount()\">Link</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <span class=\"help-block\" ng-if=\"!(user.roles && user.roles.account)\" ng-show=\"showError(roleForm.newAccountId, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"passwordForm\"><fieldset>\n" +
    "            <legend>Set Password</legend>\n" +
    "            <alert ng-repeat=\"alert in passwordAlerts\" type=\"{{alert.type}}\" close=\"closePasswordAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(passwordForm.password)}\">\n" +
    "                <label class=\"control-label\" for=\"password\">New Password:</label>\n" +
    "                <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"pass.newPassword\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(passwordForm.password, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(passwordForm.confirm)}\">\n" +
    "                <label class=\"control-label\" for=\"confirm\">Confirm Password:</label>\n" +
    "                <input type=\"password\" name=\"confirm\" id=\"confirm\" class=\"form-control\" ng-model=\"pass.confirm\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(passwordForm.confirm, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(passwordForm)\" ng-click=\"setPassword()\">Set Password</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "        <form name=\"deleteForm\"><fieldset>\n" +
    "            <legend>Danger Zone</legend>\n" +
    "            <alert ng-repeat=\"alert in deleteAlerts\" type=\"{{alert.type}}\" close=\"closeDeleteAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\">\n" +
    "                <span class=\"help-block\">\n" +
    "                    <span class=\"label label-danger\">If you do this, it cannot be undone.</span>&nbsp;<span class=\"text-muted\">You may also create orphaned document relationships too.</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"deleteUser()\">Delete</button>\n" +
    "            </div>\n" +
    "        </fieldset></form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("admin/users/admin-users.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("admin/users/admin-users.tpl.html",
    "<div class=\"row\" id=\"admin-users-index\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <div class=\"page-header\">\n" +
    "            <form class=\"form-inline pull-right\" name=\"addUserForm\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input name=\"username\" type=\"text\" placeholder=\"enter a username\" class=\"form-control\" ng-model=\"username\" required>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!canSave(addUserForm)\" ng-click=\"addUser()\">Add New</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <h1>Users</h1>\n" +
    "        </div>\n" +
    "        <form class=\"filters\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Username Search</label>\n" +
    "                    <input name=\"username\" type=\"text\" class=\"form-control\" ng-model=\"filters.username\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"filtersUpdated()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <label>Can Play Role</label>\n" +
    "                    <select name=\"roles\" class=\"form-control\" ng-model=\"filters.roles\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"role.value as role.label for role in roles\"  ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"\">any</option>-->\n" +
    "                        <!--<option value=\"admin\">admin</option>-->\n" +
    "                        <!--<option value=\"account\">account</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-2\">\n" +
    "                    <label>Is Active</label>\n" +
    "                    <select name=\"isActive\" class=\"form-control\" ng-model=\"filters.isActive\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"isActive.value as isActive.label for isActive in isActives\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"\">either</option>-->\n" +
    "                        <!--<option value=\"yes\">yes</option>-->\n" +
    "                        <!--<option value=\"no\">no</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-2\">\n" +
    "                    <label>Sort By</label>\n" +
    "                    <select name=\"sort\" class=\"form-control\" ng-model=\"filters.sort\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"sort.value as sort.label for sort in sorts\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"_id\">id &#9650;</option>-->\n" +
    "                        <!--<option value=\"-_id\">id &#9660;</option>-->\n" +
    "                        <!--<option value=\"username\">username &#9650;</option>-->\n" +
    "                        <!--<option value=\"-username\">username &#9660;</option>-->\n" +
    "                        <!--<option value=\"email\">email &#9650;</option>-->\n" +
    "                        <!--<option value=\"-email\">email &#9660;</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-2\">\n" +
    "                    <label>Limit</label>\n" +
    "                    <select name=\"limit\" class=\"form-control\" ng-model=\"filters.limit\" ng-model-options=\"{ debounce: 500 }\" ng-options=\"limit.value as limit.label for limit in limits\" ng-change=\"filtersUpdated()\">\n" +
    "                        <!--<option value=\"10\">10 items</option>-->\n" +
    "                        <!--<option value=\"20\" selected=\"selected\">20 items</option>-->\n" +
    "                        <!--<option value=\"50\">50 items</option>-->\n" +
    "                        <!--<option value=\"100\">100 items</option>-->\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th></th>\n" +
    "                    <th>username</th>\n" +
    "                    <th class=\"stretch\">email</th>\n" +
    "                    <th>active</th>\n" +
    "                    <th>id</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"user in users\">\n" +
    "                    <td><a class=\"btn btn-default btn-sm\" ng-href=\"/admin/users/{{user._id}}\">Edit</a></td>\n" +
    "                    <td ng-bind=\"user.username\"></td>\n" +
    "                    <td ng-bind=\"user.email\"></td>\n" +
    "                    <td ng-bind=\"user.isActive\"></td>\n" +
    "                    <td ng-bind=\"user._id\"></td>\n" +
    "                </tr>\n" +
    "                <tr ng-show=\"users.length === 0\">\n" +
    "                    <td colspan=\"5\">no documents matched</td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div class=\"well\" ng-if=\"pages.total > 1\">\n" +
    "            <div class=\"btn-group pull-left\">\n" +
    "                <button disabled class=\"btn btn-default\">Page {{pages.current}} of {{pages.total}}</button>\n" +
    "                <button disabled class=\"btn btn-default\">Rows {{items.begin}} - {{items.end}} of {{items.total}}</button>\n" +
    "            </div>\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasPrev}\" ng-click=\"prev()\">Prev</button>\n" +
    "                <button class=\"btn btn-default\" ng-class=\"{disabled: !pages.hasNext}\" ng-click=\"next()\"> Next</button>\n" +
    "            </div>\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("contact.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("contact.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"page-header\"><h1>Send A Message</h1></div>\n" +
    "        <form name=\"msgForm\">\n" +
    "            <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(msgForm.name)}\">\n" +
    "                <label class=\"control-label\" for=\"name\">Your Name:</label>\n" +
    "                <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" ng-model=\"msg.name\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(msgForm.name, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(msgForm.email)}\">\n" +
    "                <label class=\"control-label\" for=\"email\">Your Email:</label>\n" +
    "                <input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"msg.email\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(msgForm.email, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(msgForm.email, 'email')\">Please enter a valid email</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(msgForm.message)}\">\n" +
    "                <label class=\"control-label\" for=\"message\">Message:</label>\n" +
    "                <textarea name=\"message\" id=\"message\" rows=\"5\" class=\"form-control\" ng-model=\"msg.message\" required></textarea>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(msgForm.message, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-contact\" ng-disabled=\"!canSave(msgForm)\" ng-click=\"submit()\">Send Message</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6 special\">\n" +
    "        <div class=\"page-header\"><h1>Contact Us</h1></div>\n" +
    "        <p class=\"lead\">Freddy can't wait to hear from you.</p><i class=\"fa fa-reply-all super-awesome\"></i>\n" +
    "        <address>1428 Elm Street &bull; San Francisco, CA 94122</address>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("footer.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("footer.tpl.html",
    "<div class=\"footer\" ng-controller=\"FooterCtrl\">\n" +
    "    <div class=\"container\"><span class=\"copyright pull-right\">&#169; 2017 Muhammed .A</span>\n" +
    "        <ul class=\"links\">\n" +
    "            <li><a href=\"/\">Home</a></li>\n" +
    "            <li ng-if=\"!isAuthenticated()\"><a href=\"/contact\">Contact</a></li>\n" +
    "            <li ng-if=\"isAuthenticated()\"><a href=\"\" ng-click=\"logout()\">Sign Out</a></li>\n" +
    "        </ul>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div ng-controller=\"HeaderCtrl\">\n" +
    "<div style=\"color: black;\" ng-if=\"isAuthenticated()\">\n" +
    "<div class=\"navbar navbar-default navbar-fixed-top\" ng-if=\"!isAdmin()\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"navbar-header\" style=\" float: left;\">\n" +
    "            <a href=\"/\" class=\"navbar-brand\" >\n" +
    "                \n" +
    "                \n" +
    "                <img src=\"/img/logo-symbol-64x64.png\" >\n" +
    "            </a>\n" +
    "\n" +
    "           \n" +
    "\n" +
    "           <!--  <button class=\"navbar-toggle btn navbar-btn\" ng-init=\"menuCollapsed = true\" ng-click=\"menuCollapsed = !menuCollapsed\">\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "         -->\n" +
    "      <!--   <div class=\"navbar-collapse collapse\" collapse=\"menuCollapsed\" ng-click=\"menuCollapsed = true\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li ng-if=\"!isAuthenticated()\" ng-class=\"{active: isActive('/')}\"><a href=\"/\">Home</a></li>\n" +
    "                <li ng-if=\"!isAuthenticated()\" ng-class=\"{active: isActive('/about')}\"><a href=\"/about\">About</a></li>\n" +
    "                <li ng-if=\"!isAuthenticated()\" ng-class=\"{active: isActive('/signup')}\"><a href=\"/signup\">Sign Up</a></li>\n" +
    "                <li ng-if=\"!isAuthenticated()\" ng-class=\"{active: isActive('/contact')}\"><a href=\"/contact\">Contact</a></li>\n" +
    "                <li ng-if=\"isAuthenticated()\" ng-class=\"{active: isActive('/account')}\"><a href=\"/account\">My Account</a></li>\n" +
    "                <li ng-if=\"isAuthenticated()\" ng-class=\"{active: isActive('/account/settings')}\"><a href=\"/account/settings\">Settings</a></li>\n" +
    "            </ul>\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li ng-if=\"!isAuthenticated()\"><a href=\"/login\"><i class=\"fa fa-user\"></i> Sign In</a></li>\n" +
    "                <li ng-if=\"isAuthenticated()\"><a href=\"\" ng-click=\"logout()\"><i class=\"fa fa-user\"></i> Sign Out</a></li>\n" +
    "            </ul>\n" +
    "        </div> -->\n" +
    "    </div>\n" +
    "    <div class=\"search\">\n" +
    "        <form class=\"form-inline my-2 my-lg-0\">\n" +
    "              <input class=\"form-control mr-sm-2\" type=\"text\"  placeholder=\"&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &#xf002; search\" style=\"font-family:FontAwesome; height: 25px; \" />\n" +
    "    </form>\n" +
    "    </div>\n" +
    "    <div class=\"links\" >\n" +
    "        <a href=\"/account\">\n" +
    "        <i class=\"fa fa-compass fa-lg\" > &nbsp;</i>\n" +
    "        </a>\n" +
    "        <a href=\"/about\">\n" +
    "        <i class=\"fa fa-heart-o fa-lg\" > &nbsp;</i>\n" +
    "        </a> \n" +
    "        <a href=\"/account/settings\">\n" +
    "         &nbsp; <i class=\"fa fa-user fa-lg\" ></i>\n" +
    "        </a> \n" +
    "    </div>\n" +
    "     \n" +
    "\n" +
    "</div>\n" +
    "<div class=\"navbar navbar-inverse navbar-fixed-top\" ng-if=\"isAdmin()\" ng-controller=\"AdminHeaderCtrl\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <a href=\"/admin/\" class=\"navbar-brand-admin\">\n" +
    "                <img src=\"/img/logo-symbol-64x64.png\" class=\"navbar-logo\">\n" +
    "                <span class=\"navbar-brand-label\">Angular Drywall</span>\n" +
    "            </a>\n" +
    "            <button class=\"navbar-toggle btn navbar-btn\" ng-click=\"toggleAdminMenu()\">\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <div class=\"navbar-collapse collapse\" collapse=\"adminMenuCollapsed\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li class=\"dropdown\" dropdown is-open=\"status.isopen\">\n" +
    "                    <a href=\"#\" class=\"dropdown-toggle navbar-dropdown-admin\" dropdown-toggle>System&nbsp;<span class=\"caret\"></span></a>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li class=\"dropdown-header\">Pivoted Settings</li>\n" +
    "                        <li><a href=\"/admin/statuses\" ng-click=\"closeAdminMenu()\">Statuses</a></li>\n" +
    "                        <li><a href=\"/admin/categories\" ng-click=\"closeAdminMenu()\">Categories</a></li>\n" +
    "                        <li class=\"divider\"></li>\n" +
    "                        <li class=\"dropdown-header\">User Admin</li>\n" +
    "                        <li><a href=\"/admin/users\" ng-click=\"closeAdminMenu()\">Users</a></li>\n" +
    "                        <li><a href=\"/admin/accounts\" ng-click=\"closeAdminMenu()\">Accounts</a></li>\n" +
    "                        <li><a href=\"/admin/administrators\" ng-click=\"closeAdminMenu()\">Administrators</a></li>\n" +
    "                        <li><a href=\"/admin/admin-groups\" ng-click=\"closeAdminMenu()\">Admin Groups</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <form name=\"form\" class=\"navbar-form navbar-right\">\n" +
    "                <div class=\"dropdown\" dropdown is-open=\"resultIsOpen\">\n" +
    "                    <input name=\"search\" type=\"text\" placeholder=\"search\" class=\"form-control\" ng-model=\"query\" ng-model-options=\"{ debounce: 500 }\" ng-change=\"update()\">\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li class=\"dropdown-header\" ng-show=\"showDropdownHeader('noDocsMatched')\">no docs matched</li>\n" +
    "                        <li class=\"dropdown-header\" ng-show=\"showDropdownHeader('Users')\">Users</li>\n" +
    "                        <li ng-repeat=\"user in result.users\">\n" +
    "                            <a ng-bind=\"user.username\" ng-href=\"/admin/users/{{user._id}}\" ng-click=\"closeAdminMenu()\"></a>\n" +
    "                        </li>\n" +
    "                        <li class=\"dropdown-header\" ng-show=\"showDropdownHeader('Accounts')\">Accounts</li>\n" +
    "                        <li ng-repeat=\"account in result.accounts\">\n" +
    "                            <a ng-bind=\"account.name.full\" ng-href=\"/admin/accounts/{{account._id}}\" ng-click=\"closeAdminMenu()\"></a>\n" +
    "                        </li>\n" +
    "                        <li class=\"dropdown-header\" ng-show=\"showDropdownHeader('Administrators')\">Administrators</li>\n" +
    "                        <li ng-repeat=\"admin in result.administrators\">\n" +
    "                            <a ng-bind=\"admin.name.full\" ng-href=\"/admin/administrators/{{admin._id}}\" ng-click=\"closeAdminMenu()\"></a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("login/forgot/login-forgot.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("login/forgot/login-forgot.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"page-header\"><h1>Forgot Your Password?</h1></div>\n" +
    "        <form name=\"loginForgotForm\">\n" +
    "            <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(loginForgotForm.email)}\">\n" +
    "                <label class=\"control-label\" for=\"email\">Enter Your Email:</label>\n" +
    "                <input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"user.email\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(loginForgotForm.email, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(loginForgotForm.email, 'email')\">Please enter a valid email</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-forgot\" ng-disabled=\"!canSave(loginForgotForm)\" ng-click=\"submit()\">Send Reset</button>\n" +
    "                &nbsp;<a href=\"/login\" class=\"btn btn-link\">Back to Login</a>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<div class=\"container login-container\" >\n" +
    "<div class=\"row\">\n" +
    "     <div class=\"col-sm-7 marketing\">\n" +
    "        <img style=\"width: 80%; margin: 20px auto; display: block;\" src=\"/img/thum.png\" >\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-5 login\">\n" +
    "        <div class=\"page-header\">\n" +
    "        <img style=\"width: 60%; margin: 20px auto; display: block;\" src=\"/img/instagrame.png\" >\n" +
    "        <h3 style=\"text-align: center; margin: 20px 50px; \">Log in</h3>\n" +
    "        </div>\n" +
    "        <form name=\"loginForm\">\n" +
    "            <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(loginForm.username)}\">\n" +
    "                <label class=\"control-label\" for=\"username\">Username or Email:</label>\n" +
    "                <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"user.username\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(loginForm.username, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(loginForm.username, 'server')\">{{errfor.username}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(loginForm.password)}\">\n" +
    "                <label class=\"control-label\" for=\"password\">Password:</label>\n" +
    "                <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"user.password\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(loginForm.password, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(loginForm.password, 'server')\">{{errfor.password}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-login\" ng-disabled=\"!canSave(loginForm)\" ng-click=\"submit()\">Sign In</button>\n" +
    "                <!--<button type=\"button\" class=\"btn btn-primary btn-login\">Sign In</button>-->\n" +
    "                &nbsp;<a href=\"/login/forgot\" class=\"btn btn-link\">Forgot your password?</a>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <div style=\"text-align: center; margin: 30px; margin-left: auto;\">\n" +
    "            <h5 style=\"display: inline;\"> Don't have an acount?</h5>\n" +
    "            <a href=\"/signup\">Sign up</a>\n" +
    "        </div>\n" +
    "        <div ng-if=\"social\">\n" +
    "            <hr>\n" +
    "            <p>Or sign in using...</p>\n" +
    "            <div class=\"btn-group btn-group-justified\">\n" +
    "                <a ng-repeat=\"(provider, property) in social\" ng-href=\"{{property.login}}\" target=\"_self\" class=\"btn btn-info\"><i ng-class=\"'fa ' + property.icon + ' fa-lg'\"></i> {{property.text}}</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>");
}]);

angular.module("login/reset/login-reset.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("login/reset/login-reset.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"page-header\"><h1>Reset Your Password</h1></div>\n" +
    "        <form name=\"resetForm\">\n" +
    "            <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(resetForm.password)}\" ng-show=\"(id && email && !success)\">\n" +
    "                <label class=\"control-label\" for=\"password\">New Password:</label>\n" +
    "                <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"user.password\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(resetForm.password, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(resetForm.confirm)}\" ng-show=\"(id && email && !success)\">\n" +
    "                <label class=\"control-label\" for=\"confirm\">Confirm Password:</label>\n" +
    "                <input type=\"password\" name=\"confirm\" id=\"confirm\" class=\"form-control\" ng-model=\"user.confirm\" required>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(resetForm.confirm, 'required')\">This field is required</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-reset\" ng-show=\"(id && email && !success)\" ng-disabled=\"!canSave(resetForm)\" ng-click=\"submit()\">Set Password</button>\n" +
    "                &nbsp;<a href=\"/login\" class=\"btn btn-link\">Back to Login</a>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("main.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("main.tpl.html",
    "<div class=\"container login-container\" >\n" +
    "<div class=\"row\" id=\"signup\" style=\"margin-top: 45px; \">\n" +
    "    <div class=\"posts-container\" ng-repeat=\"post in posts\">\n" +
    "        <div class=\"imgwraper\">\n" +
    "            <img src=\"{{post.img}}\" alt=\"\">\n" +
    "        </div>\n" +
    "        <div class=\"cption\">\n" +
    "            <h2>{{post.name}}</h2>\n" +
    "        </div>\n" +
    "        \n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "</div>");
}]);

angular.module("signup/signup.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("signup/signup.tpl.html",
    "<div class=\"container login-container\" >\n" +
    "<div class=\"row\" id=\"signup\">\n" +
    "    <div class=\"col-sm-7 marketing\">\n" +
    "        <img style=\"width: 80%; margin: 20px auto; display: block;\" src=\"/img/thum.png\" >\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-5 login\">\n" +
    "        <div class=\"page-header\">\n" +
    "        <img style=\"width: 60%; margin: 20px auto; display: block;\" src=\"/img/instagrame.png\" >\n" +
    "        <h3 style=\"color: gray; font-size: 122%; margin: 20px 50px; \">Sign up to see photos and videos from your friends</h3>\n" +
    "        </div>\n" +
    "        <div class=\"btn-group btn-group-justified\" style=\"margin-bottom: 40px;\">\n" +
    "                <a  in social\" href=\"#\" target=\"_self\" class=\"btn btn-info\"><i class=\"fa fa-facebook-official fa-lg\"></i> <strong>Log in with Facebook</strong> </a>\n" +
    "        </div>\n" +
    "        <form name=\"signupForm\">\n" +
    "            <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(signupForm.username)}\">\n" +
    "                <label class=\"control-label\" for=\"username\">Pick a Username:</label>\n" +
    "                <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"user.username\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(signupForm.username, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(signupForm.username, 'server')\">{{errfor.username}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(signupForm.email)}\">\n" +
    "                <label class=\"control-label\" for=\"email\">Enter Your Email:</label>\n" +
    "                <input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"user.email\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(signupForm.email, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(signupForm.email, 'email')\">Please enter a valid email</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(signupForm.email, 'server')\">{{errfor.email}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': hasError(signupForm.password)}\">\n" +
    "                <label class=\"control-label\" for=\"password\">Create a Password:</label>\n" +
    "                <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"user.password\" required server-error>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(signupForm.password, 'required')\">This field is required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"showError(signupForm.password, 'server')\">{{errfor.password}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-signup\" ng-disabled=\"!canSave(signupForm)\" ng-click=\"submit()\">Create My Account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <div style=\"text-align:center; margin: 30px;\">\n" +
    "            <h5 style=\"display: inline;\">Have an acount?</h5>\n" +
    "            <a href=\"/login\">Login</a>\n" +
    "        </div>\n" +
    "        <div ng-if=\"social\">\n" +
    "            <hr>\n" +
    "            <p>Or sign in using...</p>\n" +
    "            <div class=\"btn-group btn-group-justified\">\n" +
    "                <a ng-repeat=\"(provider, property) in social\" ng-href=\"{{property.login}}\" target=\"_self\" class=\"btn btn-info\"><i ng-class=\"'fa ' + property.icon + ' fa-lg'\"></i> {{property.text}}</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  \n" +
    "</div>\n" +
    "</div>");
}]);

angular.module('templates.common', ['security/login/form.tpl.html', 'security/login/toolbar.tpl.html']);

angular.module("security/login/form.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("security/login/form.tpl.html",
    "<form name=\"form\" novalidate class=\"login-form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h4>Sign in</h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"control-label\" for=\"login\">Username or Email:</label>\n" +
    "            <input class=\"form-control\" type=\"text\" name=\"login\" id=\"login\" ng-model=\"user.email\" required autofocus>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"control-label\" for=\"pass\">Password:</label>\n" +
    "            <input class=\"form-control\" type=\"password\" name=\"pass\" id=\"pass\" ng-model=\"user.password\" required>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary login\" ng-click=\"login()\" ng-disabled='form.$invalid'>Sign in</button>\n" +
    "        <button class=\"btn clear\" ng-click=\"clearForm()\">Clear</button>\n" +
    "        <button class=\"btn btn-warning cancel\" ng-click=\"cancelLogin()\">Cancel</button>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("security/login/toolbar.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("security/login/toolbar.tpl.html",
    "<ul class=\"nav pull-right\">\n" +
    "  <li class=\"divider-vertical\"></li>\n" +
    "  <li ng-show=\"isAuthenticated()\">\n" +
    "      <a href=\"#\">{{currentUser.firstName}} {{currentUser.lastName}}</a>\n" +
    "  </li>\n" +
    "  <li ng-show=\"isAuthenticated()\" class=\"logout\">\n" +
    "      <form class=\"navbar-form\">\n" +
    "          <button class=\"btn logout\" ng-click=\"logout()\">Log out</button>\n" +
    "      </form>\n" +
    "  </li>\n" +
    "  <li ng-hide=\"isAuthenticated()\" class=\"login\">\n" +
    "      <form class=\"navbar-form\">\n" +
    "          <button class=\"btn login\" ng-click=\"login()\">Log in</button>\n" +
    "      </form>\n" +
    "  </li>\n" +
    "</ul>");
}]);
