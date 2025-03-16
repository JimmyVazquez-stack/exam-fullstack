<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>


Proyecto (Laravel + Vue)
Este proyecto consta de:

Backend desarrollado en Laravel (API REST).
Frontend desarrollado en Vue 3, que consume la API.
Requisitos
PHP 12
Composer (gestor de dependencias para PHP)
MySQL
Node.js
npm o yarn para instalar las dependencias de Vue

Esta incluido el init.sql para un viztaso rapido de unos pocos registros
Se nececita la configuracion inicial sobre las migraciones ---> php artisan migrate
Tal vez se nececite instalar API, ---> php artisan install:api
Vue debera servirse en el puerto ---> 5153
Laravel servira en ---> localhost:8000/api o http://127.0.0.1:8000/api

Use sus propias credenciales para la base de datos la base de datos se crea con las migraciones en automatico

Se podria haber usado seeders para un llenado automatico pero se usa un init.sql como lo requerido

Notas y Posibles Mejoras
Autenticación: Puedes implementar Sanctum o JWT para proteger la API.
Validaciones: Fortalecer validaciones de campos en backend y frontend.
Optimización: Configurar un build de Vue y servirlo desde Laravel en producción, en vez de correr dos servidores por separado.
Pruebas: Agregar unit tests o e2e tests con Vitest, Cypress, etc.
Presentación: Podria mejorarse el diseño.