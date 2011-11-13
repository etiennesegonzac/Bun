(function() {
  describe("ProjectsView", function() {
    beforeEach(function() {
      loadFixtures("fixtures/projects-view.html");
      this.projects = [(new Project("test project", [])), (new Project("other project", []))];
      this.projectsView = new ProjectsView($("#projects-list"), this.projects);
    });

    describe("Constructor", function() {
      it("assigns the element", function() {
        expect(this.projectsView.element).toEqual($("#projects-list"));
      });

      it("starts with an empty projects array", function() {
        expect(this.projectsView.projects).toEqual([]);
      });

      it("starts with an empty projects views array", function() {
        expect(this.projectsView.projectViews).toEqual([]);
      });
    });

    describe("Rendering", function() {
      beforeEach(function() {
        this.projectsView.projects = this.projects;
      });

      it("triggers render when the projects property is set", function() {
        spyOn(this.projectsView, "render");

        this.projectsView.projects = [new Project("test", [])];
        expect(this.projectsView.render).toHaveBeenCalled();
      });

      it("removes previous project views", function() {
        var projectView = new ProjectView(null, (new Project("test", [])));
        spyOn(projectView, "remove");
        this.projectsView.projectViews = [projectView];

        this.projectsView.render();
        expect(projectView.remove).toHaveBeenCalled();
      });

      it("creates an li node for each project view", function() {
        expect($("#projects-list li").length).toEqual(2);
      });

      it("creates a project view for each project", function() {
        expect(this.projectsView.projectViews.length).toEqual(2);

        this.projectsView.projectViews.forEach(function(pv) {
          expect(pv.element[0]).toExist();
        });
      });
    });
  });
}).call(this);
