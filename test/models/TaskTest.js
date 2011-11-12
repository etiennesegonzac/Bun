(function() {
  describe("Task", function() {
    beforeEach(function() {
      this.task = new Task("test task");
    });

    describe("Constructor", function() {
      it("assings the name", function() {
        expect(this.task.name).toEqual("test task");
      });

      it("set selected as falsy by default", function() {
        expect(this.task.selected).toBeFalsy();
      });
    });

    describe("Observability", function() {
      it("mixes Observable", function() {
        expect(this.task.triggerChangeEvent).toBeDefined();
      });

      it("triggers change event on selected property", function() {
        spyOn(this.task, "triggerChangeEvent");

        this.task.selected = true;

        expect(this.task.triggerChangeEvent).toHaveBeenCalled();
      });
    });
  });
}).call(this);
