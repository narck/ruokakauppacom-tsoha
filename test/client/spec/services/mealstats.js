'use strict';

describe('Service: Mealstats', function () {

  // load the service's module
  beforeEach(module('ruokakauppacomTsohaApp'));

  // instantiate service
  var Mealstats;
  beforeEach(inject(function (_Mealstats_) {
    Mealstats = _Mealstats_;
  }));

  it('should do something', function () {
    expect(!!Mealstats).toBe(true);
  });

});
