// import {
//   toggleView,
//   fetchCompanyInfo,
//   checkPriceChange,
// } from "./sharedFunctions.js";

// const scriptObject = {
//   idNames: ["myButton", "myInput", "resultList", "loader1"],
//   grabElements: function (array) {
//     array.map((element) => {
//       return (scriptObject[element] = document.getElementById(element));
//     });
//   },

//   createEventListener: function () {
//     this.myButton.addEventListener("click", (e) => {
//       e.preventDefault();
//       this.freshStart();
//       toggleView(loader1, "show");
//       this.findCompanies(myInput.value);
//     });
//   },

//   freshStart: function () {
//     resultList.innerHTML = "";
//   },

//   findCompanies: async function (searchInput) {
//     let searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;
//     toggleView(loader1, "show");
//     const results = await this.fetchFunc(searchUrl);
//     this.showCompanies(results);
//   },

//   fetchFunc: async function (url) {
//     let response = await fetch(url);
//     let responseJson = await response.json();
//     return responseJson;
//   },

//   showCompanies: async function (array) {
//     toggleView(loader1, "hide");
//     array.forEach(async (element) => {
//       const newLi = document.createElement("li");
//       const newATag = document.createElement("a");
//       resultList.appendChild(newLi);
//       newATag.setAttribute("href", `../company.html?symbol=${element.symbol}`);
//       newATag.setAttribute("target", "_blank");
//       newATag.innerHTML = `${element.name} (${element.symbol})`;
//       let newInfo = await fetchCompanyInfo(element.symbol);
//       const logo = document.createElement("img");
//       newLi.appendChild(logo);
//       newLi.appendChild(newATag);
//       if (newInfo.image) {
//         logo.setAttribute("src", newInfo.image);
//       }
//       const PriceChange = document.createElement("div");
//       PriceChange.innerHTML = `${newInfo.changes}%`;

//       checkPriceChange(newInfo.changes, PriceChange);
//       newLi.appendChild(PriceChange);
//     });
//   },

//   init: function () {
//     this.grabElements(this.idNames);
//     this.createEventListener();
//   },
// };

// scriptObject.init();
