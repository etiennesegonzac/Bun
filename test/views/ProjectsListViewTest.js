(function() {
  describe("ProjectsListView", function() {
    beforeEach(function() {
      loadFixtures("fixtures/projects-view.html");
      this.projects = [(new Project("test project", [])), (new Project("other project", []))];
      this.projectsListView = new ProjectsListView($("#projects-list"));
    });

    describe("Constructor", function() {
      it("assigns the element", function() {
        expect(this.projectsListView.element).toEqual($("#projects-list"));
      });

      it("starts with an empty projects array", function() {
        expect(this.projectsListView.projects).toEqual([]);
      });

      it("starts with an empty projects views array", function() {
        expect(this.projectsListView.projectViews).toEqual([]);
      });
    });

    describe("Rendering", function() {
      beforeEach(function() {
        this.projectsListView.projects = this.projects;
      });

      it("triggers render when the projects property is set", function() {
        spyOn(this.projectsListView, "render");

        this.projectsListView.projects = [new Project("test", [])];
        expect(this.projectsListView.render).toHaveBeenCalled();
      });

      it("removes previous project views", function() {
        var projectView = new ProjectView(null, (new Project("test", [])));
        spyOn(projectView, "remove");
        this.projectsListView.projectViews = [projectView];

        this.projectsListView.render();
        expect(projectView.remove).toHaveBeenCalled();
      });

      it("creates an li node for each project view", function() {
        expect($("#projects-list li").length).toEqual(2);
      });

      it("creates a project view for each project", function() {
        expect(this.projectsListView.projectViews.length).toEqual(2);

        this.projectsListView.projectViews.forEach(function(pv) {
          expect(pv.element[0]).toMatchSelector("li");
        });
      });

      it("renders a first time each project view", function() {
        this.projectsListView.projectViews.forEach(function(pv) {
          expect(pv.element.text()).toNotEqual("");
        });
      });
    });
  });
}).call(this);
