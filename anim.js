// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");
var lyrics2 = document.querySelector("#lyrics2");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos (Cantante principal)
var lyricsData = [
  { text: "You love enough, and you love to death", time: 13 },
  { text: "It is a razor blade, yeah", time: 15.6 },
  { text: "You love enough, and you run out of breath", time: 19 },
  { text: "You'll need a respirator", time: 21.5 },
  { text: "You love enough, and there'll be nothing that's left", time: 25.1 },
  { text: "You'll need a recreator", time: 27.4 },
  { text: "You love enough, and you'll just make a mess", time: 31 },
  { text: "You'll need a redecorator", time: 33.3 },
  
  { text: "Ah, oh-oh", time: 37.3 },
  
  { text: "You love enough, and you'll forget how to dress", time: 43.3 },
  { text: "You'll need a", time: 45.4},
  { text: "caretaker", time: 47.3 },
  { text: "You love enough, and you'll forget the rest", time: 49.5 },
  { text: "You'll need a", time: 51.3 },
  { text: "headshaker", time: 53.2 },
  { text: "You love enough, and you'll just get depressed", time: 55.1 },
  { text: "You'll need a", time: 57.7 },
  { text: "uplifter", time: 59 },
  { text: "You love enough, and you'll love to death", time: 61.2 },
  { text: "It is a real life taker", time: 63.5 },
  
  { text: "Na-na-na-na, na-na-na-na, na-na-na-na, na-na-na-na", time: 67.3 },
  { text: "Na-na-na-na, na-na-na-na, na-na-na-na-na", time: 71.4 },
  
  { text: "(Ah) Look at love, it will burn your eyes", time: 73.3 },
  { text: "(You) Kept shut, and you feel deprived", time: 75.7 },
  { text: "(Ah) You cut 'em out, and you got no eyes", time: 79.2 },
  { text: "(You) Your best bet is to stay inside and don't look around", time: 82 },
  
  //{ text: "You love enough, and you love to death, oh", time: 85.4 },
  { text: "You love enough, and you love to death, oh", time: 87.6 },
  { text: "You love enough, and you love to death, oh", time: 91.3},
  { text: "You love enough, and you'll just love to death, oh-oh-oh", time: 94 },
  { text: "(Oh-oh, oh-oh, oh)", time: 99 },
  
  //{ text: "Love enough, and you'll start to bleed", time: 150 },
  //{ text: "Love stains, and it don't come clean", time: 155 },
  { text: "Love enough, and you'll just start a scene", time: 109.2 },
  { text: "Love enough, and you come apart at the seam, -eam, oh", time: 112.4 },
  { text: "Oh (Oh) yeah", time: 120.6 },
  
  { text: "Na-na-na-na, na-na-na-na-na", time: 125 },
  
  { text: "(Ah) Look at love, it will burn your eyes", time: 127.1 },
  { text: "(You) Kept shut, and you feel deprived", time: 130.1 },
  { text: "(Ah-ah-ah) You cut 'em out, and you got no eyes", time: 133.1 },
  { text: "(You) Your best bet is to stay inside and don't look around, look around", time: 136.2 },
  
  { text: "You love enough, and you love to death, oh", time: 144 },
  { text: "You love enough, and you love to death, oh", time: 146.5 },
  { text: "You love enough, and you love to death, oh", time: 150.1 },
  { text: "You love enough, and you'll just love to death, oh-oh", time: 152.8 },
  
  { text: "Ooh-ooh-ooh, yeah, yeah, yeah", time: 156 },
  { text: "Ooh-ooh-ooh, yeah, yeah, oh (oh), oh-oh", time: 162.1 },
  { text: "Oh (oh), oh-oh", time: 168.3 },
  { text: "Oh-ooh-ooh-ooh, yeah, yeah, yeah", time: 172.4 },
  
  { text: "You love enough, and you'll love to death", time: 191.6 },
  { text: "It is a razor blade, yeah", time: 194 },
  { text: "You love enough, and you'll love to death", time: 197.6 },
  { text: "It is a real life taker", time: 200 },
];

