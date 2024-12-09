function processFruits() {
    const fruit1 = document.getElementById("fruit1").value;
    const quantity1 = parseInt(document.getElementById("quantity1").value) || 0;
  
    const fruit2 = document.getElementById("fruit2").value;
    const quantity2 = parseInt(document.getElementById("quantity2").value) || 0;
  
    const fruit3 = document.getElementById("fruit3").value;
    const quantity3 = parseInt(document.getElementById("quantity3").value) || 0;
  
    const totalFruits = quantity1 + quantity2 + quantity3;
  
    document.getElementById("output").innerHTML = `
      <p>You selected:</p>
      <ul>
        <li>${fruit1}: ${quantity1}</li>
        <li>${fruit2}: ${quantity2}</li>
        <li>${fruit3}: ${quantity3}</li>
      </ul>
      <p>Total Quantity: ${totalFruits}</p>
    `;
  }
  