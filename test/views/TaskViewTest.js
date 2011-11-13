(function() {
  describe("TaskView", function() {
    beforeEach(function() {
      loadFixtures("fixtures/task-view.html");
      this.task = new Task("test task");
      this.taskView = new TaskView($("#task_42"), this.task);
    });

    afterEach(function() {
      this.taskView.remove();
    });

    describe("Constructor", function() {
      it("assigns the dom element", function() {
        expect(this.taskView.element).toEqual($("#task_42"));
      });

      it("assigns the task", function() {
        expect(this.taskView.task).toEqual(this.task);
      });

      it("binds render to the task change event", function() {
        expect(this.task.handlers).toContain({eventName: "bun:change",
                                                 eventHandler: this.taskView.render});
      });
    });

    describe("Remove", function() {
      it("unbinds render to the task change event", function() {
        this.taskView.remove();
        expect(this.task.handlers).toNotContain({eventName: "bun:change",
                                                    eventHandler: this.taskView.render});
      });

      it("removes the element", function() {
        this.taskView.remove();
        expect($("#task_42").length).toEqual(0);
      });
    });

    describe("Render", function() {
      it("displays the checkbox", function() {
        this.taskView.render();
        expect($("#task_42 input[type='checkbox']").length).toEqual(1);
      });

      it("displays the task name", function() {
        this.taskView.render();
        expect($("#task_42").text()).toEqual("test task");
      });

      it("adds the selected css class and re-render if needed", function() {
        this.task.selected = true;
        expect($("#task_42").hasClass("selected")).toBeTruthy();
      });

      it("removes the selected css class and re-render if needed", function() {
        this.task.selected = false;
        expect($("#task_42").hasClass("selected")).toBeFalsy();
      });

      it("injects the data id on the element", function() {
        this.task.id = 42
        this.taskView.render();

        expect($("#task_42").data("id")).toEqual("42");
      });
    });
  });
}).call(this);
