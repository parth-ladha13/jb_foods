// J.B. Foods — product catalogue rendering, search & filter

(function () {
  "use strict";

  var DATA_URL = "assets/data/products.json";
  var allProducts = [];

  function badgeClass(category) {
    return category === "Pulses" ? "badge pulse" : "badge";
  }

  function featurePills(features) {
    if (!features || !features.length) return "";
    return '<div class="d-flex flex-wrap gap-2 mb-3">' +
      features.map(function (f) {
        return '<span class="feature-pill"><i class="bi bi-check-circle-fill"></i>' + f + '</span>';
      }).join("") +
      '</div>';
  }

  function productCard(p) {
    return (
      '<div class="col-12 product-item" data-name="' + p.name.toLowerCase() +
      '" data-category="' + p.category + '">' +
        '<div class="card product-card-h">' +
          '<div class="row g-0 align-items-start">' +
            '<div class="col-12 col-md-4">' +
              '<img src="' + p.image + '" alt="' + p.name + '" class="product-card-h-img" loading="lazy">' +
            '</div>' +
            '<div class="col-12 col-md-8">' +
              '<div class="card-body d-flex flex-column">' +
                '<div class="d-flex align-items-start justify-content-between gap-2 mb-1">' +
                  '<h5 class="card-title mb-0">' + p.name + '</h5>' +
                  '<span class="' + badgeClass(p.category) + '">' + p.category + '</span>' +
                '</div>' +
                '<p class="product-scientific mb-2">' + p.scientificName + '</p>' +
                '<p class="text-muted-soft small mb-3">' + p.description + '</p>' +
                featurePills(p.features) +
                '<button type="button" class="btn btn-outline-primary btn-sm mt-2 align-self-start" ' +
                  'data-bs-toggle="modal" data-bs-target="#productModal" data-product-id="' + p.id + '">' +
                  'View Details' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderProducts(list, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (!list.length) {
      container.innerHTML = '<div class="col-12 text-center py-5 text-muted-soft">' +
        '<i class="bi bi-search fs-1 d-block mb-2"></i>No products match your search.</div>';
      return;
    }
    container.innerHTML = list.map(productCard).join("");
  }

  function applyFilters(containerId) {
    var searchInput = document.getElementById("productSearch");
    var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    var activeChip = document.querySelector(".filter-chip.active");
    var category = activeChip ? activeChip.getAttribute("data-filter") : "All";

    var filtered = allProducts.filter(function (p) {
      var matchesCategory = category === "All" || p.category === category;
      var matchesSearch = !query || p.name.toLowerCase().indexOf(query) !== -1 ||
        p.description.toLowerCase().indexOf(query) !== -1 ||
        p.scientificName.toLowerCase().indexOf(query) !== -1;
      return matchesCategory && matchesSearch;
    });

    renderProducts(filtered, containerId);
    var countEl = document.getElementById("productCount");
    if (countEl) {
      countEl.textContent = filtered.length + (filtered.length === 1 ? " product" : " products");
    }
  }

  function wireFilterControls(containerId) {
    var searchInput = document.getElementById("productSearch");
    if (searchInput) {
      searchInput.addEventListener("input", function () { applyFilters(containerId); });
    }
    document.querySelectorAll(".filter-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".filter-chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        applyFilters(containerId);
      });
    });
  }

  function wireProductModal() {
    var modalEl = document.getElementById("productModal");
    if (!modalEl) return;
    modalEl.addEventListener("show.bs.modal", function (event) {
      var button = event.relatedTarget;
      var id = button.getAttribute("data-product-id");
      var product = allProducts.find(function (p) { return p.id === id; });
      if (!product) return;

      modalEl.querySelector(".modal-title").textContent = product.name;
      modalEl.querySelector(".modal-product-image").src = product.image;
      modalEl.querySelector(".modal-product-image").alt = product.name;
      modalEl.querySelector(".modal-product-scientific").textContent = product.scientificName;
      modalEl.querySelector(".modal-product-desc").textContent = product.description;
      modalEl.querySelector(".modal-product-packaging").textContent = product.packaging;
      modalEl.querySelector(".modal-product-origin").textContent = product.origin;

      var specsBody = modalEl.querySelector(".modal-product-specs");
      specsBody.innerHTML = Object.keys(product.specs).map(function (key) {
        return "<tr><th class=\"text-muted-soft fw-normal\">" + key + "</th><td class=\"fw-medium\">" + product.specs[key] + "</td></tr>";
      }).join("");

      var enquireBtn = modalEl.querySelector(".modal-enquire-btn");
      if (enquireBtn) {
        enquireBtn.href = "contact.html?product=" + encodeURIComponent(product.name);
      }
    });
  }

  function loadProducts(containerId, limit) {
    fetch(DATA_URL)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        allProducts = data;
        wireProductModal();

        if (limit) {
          // Featured section (e.g. homepage) — no search/filter UI to respect
          renderProducts(data.slice(0, limit), containerId);
        } else {
          // Full catalogue page — wire search + category filters
          wireFilterControls(containerId);
          applyFilters(containerId);
        }
      })
      .catch(function (err) {
        console.error("Could not load product catalogue:", err);
        var container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = '<div class="col-12 text-center py-5 text-muted-soft">Unable to load products right now.</div>';
        }
      });
  }

  window.JBProducts = { load: loadProducts };
})();
