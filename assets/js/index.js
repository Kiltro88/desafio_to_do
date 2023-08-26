let tareasJSON = [
  {
    id: 1,
    descripcion_tarea: "tarea1",
    estado: 0,
  },
  {
    id: 2,
    descripcion_tarea: "tarea2",
    estado: 0,
  },
  {
    id: 3,
    descripcion_tarea: "tarea3",
    estado: 0,
  },
];
let tareaId = tareasJSON.length;
const button = document.getElementById("btnAgregarTarea");
button.addEventListener("click", agregarTarea);

function agregarTarea() {
  let tareaIngresada = document.getElementById("tareaIngresada");
  if (tareaIngresada.value === "") {
    alert("La tarea debe incluir una descripcion");
    return;
  }
  tareaId = tareaId + 1;
  const objetoTarea = {
    id: tareaId,
    descripcion_tarea: tareaIngresada.value,
    estado: 0,
  };
  tareasJSON.push(objetoTarea);
  pintarTareas(tareasJSON, tareasJSON.length - 1);
  actualizarTotales();
}

function pintarTareas(array, startIndex = 0) {
  const tareasContainer = document.getElementById("tareasContainer");

  array.slice(startIndex).forEach((tareaGuardada) => {
    const tarea = document.createElement("div");
    tarea.className = "row";
    tarea.id = tareaGuardada.id;

    const innerHTML = `
            <div class="col">${tareaGuardada.id}</div>
            <div class="col">${tareaGuardada.descripcion_tarea}</div>
            <div class="col">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" onclick="actualizarEstado(${tareaGuardada.id})">
              </div>
            </div>
            <div class="col">
              <button class="btn btn-danger btn-sm" type="button" onclick="borrar(${tareaGuardada.id})">X</button>
            </div>
        `;

    tarea.innerHTML = innerHTML;
    tareasContainer.appendChild(tarea);
  });
}

function borrar(id) {
  const index = tareasJSON.find((t) => t.id == id);
  tareasJSON.splice(index, 1);
  actualizarTotales();
  document.getElementById(id).remove();
}

function actualizarEstado(id) {
  const tareaGuardada = tareasJSON.find((t) => t.id === id);
  if (tareaGuardada.estado === 0) {
    tareaGuardada.estado = 1;
  } else {
    tareaGuardada.estado = 0;
  }

  const tarea = document.getElementById(id);
  if (tareaGuardada.estado === 1) {
    tarea.style.fontWeight = "bold";
    tarea.style.color = "green";
  } else {
    tarea.style.fontWeight = "normal";
    tarea.style.color = "black";
  }
  
  actualizarTotales();
}

function actualizarTotales() {
  const totalElement = document.getElementById("total");
  const realizadasElement = document.getElementById("realizadas");

  const total = tareasJSON.length;
  const realizadas = tareasJSON.filter((tarea) => tarea.estado === 1).length;

  totalElement.textContent = `Total: ${total}`;
  realizadasElement.textContent = `Realizadas: ${realizadas}`;
}

pintarTareas(tareasJSON);
actualizarTotales();
