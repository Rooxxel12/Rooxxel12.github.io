// Array para almacenar los productos en el carrito
let carrito = [];

// Elementos del DOM
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");

// Función para cambiar la variante del producto (imagen y precio)
function cambiarVariante(select) {
  const selectedOption = select.options[select.selectedIndex];
  const precio = selectedOption.getAttribute('data-precio');
  const img = selectedOption.getAttribute('data-img');

  const contenedor = select.closest('.item');
  contenedor.querySelector('.precio').textContent = `Precio: $${precio}`;
  contenedor.querySelector('img').src = img;
}

// Agregar producto desde un botón del DOM
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

// Agregar producto manualmente (sin variante)
function agregarAlCarritoManual(nombre, precio) {
  const producto = { nombre, variante: "Manual", precio };
  carrito.push(producto);
  actualizarCarrito();
}

// Actualizar el carrito y mostrar los productos
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre}${producto.variante ? " (" + producto.variante + ")" : ""} - $${producto.precio} 
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    listaCarrito.appendChild(li);
  });

  // Sumar envío si ya hay una colonia seleccionada
  const envioValue = document.getElementById("colonia").value;
  const envio = envioValue === "0" ? 0 : parseInt(envioValue);
  totalSpan.textContent = total + envio;
}

// Eliminar producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Cuando cambia la colonia, recalcula el total
function actualizarEnvio() {
  actualizarCarrito();
}

// Enviar pedido por WhatsApp
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
    mensaje += `• ${producto.nombre}${producto.variante ? " (" + producto.variante + ")" : ""} - $${producto.precio}%0A`;
  });

  const total = carrito.reduce((acc, p) => acc + p.precio, 0) + costoEnvio;

  mensaje += `%0A📦 *Envío:* ${nombreColonia}`;
  mensaje += `%0A📍 *Dirección:* ${direccion}`;
  mensaje += `%0A💳 *Pago:* ${metodoPago}`;
  mensaje += `%0A💰 *Total:* $${total}`;
  mensaje += `%0A%0A¡Gracias por tu compra! 🎉`;

  const numeroWhatsApp = "527291299844";
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(url, "_blank");
}
