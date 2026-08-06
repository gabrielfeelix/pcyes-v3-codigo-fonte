# assets-fonte

Masters de onde os assets servidos são derivados. **Nada aqui é servido** — a pasta
vive fora de `public/`, então o `npm run build` não copia nada disto para `dist/`.

## `setups-1448/`

As nove artes de campanha de setup, como vieram do marketing: PNG 1448×1086, ~2 MB cada.

Ficavam em `public/setups/_originais-1448/` e iam junto no build — 17 MB de PNG
publicados sem que nenhuma página os pedisse. Saíram de lá por isso.

Delas saem as três variantes servidas, todas em `public/setups/`:

| destino                    | proporção | tamanho   | onde aparece                        |
| -------------------------- | --------- | --------- | ----------------------------------- |
| `setups/setup-x.webp`      | 1:1       | 2048×2048 | palco da PDP, painéis, escada       |
| `setups/tall/setup-x.webp` | 5:6       | 1000×1200 | card de listagem e relacionados     |
| `setups/wide/setup-x.webp` | 16:10     | 1216×760  | miniatura do megamenu               |

O master é 4:3, então cada variante é recorte + reenquadramento, não só resize.
Se um dia aparecer um quadro novo, a arte sai daqui — os `.webp` já estão cortados
e não dá para recuperar o que ficou fora do corte.
