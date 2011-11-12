(function() {
  describe("BunController", function() {
    it("has a transition manager", function() {
      expect(TransitionManager).toBeDefined();
    });

    describe("Start", function() {
      it("binds actions", function() {
        spyOn(BunController, "bindActions");

        BunController.start();
        expect(BunController.bindActions).toHaveBeenCalled();
      });

      it("initializes the projects list", function() {
        spyOn(BunController.projectsList, "init");

        BunController.start();
        expect(BunController.projectsList.init).toHaveBeenCalled();
      });
    });
  });
}).call(this);
