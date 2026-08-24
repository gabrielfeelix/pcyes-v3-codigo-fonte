# Artes ambientadas do mosaico de categorias

Cole as imagens aqui. O nome do arquivo é a categoria, minúsculo e sem acento,
com o sufixo da tela.

```
public/categorias/
  gabinetes-desktop.webp      gabinetes-mobile.webp
  cadeiras-desktop.webp       cadeiras-mobile.webp
  mouses-desktop.webp         mouses-mobile.webp
  headsets-desktop.webp       headsets-mobile.webp
  monitores-desktop.webp      monitores-mobile.webp
  microfones-desktop.webp     microfones-mobile.webp
  teclados-desktop.webp       teclados-mobile.webp
  placas-desktop.webp         placas-mobile.webp
```

Aceita .webp, .png ou .jpg. Se entregar só uma versão, nomeie `-desktop` que ela
serve as duas telas.

## Dimensões por quadro

O mosaico tem três tamanhos de quadro, e cada categoria ocupa um deles.

| Categoria | Quadro | Desktop | Celular |
|---|---|---|---|
| Gabinetes | Grande | 1600 × 800 | 1400 × 1030 |
| Cadeiras Gamer, Microfones | Em pé | 800 × 820 | 700 × 1300 |
| Mouses, Headsets, Monitores, Teclados | Deitado | 1200 × 590 | 900 × 800 |
| Placas de Vídeo | Deitado | 1200 × 590 | 1400 × 820 |

Entregando uma arte só por categoria, use a dimensão de desktop e mantenha o
assunto nos 70% centrais: as pontas somem conforme o tamanho da tela.

## Composição

Dois cantos precisam ficar calmos, senão o texto do site some por cima da arte:

- **canto superior esquerdo**, onde entra o nome da categoria
- **canto inferior direito**, onde entra a seta

## O que a arte precisa ser

Foto de produto ambientada: o produto numa superfície real, com luz de estúdio e
fundo com profundidade. Não é recorte em fundo chapado, e não é render com
excesso de cor.

A cor quente do produto (o RGB) deve ser o único ponto de cor forte da cena. O
resto fica neutro e escuro, para o card não brigar com o vermelho da marca que
aparece no resto da página.

## Enquanto não chega

Os quadros seguem mostrando a foto de catálogo do produto sobre uma bancada
desenhada em CSS. Assim que o arquivo entrar nesta pasta, é só apontar no código
e o palco provisório sai sozinho.
