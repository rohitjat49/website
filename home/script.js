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

// navbar
$(function() {
    
  var body = $('body');
  var navbar = $('.navbar');
  var navbarCollapse = $('.navbar-collapse');



  // Add the needed HTML elements for the plugin to work. 
  // All the elements are styled in navbar-sidemnu.css.
  
  body.append('<div class="side-menu-overlay"></div>');
  var overlay = $('.side-menu-overlay');

  body.append('<div id="side-menu"></div>');
  var sideMenu = $('#side-menu');

  sideMenu.append('<button class="close"><span aria-hidden="true">×</span></button>')
  var sideMenuCloseBtn = sideMenu.find('.close');

  sideMenu.append('<div class="contents"></div>')
  var sideMenuContents = sideMenu.find('.contents');



  // Configure Slide menu direction
  if(navbar.hasClass('better-bootstrap-nav-left')) {
      sideMenu.addClass('side-menu-left');
  }


  // This event is trigerred when the user clicks the navbar toggle button.

  navbarCollapse.on('show.bs.collapse', function (e) {
      // Stop the default navbar behaviour (don't open the collapse navigation).
      e.preventDefault();

      // Instead we copy the navbar contents and add them to our side menu.
      var menuContent = $(this).html();    
      sideMenuContents.html(menuContent);
      
      // Animate the side menu into frame.
      slideIn();
  });


  // Hide the menu when the "x" button is clicked.
  
  sideMenuCloseBtn.on('click', function(e) {
      e.preventDefault();
      slideOut();
  });

  // Hide the menu when the overlay element is clicked.
  
  overlay.on('click', function(e) {
      slideOut();
  });

  // Listen for changes in the viewport size.
  // If the original navbar collapse is visible then the nav is expanded.
  // Hide/Show the menu accordingly.
  
  $(window).resize(function(){
      if(!navbarCollapse.is(":visible") && body.hasClass('side-menu-visible')) {
          sideMenu.show();
          overlay.show();
      }
      else {
          sideMenu.hide();
          overlay.hide();
      }
  });
  
  function slideIn() {
      body.addClass('overflow-hidden');
      sideMenu.show();
      setTimeout(function() {    
          body.addClass('side-menu-visible');
          overlay.fadeIn();
      }, 50);
  }
  
  function slideOut() {
      body.removeClass('side-menu-visible');
      overlay.fadeOut();
      setTimeout(function() {
          sideMenu.hide();
          body.removeClass('overflow-hidden');
      }, 400);
  }
});


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