// Array para el segundo cantante (ejemplo - agrega tus propios tiempos)
var lyricsData2 = [
  { text: "You love enough, and you love to death, oh", time: 85.4 },
  { text: "You love enough, and you love to death, oh", time: 87.6 },
  //{ text: "You love enough, and you love to death, oh", time: 91.3 },
  { text: "You love enough, and you'll just love to death, oh-oh-oh", time: 94 },
  //{ text: "(Oh-oh, oh-oh, oh)", time: 145 },

  { text: "Love enough, and you'll start to bleed", time: 103.2 },
  { text: "Love stains, and it don't come clean", time: 106.4 },
  { text: "Love enough, and you'll just start a scene", time: 109.2 },
  { text: "Love enough, and you come apart at the seam, -eam, oh", time: 112.4 },
  { text: "Oh (Oh) yeah", time: 120.6 },

];

// Función para animar las letras del primer cantante
function updateLyrics() {
  var time = audio.currentTime; // Usar tiempo decimal para mayor precisión
  
  // Encontrar la línea actual y la siguiente
  var currentLineIndex = -1;
  var nextLineTime = null;
  
  for (var i = 0; i < lyricsData.length; i++) {
    if (time >= lyricsData[i].time) {
      currentLineIndex = i;
    } else {
      nextLineTime = lyricsData[i].time;
      break;
    }
  }
  
  // Si hay una línea actual
  if (currentLineIndex >= 0) {
    var currentLine = lyricsData[currentLineIndex];
    var endTime;
    
    if (nextLineTime !== null) {
      // Terminar 0.1 segundos antes de la siguiente línea
      endTime = nextLineTime - 0.1;
    } else {
      // Si es la última línea, usar duración por defecto
      endTime = currentLine.time + 4;
    }
    
    // FUNCIÓN EXTRA: Limitar duración máxima a 7 segundos
    var maxEndTime = currentLine.time + 7;
    if (endTime > maxEndTime) {
      endTime = maxEndTime;
    }
    
    // Verificar si estamos en el rango de tiempo para mostrar esta línea
    if (time >= currentLine.time && time < endTime) {
      // Debug específico para el problema del tiempo 125
      if (currentLine.time === 125) {
        console.log("TIEMPO 125 - Mostrando hasta:", endTime, "Tiempo actual:", time.toFixed(2));
      }
      
      // Calcula la opacidad basada en el tiempo en la línea actual
      var fadeInDuration = 0.3;
      var timeSinceStart = time - currentLine.time;
      var opacity = Math.min(1, timeSinceStart / fadeInDuration);

      // Aplica el efecto de aparición
      lyrics.style.opacity = opacity;
      lyrics.innerHTML = currentLine.text;
    } else {
      // Ocultar si ya pasó el tiempo
      lyrics.style.opacity = 0;
      lyrics.innerHTML = "";
    }
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

// Función para animar las letras del segundo cantante
function updateLyrics2() {
  var time = audio.currentTime;
  
  // Encontrar la línea actual y la siguiente para el segundo cantante
  var currentLineIndex = -1;
  var nextLineTime = null;
  
  for (var i = 0; i < lyricsData2.length; i++) {
    if (time >= lyricsData2[i].time) {
      currentLineIndex = i;
    } else {
      nextLineTime = lyricsData2[i].time;
      break;
    }
  }
  
  // Si hay una línea actual
  if (currentLineIndex >= 0) {
    var currentLine = lyricsData2[currentLineIndex];
    var endTime;
    
    if (nextLineTime !== null) {
      endTime = nextLineTime - 0.1;
    } else {
      endTime = currentLine.time + 4;
    }
    
    // FUNCIÓN EXTRA: Limitar duración máxima a 7 segundos
    var maxEndTime = currentLine.time + 7;
    if (endTime > maxEndTime) {
      endTime = maxEndTime;
    }
    
    if (time >= currentLine.time && time < endTime) {
      console.log("Mostrando línea 2:", currentLine.text, "en tiempo:", currentLine.time);
      
      var fadeInDuration = 0.3;
      var timeSinceStart = time - currentLine.time;
      var opacity = Math.min(1, timeSinceStart / fadeInDuration);

      lyrics2.style.opacity = opacity;
      lyrics2.innerHTML = currentLine.text;
    } else {
      lyrics2.style.opacity = 0;
      lyrics2.innerHTML = "";
    }
  } else {
    lyrics2.style.opacity = 0;
    lyrics2.innerHTML = "";
  }
}

// Función combinada para actualizar ambas letras
function updateAllLyrics() {
  updateLyrics();
  updateLyrics2();
}

setInterval(updateAllLyrics, 100); // Actualizar cada 100ms para mayor precisión

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);