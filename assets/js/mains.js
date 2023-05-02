class Form {
  constructor(formButton, closeIcon, modal, body) {
    this.formButton = formButton;
    this.closeIcon = closeIcon;
    this.modal = modal;
    this.body = body;
    this.openForm();
    this.closeForm();
    this.openForm2();
    this.closeForm();
  }

  openForm() {
    this.formButton.addEventListener("click", () => {
      this.modal.classList.add("display");
      this.body.classList.add("hide");
    });
  }

  closeForm() {
    this.closeIcon.addEventListener("click", () => {
      this.modal.classList.remove("display");
      this.body.classList.remove("hide");
    });
  }
}

const form = new Form(
  document.querySelector("#openForm"),
  document.querySelector("#closeForm"),
  document.querySelector("#modal"),
  document.querySelector(".body")
);

const form2 = new Form(
  document.querySelector("#openForm2"),
  document.querySelector("#closeForm"),
  document.querySelector("#modal"),
  document.querySelector(".body")
);