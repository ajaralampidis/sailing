# Sailing Protocol Swapper

### Algúnas decisiones técnicas:

- El repo utiliza nuxt:
  - Al no tener tanta experiencia con VUE, un meta framework me ahorra mucho trabajo y decisiones.
  - Tiene varias mejoras en la development experience (auto imports, dev tools, etc)
  - Tiene un ecosistema de [modulos](https://nuxt.com/modules) que me facilitaron y aceleraron el desarrollo
- Está configurado con eslint, prettier, tailwind-prettier y typescript para mejorar mantenimiento del código
- Utilizé la misma biblioteca que sailing para conectar la wallet: [web3-onboard de blocknative](https://onboard.blocknative.com/)
- La información de las monedas la consume server side de la [API de coingecko](https://www.coingecko.com/en/api) y las cadenas están hardcodeadas tomando la referencia de sailing.
- El formulario utiliza zod para validar la información.
  - El manejo de errores es mas bien limitado, al no tener mucha definición sobre cómo era la API no tenía sentido ir muy al detalle
- Para la busqueda de tokens uso match-sorter. Una libreria de fuzzy finding que no es tan pesada como Fuse del lado del cliente

## Diseño

- El layout general fue copiado de sailing. No cambié nada, era para mejorar la presentación.
- Me tomé una licencia creativa con las gradientes del fondo. Creo que ayudan a la estetica general:
  - Están animadas sutilmente. La idea era que simularan el movimiento de olas del mar pero sin ser tan literal.
- La paleta de colores está tomada de sailing. Como también usaron tailwind, pude tomar las mismas clases en muchos casos.
- Agregué más redondeos de los que usa sailing, pero creo que el resultado final sigue siendo consitente.
- Dejé los outline al hacer focus en los elementos. Creo que mejora la accesibilidad y la navegación con el teclado.
- Tomé bastante referncia de uniswap. A diferencia de rhino.fi, la interfaz es mucho más limpia y descargada de elementos.
  - Básicamente busqué implementar todas las funcionalidades de rhino.fi pero con el diseño más simple posible, esto evita que el usuario se sienta abrumado con tanta información.
  - Esto principalmente lo logro con elementos desplegables que "separan" la información en distintas vistas.
  - También ayuda la paleta de colores muy simple y con poco contraste.

## Organización del Código

- El formulario cuenta con muchas interacciones. Para mantenerlo ordenado lo dividí en varios componentes específicos
- Todos los componentes estan co-locados dentro de la misma carpeta del compoente `/components/Swapper`
- Para el formulario usamos un state global. Esta lógica vive en un archivo separado, es un composable pero como no es una lógica compartida con toda la app no se encuentra en `/composables`, se encuentra co-locado en la carpeta del componente Swapper: `/components/Swapper/formState.ts`
- Dentro del mismo archivo `formState.ts` fui tambien exportando utils relacionadas al manejo del estado.

## Funcionalidades relevadas de rhino.fi:

Estas son todas las funcionalidades que fui relevando de rhino.fi.

- Capacidad de seleccionar token y chain en ambos "Sell" y "Purchase"
- Boton para invertir el swap
- Conección con una browser wallet
- Opcion para enviar la compra de la transacción a otra wallet
- Detalle con el desgrabado de los fees
  - Esta funcionalidad no se encuentra, no estoy seguro de cómo funciona ni de las
- Pude que hayan algúna funcionalidad extra que no haya incluido. Es probable que no la hay entendido o que no tenía un desarrollo tan detallado sin conocer el back en absoluto.

## Futuros pasos:

- No tiene testing automatizado.
  - Tenía la intención de hacerle testing, pero dados los tiempos no llegué y al no conocer cómo funciona el back y el manejo de las browser wallets, no estaba segúro de cómo testear correctamente.
  - La división del componentes en varios componentes en parte obedece a facilitar el testing automatizado
- La accesibilidad podría mejorar. Especialmente en componentes e imágens sin labels o alts. Prioricé la velocidad de desarrollo
- No tengo mucha experiencia con VUE. Es muy probable que haya problemas de performance. La librería de blocknative hace uso de rxjs y hacer uso de esa biblioteca simplifca el uso. Pero no puede provocar memory leak re-renders si no se utiliza bien (y no tengo experiencia con esta).

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
