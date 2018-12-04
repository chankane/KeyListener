class Player {
  constructor(name, callback) {
    this._name = name;
    this._callback = callback;
    this._damage = 0;
    this._holdData = null;
    this._mainData = null;
    this._nextData = null;
  }

  get() {
    return {
      name: this._name,
      damage: this._damage,
      holdData: this._holdData,
      mainData: this._mainData,
      nextData: this._nextData
    };
  }

  // maybe, change add & sub
  setDamage(damage) {
    this._damage = damage;
    this._callback();
  }

  setHoldData(data) { 
    this._holdData = data;
    this._callback();
  }

  setMainData(data) {
    this._mainData = data;
    this._callback();
  }

  setNextData(data) {
    this._nextData = data;
    this._callback();
  }
}