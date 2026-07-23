import { useCart } from "./CartContext";

/**
 * Região viva global do carrinho.
 *
 * Adicionar um produto muda o badge do header e, se a gaveta estiver fechada,
 * é a única confirmação — puramente visual. Quem usa leitor de tela não recebe
 * nada. Aqui a mudança é anunciada em `aria-live="polite"`, sem interromper o
 * que estiver sendo lido.
 *
 * O total entra na frase de propósito: se a pessoa adiciona o mesmo item duas
 * vezes, o nome sozinho não mudaria o texto e o leitor ficaria mudo.
 */
export function CartAnnouncer() {
  const { lastAdded, totalItems } = useCart();

  return (
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {lastAdded
        ? `${lastAdded.name} adicionado ao carrinho. ${totalItems} ${totalItems === 1 ? "item" : "itens"} no total.`
        : ""}
    </div>
  );
}
