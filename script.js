let Ptx = document.querySelector('#potenciaTx');
let n1 =document.querySelector('#atenuacao1');
let G =document.querySelector('#ganho');
let Pn =document.querySelector('#PN');
let n2 = document.querySelector('#atenuacao2');
let sntx = document.querySelector('#SNtx');

const select1 = document.getElementById('unidadePotencia')
const select2 = document.getElementById('unidadeat1')
const select3 = document.getElementById('unidadeGanho')
const select4 = document.getElementById('unidadePN')
const select5 = document.getElementById('unidadeat2')
const select6 = document.getElementById('unidadeSNtx')


const sinalA = document.getElementById('Sinal-A')
const sinalB = document.getElementById('Sinal-B')
const sinalC = document.getElementById('Sinal-C')
const sinalD = document.getElementById('Sinal-D')

const ruidoA = document.getElementById('Ruido-A')
const ruidoB = document.getElementById('Ruido-B')
const ruidoC = document.getElementById('Ruido-C')
const ruidoD = document.getElementById('Ruido-D')

const SNa = document.getElementById('S/N-A')
const SNb = document.getElementById('S/N-B')
const SNc = document.getElementById('S/N-C')
const SNd = document.getElementById('S/N-D')

const btn = document.getElementById('btn-calc')

if (btn){
    btn.addEventListener('click', () => {
        calcula()
    })
}

function eleva(num, select) {
    let valor = select.value;
    switch(valor){
        case "db":
            break
        case "mW":
            num = num*10**-3;
            num = convertDbm(num)
            break
        case "µW":
            num = num*10**-6;
            num = convertDbm(num)
            break
        case "nW":
            num = num*10**-9;
            num = convertDbm(num)
            break
        case "pW":
            num = num*10**-12;
            num = convertDbm(num)
            break
        default:
            num = '';
    }
    return num;
}

function convertDbm(w){
    if(w===0) return 0
    const dbm = 10 * Math.log10(w/1) + 30;
    return dbm
}
function convertWatts(dbm){
    if(dbm===0) return 0
    const watts = 10**((dbm-30)/10);
    return watts
}

function calcula(){
    Ptx = eleva(Ptx.value,select1);
    n1 = eleva(n1.value,select2);
    G = eleva(G.value,select3);
    Pn = eleva(Pn.value,select4)
    n2 = eleva(n2.value,select5);
    sntx = eleva(sntx.value,select6);
    
    const pontob = Ptx - Number(n1);
    const pontoc = pontob + Number(G);
    const pontod = pontoc - Number(n2);
    sinalA.innerHTML = parseFloat(Ptx).toFixed(2);
    sinalB.innerHTML = pontob.toFixed(2);
    sinalC.innerHTML = pontoc.toFixed(2);
    sinalD.innerHTML = pontod.toFixed(2);
    SNa.innerHTML = parseFloat(sntx).toFixed(2);
    calculaRuido(pontob,pontoc,pontod)
}
function calculaRuido(pontob,pontoc,pontod){
    const Ntx = -Number(sntx) + Number(Ptx);
    ruidoA.innerHTML = Ntx.toFixed(2);

    const Nb = Number(Ntx) - Number(n1)
    ruidoB.innerHTML = Nb.toFixed(2);
    SNb.innerHTML = (pontob - Nb).toFixed(2);

    let Nc = Number(Nb) + Number(G);
    Nc = convertWatts(Nc) + convertWatts(Pn);
    Nc = convertDbm(Nc);
    ruidoC.innerHTML = Nc.toFixed(2);
    SNc.innerHTML = (pontoc - Nc).toFixed(2);

    let Nd = Nc - n2;
    ruidoD.innerHTML = Nd.toFixed(2);
    SNd.innerHTML = (pontod - Nd).toFixed(2);

}






