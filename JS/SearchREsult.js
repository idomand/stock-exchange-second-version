import {
  toggleView,
  fetchCompanyInfo,
  checkPriceChange,
  giveAttributes,
} from "./sharedFunctions.js";

export default class SearchResult {
  constructor(element) {
    this.div = document.getElementById(element);
  }

  renderResults = async function (data, inputRegEx) {
    await this.showCompanies(data, inputRegEx);
  };

  showCompanies = async function (array, inputRegEx) {
    toggleView(loader1, "hide");
    const resultListDiv = document.createElement("ul");
    this.div.appendChild(resultListDiv);
    giveAttributes(resultListDiv, "resultListDiv", 0, 0, 0);
    array.forEach(async (element) => {
      await this.createCompanyItem(element, inputRegEx);
    });
  };

  createCompanyItem = async (element, inputRegEx) => {
    const newLi = document.createElement("li");
    const newATag = document.createElement("a");
    const holderDiv = document.createElement("div");
    resultListDiv.appendChild(newLi);
    newLi.appendChild(holderDiv);
    newATag.setAttribute("href", `../company.html?symbol=${element.symbol}`);
    newATag.setAttribute("target", "_blank");
    let line = `${element.name} (${element.symbol})`;
    let newLine = line.replace(inputRegEx, (string) => {
      return "<mark>" + string + "</mark>";
    });
    newATag.innerHTML = newLine;
    let newInfo = await fetchCompanyInfo(element.symbol);
    const logo = document.createElement("img");
    holderDiv.appendChild(logo);
    holderDiv.appendChild(newATag);
    if (newInfo.image) {
      logo.setAttribute("src", newInfo.image);
    }
    const PriceChange = document.createElement("div");
    PriceChange.innerHTML = `${newInfo.changes}%`;
    checkPriceChange(newInfo.changes, PriceChange);
    newLi.appendChild(PriceChange);
  };
}
