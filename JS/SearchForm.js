import {
  toggleView,
  fetchCompanyInfo,
  checkPriceChange,
  giveAttributes,
} from "./sharedFunctions.js";

export default class SearchForm {
  constructor(element) {
    this.div = document.getElementById(element);
    this.createElements();
    this.createEventListener();
    this.data = "nothing";
    this.newCallback = "";
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
    giveAttributes(header, 0, 0, "Stock Exchange Search Engine", 0);
    giveAttributes(divHolder, "divHolder", "mt-5 black d-flex", 0, 0);
    giveAttributes(myInput, "myInput", 0, 0, 0);
    giveAttributes(myButton, "myButton", 0, "search", 0);
    giveAttributes(loaderDiv, "loaderDiv", "mt-4 align-self-center", 0, 0);
    giveAttributes(loaderImg, "loader1", "hide", 0, "../img/loading.png");
  };

  createEventListener = function () {
    myButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.freshStart();
      toggleView(loader1, "show");
      this.findCompanies(myInput.value);
    });
  };

  freshStart = function () {
    document.getElementById("resultDiv").innerHTML = "";
  };

  findCompanies = async function (searchInput) {
    // toggleView(loader1, "show");
    let searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;
    // toggleView(loader1, "show");
    const results = await this.fetchFunc(searchUrl);
    this.data = results;
    await this.newCallback(this.data);
  };

  fetchFunc = async function (url) {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  };

  onSearch = function (callBack) {
    this.newCallback = callBack;
  };
}
