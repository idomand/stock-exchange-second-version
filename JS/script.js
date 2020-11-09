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

const baseUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com`;
let userSearchInput = "";
let searchUrl = `/api/v3/search?query=${userSearchInput}&limit=10&exchange=NASDAQ`;

myButton.addEventListener("click", (e) => {
  e.preventDefault();
  freshStart();
  toggleView(loader, "show");
  findCompanies(myInput.value);
});

const findCompanies = async (searchInput) => {
  userSearchInput = searchInput;
  let foo = `${baseUrl}${searchUrl}`;
  toggleView(loader, "show");
  const results = await fetchFunc(foo);
  showCompanies(results);
};

const fetchFunc = async (url) => {
  let response = await fetch(url);
  let responseJson = await response.json();
  return responseJson;
};

const showCompanies = (array) => {
  toggleView(loader, "hide");

  let liElements = array.map((element) => {
    const newLi = document.createElement("li");
    const newATag = document.createElement("a");
    newLi.appendChild(newATag);
    newATag.setAttribute("href", `../company.html?symbol=${element.symbol}`);
    newATag.setAttribute("target", "_blank");
    newATag.innerHTML = `${element.name} (${element.symbol})`;
    return newLi;
  });
  liElements.forEach((li) => {
    resultList.appendChild(li);
  });
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
