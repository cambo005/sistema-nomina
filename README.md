# Sistema de Nómina (JavaScript / Node.js)

Sistema de nómina orientado a objetos para empleados Asalariados, por Horas, por Comisión y Temporales.

## Requisitos
- [Node.js](https://nodejs.org) versión 18 o superior (LTS).
- Visual Studio Code.

## Ejecución en VS Code
1. `Archivo > Abrir carpeta...` y elige la carpeta `sistema-nomina-js`.
2. Abre la terminal: `Terminal > Nueva terminal` (`Ctrl + ñ`).
3. Ejecuta:
   ```bash
   npm start        # Demo con 4 empleados
   npm test         # Pruebas unitarias (22)
   ```
   También puedes presionar `F5` para ejecutar con el depurador.

No requiere `npm install`: no usa librerías externas (las pruebas usan el runner nativo de Node).

## Simulador web (opcional)
Abre `web/simulador-nomina.html` en el navegador (doble clic, o con la extensión Live Server de VS Code)
para probar las reglas de nómina con una interfaz gráfica, sin usar la consola.

## Estructura
```
src/
  constants.js            # Porcentajes y límites de negocio
  errors.js               # Excepciones del dominio
  guard.js                # Validaciones y redondeo
  employees/              # Jerarquía de empleados (polimorfismo)
  policies/               # Beneficios y deducciones (Strategy)
  PayrollCalculator.js    # Orquestador que genera el desprendible
  index.js                # Demostración
test/                     # Pruebas unitarias (node:test)
```

## SOLID
| Principio | Aplicación |
|---|---|
| S | `Employee` solo calcula pagos; cada deducción/beneficio es su propia clase; `PayrollCalculator` solo orquesta. |
| O | Nuevo beneficio/deducción = nueva clase que extiende `BenefitPolicy`/`DeductionPolicy`, sin tocar el calculador. |
| L | Cualquier subclase de `Employee` es intercambiable en el calculador. |
| I | Contratos pequeños: un solo método `calculate()` por política. |
| D | `PayrollCalculator` recibe las políticas por constructor, no las crea internamente. |

## Supuestos
1. ARL = 0,522 % (riesgo clase I), configurable en `constants.js`.
2. Bono de alimentación: lo paga la empresa, se suma al neto y no se descuenta.
3. Fondo de ahorro: 2 % del bruto, descontado al empleado por horas con más de 1 año que lo aceptó.
4. "Más de 5 años" y "superan $20.000.000" son estrictamente mayores.
5. Pensión y ARL se calculan sobre el bruto (base + bonos).
6. JavaScript no tiene tipo decimal exacto; `roundMoney()` redondea a 2 decimales para evitar errores de punto flotante.

## Metodología
Ágil incremental con TDD (Red → Green → Refactor), historias de usuario por regla de negocio,
GitHub Flow (ramas `feature/*`, commits pequeños con Conventional Commits) y suite de pruebas
ejecutada antes de cada fusión a `main`.

## Subir a GitHub
```bash
git init && git branch -M main
git add .gitignore README.md package.json && git commit -m "docs: agrega README y configuración"
git checkout -b feature/employees
git add src/constants.js src/errors.js src/guard.js src/employees test/employees.test.js
git commit -m "feat: agrega jerarquía de empleados con validaciones y pruebas"
git checkout main && git merge feature/employees
git checkout -b feature/policies
git add src/policies src/PayrollCalculator.js test/payrollCalculator.test.js
git commit -m "feat: agrega políticas y calculadora de nómina"
git checkout main && git merge feature/policies
git add src/index.js .vscode && git commit -m "feat: agrega programa de demostración"
git remote add origin https://github.com/TU_USUARIO/sistema-nomina.git
git push -u origin main --all
```
