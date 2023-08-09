//recupero il container delle celle
const containerSquare = document.querySelector(".container");

//recupero l'input e il button
const inputEl = document.querySelector(".input-select");
const playBtn = document.querySelector(".btn-play");

const messageEl = document.querySelector(".game-message");

const infoEl = document.querySelector(".game-info");


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

    //recupero tutte le celle dal dom aggiornate alle ultime op effettuate
    let nodeCellList = document.querySelectorAll(".square");
    
    //setto la posizione delle bombe nella griglia 
    bombPosition(listBomb, nodeCellList);

    //variabile che conterrà un array con il numero della cella
    //ogni volta cliccata dall'utente
    let score = [];

    let win = inputNum - listBomb.length; //punteggio per vincere

    //variabile globale che indica se è finita o meno la partita
    let finito = false;

    messageEl.innerHTML = "";
    infoEl.innerHTML = "";

    //sull'array di nodi ad ogni cella della griglia per ogni giro del ciclo
    //applico un ascoltatore con una funzione anonima che si attiva solo al click
    //sull'elemento stesso
    for (let j = 0; j < nodeCellList.length; j++) {
        let nodeSquare = nodeCellList[j];
        nodeSquare.addEventListener("click", function () {
            if (finito === true) {
                return;
            }
            //l'utente ha perso
            if (this.dataset.position === "bomb") {
                this.classList.add("failed");
                this.innerHTML = `<i class="fa-solid fa-bomb fa-2xl"></i>`;
                this.dataset.current = "cliccato";
                //se viene presa una bomba scopro tutte le celle contenenti le bombe nascoste
                for (let k = 0; k < nodeCellList.length; k++) {
                    let cella = nodeCellList[k];
                    if (cella.dataset.position === "bomb" && cella.dataset.current === undefined) {
                        cella.classList.add("failed");
                        cella.innerHTML = `<i class="fa-solid fa-bomb fa-2xl"></i>`;
                    }
                }

                messageEl.innerHTML = `<span class="lose">Mi dispiace, hai perso, il tuo punteggio 
                è: ${score.length}</span>`;
                infoEl.innerHTML = "Clicca nuovamente Play! o ricarica la pagina per giocare una nuova partita";
                finito = true;
                return;
            } else if (this.dataset.position === undefined) {
                this.classList.add("success");
                console.log(`Hai cliccato la cella ${this.innerHTML}`);
                //ogni volta che clicca su una cella pusho il numero
                //della cella nell'array del punteggio
                score.push(this.innerHTML);

                //l'utente ha vinto
                if (score.length === win) {
                    for (let k = 0; k < nodeCellList.length; k++) {
                        let cella = nodeCellList[k];
                        if (cella.dataset.position === "bomb" && cella.dataset.current === undefined) {
                            cella.classList.add("failed");
                            cella.innerHTML = `<i class="fa-solid fa-bomb fa-2xl"></i>`;
                        }
                    }
                    messageEl.innerHTML = `<span class="win">Congratulazioni, hai vinto! Il tuo 
                    punteggio è: ${score.length}</span>`;
                    infoEl.innerHTML = "Clicca nuovamente Play! o ricarica la pagina per giocare una nuova partita";
                    finito = true;
                    return;
                }
            }
        });
    }
});


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
        cell.innerHTML = `${i}`;
        cell.classList.add("square"); //aggiungo classe per visualizzazione
        //calcolo dinamicamente la larghezza di ogni cella a partire dal numero per riga
        cell.style.flexBasis = `calc(100% / ${cellsPerRow})`;

        gridList.push(cell);
    }
    return gridList;
}


//funzione che stamperà la griglia nel Dom
function printing(container, list) {
    //svuoto il container per evitare celle in eccesso
    container.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        container.append(list[i]);
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

//funzione che tiene traccia della posizione delle bombe nella griglia
//argomento 1: la lista delle bombe
//argomento 2: la lista delle celle della griglia
function bombPosition(bombList, nodeList) {
    //ciclo l'array contenente le posizioni delle bombe
    for (let i = 0; i < bombList.length; i++) {
        let posizione = bombList[i] - 1; //sottraggo 1 perchè la posizione nell'array nodeList dell'elemento va a partire da 0

        //setto la posizione della bomba nella griglia
        nodeList[posizione].dataset.position = "bomb";
    }

}