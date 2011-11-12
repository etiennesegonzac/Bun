(function() {
  describe("Observable", function() {
    beforeEach(function() {
      function Subject() {};
      Subject.prototype = new Observable;

      this.subject = new Subject();
    });

    it("defines the triggerChangeEvent method", function() {
      expect(this.subject.triggerChangeEvent).toBeDefined();
    });

    describe("Basic event handling", function() {
      it("binds listeners", function() {
        var testListener = {handler: function (o) {}};
        this.subject.bind("test", testListener.handler);

        expect(this.subject.handlers.length).toEqual(1);
      });

      it("unbinds listeners", function() {
        var testListener = {handler: function (o) {}};
        this.subject.bind("test", testListener.handler);
        this.subject.bind("retest", testListener.handler);
        this.subject.bind("reretest", testListener.handler);

        this.subject.unbind("retest", testListener.handler);

        expect(this.subject.handlers.length).toEqual(2);
      });

      it("triggers handlers", function() {
        var testListener = {handler: function (o) {}};
        spyOn(testListener, "handler");

        this.subject.bind("test", testListener.handler);
        this.subject.trigger("test");

        expect(testListener.handler).toHaveBeenCalled();
      });
    });

    describe("Change event", function() {
      it("triggers a bun:change event", function() {
        var testListener = {handler: function (o) {}};
        spyOn(testListener, "handler");

        this.subject.bind("bun:change", testListener.handler);
        this.subject.triggerChangeEvent();

        expect(testListener.handler).toHaveBeenCalled();
      });
    });
  });
}).call(this);
