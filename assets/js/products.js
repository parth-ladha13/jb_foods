// J.B. Foods — product catalogue rendering, search & filter

(function () {
  "use strict";

  var DATA_URL = "assets/data/products.json";
  var allProducts = [];

  function badgeClass(category) {
    return category === "Cereals" ? "badge cereal" : "badge";
  }

  function productCard(p) {
    return (
      '<div class="col-sm-6 col-lg-4 product-item" data-name="' + p.name.toLowerCase() +
      '" data-category="' + p.category + '">' +
        '<div class="card product-card h-100 shadow-sm">' +
          '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
          '<div class="card-body d-flex flex-column">' +
            '<span class="' + badgeClass(p.category) + ' mb-2 align-self-start">' + p.category + '</span>' +
            '<h5 class="card-title mb-1">' + p.name + '</h5>' +
            '<p class="text-muted-soft small mb-3">' + p.tagline + '</p>' +
            '<button type="button" class="btn btn-outline-primary btn-sm mt-auto" ' +
              'data-bs-toggle="modal" data-bs-target="#productModal" data-product-id="' + p.id + '">' +
              'View Details' +
            '</button>' +
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

  function applyFilters() {
    var searchInput = document.getElementById("productSearch");
    var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    var activeChip = document.querySelector(".filter-chip.active");
    var category = activeChip ? activeChip.getAttribute("data-filter") : "All";

    var filtered = allProducts.filter(function (p) {
      var matchesCategory = category === "All" || p.category === category;
      var matchesSearch = !query || p.name.toLowerCase().indexOf(query) !== -1 ||
        p.tagline.toLowerCase().indexOf(query) !== -1;
      return matchesCategory && matchesSearch;
    });

    renderProducts(filtered, "productGrid");
    var countEl = document.getElementById("productCount");
    if (countEl) {
      countEl.textContent = filtered.length + (filtered.length === 1 ? " product" : " products");
    }
  }

  function wireFilterControls() {
    var searchInput = document.getElementById("productSearch");
    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }
    document.querySelectorAll(".filter-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".filter-chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        applyFilters();
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
        var toRender = limit ? data.slice(0, limit) : data;
        renderProducts(toRender, containerId);
        wireFilterControls();
        wireProductModal();
        var countEl = document.getElementById("productCount");
        if (countEl) {
          countEl.textContent = data.length + " products";
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
