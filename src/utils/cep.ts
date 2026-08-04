/**
 * CEP → UF, sem rede.
 *
 * O protótipo não tem integração de endereço (o cálculo de frete da página de
 * produto também é mock). Como as faixas de CEP por estado são fixas e
 * publicadas pelos Correios, dá para resolver a UF localmente — o suficiente
 * para o cabeçalho dizer "entregando em PR" sem depender de API nenhuma.
 *
 * Quando entrar consulta real de endereço (ViaCEP ou o serviço do Magento),
 * este arquivo vira fallback offline: continua valendo quando a chamada falha.
 */

/** Faixas por prefixo de 5 dígitos, inclusivas nas duas pontas. */
const CEP_RANGES: ReadonlyArray<readonly [number, number, string]> = [
  [1000, 19999, "SP"],
  [20000, 28999, "RJ"],
  [29000, 29999, "ES"],
  [30000, 39999, "MG"],
  [40000, 48999, "BA"],
  [49000, 49999, "SE"],
  [50000, 56999, "PE"],
  [57000, 57999, "AL"],
  [58000, 58999, "PB"],
  [59000, 59999, "RN"],
  [60000, 63999, "CE"],
  [64000, 64999, "PI"],
  [65000, 65999, "MA"],
  [66000, 68899, "PA"],
  [68900, 68999, "AP"],
  [69000, 69299, "AM"],
  [69300, 69399, "RR"],
  [69400, 69899, "AM"],
  [69900, 69999, "AC"],
  [70000, 72799, "DF"],
  [72800, 72999, "GO"],
  [73000, 73699, "DF"],
  [73700, 76799, "GO"],
  [76800, 76999, "RO"],
  [77000, 77999, "TO"],
  [78000, 78899, "MT"],
  [78900, 78999, "RO"],
  [79000, 79999, "MS"],
  [80000, 87999, "PR"],
  [88000, 89999, "SC"],
  [90000, 99999, "RS"],
];

/**
 * Devolve a sigla do estado de um CEP, ou `null` se o CEP não tiver 8 dígitos
 * ou cair fora das faixas em uso.
 */
export function cepUf(cep: string): string | null {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  const prefix = Number(digits.slice(0, 5));
  const range = CEP_RANGES.find(([start, end]) => prefix >= start && prefix <= end);
  return range ? range[2] : null;
}

/** `true` quando o CEP tem 8 dígitos e pertence a uma faixa conhecida. */
export function isValidCep(cep: string): boolean {
  return cepUf(cep) !== null;
}
