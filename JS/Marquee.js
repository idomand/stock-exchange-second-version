import { giveAttributes } from "./sharedFunctions.js";
export default class Marquee {
  constructor(div) {
    this.div = document.getElementById(div);
    this.showMarquee();
  }
  MarqueeUrl =
    "https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=ed93f3e229380c530b7a0e7663f86b99";

  async showMarquee() {
    const data = await this.fetchMarquee();
    this.createElements(data);
    this.createMarqueeEvent();
  }
  async fetchMarquee() {
    let result = await fetch(this.MarqueeUrl);
    let resultJson = await result.json();
    return resultJson;
  }

  createElements(data) {
    const marqueeHeader = document.createElement("div");
    const marqueeLine = document.createElement("div");
    data.map((element) => {
      const marqueeCell = document.createElement("div");
      marqueeLine.appendChild(marqueeCell);
      giveAttributes(marqueeCell, "marqueeCell");
      const rightCell = document.createElement("div");
      const leftCell = document.createElement("div");
      marqueeCell.appendChild(rightCell);
      marqueeCell.appendChild(leftCell);
      giveAttributes(rightCell, "rightCell", "rightCell", element.symbol);
      giveAttributes(leftCell, "leftCell", "leftCell", `${element.price}$`);
    });

    this.div.appendChild(marqueeHeader);
    marqueeHeader.appendChild(marqueeLine);
    marqueeHeader.id = "marqueeHeader";
    marqueeLine.id = "marqueeLine";
  }

  createMarqueeEvent = () => {
    document
      .getElementById("rightCell")
      .addEventListener("click", this.showCompany);
  };

  showCompany = (e) => {
    console.log("e.target :>> ", e.target);
    console.log("e.target.value :>> ", e.target.value);
  };
}
