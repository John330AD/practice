document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('submitBtn');
  
    if (btn) {
      btn.addEventListener('click', processFruits);
    } else {
      console.error('Button not found');
    }
  });
  
  function processFruits() {
    var fruit1 = document.getElementById('fruit1').value;
    var quantity1 = document.getElementById('quantity1').value;
    var fruit2 = document.getElementById('fruit2').value;
    var quantity2 = document.getElementById('quantity2').value;
    var fruit3 = document.getElementById('fruit3').value;
    var quantity3 = document.getElementById('quantity3').value;
  
    document.getElementById('output').innerHTML = `
      <p>Fruit 1: ${fruit1} with quantity ${quantity1}</p>
      <p>Fruit 2: ${fruit2} with quantity ${quantity2}</p>
      <p>Fruit 3: ${fruit3} with quantity ${quantity3}</p>
    `;
  }
