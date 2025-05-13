// Array para almacenar los productos en el carrito
let carrito = [];

// Función para cambiar la variante del producto
function cambiarVariante(select) {
  const selectedOption = select.options[select.selectedIndex];
  const precio = selectedOption.getAttribute('data-precio');
  const img = selectedOption.getAttribute('data-img');
  
  const contenedor = select.closest('.item');
  contenedor.querySelector('.precio').textContent = `Precio: $${precio}`;
  contenedor.querySelector('img').src = img;
}

const carrito = [];
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");

function agregarAlCarrito(boton) {
  const item = boton.closest(".item");
  const nombre = item.querySelector("h3").textContent;
  const select = item.querySelector("select");
  const opcion = select.options[select.selectedIndex];
  const precio = parseInt(opcion.getAttribute("data-precio"));
  const variante = opcion.textContent;

  const producto = { nombre, variante, precio };

  carrito.push(producto);
  actualizarCarrito();
}
function agregarAlCarritoManual(nombre, precio) {
  carrito.push({ producto: nombre, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;
    const li = document.createElement("li");
    li.innerHTML = `${producto.nombre} (${producto.variante}) - $${producto.precio} 
    <button onclick="eliminarProducto(${index})">Eliminar</button>`;
    listaCarrito.appendChild(li);
  });

  // Sumar envío si ya hay una colonia seleccionada
  const envio = parseInt(document.getElementById("colonia").value) || 0;
  totalSpan.textContent = total + envio;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarEnvio() {
  actualizarCarrito();
}

function enviarPedido() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const direccion = document.getElementById("direccion").value.trim();
  const metodoPago = document.getElementById("metodoPago").value;
  const coloniaSelect = document.getElementById("colonia");
  const costoEnvio = parseInt(coloniaSelect.value);
  const nombreColonia = coloniaSelect.options[coloniaSelect.selectedIndex].text;

  if (!direccion || coloniaSelect.value === "0") {
    alert("Por favor, completa todos los datos.");
    return;
  }

  let mensaje = "🛒 *Pedido Gya Comer*%0A";

  carrito.forEach((producto) => {
    mensaje += `• ${producto.nombre} (${producto.variante}) - $${producto.precio}%0A`;
  });

  const total = carrito.reduce((acc, p) => acc + p.precio, 0) + costoEnvio;

  mensaje += `%0A📦 *Envío:* ${nombreColonia}`;
  mensaje += `%0A📍 *Dirección:* ${direccion}`;
  mensaje += `%0A💳 *Pago:* ${metodoPago}`;
  mensaje += `%0A💰 *Total:* $${total}`;
  mensaje += `%0A%0A¡Gracias por tu compra! 🎉`;

  const numeroWhatsApp = "527291299844"; // Reemplaza con tu número
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(url, "_blank");
}
