import {
  toggleView,
  fetchCompanyInfo,
  checkPriceChange,
} from "./sharedFunctions.js";

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

const findCompanyInfo = async () => {
  toggleView(loader, "show");
  let result = await fetchCompanyInfo(symbol);
  await appendResults(result);
  await toggleView(loader, "hide");
  await appendChart(symbol);
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
  checkPriceChange(object.changes, stockPriceChange);
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

findCompanyInfo();
