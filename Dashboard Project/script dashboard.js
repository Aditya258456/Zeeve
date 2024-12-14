let users = [];
let darkMode = false;
let editingIndex = -1; // Menyimpan indeks pengguna yang sedang diedit

function showContent(content) {
    const mainContent = document.getElementById('main-content');
    let html = '';

    switch(content) {
        case 'home':
            html = renderHome();
            break;
        case 'users':
            html = renderUsers();
            break;
        case 'settings':
            html = renderSettings();
            break;
        default:
            html = '<h1>Selamat Datang di Dashboard</h1><p>Pilih menu di sebelah kiri untuk mulai.</p>';
    }

    mainContent.innerHTML = html;
}

function renderHome() {
    return `
        <h1>Home</h1>
        <p>Ini adalah halaman utama.</p>
        <h2>Daftar Pengguna</h2>
        <div class="user-list">
            <table>
                <thead>
                    <tr>
                        <th>Nama Pengguna</th>
                    </tr>
                </thead>
                <tbody id="user-table-body-home">
                    ${users.map(user => `<tr><td>${user}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderUsers() {
    return `
        <h1>Pengguna</h1>
        <div class="form-container">
            <input type="text" id="username" placeholder="Nama Pengguna" required value="${editingIndex !== -1 ? users[editingIndex] : ''}">
            <button onclick="${editingIndex !== -1 ? 'updateUser()' : 'addUser()'}">${editingIndex !== -1 ? 'Update Pengguna' : 'Tambah Pengguna'}</button>
        </div>
        <div class="user-list">
            <table>
                <thead>
                    <tr>
                        <th>Nama Pengguna</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="user-table-body">
                    ${users.map((user, index) => `
                        <tr>
                            <td>${user}</td>
                            <td>
                                <button onclick="editUser(${index})">Edit</button>
                                <button onclick="deleteUser(${index})">Hapus</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function addUser() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();

    if (username) {
        users.push(username);
        usernameInput.value = '';
        showContent('users'); // Refresh the user list
        showContent('home'); // Refresh the home user list
    } else {
        alert("Nama pengguna tidak boleh kosong!");
    }
}

function editUser(index) {
    editingIndex = index;
    const usernameInput = document.getElementById('username');
    usernameInput.value = users[index];
    showContent('users'); // Tampilkan kembali halaman pengguna
}

function updateUser() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();

    if (username) {
        users[editingIndex] = username; // Update pengguna
        editingIndex = -1; // Reset indeks
        usernameInput.value = '';
        showContent('users'); // Refresh the user list
        showContent('home'); // Refresh the home user list
    } else {
        alert("Nama pengguna tidak boleh kosong!");
    }
}

function deleteUser(index) {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
        users.splice(index, 1); // Hapus pengguna
        showContent('users'); // Refresh the user list
        showContent('home'); // Refresh the home user list
    }
}

function renderSettings() {
    return `
        <h1>Pengaturan</h1>
        <div>
            <label>
                <input type="checkbox" id="darkModeCheckbox" ${darkMode ? 'checked' : ''} onchange="toggleDarkMode()">
                Aktifkan Dark Mode
            </label>
        </div>
        <div>
            <label>
                <input type="checkbox" id="notificationsCheckbox" onchange="toggleNotifications()">
                Aktifkan Notifikasi
            </label>
        </div>
    `;
}

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
}

function toggleNotifications() {
    const notificationsEnabled = document.getElementById('notificationsCheckbox').checked;
    alert(`Notifikasi ${notificationsEnabled ? 'diaktifkan' : 'dinonaktifkan'}`);
}
