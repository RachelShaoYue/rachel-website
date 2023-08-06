"use strict";

/**
 * Data of all options, questions, and iamges
 */
const formData = {
  pet: {
    assets: ["cat_dog_silhouette.png", "Which pet do you want?"],
    options: ["Dog", "Cat"],
  },
  Dog: {
    assets: ["dog_silhouette.png", "Which dog breed do you want?"],
    options: ["Wheaten Terrier", "French Bulldog", "Black Mouth Cur"],
  },
  "Wheaten Terrier": {
    assets: ["wheaten_terrier_silhouette.png", "Which coat do you prefer?"],
    options: ["Irish Coat", "American Coat"],
  },
  "Irish Coat": {
    assets: ["wheaten_terrier_w_irish_coat.jpg"],
  },
  "American Coat": {
    assets: ["wheaten_terrier_w_american_coat.jpg"],
  },
  "French Bulldog": {
    assets: ["french_bulldog_silhouette.png", "Which fur do you prefer?"],
    options: ["Blue Fur", "Pied Fur"],
  },
  "Blue Fur": {
    assets: ["french_bulldog_w_blue_fur.png"],
  },
  "Pied Fur": {
    assets: ["french_bulldog_w_pied_fur.jpg"],
  },
  "Black Mouth Cur": {
    assets: [
      "black_mouth_cur_silhouette.png",
      "Which appearence do you prefer?",
    ],
    options: ["White Chest", "No White Chest"],
  },
  "White Chest": {
    assets: ["black_mouth_cur_w_white_chest.jpg"],
  },
  "No White Chest": {
    assets: ["black_mouth_cur_w_no_white_chest.jpg"],
  },
  Cat: {
    assets: ["cat_silhouette.png", "Which cat breed do you want?"],
    options: ["Turkish Angora", "Russian Blue", "Tortoiseshell"],
  },
  "Turkish Angora": {
    assets: ["turkish_angora_silhouette.png", "Which fur do you prefer?"],
    options: ["White Fur", "Black Fur"],
  },
  "White Fur": {
    assets: ["white_turkish_angora.jpg"],
  },
  "Black Fur": {
    assets: ["black_turkish_angora.jpg"],
  },
  "Russian Blue": {
    assets: ["russian_blue_silhouette.png", "Which eye color do you prefer?"],
    options: ["Green Eyes", "Yellow Eyes"],
  },
  "Green Eyes": {
    assets: ["russian_blue_w_green_eyes.jpg"],
  },
  "Yellow Eyes": {
    assets: ["russian_blue_w_yellow_eyes.jpg"],
  },
  Tortoiseshell: {
    assets: ["tortoiseshell_silhouette.png", "Which hair do you prefer?"],
    options: ["Short Hair", "Long Hair"],
  },
  "Short Hair": {
    assets: ["tortoiseshell_w_short_hair.jpg"],
  },
  "Long Hair": {
    assets: ["tortoiseshell_w_long_hair.jpg"],
  },
};

