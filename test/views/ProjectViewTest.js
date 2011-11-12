(function() {
  describe("ProjectView", function() {
    beforeEach(function() {
      loadFixtures("fixtures/project-view.html");
      this.project = new Project("test project", []);
      this.projectView = new ProjectView($("#project_42"), this.project);
    });

    afterEach(function() {
      this.projectView.remove();
    });

    describe("Constructor", function() {
      it("assigns the dom element", function() {
        expect(this.projectView.element).toEqual($("#project_42"));
      });

      it("assigns the project", function() {
        expect(this.projectView.project).toEqual(this.project);
      });

      it("binds render to the project change event", function() {
        expect(this.project.handlers).toContain({eventName: "bun:change",
                                                 eventHandler: this.projectView.render});
      });
    });

    describe("Remove", function() {
      it("unbinds render to the project change event", function() {
        this.projectView.remove();
        expect(this.project.handlers).toNotContain({eventName: "bun:change",
                                                    eventHandler: this.projectView.render});
      });

      it("removes the element", function() {
        this.projectView.remove();
        expect($("#project_42").length).toEqual(0);
      });
    });

    describe("Render", function() {
      it("displays the project name", function() {
        this.projectView.render();
        expect($("#project_42").text()).toEqual("test project");
      });

      it("adds the selected css class and re-render if needed", function() {
        this.project.selected = true;
        expect($("#project_42").text()).toEqual("test project");
        expect($("#project_42").hasClass("selected")).toBeTruthy();
      });

      it("removes the selected css class and re-render if needed", function() {
        this.project.selected = false;
        expect($("#project_42").text()).toEqual("test project");
        expect($("#project_42").hasClass("selected")).toBeFalsy();
      });
    });
  });
}).call(this);
