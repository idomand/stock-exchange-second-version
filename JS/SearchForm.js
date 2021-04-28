import { toggleView, giveAttributes } from "./sharedFunctions.js";

export default class SearchForm {
  constructor(element) {
    this.div = document.getElementById(element);
    this.createElements();
    this.createEventListener();
    this.data = "nothing";
    this.newCallback = "justNothing";
  }

  createElements = function () {
    const header = document.createElement("h3");
    const divHolder = document.createElement("div");
    const myInput = document.createElement("input");
    const myButton = document.createElement("Button");
    const loaderDiv = document.createElement("div");
    const loaderImg = document.createElement("img");
    this.div.appendChild(header);
    this.div.appendChild(divHolder);
    divHolder.appendChild(myInput);
    this.div.appendChild(loaderDiv);
    loaderDiv.appendChild(loaderImg);
    divHolder.appendChild(myButton);
    giveAttributes(header, 0, 0, "Stock Exchange Search Engine");
    giveAttributes(divHolder, "divHolder", "mt-5 black d-flex");
    giveAttributes(myInput, "myInput");
    giveAttributes(myButton, "myButton", "btn btn-info ", "search");
    giveAttributes(loaderDiv, "loaderDiv", "mt-4 align-self-center");
    giveAttributes(loaderImg, "loader1", "hide", 0, "../img/loading.png");
  };

  createEventListener = function () {
    myButton.addEventListener("click", this.searchStartFunc);
  };

  searchStartFunc = (e) => {
    e.preventDefault();
    toggleView(loader1, "show");
    this.findCompanies(myInput.value);
  };

  freshStart = function () {
    document.getElementById("resultDiv").innerHTML = "";
  };

  findCompanies = async function (searchInput) {
    if (!searchInput) {
      console.log("nothing");
      toggleView(loader1, "hide");
      return;
    }
    this.freshStart();
    const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;
    const results = await this.fetchFunc(searchUrl);
    console.log("results :>> ", results);
    const myRegEx = new RegExp(searchInput, "ig");
    console.log("myRegEx", myRegEx);
    this.newCallback(results, myRegEx);
  };

  fetchFunc = async function (url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  };

  onSearch = function (callBack) {
    this.newCallback = callBack;
  };
}
