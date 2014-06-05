'use strict';

describe('Service: Cartlink', function () {

  // load the service's module
  beforeEach(module('ruokakauppacomTsohaApp'));

  // instantiate service
  var Cartlink;
  beforeEach(inject(function (_Cartlink_) {
    Cartlink = _Cartlink_;
  }));

  it('should do something', function () {
    expect(!!Cartlink).toBe(true);
  });

});
