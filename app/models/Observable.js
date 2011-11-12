// Adding basic events to the models
function Observable() {
  this.handlers = [];
  this.bind = function bind(name, handler) {
    if (typeof(name) != 'string' || typeof(handler) != 'function') {
      throw new SyntaxError("Invalid parameters when creating listener with the following arguments: 'Name': " + name + ", 'Handler': " + handler);
    }
    this.handlers.push({ "eventName" : name, "eventHandler" : handler });
  };
  this.unbind = function unbind(name, handler) {
    this.handlers = this.handlers.filter(function(h) {
      if ((h.eventName == name) && (h.eventHandler === handler)) {
        return false;
      }
      return true;
    });
  };
  this.trigger = function trigger(name) {
    this.handlers.forEach(function(h) {
      if (h.eventName == name) {
        h.eventHandler.call(this);
      }
    }, this);
  };

  this.triggerChangeEvent = function triggerChangeEvent() {
    this.trigger("bun:change");
  };
}
