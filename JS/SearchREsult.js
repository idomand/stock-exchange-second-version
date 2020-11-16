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

  renderResults = async function (data) {
    await this.showCompanies(data);
  };

  showCompanies = async function (array) {
    toggleView(loader1, "hide");
    const resultListDiv = document.createElement("ul");
    this.div.appendChild(resultListDiv);
    giveAttributes(resultListDiv, "resultListDiv", 0, 0, 0);
    array.forEach(async (element) => {createCompanyItem(element)
    });
  };
  
  createCompanyItem = (element)=>{
    const newLi = document.createElement("li");
    const newATag = document.createElement("a");
    resultListDiv.appendChild(newLi);
    newATag.setAttribute("href", `../company.html?symbol=${element.symbol}`);
    newATag.setAttribute("target", "_blank");
    newATag.innerHTML = `${element.name} (${element.symbol})`;
    let newInfo = await fetchCompanyInfo(element.symbol);
    const logo = document.createElement("img");
    newLi.appendChild(logo);
    newLi.appendChild(newATag);
    if (newInfo.image) {
      logo.setAttribute("src", newInfo.image);
    }
    const PriceChange = document.createElement("div");
    PriceChange.innerHTML = `${newInfo.changes}%`;
    checkPriceChange(newInfo.changes, PriceChange);
    newLi.appendChild(PriceChange);
  }
}



