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

      it("selects the first project", function() {
        spyOn(BunController, "selectProject");

        BunController.start();
        expect(BunController.selectProject).toHaveBeenCalledWith(BunController.projectsList.projects[0].id);
      });
    });

    describe("Project selection", function() {
      beforeEach(function() {
        BunController.start();
        this.selected_project = BunController.projectsList.projects[BunController.projectsList.projects.length - 1];
        BunController.selectProject(this.selected_project.id);
      });

      it("marks the project as selected", function(){
        expect(this.selected_project.selected).toEqual(true);
      });

      it("keeps a reference of the selected project", function(){
        expect(BunController.selectedProject).toEqual(this.selected_project);
      });

      it("deselects the old selected project", function(){
        var old_project = BunController.projectsList.projects[0];
        BunController.selectProject(old_project.id);
        BunController.selectProject(this.selected_project.id);

        expect(old_project.selected).toEqual(false);
      });

      it("sets the tasks on the tasksListView", function() {
        expect(BunController.tasksListView.tasks).toEqual(this.selected_project.tasks);
      });

      it("selects the first task of the project", function() {
        expect(BunController.selectedTask).toEqual(this.selected_project.tasks[0]);
      });
    });

    describe("Task selection", function() {
      beforeEach(function() {
        BunController.start();
        var project = BunController.projectsList.projects[0];
        this.selected_task = project.tasks[0]
        BunController.selectTask(this.selected_task.id);
      });

      it("marks the task as selected", function(){
        expect(this.selected_task.selected).toEqual(true);
      });

      it("keeps a reference of the selected Task", function(){
        expect(BunController.selectedTask).toEqual(this.selected_task);
      });

      it("deselects the old selected task", function(){
        var project = BunController.projectsList.projects[0];
        var old_task = project.tasks[project.tasks.length -1];
        BunController.selectTask(old_task.id);
        BunController.selectTask(this.selected_task.id);

        expect(old_task.selected).toEqual(false);
      });
    });
  });
}).call(this);
