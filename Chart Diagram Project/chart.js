// Ambil elemen canvas
const ctx = document.getElementById('salesReport').getContext('2d');

// Data laporan penjualan bulanan untuk 2023 dan 2024
const data = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    datasets: [
        {
            label: 'Penjualan 2023 (dalam juta)',
            data: [50, 40, 55, 70, 60, 65, 75, 80, 85, 90, 95, 100], // Data tahun 2023
            backgroundColor: 'rgba(255, 99, 132, 0.8)', // Warna merah
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Penjualan 2024 (dalam juta)',
            data: [110, 105, 120, 130, 125, 140, 150, 160, 155, 170, 175, 180], // Data tahun 2024
            backgroundColor: 'rgba(54, 162, 235, 0.8)', // Warna biru
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
};

// Konfigurasi chart
const config = {
    type: 'bar', // Jenis chart: bar
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Posisi legenda
            },
            title: {
                display: true,
                text: 'Perbandingan Penjualan Bulanan (2023 vs 2024)'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Penjualan (dalam juta)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Bulan'
                }
            }
        }
    }
};

// Render chart
const salesReport = new Chart(ctx, config);
