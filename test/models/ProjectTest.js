(function() {
  describe("Project", function() {
    beforeEach(function() {
      this.project = new Project("test project", [{name: "test task"}]);
    });

    describe("Constructor", function() {
      it("assings the name", function() {
        expect(this.project.name).toEqual("test project");
      });

      it("assigns the tasks", function() {
        expect(this.project.tasks.length).toEqual(1);
      });

      it("set selected as falsy by default", function() {
        expect(this.project.selected).toBeFalsy();
      });
    });

    describe("Observability", function() {
      it("mixes Observable", function() {
        expect(this.project.triggerChangeEvent).toBeDefined();
      });

      it("triggers change event on selected property", function() {
        spyOn(this.project, "triggerChangeEvent");

        this.project.selected = true;

        expect(this.project.triggerChangeEvent).toHaveBeenCalled();
      });
    });
  });
}).call(this);