// Application with functions
const APP = (function () {
  /**
   * Constructs an element, select, with options based on the data
   * @param {Object} data Dictionary of the data
   */
  function construct(data) {
    this.imgSrc = `assets/media/${data["assets"][0]}`;
    updateResultImg(this.imgSrc);

    /**
     * If assets has two elements, it means that it has both question and image.
     * Otherwise, assets only has an image
     */
    if (data["assets"].length === 2) {
      removeApplicationForm();

      this.question = data["assets"][1];
      this.options = data["options"];

      const form = $("interactiveForm");
      const div = document.createElement("div");
      const label = document.createElement("label");
      const questionNode = document.createTextNode(this.question);
      label.appendChild(questionNode);
      div.appendChild(label);

      const select = document.createElement("select");
      select.style.left = "-110%";
      select.setAttribute(
        "onchange",
        "APP.clearQuestions(this, null); APP.construct(formData[this.value]);"
      );
      div.appendChild(select);

      const selectOption = document.createElement("option");
      selectOption.setAttribute("value", "none");
      selectOption.setAttribute("selected", "");
      selectOption.setAttribute("disabled", "");
      const selectText = document.createTextNode("Select");
      selectOption.appendChild(selectText);
      select.appendChild(selectOption);

      for (let i = 0, len = this.options.length; i < len; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", this.options[i]);
        const textOption = document.createTextNode(this.options[i]);
        option.appendChild(textOption);
        select.appendChild(option);
      }

      form.appendChild(div);
      slideSelect(select);
    } else {
      getResult(this.imgSrc);
      createApplicationForm();
    }
  }

  /**
   * Slides the give select from left to right
   * @param {Object} select Element to be moved
   */
  function slideSelect(select) {
    if (parseInt(select.style.left) < 0) {
      select.style.left = parseInt(select.style.left) + 1 + "%";
      setTimeout(function () {
        slideSelect(select);
      }, 10);
    }
  }

  /**
   * Removes the thanks header if it exists
   */
  function removeThanksH2() {
    let h2Node = $("thanksH2");
    if (h2Node != null) {
      const form = $("formDiv");
      form.removeChild(h2Node);
    }
  }

  /**
   * Creates an appllication form
   */
  function createApplicationForm() {
    const form = $("formDiv");

    removeApplicationForm();
    removeThanksH2();

    const applicationForm = document.createElement("form");
    applicationForm.setAttribute("id", "applicationForm");

    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Adoption Application Form");
    h2.appendChild(h2Text);
    applicationForm.appendChild(h2);

    const inputs = [
      {
        name: "fname",
        text: "Your first name",
      },
      {
        name: "lname",
        text: "Your last name",
      },
      {
        name: "petName",
        text: "Name of the pet you wish to adopt",
      },
    ];

    let index;
    try {
      if (window.localStorage.getItem("petName")) {
        index = 2;
      } else {
        index = 0;
      }
    } catch {
      index = 0;
    }
    for (let i = index, len = inputs.length; i < len; i++) {
      const name = inputs[i]["name"];
      const label = document.createElement("label");
      label.setAttribute("for", name);
      const labelText = document.createTextNode(inputs[i]["text"]);
      label.appendChild(labelText);
      applicationForm.appendChild(label);

      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", name);
      input.setAttribute("name", name);
      applicationForm.appendChild(input);
    }

    formDiv.appendChild(applicationForm);

    const button = document.createElement("button");
    button.setAttribute("id", "applicationButton");
    button.setAttribute("onclick", "APP.validate()");
    const buttonText = document.createTextNode("Submit");
    button.appendChild(buttonText);
    formDiv.appendChild(button);
  }

  /**
   * Validates that all fields are filled out. If they are validated, process the data.
   * Otherwise, do nothing
   */
  function validate() {
    let validated = true;
    if ($("fname") != null && $("lname") != null) {
      if ($("fname").value == "") {
        $("fname").style.borderColor = "var(--failColor)";
        validated = false;
      } else {
        $("fname").style.borderColor = "";
      }
      if ($("lname").value == "") {
        $("lname").style.borderColor = "var(--failColor)";
        validated = false;
      } else {
        $("lname").style.borderColor = "";
      }
    }
    if ($("petName").value == "") {
      $("petName").style.borderColor = "var(--failColor)";
      validated = false;
    } else {
      $("petName").style.borderColor = "";
    }
    if (validated == true) {
      processYourData();
      endApplication();
    }
  }

  /**
   * Removes the application form
   */
  function removeApplicationForm() {
    if ($("applicationForm") != null) {
      const formDiv = $("formDiv");
      formDiv.removeChild($("applicationForm"));
      formDiv.removeChild($("applicationButton"));
    }
  }

  /**
   * Gets and saves your data from the application form using localStorage
   */
  function processYourData() {
    try {
      if (window.localStorage) {
        let fname;
        let lname;
        let petName;

        if (
          (fname = window.localStorage.getItem("fname")) &&
          (lname = window.localStorage.getItem("lname")) &&
          (petName = window.localStorage.getItem("petName"))
        ) {
          SetCookie("fname", fname);
          SetCookie("lname", lname);
          SetCookie("petName", petName);
        }

        if ($("fname") && $("lname")) {
          fname = $("fname").value;
          lname = $("lname").value;

          // stores the data in localStorage
          window.localStorage.setItem("fname", fname);
          window.localStorage.setItem("lname", lname);

          // stores the data in Cookies if Cookies are enabled
          SetCookie("fname", fname);
          SetCookie("lname", lname);
        }
        if ($("petName")) {
          petName = $("petName").value;

          window.localStorage.setItem("petName", petName);

          SetCookie("petName", petName);
        }

        if (
          (fname = GetCookie("fname")) &&
          (lname = GetCookie("lname")) &&
          (petName = GetCookie("petName")) &&
          fname != null &&
          lname != null &&
          petName != null
        ) {
          displayGreetingMsg(fname, lname, petName);
        } else {
          if (
            (fname = window.localStorage.getItem("fname")) &&
            (lname = window.localStorage.getItem("lname")) &&
            (petName = window.localStorage.getItem("petName"))
          ) {
            displayGreetingMsg(fname, lname, petName);
          }
        }
      }
    } catch (error) {
      alert("Cookies are disabled");
      displayGreetingMsg(
        $("fname").value,
        $("lname").value,
        $("petName").value
      );
    }
  }

  /**
   * Gets the data to make a greeting msg
   * @param {String} fname First name
   * @param {String} lname Last name
   * @param {String} petName Pet name
   */
  function displayGreetingMsg(fname, lname, petName) {
    const p = document.createElement("p");
    p.setAttribute("id", "greetingMsg");
    const text = document.createTextNode(
      `Welcome, ${fname} ${lname}! You previously adopted a pet named ${petName}!`
    );
    p.appendChild(text);

    const resultDiv = $("resultDiv");
    if ($("greetingMsg")) {
      resultDiv.replaceChild(p, resultDiv.firstChild);
    } else {
      resultDiv.insertBefore(p, resultDiv.firstChild);
    }
  }

  /**
   * Removes the application form and displays a thank you message
   */
  function endApplication() {
    removeApplicationForm();
    const form = $("formDiv");

    const h2 = document.createElement("h2");
    h2.setAttribute("id", "thanksH2");
    const h2Text = document.createTextNode(
      `You adopted ${window.localStorage.getItem("petName")}! Thank you!`
    );
    h2.appendChild(h2Text);
    form.appendChild(h2);
  }

  /**
   * Updates the shown image with the given src
   * @param {String} src File path for the image
   */
  function updateResultImg(src) {
    const resultImg = $("resultImg");
    resultImg.setAttribute("src", src);
  }

  /**
   * Gets a result from the given list of options and saves the result to the history
   */
  function getResult(imgSrc) {
    let options = [];
    let message = "You picked an adorable pet with cute looks:";
    let optionMessage = "";
    for (
      let i = 0, len = document.getElementsByTagName("select").length;
      i < len;
      i++
    ) {
      const value = $$("select", i).value;
      options.push(value);
      if (i !== len - 1) {
        optionMessage += value + ", ";
      } else {
        optionMessage += value;
      }
    }
    displayMessage(`${message} ${optionMessage}!`, "successColor");
    appendHistory(imgSrc, optionMessage);
  }

  /**
   * Appends a result image to the history list
   * @param {String} imgSrc Path of the image
   * @param {String} optionMessage Message of all the options the user selected
   */
  function appendHistory(imgSrc, optionMessage) {
    const ul = $("historyDiv").children[1];
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    li.appendChild(img);
    const textNode = document.createTextNode(optionMessage);
    li.appendChild(textNode);
    if (ul.childNodes.length > 0) {
      ul.insertBefore(li, ul.childNodes[0]);
    } else {
      ul.appendChild(li);
    }
  }

  /**
   * Clear all or some questions based on whether the given select element is null. If the element isn't null,
   * only elements that come after the given element will be removed.
   * Otherwise, all select elements will be removed
   * @param {Object} element Select element which the user clicks
   */
  function clearQuestions(element, img) {
    removeThanksH2();

    const form = $("interactiveForm");
    if (element === null) {
      updateResultImg(`assets/media/${img}`);
      while (document.getElementsByTagName("select").length > 1) {
        form.removeChild(form.lastChild);
      }
      $$("select", 0).value = "none";
      displayMessage("Cleared the form successfully!", "successColor");
      removeApplicationForm();
    } else {
      while (form.lastChild.childNodes[1] !== element) {
        form.removeChild(form.lastChild);
      }
      displayMessage("You are deciding...", "infoColor");
    }
  }

  /**
   * Displays a message with a background color
   * @param {String} text Notification message indicating an event triggered
   * @param {String} color Name of the color code
   */
  function displayMessage(text, color) {
    const message = document.createTextNode(text);
    const p = document.createElement("p");
    p.style.backgroundColor = "var(--" + color + ")";
    p.style.color = "var(--white)";
    p.appendChild(message);
    const messageDiv = $("messageDiv");
    if (messageDiv.children[1] == null) {
      messageDiv.appendChild(p);
    } else {
      messageDiv.replaceChild(p, messageDiv.children[1]);
    }
  }

  /**
   * Gets an element using the provided id
   * @param {String} id Id of the element you want to get
   * @returns Element in the document
   */
  function $(id) {
    return document.getElementById(id);
  }

  /**
   * Gets an element using the provided tag
   * @param {String} tag Tag of the element
   * @param {Integer} num Index of the tag elements
   * @returns Element in the document
   */
  function $$(tag, num) {
    return document.getElementsByTagName(tag)[num];
  }

  /**
   * Checks if the browser the user is on is modern
   * If it isn't modern, then the user will be redirected to legacy.html
   */
  function checkCompatibleBrowser() {
    try {
      if (document.getElementById) {
        console.log("Compatible Browser!");
      }
    } catch (err) {
      window.location = "legacy.html";
    }
  }

  return {
    construct,
    clearQuestions,
    processYourData,
    endApplication,
    checkCompatibleBrowser,
    validate,
  };
})();
