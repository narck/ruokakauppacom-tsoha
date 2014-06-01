'use strict';

angular.module('ruokakauppacomTsohaApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
