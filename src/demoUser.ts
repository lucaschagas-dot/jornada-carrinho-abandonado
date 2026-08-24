/**
 * Persona usada para pré-preencher a tela de Identificação (Odonto 4) e o
 * cabeçalho em estado logado.
 *
 * Os dados são PROPOSITALMENTE FICTÍCIOS: este repositório é público e o
 * protótipo fica no ar em GitHub Pages, então CPF, celular e e-mail reais não
 * devem entrar aqui (uma vez commitados, ficam no histórico do git mesmo se
 * removidos depois). Para demonstrar com outros valores, edite só este arquivo.
 */
export const DEMO_USER = {
  nomeCompleto: 'Carlos Eduardo Almeida Souza',
  /** Usado no cabeçalho: "Olá, {nomeCurto}". */
  nomeCurto: 'Carlos Souza',
  cpf: '123.456.789-09',
  dataNascimento: '17/10/1994',
  estadoCivil: 'solteiro',
  celular: '(11) 98765-4321',
  email: 'carlos.souza@exemplo.com.br',
  cep: '01410-901',
  endereco: 'ALAMEDA MINISTRO ROCHA AZEVEDO - CERQUEIRA CESAR, SAO PAULO - SP',
};
