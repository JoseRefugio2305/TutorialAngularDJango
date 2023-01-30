# Tutorial

[Learn Angular 10, Python Django & SQLite by creating a full stack app from scratch](https://youtu.be/1Hc7KlLiU9w)

# Django

## Django REST framework

Nos permitira implementar caracteristicas de API en el proyecto, necesarias para comunicar Angular con las aplicaciones de DJango y crear los serializers para los modelos de base de datos. [Django REST framework](https://www.django-rest-framework.org/) 

## Creacion de serializers

Convierten instancias de modelos (consultas a la base de datos) en formato JSON (serializar), o viceversa (deserializar).
Estos se crean en el archivo serializers.py

## Django CORS Headers

[django-cors-headers](https://pypi.org/project/django-cors-headers/) nos permitira implementar funciones de seguridad, para evitar que cualquier dominio pueda ingresar a nuestra funcionalidades de API. De esta forma permitiremos el ingreso solo a aquellos dominios permitidos.

Una vez instalado el modulo, se deben especificar las configuraciones en settings.py
~~~python
INSTALLED_APPS = [
    '...',
    'corsheaders',
    'rest_framework',
]

CORS_ORIGIN_ALLOW_ALL=True #Le decimos que permita en el caso de ete proyecto, todos los dominios tengan permitido entrar acceder a la API, si no se quisiera permitir a cualquier dominio, entonces se deberia especificar una lista blanca de dominios permitidos como la siguiente

#CORS_ORIGIN_WHITE_LIST=('https://www.google.com/')#Lista blanca de dominios que pueden acceder a la API, en este caso, google esta de ejemplo.


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleWare',
    '...',
]
~~~

## Cambios con respecto a tutorial

django.conf.urls.url() quedó en desuso en Django 3.0 y se eliminó en Django 4.0+.
Para resoplver esto se hara uso de django.urls.re_path() que tambien permite las expresiones regulares

# Angular

Iniciar una nueva aplicacion
~~~
ng new nombre_aplicacion
~~~

Iniciar servidor Web
~~~
ng serve --open
~~~

Crear componentes en la App
~~~
ng generate component nombre_componente
ng generate component nombre_componente/sub_componente
~~~

Generar servicio para comunicacion con el API de DJango
~~~
ng generate service nombre_servicio
~~~

## Consultar version
Para consultar la version es con el comando 
~~~
ng version
~~~
