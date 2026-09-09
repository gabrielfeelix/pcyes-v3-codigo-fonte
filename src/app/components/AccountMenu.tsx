import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Package, IdCard, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "./AuthContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";

const fontInter = { fontFamily: "var(--font-family-inter)" } as const;
const captionStyle = { ...fontInter, fontSize: "var(--text-caption)" } as const;
const itemStyle = { ...fontInter, fontSize: "var(--text-sm)", fontWeight: 500 } as const;

/* O DropdownMenuContent do shadcn vem com bg-popover, rounded-md, border e
   shadow-md — o painel genérico da biblioteca, que não é o desta loja. Os
   painéis flutuantes da navbar (categoria da busca, sugestões, mega menu) usam
   todos surface-0 + border-edge + radius-card-sm + shadow-2xl, sem respiro
   interno: as linhas vão de ponta a ponta e o realce é bg-white/[0.06]. */
const PANEL =
  "w-[280px] overflow-hidden rounded-[var(--radius-card-sm)] border border-edge bg-surface-0 p-0 shadow-2xl";
const ROW =
  "flex w-full items-center gap-2.5 rounded-none px-4 py-2.5 text-left text-ink transition-colors hover:bg-white/[0.06] hover:text-ink-strong focus:bg-white/[0.06] focus:text-ink-strong cursor-pointer";

/* Dois destinos só. Favoritos já tem ícone próprio na navbar, e endereços e
   cartões se editam dentro do checkout, na hora em que importam — listar tudo
   aqui virava índice do perfil, não atalho. */
const LINKS = [
  { icon: Package, label: "Meus pedidos", tab: "orders" },
  { icon: IdCard, label: "Meus dados", tab: "data" },
] as const;

interface AccountMenuProps {
  /** O botão da navbar. Muda entre os breakpoints; o menu, não. */
  children: ReactNode;
}

/* Um menu só para as duas navbars. Antes o botão compacto abria três itens e o
   botão largo ia direto pro /perfil — dois comportamentos para o mesmo alvo,
   e quem usava os dois tamanhos aprendia o menu duas vezes. */
export function AccountMenu({ children }: AccountMenuProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /* Deslogado o menu não existe: devolve o botão como veio, pra navbar poder
     envolver os dois casos com a mesma marcação. */
  if (!user) return <>{children}</>;

  const isCompany = user.accountType === "pj";

  /* Razão social é longa e o menu tem 260px: o nome da pessoa identifica
     melhor, e quem é PJ já sabe disso pela etiqueta ao lado. */
  const displayName = user.name;

  const go = (to: string) => () => navigate(to);

  return (
    /* modal={false}: no padrão o Radix trava o scroll do body enquanto o menu
       está aberto. A barra de rolagem some, a página ganha a largura dela de
       volta e tudo escorrega pro lado no clique. Menu de navbar não é diálogo —
       não precisa prender o fundo, e sem a trava a página fica parada. */
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className={PANEL}>
        {/* O cabeçalho é o próprio link pro perfil. Um item "Minha conta" logo
            abaixo de "Meus dados" fazia a pessoa parar pra decidir qual era
            qual — e é o mesmo lugar. */}
        <button type="button" onClick={go("/perfil")}
          className={`${ROW} gap-3 py-3.5`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
            style={{ ...fontInter, fontSize: "var(--text-sm)", fontWeight: 700 }}
          >{displayName.charAt(0).toUpperCase()}</span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5">
              <span className="truncate text-ink-strong" style={itemStyle}>
                {displayName}
              </span>
              {/* Etiqueta, não item de menu: diz o que a conta é, e é o que
                  explica o preço diferente no catálogo inteiro. */}
              {isCompany && (
                <span className="shrink-0 rounded-full bg-primary/15 px-1.5 py-px text-primary"
                  style={{ ...captionStyle, fontWeight: "var(--font-weight-medium)" }}
                >Revenda</span>
              )}
            </span>
            <span className="block truncate text-ink/45" style={captionStyle}>
              {user.email}
            </span>
          </span>
          <ChevronRight size={14} className="shrink-0 text-ink/30" aria-hidden="true" />
        </button>

        {LINKS.map(({ icon: Icon, label, tab }) => (
          <DropdownMenuItem key={tab} className={ROW} style={itemStyle}
            onClick={go(`/perfil?tab=${tab}`)}
          >
            <Icon size={15} className="text-ink/35" aria-hidden="true" />
            <span className="flex-1">{label}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="mx-0 my-0 bg-edge" />

        {/* Vermelho porque é a única linha que desfaz algo — as outras levam a
            algum lugar. O ícone acompanha o texto: metade em cinza deixaria a
            linha parecendo meio desativada. */}
        <DropdownMenuItem className={`${ROW} text-primary hover:text-primary focus:text-primary`} style={itemStyle}
          onClick={() => { logout(); navigate("/"); }}
        >
          <LogOut size={15} className="text-primary" aria-hidden="true" />
          Sair da conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
