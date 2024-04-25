function addBarang() {
    var kode = document.getElementById("kode").value;
    var nama = document.getElementById("nama").value;
    var tahun = document.getElementById("tahun").value;
    var kategori = document.querySelector('input[name="kategori"]:checked');
    var jumlah = document.getElementById("jumlah").value;
    var harga = document.getElementById("harga").value;

    if (kode && nama && tahun && kategori && jumlah && harga) {
        saveBarang(kode, nama, tahun, kategori.value, jumlah, harga);
        resetForm();
    } else {
        alert("Silakan lengkapi semua bidang formulir.");
    }
}

function editBarang(index) {
    let barang = JSON.parse(localStorage.getItem('barang'));
    const barangToEdit = barang[index];
    document.getElementById("kode").value = barangToEdit.kode;
    document.getElementById("nama").value = barangToEdit.nama;
    document.getElementById("tahun").value = barangToEdit.tahun;

    var kategoriRadios = document.querySelectorAll('input[name="kategori"]');
    kategoriRadios.forEach(radio => {
        if (radio.value === barangToEdit.kategori) {
            radio.checked = true;
        }
    });
    document.getElementById("jumlah").value = barangToEdit.jumlah;
    document.getElementById("harga").value = barangToEdit.harga;

    document.getElementById("headerTitle").textContent = "Edit Barang";

    var addButton = document.getElementById("addButton");
    addButton.textContent = "Simpan";

    addButton.onclick = function() {
        saveEditedBarang(index);
    };
}

function addEditButtonBarang(row, index) {
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        editBarang(index);
    };
    row.insertCell().appendChild(editButton);
}

function saveEditedBarang(index) {
    var kode = document.getElementById("kode").value;
    var nama = document.getElementById("nama").value;
    var tahun = document.getElementById("tahun").value;
    var kategori = document.querySelector('input[name="kategori"]:checked');
    var jumlah = document.getElementById("jumlah").value;
    var harga = document.getElementById("harga").value;

    if (kode && nama && tahun && kategori && jumlah && harga) {
        let barang = JSON.parse(localStorage.getItem('barang'));
        barang[index] = { kode, nama, tahun, kategori: kategori.value, jumlah, harga };
        localStorage.setItem('barang', JSON.stringify(barang));
        loadBarang();
        resetForm();
    } else {
        alert("Silakan lengkapi semua bidang formulir.");
    }
}


function resetForm() {
    document.getElementById("kode").value = '';
    document.getElementById("nama").value = '';
    document.getElementById("tahun").value = '';
    var checkedRadio = document.querySelector('input[name="kategori"]:checked');
    if (checkedRadio) {
        checkedRadio.checked = false;
    }
    document.getElementById("jumlah").value = '';
    document.getElementById("harga").value = '';

    document.getElementById("headerTitle").textContent = "Rekam Barang";

    var addButton = document.getElementById("addButton");
    addButton.textContent = "Tambah";
}

function loadBarang() {
    let barang = localStorage.getItem('barang') ? JSON.parse(localStorage.getItem('barang')) : [];
    const tableBody = document.getElementById("barangTableBody");
    tableBody.innerHTML = ''; 
    barang.forEach((item, index) => {
        var row = tableBody.insertRow();
        row.insertCell().innerHTML = item.kode;
        row.insertCell().innerHTML = item.nama;
        row.insertCell().innerHTML = item.tahun;
        row.insertCell().innerHTML = item.kategori;
        row.insertCell().innerHTML = item.jumlah;
        row.insertCell().innerHTML = item.harga;

        addEditButtonBarang(row, index);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteBarang(index);
        };
        row.insertCell().appendChild(deleteButton);
    });
}

function deleteBarang(index) {
    let barang = localStorage.getItem('barang') ? JSON.parse(localStorage.getItem('barang')) : [];
    barang.splice(index, 1);
    localStorage.setItem('barang', JSON.stringify(barang));
    loadBarang(); // Refresh the table
}

window.onload = function() {
    loadBarang();
};
