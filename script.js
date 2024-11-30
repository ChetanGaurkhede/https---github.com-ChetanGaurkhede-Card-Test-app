document.addEventListener('DOMContentLoaded', function () {
  const options = document.querySelectorAll('.option');
  const totalElement = document.querySelector('.total');
  const variantSelectors = document.querySelectorAll('.variant-selectors');

  // Prices configuration
  const prices = {
    1: 10.00,
    2: 18.00,
    3: 24.00
  };

  // Initialize selected option
  updateSelectedOption(document.querySelector('input[name="unit-selection"]:checked'));

  // Click handlers to select options
  options.forEach(option => {
    const radio = option.querySelector('input[type="radio"]');
    option.addEventListener('click', () => {
      radio.checked = true;
      updateSelectedOption(radio);
    });
  });

  // Update function for option selection
  function updateSelectedOption(selectedRadio) {
    options.forEach(opt => opt.classList.remove('selected'));
    selectedRadio.closest('.option').classList.add('selected');

    const units = selectedRadio.value;
    totalElement.textContent = `Total: $${prices[units].toFixed(2)} USD`;

    // Toggle visibility of variant selectors
    variantSelectors.forEach(selector => {
      const parentOption = selector.closest('.option');
      selector.style.display = parentOption.contains(selectedRadio) ? 'grid' : 'none';
    });
  }

  // Add to cart logic
  document.querySelector('.add-to-cart').addEventListener('click', function () {
    const selectedRadio = document.querySelector('input[name="unit-selection"]:checked');
    const units = selectedRadio.value;
    const variantGroups = selectedRadio.closest('.option').querySelectorAll('.variant-group');

    const variants = Array.from(variantGroups).map(group => ({
      label: group.querySelector('label').innerText,
      value: group.querySelector('select').value
    }));

    let message = `Added ${units} unit(s) to cart!\n`;
    message += variants.length ? 'Selected Variants:\n' + variants.map(v => `${v.label}: ${v.value}`).join('\n') : '';

    alert(message);
  });

  // Prevent default form submission
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Form submitted!");
  });
});
