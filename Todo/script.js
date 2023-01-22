class TodosLayout {
  constructor(status) {
    this.todoStatus = status;
    this.todoLayoutContext = this;

    // SELECTORS
    this.todoInput = document.getElementById("todoInput");
    this.todoStatusEle = document.getElementById("todoSelect");
    this.addTodoCta = document.getElementById("todoAddCta");
    this.todoMainContainer = document.getElementById("todoContainer");
    this.searchTodo = document.getElementById("searchTodo");
    this.todoSelectSearch = document.getElementById("todoSelectSearch");

    // States
    this.todoData = [
      { id: 1, name: "Akshay", status: "PENDING" },
      { id: 3, name: "Ajax", status: "DONE" },
      { id: 2, name: "Comeone", status: "WONTDO" },
      { id: 4, name: "Mann", status: "DONE" },
      { id: 5, name: "mann", status: "WONTDO" },
    ];
    this.todoText = "";
    this.todoStatus = "";
    // Seach Constant
    this.todoSearchText = "";
    this.todoSearchStatus = "";

    // Bind Events
    this.bindTodoAddEvents();

    // Generate UI
    this.generateTodoUo(this.todoData, this.todoMainContainer);
  }

  updateTodo = (editTodo) => {
    this.todoData = this.todoData.map((ele) =>
      ele.id === editTodo.id
        ? { id: ele.id, name: editTodo.name, status: editTodo.status }
        : ele
    );
    this.todoMainContainer.innerHTML = "";
    this.generateTodoUo(this.todoData, this.todoMainContainer);
  };

  generateTodoUo = (data, container) => {
    container.innerHTML = "";
    data.map(({ id, name, status }) => {
      new TodoUi(
        id,
        name,
        status,
        this.todoMainContainer,
        this.todoLayoutContext,
        this.updateTodo
      );
    });
  };

  addNewTodo() {
    if (this.todoText === "" || this.todoStatus === "") return;
    const newTodo = {
      id: this.todoData.length + 1,
      name: this.todoText,
      status: this.todoStatus,
    };
    this.todoData = [...this.todoData, newTodo];
    this.generateTodoUo(this.todoData, this.todoMainContainer);
    this.todoText = "";
    this.todoStatus = "";
    this.todoInput.value = "";
    this.todoStatusEle.value = "";
  }

  //   Search By name
  searchTodoHandler = (name) => {
    let data = [...this.todoData];

    if (this.todoSearchText !== "") {
      data = data.filter((ele) =>
        ele.name
          .toString()
          .toLowerCase()
          .includes(this.todoSearchText.toString().toLowerCase())
      );
    }

    if (
      this.todoSearchStatus !== "" &&
      this.todoSearchStatus !== "Select ALL"
    ) {
      data = data.filter((ele) =>
        ele.status
          .toString()
          .toLowerCase()
          .includes(this.todoSearchStatus.toString().toLowerCase())
      );
    }

    this.generateTodoUo(data, this.todoMainContainer);
  };

  bindTodoAddEvents() {
    this.todoInput.addEventListener("input", (e) => {
      const val = e.target.value;
      this.todoText = val;
    });

    this.todoStatusEle.addEventListener("click", (e) => {
      const val = e.target.value;
      this.todoStatus = val;
    });
    this.addTodoCta.addEventListener("click", () => {
      this.addNewTodo();
    });
    // Search by text
    this.searchTodo.addEventListener("input", (e) => {
      const val = e.target.value;
      this.todoSearchText = val;
      this.searchTodoHandler("input");
    });
    // SearchBy Status
    this.todoSelectSearch.addEventListener("click", (e) => {
      const value = e.target.value;
      this.todoSearchStatus = value;
      this.searchTodoHandler("select");
    });
  }
}

//  TOGGLE TODO
class TodoUi {
  constructor(id, name, status, container, todoLayoutContext, updateTodo) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.mainContainer = container;
    this.editUI = false;
    this.todoContainer = document.createElement("div");
    this.todoUiContext = this;
    this.todoLayoutContext = todoLayoutContext;
    this.updateTodo = updateTodo;
    this.generateUI();
  }
  editTodo = (val) => {
    this.editUI = val;
    this.generateUI();
  };

  generateUI() {
    this.todoContainer.innerHTML = "";
    if (this.editUI) {
      return new TodoEditUi(
        this.id,
        this.name,
        this.status,
        this.todoContainer,
        this.mainContainer,
        this.editTodo,
        this.todoUiContext,
        this.todoLayoutContext,
        this.updateTodo
      );
    } else {
      return new TodoViewUi(
        this.id,
        this.name,
        this.status,
        this.todoContainer,
        this.mainContainer,
        this.editTodo,
        this.todoUiContext
      );
    }
  }
}

