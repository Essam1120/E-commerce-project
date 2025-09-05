document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.querySelector(".filter-btn");        
  const filterList = document.querySelector(".filter-list");      
  const collapseFilter = document.querySelector(".collapse-filter"); 

  if (filterBtn && filterList) {
    filterBtn.addEventListener("click", () => {
      filterList.classList.toggle("open");
    });
  }

  if (collapseFilter && filterList) {
    collapseFilter.addEventListener("click", () => {
      filterList.classList.remove("open");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const categoryInputs = document.querySelectorAll(".filter-group input[type='checkbox'][id^='cat']");
  const sizeInputs = document.querySelectorAll(".filter-group.size input[type='checkbox']");
  const priceInputs = document.querySelectorAll(".from-to-price input");
  const applyBtn = document.querySelector(".apply-filter button");

  if (applyBtn) {
    applyBtn.addEventListener("click", applyFilters);
  }

  // live filters
  categoryInputs.forEach(input => input.addEventListener("change", applyFilters));
  sizeInputs.forEach(input => input.addEventListener("change", applyFilters));
  priceInputs.forEach(input => input.addEventListener("input", applyFilters));

  function applyFilters() {
    let filtered = [...products]; 

    // Category
    const selectedCategories = Array.from(categoryInputs)
      .filter(input => input.checked)
      .map(input => input.value.toLowerCase());

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p =>
        selectedCategories.includes(p.category.toLowerCase())
      );
    }

    // Size
    const selectedSizes = Array.from(sizeInputs)
      .filter(input => input.checked)
      .map(input => input.value.toLowerCase());

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => {
        if (p.sizes) {
          return p.sizes.some(size =>
            selectedSizes.includes(size.toLowerCase())
          );
        }
        return true;
      });
    }

    // Price
    const minPrice = parseFloat(priceInputs[0].value) || 0;
    const maxPrice = parseFloat(priceInputs[1].value) || Infinity;
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

    displayProducts(filtered);
  }
});