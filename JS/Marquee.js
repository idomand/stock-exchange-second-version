import { giveAttributes } from "./sharedFunctions.js";

export default class Marquee {
  constructor(div) {
    this.div = document.getElementById(div);
    this.showMarquee();
  }

  MarqueeUrl =
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=50&";

  async fetchMarquee() {
    let result = await fetch(this.MarqueeUrl);
    let resultJson = await result.json();
    return resultJson;
  }

  async showMarquee() {
    const data = await this.fetchMarquee();
    this.createElements(data);
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
      giveAttributes(rightCell, "rightCell", "rightCell", element.symbol, 0);
      giveAttributes(leftCell, "leftCell", "leftCell", `${element.price}$`, 0);
    });

    this.div.appendChild(marqueeHeader);
    marqueeHeader.appendChild(marqueeLine);
    marqueeHeader.id = "marqueeHeader";
    marqueeLine.id = "marqueeLine";
  }
}
