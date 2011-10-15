// We'll have only one instance

function ProjectsList() {
  this.projects = [];

  this.load = function() {
    // fake it till you make it
    var fakeList = [{name: "Groceries", tasks: [{name: "Milk"}, {name: "eggs"}, {name:"bacon"}, {name: "Bacon"}, {name:"BACON"}]},
                    {name: "Bun", tasks: [{name: "UI"}, {name: "IndexedDB"}, {name: "CouchDB"}, {name: "Sync"}]},
                    {name: "B2G", tasks: [{name: "Make"}, {name: "it"}, {name: "awesome"}]}];

    fakeList.forEach(function(e) {
      this.projects.push(new Project(e.name, e.tasks));
    }, this);
  }
}
