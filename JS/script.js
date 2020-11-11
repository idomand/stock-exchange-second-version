import {
  toggleView,
  fetchCompanyInfo,
  checkPriceChange,
} from "./sharedFunctions.js";

const idNames = ["myButton", "myInput", "resultList", "loader"];

const [myButton, myInput, resultList, loader] = idNames.map((element) =>
  document.getElementById(element)
);

myButton.addEventListener("click", (e) => {
  e.preventDefault();
  freshStart();
  toggleView(loader, "show");
  findCompanies(myInput.value);
});

const findCompanies = async (searchInput) => {
  let searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;
  toggleView(loader, "show");
  const results = await fetchFunc(searchUrl);
  showCompanies(results);
};

const fetchFunc = async (url) => {
  let response = await fetch(url);
  let responseJson = await response.json();
  return responseJson;
};

const showCompanies = async (array) => {
  toggleView(loader, "hide");
  array.forEach(async (element) => {
    const newLi = document.createElement("li");
    const newATag = document.createElement("a");
    resultList.appendChild(newLi);
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
  });
};

const freshStart = () => {
  resultList.innerHTML = "";
};
