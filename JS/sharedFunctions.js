export function toggleView(element, order) {
  if (order === "show") {
    element.classList.add("show");
    element.classList.remove("hide");
  } else if (order === "hide") {
    element.classList.add("hide");
    element.classList.remove("show");
  }
}

export const fetchCompanyInfo = async (symbol) => {
  const baseUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
  const response = await fetch(baseUrl);
  const responseJson = await response.json();
  let data = responseJson.profile;
  return data;
};

export const checkPriceChange = (number, element) => {
  if (number > 0) {
    element.classList.add("positive");
  } else if (number < 0) {
    element.classList.add("negative");
  } else {
    element.innerHTML = "";
  }
};
