class Accordian {
    constructor(data) {
      this.accordianData = data;
      this.accordianTemplate = document.querySelector("#accordianTemplate");
      this.accordianContainer = document.querySelector("#accordianContainer");
      this.checkbox = document.querySelector("#checkbox");
  
      //  Fun calls
      this.generateUi();
    }
    generateUi() {
      this.accordianData.forEach(({ id, title, info }) => {
        const template = this.accordianTemplate.content.cloneNode(true);
        const accordianHeader = template.querySelector(".accordianHeader");
        accordianHeader.innerHTML = `${title}`;
        const accordianContent = template.querySelector(".accordianContent");
        accordianContent.dataset.id = id;
        accordianContent.innerHTML = `${info}`;
        this.accordianContainer.appendChild(template);
  
        // Toggle Accordian
        accordianHeader.addEventListener("click", () => {
          if (this.checkbox.checked) {
            const allAccordianContent =
              document.querySelectorAll(".accordianContent");
            allAccordianContent.forEach((ele) => {
              const allId = ele.dataset.id;
              if (allId !== id && ele.classList.contains("active")) {
                ele.classList.remove("active");
              }
            });
          }
          accordianContent.classList.toggle("active");
        });
      });
    }
  }
  
  const questions = [
    {
      id: 0,
      title: "Do I have to allow the use of cookies?",
      info: "Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, whatever poutine normcore fixie cred kickstarter post-ironic street art.",
    },
    {
      id: 1,
      title: "How do I change my My Page password?",
      info: "Coloring book forage photo booth gentrify lumbersexual. Migas chillwave poutine synth shoreditch, enamel pin thundercats fashion axe roof party polaroid chartreuse.",
    },
    {
      id: 2,
      title: "What is BankID?",
      info: "Enamel pin fam sustainable woke whatever venmo. Authentic asymmetrical put a bird on it, lumbersexual activated charcoal kinfolk banjo cred pickled sartorial.",
    },
    {
      id: 3,
      title: "Whose birth number can I use?",
      info: "Edison bulb direct trade gentrify beard lo-fi seitan sustainable roof party franzen occupy squid. Knausgaard cronut succulents, scenester readymade shabby chic lyft. Copper mug meh vegan gentrify.",
    },
    {
      id: 4,
      title: "When do I recieve a password ordered by letter?",
      info: "Locavore franzen fashion axe live-edge neutra irony synth af tilde shabby chic man braid chillwave waistcoat copper mug messenger bag. Banjo snackwave blog, microdosing thundercats migas vaporware viral lo-fi seitan ",
    },
  ];
  
  new Accordian(questions);
  