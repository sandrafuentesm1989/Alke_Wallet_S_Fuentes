
// Iniciar valores    
//__________________________
if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "0");
}

if (!localStorage.getItem("movimientos")) {
    localStorage.setItem("movimientos", JSON.stringify([]));
}

if (!localStorage.getItem("contactos")) {
    localStorage.setItem("contactos", JSON.stringify([]));
}


// Función: obtener saldo
//_______________________
function getSaldo() {
    return Number(localStorage.getItem("saldo"));
}


// Función actualizar saldo
// _________________________
function setSaldo(nuevoSaldo) {
    localStorage.setItem("saldo", nuevoSaldo);
}


// Función registrar movimiento
// _____________________________
function agregarMovimiento(tipo, monto, detalle = "") {
    let movimientos = JSON.parse(localStorage.getItem("movimientos"));

    movimientos.unshift({
        tipo: tipo,
        monto: monto,
        detalle: detalle,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}


// Función agregar contacto
//___________________________
function agregarContacto(nombre, email) {
    let contactos = JSON.parse(localStorage.getItem("contactos"));

    contactos.push({ nombre, email });
    localStorage.setItem("contactos", JSON.stringify(contactos));
}


// Función buscar contacto
//__________________________
function buscarContactos(filtro) {
    let contactos = JSON.parse(localStorage.getItem("contactos"));
    return contactos.filter(c => c.nombre.toLowerCase().includes(filtro.toLowerCase()));
}


// DEPÓSITO
// _____________________________
function depositar() {
    let monto = Number(document.getElementById("montoDeposito").value);

    if (monto <= 0) {
        alert("Ingresa un monto válido");
        return;
    }

    let saldo = getSaldo() + monto;
    setSaldo(saldo);

    agregarMovimiento("Depósito", monto);

    alert("Depósito realizado");
    window.location.href = "menu.html";
}


// ENVÍO DE DINERO
// _______________________-
function enviar() {
    let destino = document.getElementById("busqueda").value;
    let monto = Number(document.getElementById("montoEnviar").value);

    if (!destino || monto <= 0) {
        alert("Completa todos los campos correctamente.");
        return;
    }

    let saldo = getSaldo();

    if (saldo < monto) {
        alert("Saldo insuficiente");
        return;
    }

    setSaldo(saldo - monto);
    agregarMovimiento("Envío", -monto, destino);

    alert("Dinero enviado correctamente");
    window.location.href = "menu.html";
}

//MOSTRAR MOVIMIENTOS
//___________________________
function cargarMovimientos() {
    let movs = JSON.parse(localStorage.getItem("movimientos")) || [];

    let lista = document.getElementById("listaMovimientos");
    lista.innerHTML = ""; // limpiar

    if (movs.length === 0) {
        lista.innerHTML = "<li class='list-group-item'>No hay movimientos</li>";
        return;
    }

    movs.forEach(m => {
        let li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
            <strong>${m.tipo}</strong>: $${m.monto} <br>
            <small>${m.detalle ? m.detalle : ""}</small><br>
            <small>${m.fecha}</small>
        `;

        lista.appendChild(li);
    });
}
