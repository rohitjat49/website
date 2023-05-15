let names = [
    "book",
    "laptop",
    "pen",
    "Mobile",
    "watch",
    "camera",
    "Iphone",
    "Ipad",
    "Imac",
  ];
  
  let sorteNames = names.sort();
  
  let input = document.getElementById("input");
  
  const wrapper = document.querySelector(".wrapper"),
    selectBtn = document.querySelector(".select-btn"),
    searchInp = document.querySelector(".input-country"),
    options = wrapper.querySelector(".options");
  
  let countries = [
    "India",
    "Russia",
    "Japan",
    "South Africa",
    "Australia",
    "Bangladesh",
    "Bhutan",
    "France",
    "Thailand",
    "Turkey",
  ];
  
  function addCountry(selectedCountry) {
      options.innerHTML = "";
      countries.forEach(country => {
          let isSelected = country == selectedCountry ? "selected" : "";
       let li = `<li onclick="updateName(this)" class="${isSelected}">${country} </li>`;
       options.insertAdjacentHTML("beforeend", li);
      })
  }
  addCountry()
  
  
  
  
  input.addEventListener("keyup", (e) => {
    removeEvents();
    for (let i of sorteNames) {
      if (
        i.toLocaleLowerCase().startsWith(input.value.toLowerCase()) &&
        input.value != ""
      ) {
        let listItem = document.createElement("li");
        listItem.classList.add("list-items");
        listItem.style.cursor = "pointer";
        listItem.setAttribute("onclick", "displayName('" + i + "')");
        // let word = "<b>" + i.substr(0, input.value.length) + "</b>";
        // word += i.substr(input.value.length);
        let word = "<b>" + i.substr(0, input.value.length) + "</b>";
        word += i.substr(input.value.length);
  
        listItem.innerHTML = word;
        document.querySelector(".list").appendChild(listItem);
      }
    }
  });
  
  function displayName(value) {
    input.value = value;
    removeEvents();
  }
  
  function removeEvents() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
      item.remove();
    });
  }
  
  function updateName(selectedLi) {
      searchInp.value = "";
      addCountry(selectedLi.innerText);
      wrapper.classList.remove("active");
      selectBtn.firstElementChild.innerText = selectedLi.innerText;
  }
  
  
  searchInp.addEventListener("keyup", () => {
      let arr=[];
      let searchedVal = searchInp.value;
      arr = countries.filter(data => {
          return data.toLowerCase().startsWith(searchedVal);
      }).map(data => `<li onclick="updateName(this)">${data}</li>`).join("")
      options.innerHTML = arr ? arr : `<p> Country not found</p>`;
  
  })
  
  selectBtn.addEventListener("click", () => {
      wrapper.classList.toggle("active");
    });