const idNames = [
  "myButton",
  "myInput",
  "resultList",
  "loader",
  "companyInfoDiv",
];

const [
  myButton,
  myInput,
  resultList,
  loader,
  companyInfoDiv,
] = idNames.map((element) => document.getElementById(element));

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
    let newInfo = await getMoreInfo(element.symbol);
    // console.log("newInfo", newInfo);
    const logo = document.createElement("img");
    newLi.appendChild(logo);
    newLi.appendChild(newATag);
    console.log("newInfo.image", newInfo.image);
    if (newInfo.image) {
      logo.setAttribute("src", newInfo.image);
    }
    // else {
    //   logo.setAttribute("src", `<img src="http://placecorgi.com/50/50"/>`);
    // }
    const PriceChange = document.createElement("div");
    PriceChange.innerHTML = `${newInfo.changes}%`;

    if (newInfo.changes > 0) {
      PriceChange.classList.add("positive");
    } else if (newInfo.changes < 0) {
      PriceChange.classList.add("negative");
    } else {
      PriceChange.innerHTML = "";
    }

    newLi.appendChild(PriceChange);
  });
};

const getMoreInfo = async (symbol) => {
  let response = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
  );
  let responseJson = await response.json();
  // console.log("responseJson", responseJson.profile);
  return responseJson.profile;
};

const freshStart = () => {
  resultList.innerHTML = "";
};

const toggleView = (element, order) => {
  if (order === "show") {
    element.classList.add("show");
    element.classList.remove("hide");
  } else if (order === "hide") {
    element.classList.add("hide");
    element.classList.remove("show");
  }
};
