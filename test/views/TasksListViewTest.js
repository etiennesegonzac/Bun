(function() {
  describe("TasksListView", function() {
    beforeEach(function() {
      loadFixtures("fixtures/tasks-view.html");
      this.tasks = [(new Task("test task")), (new Task("other task"))];
      this.tasksListView = new TasksListView($("#tasks-list"));
    });

    describe("Constructor", function() {
      it("assigns the element", function() {
        expect(this.tasksListView.element).toEqual($("#tasks-list"));
      });

      it("starts with an empty tasks array", function() {
        expect(this.tasksListView.tasks).toEqual([]);
      });

      it("starts with an empty tasks views array", function() {
        expect(this.tasksListView.taskViews).toEqual([]);
      });
    });

    describe("Rendering", function() {
      beforeEach(function() {
        this.tasksListView.tasks = this.tasks;
      });

      it("triggers render when the tasks property is set", function() {
        spyOn(this.tasksListView, "render");

        this.tasksListView.tasks = [new Task("test")];
        expect(this.tasksListView.render).toHaveBeenCalled();
      });

      it("removes previous tasks views", function() {
        var taskView = new TaskView(null, (new Task("test")));
        spyOn(taskView, "remove");
        this.tasksListView.taskViews = [taskView];

        this.tasksListView.render();
        expect(taskView.remove).toHaveBeenCalled();
      });

      it("creates an li node for each task view", function() {
        expect($("#tasks-list li").length).toEqual(2);
      });

      it("creates a task view for each task", function() {
        expect(this.tasksListView.taskViews.length).toEqual(2);

        this.tasksListView.taskViews.forEach(function(tv) {
          expect(tv.element[0]).toMatchSelector("li");
        });
      });

      it("renders a first time each task view", function() {
        this.tasksListView.taskViews.forEach(function(tv) {
          expect(tv.element.text()).toNotEqual("");
        });
      });
    });
  });
}).call(this);
