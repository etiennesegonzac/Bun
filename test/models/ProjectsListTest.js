(function() {
  describe("ProjectsList", function() {
    beforeEach(function() {
      ProjectsList.init();
    });

    it("initializes the projects list", function() {
      expect(ProjectsList.projects).toBeDefined();
    });
  });
}).call(this);
