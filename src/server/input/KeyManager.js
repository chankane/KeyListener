class KeyManager {
  constructor() {
    this._listeners = [];
  }

  addKeyListener(listener, id) {
    this._listeners[id] = listener;
  }

  deleteKeyListener(id) {
    delete this._listeners[id];
  }
}