# Prueba técnica PCA Ingeniería

Este repositorio contiene la solución a la prueba técnica planteada por la empresa PCA Ingeniería, la cual consiste en el desarrollo de una ruleta con la cual, todo usuario que inicie sesión  en el sistema pueda interactuar, girándola de tal manera que de como resultado uno de los tres colores posibles (rojo, negro y verde) con sus respectivas probabilidades (49.5%, 49.5% y 1%). Cada usuario podrá apostar por el color que considere dará como resultado la ruleta y así podrá duplicar lo ganado, ganar diez veces más de lo apostado o directamente, perder el dinero apostado. Los resultados están determinados por los colores, de la siguiente manera:

Si el usuario apostó al color rojo o negro y la ruleta arroja estos colores, se duplicará el dinero apostado.

Si el usuario apostó al color verde y la ruleta arroja verde, gana diez veces lo que apostó.

Si el usuario no le atina al color resultante, perderá lo apostado.

## Detalles técnicos

La aplicación fue desarrollada con el stack MERN (MongoDB, Express, React y NodeJS). Para el lado del frontend, se desarrolló con la librería de React, se creó el sitio por componentes y sigiendo un desarrollo SPA. Se usó Typescript en el backend debido a su versatilidad y a su vez a la organización que provee debido a su tipado fuerte, también se considera que es un lenguaje que permite una fácil lectura y mantenimiento del código. Para la creación del servidor, se utilizó la librería Express, ya que permite una mayor facilidad y rapidez al momento de crear el servidor. Como gestor de base de datos, se hizo uso de MongoDB Atlas, un gestor en línea de base de datos no relacionales. Y por último, en cuanto el despliegue de la aplicación, se usó Heroku.

### Indicaciones para el uso de la aplicación

Inicialmente, se tiene la vista de login para ingresar al sitio, en esta se encuentran dos campos de texto, uno para digitar la cédula y el otro para la contraseña. Por defecto, se encuentra digitada la información del administrador, pero en caso de que no sea así, dejaré las credenciales del usuario con rol administrador:

Campo cédula: 1113692937
Campo contraseña: admin

Cabe aclarar que el usuario de rol administrador, es el único que puede gestionar la información de los usuarios, así como cambiar su nombre, monto y contraseña, eliminar usuario y crear uno nuevo, (los demás usuarios de rol jugador tienen acceso denegado a este componente). Una vez diligenciados los campos se da click al botón "Ingresar" para acceder al sitio. 

Más abajo se encuentra el botón de "Registrame!" el cual muestra el formulario para la creación de nuevos usuarios, cada usuario nuevo se creará con un monto básico de 15000 pesos.