let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/RVCAK64Q7/'; // URL del modelo de Teachable Machine
let fileInput;
let img;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); // Carga el modelo antes de que se cargue la página
}

function setup() {
  createCanvas(320, 260); // Crea un canvas de 320x260 píxeles
  fileInput = createFileInput(handleFile); // Crea un botón para seleccionar un archivo
  fileInput.position(0, height + 10); // Posiciona el botón debajo del canvas
}

function handleFile(file) {
  if (file.type === 'image') { // Verifica que el archivo seleccionado sea una imagen
    img = createImg(file.data, ''); // Carga la imagen usando p5.js
    img.hide(); // Oculta la imagen original
    classifyImage(); // Clasifica la imagen
  } else {
    alert('Por favor, seleccione un archivo de imagen válido.'); // Muestra un mensaje de error si el archivo seleccionado no es una imagen
  }
}

function classifyImage() {
  classifier.classify(img, gotResult); // Clasifica la imagen usando el modelo de Teachable Machine
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label; // Obtiene la etiqueta clasificada
}

function draw() {
  background(0); // Establece el fondo negro
  if (img) {
    image(img, 0, 0, width, height); // Muestra la imagen cargada
  }
  fill(255); // Establece el color de relleno blanco
  textSize(16); // Establece el tamaño de la fuente
  text(label, 10, height - 10); // Muestra la etiqueta clasificada en la página
}