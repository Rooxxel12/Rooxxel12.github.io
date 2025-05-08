/* js/script.js */

const cart = [];
const coloniaDistancias = {
  "Las Américas": 15,
  "Chapultepec Centro": 20,
  "Fraccionamiento Sta. Teresa": 20,
  "San Isidro": 15,
  "El campesino": 15,
  "La ampliación": 20,
  "Los carriles": 25
};

const addToCart = (nombre, precio) => {
  cart.push({ nombre, precio });
  renderCart();
};

const renderCart = () => {
  const list = document.getElementById("cart-list");
  list.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    list.appendChild(li);
  });
  actualizarTotal();
};

const actualizarTotal = () => {
  const totalBase = cart.reduce((sum, item) => sum + item.precio, 0);
  const colonia = document.getElementById("colonia").value;
  let envio = 0;
  if (coloniaDistancias[colonia]) {
    envio = coloniaDistancias[colonia];
    document.getElementById("envio").textContent = `✉️ Envío: $${envio} MXN (${colonia})`;
  } else {
    document.getElementById("envio").textContent = `✉️ Envío: $0 MXN`;
  }
  const total = totalBase + envio;
  document.getElementById("total").textContent = `= Total: $${total} MXN`;
};

const finalizarPedido = () => {
  const colonia = document.getElementById("colonia").value;
  const detalles = document.getElementById("detalles").value.trim();
  const metodo = document.getElementById("pago").value;

  if (cart.length === 0 || !colonia || !coloniaDistancias[colonia]) {
    alert("Completa tu carrito y selecciona una colonia válida.");
    return;
  }

  const envio = coloniaDistancias[colonia];
  const total = cart.reduce((s, i) => s + i.precio, 0) + envio;
  const codigo = Math.floor(Math.random() * 100000);

  const resumen = cart.map(i => `${i.nombre} - $${i.precio}`).join("\n");
  const mensaje = `Pedido #${codigo}
${resumen}
Pago: ${metodo}
Envío: $${envio} MXN
Total: $${total} MXN\nDirección: ${colonia}, ${detalles}`;

  const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};

// Mostrar automáticamente el costo de envío al cargar y cambiar colonia
window.onload = () => actualizarTotal();
document.getElementById("colonia").addEventListener("change", actualizarTotal);
