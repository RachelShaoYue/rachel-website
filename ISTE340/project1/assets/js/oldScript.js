"use strict";

/**
 * Data of all options, questions, and iamges
 */
const formData = [
  "Which pet do you want?",
  "cat_dog_silhouette.png",
  {
    Dog: [
      "Which dog breed do you want?",
      "dog_silhouette.png",
      {
        "Wheaten Terrier": [
          "Which coat do you prefer?",
          "wheaten_terrier_silhouette.png",
          {
            "Irish Coat": ["", "wheaten_terrier_w_irish_coat.jpg", {}],
            "American Coat": ["", "wheaten_terrier_w_american_coat.jpg", {}],
          },
        ],
        "French Bulldog": [
          "Which fur do you prefer?",
          "french_bulldog_silhouette.png",
          {
            "Blue Fur": ["", "french_bulldog_w_blue_fur.png", {}],
            "Pied Fur": ["", "french_bulldog_w_pied_fur.jpg", {}],
          },
        ],
        "Black Mouth Cur": [
          "Which appearence do you prefer?",
          "black_mouth_cur_silhouette.png",
          {
            "White Chest": ["", "black_mouth_cur_w_white_chest.jpg", {}],
            "No White Chest": ["", "black_mouth_cur_w_no_white_chest.jpg", {}],
          },
        ],
      },
    ],
    Cat: [
      "Which cat breed do you want?",
      "cat_silhouette.png",
      {
        "Turkish Angora": [
          "Which fur do you prefer?",
          "turkish_angora_silhouette.png",
          {
            "White Fur": ["", "white_turkish_angora.jpg", {}],
            "Black Fur": ["", "black_turkish_angora.jpg", {}],
          },
        ],
        "Russian Blue": [
          "Which eye color do you prefer?",
          "russian_blue_silhouette.png",
          {
            "Green Eyes": ["", "russian_blue_w_green_eyes.jpg", {}],
            "Yellow Eyes": ["", "russian_blue_w_yellow_eyes.jpg", {}],
          },
        ],
        Tortoiseshell: [
          "Which hair do you prefer?",
          "tortoiseshell_silhouette.png",
          {
            "Short Hair": ["", "tortoiseshell_w_short_hair.jpg", {}],
            "Long Hair": ["", "tortoiseshell_w_long_hair.jpg", {}],
          },
        ],
      },
    ],
  },
];

const formDataSize = 3;

/**
 * User's picked options to get a result
 */
let pickedOptions = [];

/**
 * initializes creating the first select block
 */
function init() {
  createSelectElement(-1);
}

/**
 * Creates a select block with options based on the provided depth
 * @param {Integer} depth Level in the hierarchy of the data
 * @param {Object} option User's picked option. Otherwise, null if not picked, or "startOver" if the user clicks on "Start Over"
 */
function createSelectElement(depth, option = null) {
  modifyQuestions(depth, option);

  if (option) {
    pickedOptions.push(option.value);
  }

  const resultImg = $("resultImg");
  resultImg.setAttribute("src", getData(1, depth + 1));

  const question = getData(0, depth + 1);
  if (question !== "") {
    const form = $("interactiveForm");

    const div = document.createElement("div");
    div.setAttribute("id", ++depth + "Depth");
    const label = document.createElement("label");
    const questionNode = document.createTextNode(getData(0, depth));
    label.appendChild(questionNode);
    div.appendChild(label);

    const select = document.createElement("select");
    select.setAttribute("onchange", `createSelectElement(${depth}, this);`);
    div.appendChild(select);

    const selectOption = document.createElement("option");
    selectOption.setAttribute("value", "none");
    selectOption.setAttribute("selected", "");
    selectOption.setAttribute("disabled", "");
    const selectText = document.createTextNode("Select");
    selectOption.appendChild(selectText);
    select.appendChild(selectOption);

    const options = Object.keys(getData(2, depth));
    for (let i = 0, len = options.length; i < len; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", options[i]);
      const textOption = document.createTextNode(options[i]);
      option.appendChild(textOption);
      select.appendChild(option);
    }

    form.appendChild(div);
  } else {
    getResult(depth);
  }
}

/**
 * Modify questions based on what event the user triggers, either clearing the form or changing a picked option
 * @param {Integer} depth Level in the hierarchy of the data
 * @param {Object} option User's picked option. Otherwise, null if not picked, or "startOver" if the user clicks on "Start Over"
 */
function modifyQuestions(depth, option) {
  const form = $("interactiveForm");
  let lastRemoved;
  const oldValue = pickedOptions[depth];
  let tempDepth = depth + 1;
  while ($(tempDepth + "Depth") != null) {
    form.removeChild($(tempDepth + "Depth"));
    lastRemoved = pickedOptions.pop();
    lastRemoved = true;
    tempDepth++;
  }
  if (pickedOptions.length >= formDataSize) {
    pickedOptions.pop();
  }
  if (document.getElementsByTagName("select").length)
    if (option === "startOver") {
      pickedOptions.pop();
      $$("select", 0).value = "none";
      displayMessage("The form was cleared!", "successColor");
      const resultImg = $("resultImg");
      resultImg.setAttribute("src", getData(1, 0));
    } else {
      if (lastRemoved !== undefined) {
        const value = option.value;
        if (
          document.getElementsByTagName("select").length <= pickedOptions.length
        ) {
          pickedOptions.pop();
        }
        displayMessage(
          `You changed the choice from ${oldValue} to ${value}`,
          "infoColor"
        );
      }
    }
}

/**
 * Gets a result from the given list of options and records the result
 */
function getResult(depth) {
  const pet = pickedOptions[0].toLowerCase();
  const breed = pickedOptions[1];
  const appearence = pickedOptions[2].toLowerCase();
  displayMessage(
    `You picked an adorable ${breed} ${pet} with ${appearence}!`,
    "successColor"
  );

  const ul = $("historyDiv").children[1];
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.setAttribute("src", getData(1, depth + 1));
  li.appendChild(img);
  const textNode = document.createTextNode(`${breed} ${pet} with ${appearence}`);
  li.appendChild(textNode);
  if (ul.childNodes.length > 0) {
    ul.insertBefore(li, ul.childNodes[0]);
  } else {
    ul.appendChild(li);
  }
}

/**
 * Gets data based on the given depth and dataIndex
 * @param {Integer} dataIndex Index in the list of data
 * @param {Integer} depth Level in the hierarchy of data
 * @returns Object of the data
 */
function getData(dataIndex, depth) {
  let data = formData[dataIndex]; // Depth 0
  if (depth > 0) {
    data = formData[2];
    for (let i = 0; i < depth; i++) {
      if (i == depth - 1) {
        data = data[pickedOptions[i]][dataIndex];
        break;
      } else {
        data = data[pickedOptions[i]][2];
      }
    }
  }
  if (dataIndex === 1) {
    data = "./assets/media/" + data;
  }
  return data;
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
