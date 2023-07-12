//recupero il container delle celle
const containerSquare = document.querySelector(".container");

//recupero l'input e il button
const inputEl = document.querySelector(".input-select");
const playBtn = document.querySelector(".btn-play");


playBtn.addEventListener("click", function () {
    //numero delle celle che compongono la griglia (input select)
    let inputNum = parseInt(inputEl.value);

    //console.log(inputNum);

    //array contenente le celle
    let gridArr = createGrid(inputNum);

    printing(containerSquare, gridArr);

    //array contenente la posizione delle bombe nella griglia
    let listBomb = generateBombs(inputNum);
    console.log(listBomb);
})


//funzione che crea la griglia di gioco a partire dalle singole celle
//sotto forma di array --> ritorna un array di htmlDivElement
function createGrid(numberCells) {
    //array vuoto che andrà a contenere i vari div creati
    let gridList = [];

    //calcolo il numero di celle in una riga
    let cellsPerRow = Math.sqrt(numberCells);

    //ciclo per numero totale delle celle
    for (let i = 1; i <= numberCells; i++) {
        //creo cella
        let cell = document.createElement("div");
        cell.innerHTML = `<span class="number">${i}</span>`
        cell.classList.add("square"); //aggiungo classe per visualizzazione
        //calcolo dinamicamente la larghezza di ogni cella a partire dal numero per riga
        cell.style.flexBasis = `calc(100% / ${cellsPerRow})`;

        gridList.push(cell);
    }
    return gridList;
}


//funzione che stamperà la griglia nel Dom e che crea per ogni cella
//l'ascoltatore di evento
function printing(container, list) {
    //svuoto il container per evitare celle in eccesso
    container.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        container.append(list[i]);

        //dopo aver appeso il div applico un ascoltatore per ogni 
        //elemento per ogni giro del ciclo --> ogni el avrà la sua
        //funzione anonima che viene eseguita solo al click sull'elemento stesso
        list[i].addEventListener("click", function () {
            list[i].classList.toggle("success");
            console.log(`Hai cliccato la cella ${i + 1}`);
        })
    }
}

//funzione che crea un array delle 'bombe' di 16 numeri casuali nel
//range della difficoltà scelta
function generateBombs(number) {
    let bombArr = [];

    let n = 1; //contatore
    while (n <= 16) {
        //genero numero
        let num = Math.floor(Math.random() * number) + 1;
        let index = bombArr.indexOf(num); //se -1 elemento non presente
        if (index === -1) { //se elemento non duplicato
            bombArr.push(num);
            n++;
        }
    }
    return bombArr;
}