// J.B. Foods — shared site behaviour

(function () {
  "use strict";

  // Highlight the active nav link based on current page
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav .nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Collapse mobile navbar after a link is clicked
  var navCollapse = document.getElementById("mainNav");
  if (navCollapse) {
    document.querySelectorAll("#mainNav .nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse && navCollapse.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Bootstrap client-side form validation
  document.querySelectorAll("form.needs-validation").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  });

  // Footer year
  var yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Hero slideshow — auto-rotating product photos
  var heroSlides = document.querySelectorAll("#heroSlides .hero-slide");
  if (heroSlides.length > 1) {
    var activeIndex = 0;
    setInterval(function () {
      heroSlides[activeIndex].classList.remove("active");
      activeIndex = (activeIndex + 1) % heroSlides.length;
      heroSlides[activeIndex].classList.add("active");
    }, 4000);
  }
})();
