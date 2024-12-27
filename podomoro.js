const inputWaktu = document.getElementById('time-input');
const tampilanWaktu = document.getElementById('time-display');
const tombolMulaiJeda = document.getElementById('start-btn');
const tombolBerhenti = document.getElementById('stop-btn');
const tombolUlangi = document.getElementById('reset-btn');

let waktuHitungMundur = 0; 
let sisaWaktu = 0; 
let intervalHitungMundur = null; 
let sedangBerjalan = false;

function formatWaktu(detik) {
    const menit = Math.floor(detik / 60);
    const detikSisa = detik % 60;
    return `${String(menit).padStart(2, '0')}:${String(detikSisa).padStart(2, '0')}`;
}

function perbaruiTampilan() {
    tampilanWaktu.textContent = formatWaktu(sisaWaktu);
}

function mulaiAtauJeda() {
    if (intervalHitungMundur) {
        clearInterval(intervalHitungMundur);
        intervalHitungMundur = null;
        tombolMulaiJeda.textContent = 'Start';
        sedangBerjalan = false;
    } else {
        if (!sedangBerjalan) {
            const menitInput = parseInt(inputWaktu.value, 10);
            if (isNaN(menitInput) || menitInput <= 0) {
                alert('Enter a valid time in minutes.');
                return;
            }
            waktuHitungMundur = menitInput * 60;
            sisaWaktu = waktuHitungMundur;
        }
        intervalHitungMundur = setInterval(() => {
            sisaWaktu--;
            perbaruiTampilan();

            if (sisaWaktu <= 0) {
                clearInterval(intervalHitungMundur);
                intervalHitungMundur = null;
                alert("Times Up!");
                tombolMulaiJeda.textContent = 'Start';
                sedangBerjalan = false;
            }
        }, 1000);
        tombolMulaiJeda.textContent = 'Pause';
        sedangBerjalan = true;
    }
}

function berhentiHitungMundur() {
    clearInterval(intervalHitungMundur);
    intervalHitungMundur = null;
    sisaWaktu = 0;
    perbaruiTampilan();
    tombolMulaiJeda.textContent = 'Start';
    sedangBerjalan = false;
}

function ulangiHitungMundur() {
    clearInterval(intervalHitungMundur);
    intervalHitungMundur = null;
    sisaWaktu = waktuHitungMundur;
    perbaruiTampilan();
    tombolMulaiJeda.textContent = 'Start';
    sedangBerjalan = false;
}

tombolMulaiJeda.addEventListener('click', mulaiAtauJeda);
tombolBerhenti.addEventListener('click', berhentiHitungMundur);
tombolUlangi.addEventListener('click', ulangiHitungMundur);

perbaruiTampilan();
