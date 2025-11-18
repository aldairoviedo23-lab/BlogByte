// Función para verificar palíndromo
function verificarPalindromo() {
  let texto = document.getElementById("palindromoInput").value.toLowerCase().replace(/[^a-záéíóú]/g, "").trim();
  let invertido = texto.split("").reverse().join("");
  let resultado = (texto === invertido) ?  `"${texto}" es un palíndromo ✅`: `"${texto}" No es un palíndromo ❌`;
  document.getElementById("palindromoResultado").innerText = resultado;
  palindromoInput.value = "";
}

// Función para comparar dos números
function compararNumeros() {
  let n1 = parseFloat(document.getElementById("num1").value);
  let n2 = parseFloat(document.getElementById("num2").value);
  let resultado = "";
  if (isNaN(n1) || isNaN(n2)) {
    resultado = "Por favor ingresa ambos números.";
  } else if (n1 === n2) {
    resultado = "Los números son iguales.";
  } else if (n1 > n2) {
    resultado = `El número ${n1} es mayor que ${n2}.`;
  } else {
    resultado = `El número ${n2} es mayor que ${n1}.`;
  }
  document.getElementById("numerosResultado").innerText = resultado;
  num1.value ="";
  num2.value ="";
}


// Función para analizar vocales en una frase
function analizarVocales() {
  let frase = document.getElementById("fraseInput").value.toLowerCase();
  let vocales = frase.match(/[aeiou]/g);
  if (!vocales) {
    document.getElementById("vocalesResultado").innerText = "No se encontraron vocales.";
    document.getElementById("conteoVocales").innerText = "";
    return;
  }
  document.getElementById("vocalesResultado").innerText = "Vocales encontradas: " + vocales.join(", ");

  // Conteo de cada vocal
  let conteo = { a:0, e:0, i:0, o:0, u:0 };
  vocales.forEach(v => {
    let base = v.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // quitamos los acentos
    if (conteo[base] !== undefined) conteo[base]++;
  });

  let textoConteo = "Conteo de vocales: ";
  for (let v in conteo) {
    textoConteo += `${v.toUpperCase()} = ${conteo[v]}  `;
  }
  document.getElementById("conteoVocales").innerText = textoConteo;
  fraseInput.value = "";
}


/*Peticiones AJAX*/
    // Al cargar la página, mostrar la URL actual
    window.onload = function() {
      document.getElementById("url").value = window.location.href;
    };

    document.getElementById("btnMostrar").addEventListener("click", function() {
      const url = document.getElementById("url").value;
      const consulta = new XMLHttpRequest();

      // Estado inicial
      document.getElementById("estado").textContent = "No iniciada";

      // Monitorear cambios de estado
      consulta.onreadystatechange = function() {
        let estadoTexto;
        switch (consulta.readyState) {
          case 0: estadoTexto = "No iniciada"; break;
          case 1: estadoTexto = "Cargando..."; break;
          case 2: estadoTexto = "Petición recibida"; break;
          case 3: estadoTexto = "Procesando..."; break;
          case 4: estadoTexto = "Completada"; break;
        }
        document.getElementById("estado").textContent = estadoTexto;

        // Cuando se completa la petición
        if (consulta.readyState === 4) {
          // Mostrar contenidos
          document.getElementById("contenidos").textContent = consulta.responseText;

          // Mostrar cabeceras
          document.getElementById("cabeceras").textContent = consulta.getAllResponseHeaders();

          // Mostrar código de estado
          document.getElementById("codigo").textContent = consulta.status + " " + consulta.statusText;
        }
      };

      // Abrir y enviar petición
      consulta.open("GET", url, true);
      consulta.send();
    });