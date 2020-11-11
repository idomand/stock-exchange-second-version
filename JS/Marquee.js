export default class Marquee {
  constructor(div) {
    this.div = document.getElementById(div);
    this.showMarquee();
  }

  url =
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=50&";

  async fetchMarquee() {
    let result = await fetch(this.url);
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
      marqueeCell.setAttribute("id", "marqueeCell");
      const rightCell = document.createElement("div");
      const leftCell = document.createElement("div");
      rightCell.setAttribute("class", "rightCell");
      leftCell.setAttribute("class", "leftCell");
      marqueeCell.appendChild(rightCell);
      marqueeCell.appendChild(leftCell);
      rightCell.innerHTML = element.symbol;
      leftCell.innerHTML = `${element.price}$`;
    });

    this.div.appendChild(marqueeHeader);
    marqueeHeader.appendChild(marqueeLine);
    marqueeHeader.setAttribute("id", "marqueeHeader");
    marqueeLine.setAttribute("id", "marqueeLine");
  }
}
