Menjalankan Hardhat Node di Terminal Baru:

```yarn run node```

Deploy Kontrak ke Jaringan Lokal
Di terminal baru, deploy kontrak dengan menjalankan:

```yarn run deploy```

Setelah deploy selesai, catat alamat kontrak yang dicetak di terminal, dan perbarui file .env dengan alamat kontrak tersebut.

Menjalankan Aplikasi React
Setelah itu, Anda bisa menjalankan aplikasi frontend React:

```yarn start```

Testing Kontrak atau Frontend:

Untuk test frontend, jalankan:

```yarn test```


Untuk test smart contracts, jalankan:

```npx hardhat test```

Deploy Kontrak ke Node Lokal:

Menggunakan Hardhat Node
Jalankan Node Lokal:

Buka terminal dan jalankan perintah berikut:
```npx hardhat node```

Deploy kontrak ke jaringan localhost dengan perintah berikut:
```npx hardhat run scripts/deploy.js --network localhost```

mengecek semua node_modules di yarn 
```yarn list --depth=0```