// EDIT TODO
class TodoEditUi {
  constructor(
    id,
    name,
    status,
    todoContainer,
    mainContainer,
    editTodo,
    todoUiContext,
    todoLayoutContext,
    updateTodo
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.todoContainer = todoContainer;
    this.mainContainer = mainContainer;
    this.editTodo = editTodo;

    // Sub Container Context
    this.todoUiContext = todoUiContext;

    // Main COntainer Context
    this.todoLayoutContext = todoLayoutContext;
    this.updateTodo = updateTodo;

    // Edited Value
    this.todoStatus = ["Select Val", "PENDING", "DONE", "WONTDO"];
    this.editedName = this.name;
    this.editedStatus = this.status;
    this.generateEditUi();
  }

  saveEditTodo() {
    const newEditTodo = {
      id: this.id,
      name: this.editedName,
      status: this.editedStatus,
    };
    this.editTodo(false, this.todoUiContext);
    this.updateTodo(newEditTodo, this.todoLayoutContext);
  }

  generateEditUi() {
    // ID TODO
    const todoID = document.createElement("p");
    todoID.innerHTML = `${this.id}`;
    this.todoContainer.appendChild(todoID);

    //  Name
    const name = document.createElement("input");
    name.placeholder = "Edit Name Value";
    name.value = this.editedName;
    name.addEventListener("input", (e) => {
      const val = e.target.value;
      this.editedName = val;
    });
    this.todoContainer.appendChild(name);

    //Status
    const status = document.createElement("select");
    this.todoStatus.forEach((ele, i) => {
      const option = document.createElement("option");
      option.value = ele;
      option.innerHTML = `${ele}`;
      if (ele === this.status) {
        option.selected = true;
      }
      if (i == 0) {
        option.disabled = true;
      }
      status.appendChild(option);
    });

    status.addEventListener("click", (e) => {
      const val = e.target.value;
      this.editedStatus = val;
    });

    this.todoContainer.appendChild(status);

    // Cancel Edit Button
    const cancelEdit = document.createElement("button");
    cancelEdit.innerHTML = "Cancel Edit";
    cancelEdit.addEventListener("click", () => {
      this.editTodo(false, this.todoUiContext);
    });
    this.todoContainer.appendChild(cancelEdit);

    // Save Edit Button
    const saveEdit = document.createElement("button");
    saveEdit.innerHTML = "SaveEdit";
    this.todoContainer.appendChild(saveEdit);
    saveEdit.addEventListener("click", () => {
      this.saveEditTodo();
    });
  }
}

//  VIEW TODO
class TodoViewUi {
  constructor(
    id,
    name,
    status,
    todoContainer,
    mainContainer,
    editTodo,
    todoUiContext
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.todoContainer = todoContainer;
    this.mainContainer = mainContainer;
    this.editTodo = editTodo;
    this.todoUiContext = todoUiContext;

    this.generateViewUi();
  }
  generateViewUi() {
    this.todoContainer.classList.add("border");
    const todoID = document.createElement("p");
    const todoName = document.createElement("p");
    const todoStatus = document.createElement("p");
    const button = document.createElement("button");
    button.innerText = "Edit Todo";
    button.addEventListener("click", () => {
      this.editTodo(true, this.todoUiContext);
    });
    todoID.innerHTML = `${this.id}`;
    todoName.innerHTML = `${this.name}`;
    todoStatus.innerHTML = `${this.status}`;
    this.todoContainer.appendChild(todoID);
    this.todoContainer.appendChild(todoName);
    this.todoContainer.appendChild(todoStatus);
    this.todoContainer.appendChild(button);
    this.mainContainer.insertBefore(
      this.todoContainer,
      this.mainContainer.children[this.id]
    );
  }
}
const todoStatus = ["Select Val", "PENDING", "DONE", "WONTDO"];
new TodosLayout(todoStatus);
