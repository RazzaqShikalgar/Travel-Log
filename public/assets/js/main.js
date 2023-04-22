class Form {
  constructor(formButton, closeIcon, modal, body, contactForm) {
    this.formButton = formButton;
    this.closeIcon = closeIcon;
    this.modal = modal;
    this.body = body;
    this.contactForm = contactForm;
    this.openForm();
    this.closeForm();
    this.submitForm();
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

  submitForm() {
    this.contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };

      try {
        const response = await axios.post(
          "https://tripadvisor-clone-api.herokuapp.com/form",
          data
        );
        console.log(response.data);
        if (response.status === 200) {
          alert("An email has been sent !");
        } else {
          alert("Bad request");
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  }
}

const form = new Form(
  document.querySelector("#openForm"),
  document.querySelector("#closeForm"),
  document.querySelector("#modal"),
  document.querySelector(".body"),
  document.querySelector(".contact-form")
);

$(document).ready(function() {
  $('.like-button').click(function(event) {
    event.preventDefault();
    const galleryId = $(this).data('gallery-id');
    $.ajax({
      url: '/like',
      method: 'POST',
      data: { galleryId },
      success: function(response) {
        $(this).toggleClass('clicked');
        const likesCountElement = $(this).find('.likes-count');
        const likesCount = response.likesCount;
        likesCountElement.text(likesCount);
      },
      error: function() {
        alert('Error liking image');
      }
    });
  });
});
// This code adds an event listener for the click event on all elements with the class like-button. When the anchor tag is clicked, it calls the preventDefault() method to prevent the default behavior of the anchor tag. It then extracts the ID of the corresponding gallery image from the data-gallery-id attribute of the anchor tag, and sends a POST request to the /like route using AJAX.

// If the request is successful, the code toggles the clicked class on the anchor tag to change its appearance, and updates the count of likes for the image by finding the .likes-count element inside the anchor tag and setting its text to the new value returned by the server. If the request fails, the code displays an error message using an alert box.

// I hope this helps! Let me know if you have any further questions.

const galleryContainer = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');

let skip = 10; // Initial number of items to skip
let limit = 10; // Number of items to load each time

loadMoreButton.addEventListener('click', function() {
  fetch(`/gallery?skip=${skip}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        data.forEach(function(Gallery) {
          const box = document.createElement('div');
          box.classList.add('box');
          box.setAttribute('data-aos', 'zoom-in-up');
          box.setAttribute('data-aos-delay', '150');

          const image = document.createElement('img');
          image.src = Gallery.image;
          image.alt = '';

          const symbol = document.createElement('span');
          symbol.classList.add('material-symbols-outlined');
          symbol.textContent = 'north';

          const description = document.createElement('span');
          description.textContent = Gallery.description;

          const name = document.createElement('h3');
          name.textContent = Gallery.name;

          const form = document.createElement('form');
          form.action = `/like/${Gallery.id}`;
          form.method = 'POST';

          const button = document.createElement('button');
          button.classList.add('like-button');
          button.setAttribute('data-gallery-id', Gallery._id);
          button.style.position = 'absolute';
          button.style.top = '0';
          button.style.right = '0';
          button.style.padding = '5px';

          const icon = document.createElement('i');
          icon.classList.add('fas', 'fa-heart');

          const count = document.createElement('span');
          count.classList.add('likes-count');
          count.textContent = Gallery.likes;

          button.appendChild(icon);
          button.appendChild(count);

          form.appendChild(button);

          box.appendChild(image);
          box.appendChild(symbol);
          box.appendChild(description);
          box.appendChild(name);
          box.appendChild(form);

          galleryContainer.appendChild(box);
        });

        skip += limit;
      }
      else {
        loadMoreButton.style.display = 'none';
      }
    })
    .catch(error => console.error(error));
});






