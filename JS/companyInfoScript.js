const idNames = [
  "companyInfoDiv",
  "companyLogo",
  "companyName",
  "stockPrice",
  "stockPriceLine",
  "stockPriceChange",
  "companyDescription",
];

const [
  companyInfoDiv,
  companyLogo,
  companyName,
  stockPrice,
  stockPriceLine,
  stockPriceChange,
  companyDescription,
] = idNames.map((element) => document.getElementById(element));
let url = window.location.href;
let index = url.indexOf("=");
let symbol = url.slice(index + 1);

const baseUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;

const findCompanyInfo = async () => {
  toggleView(loader, "show");
  let result = await fetchCompanyInfo(baseUrl);
  await appendResults(result.profile);
  await toggleView(loader, "hide");
  await appendChart(symbol);
};
const fetchCompanyInfo = async (url) => {
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

const appendResults = (object) => {
  companyName.innerHTML = object.companyName;
  toggleView(stockPriceLine, "show");
  stockPrice.innerHTML = `${object.price} $`;
  stockPrice.classList.add("stockPrice");
  stockPriceChange.innerHTML = `${object.changes} %`;
  companyDescription.innerHTML = object.description;
  let logoImg = document.createElement("img");
  logoImg.setAttribute("src", object.image);
  companyLogo.appendChild(logoImg);
  checkPriceChange(object.changes);
};
const checkPriceChange = (number) => {
  if (number > 0) {
    stockPriceChange.classList.add("positive");
  } else if (number < 0) {
    stockPriceChange.classList.add("negative");
  } else {
    stockPriceChange.innerHTML = "";
  }
};
const appendChart = async (symbol) => {
  let stockHistory = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
  );
  let stockHistoryJson = await stockHistory.json();
  createChart(stockHistoryJson.historical);
};

const createChart = (array) => {
  let newArray = array.reverse();
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: newArray.map((element) => element.date),
      datasets: [
        {
          label: "Stock Price over time ",
          data: newArray.map((element) => element.close),
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(153, 102, 255, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
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
findCompanyInfo();
