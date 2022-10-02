## Challenge - FIDELITY TECHNOLOGY 2022
---

#### **_Objetivo:_**

El siguiente ejercicio práctico tiene como objetivo poder evaluar los conocimientos técnicos del
candidato, buscando identificar las buenas prácticas de desarrollo y la calidad del entregable.

#### **_Descripción:_**
A continuación se presenta un ejercicio práctico a desarrollar en el lenguaje de programación y
base de datos que el candidato decida. Sería deseable utilizar JAVA como backend y HTML
como front, pero NO será obligatorio el uso de los mismos. La arquitectura o diseño de la
aplicación quedará a cargo del candidato.
El tiempo para desarrollar el ejercicio será de una semana (7 días) a partir de la fecha en que
se entrega este documento. La revisión del mismo se hará en forma remota compartiendo
pantalla. No será necesario hacer entrega de los fuentes.

#### **_Ejercicio:_**
Dada la siguiente tabla:

_OPERATORS_
- **id**
- **name**
- **surname**
- **userName**
- **password**
- **status** (0 = disabled / 1 = enabled)
- **creationDate**
- **lastLoginDate**

Se debe crear la tabla en la base de datos a elección (utilizar los tipos de datos de los campos
que consideres más convenientes) y realizar:

1. **Login**
1. **Alta, modificación y listado de los operadores**


- **Login:** Realizar una pantalla que permita a un operador hacer un Login ingresando su
nombre de usuario y contraseña. Una vez validada la autenticidad del mismo se podrá acceder.
Al acceder se mostrará por defecto el listado de operadores que hay en la tabla OPERATORS.

- **Alta, modificación y listado de los operadores:** Mostrar en el listado de operadores los
datos que considere necesarios. Desde dicho listado se podrá crear nuevos operadores y
modificar los datos de los ya existentes.
El campo status determinará si el operador se encuentra activo o inactivo.
El campo creationDate solo será completado al dar de alta un operador.
El campo lastLoginDate se completará al momento de que un operador realiza un login
exitoso.

> **_IMPORTANTE:_** 
>
>Tener en cuenta cuáles serían las medidas de seguridad podría utiliza