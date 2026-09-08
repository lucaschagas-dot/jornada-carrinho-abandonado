import type { ComponentType } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PageShell } from './components/PageShell';
import { PrototypeNav } from './components/PrototypeNav';
import { ROUTES, type RoutePath } from './routes';
import { DEMO_USER } from './demoUser';
import { JornadaProvider } from './jornada';
import { VidaProvider } from './vidaEstado';

import Start from './pages/Start';
import Odonto1 from './pages/Odonto1';
import Odonto2 from './pages/Odonto2';
import Odonto2_1 from './pages/Odonto2_1';
import Odonto2_3 from './pages/Odonto2_3';
import Odonto3 from './pages/Odonto3';
import Odonto3_1 from './pages/Odonto3_1';
import Odonto3_2 from './pages/Odonto3_2';
import Odonto3_3 from './pages/Odonto3_3';
import Odonto4 from './pages/Odonto4';
import Odonto5 from './pages/Odonto5';
import OdontoLogin from './pages/OdontoLogin';

import ResidencialCotacao from './pages/ResidencialCotacao';
import ResidencialCoberturas from './pages/ResidencialCoberturas';
import ResidencialIdentificacao from './pages/ResidencialIdentificacao';
import ResidencialPagamento from './pages/ResidencialPagamento';

import Vida1 from './pages/Vida1';
import VidaCotacao from './pages/VidaCotacao';
import VidaProduto from './pages/VidaProduto';
import VidaAssistencias from './pages/VidaAssistencias';
import VidaComposicao from './pages/VidaComposicao';
import VidaLogin from './pages/VidaLogin';
import VidaCadastro from './pages/VidaCadastro';
import VidaEndereco from './pages/VidaEndereco';
import VidaBeneficiario from './pages/VidaBeneficiario';
import VidaDps from './pages/VidaDps';
import VidaPagamento from './pages/VidaPagamento';
import VidaConfirmacao from './pages/VidaConfirmacao';

const PAGES: Record<RoutePath, ComponentType> = {
  '/': Start,
  '/odonto-1': Odonto1,
  '/odonto-2': Odonto2,
  '/odonto-2-1': Odonto2_1,
  '/odonto-2-3': Odonto2_3,
  '/odonto-3': Odonto3,
  '/odonto-3-1': Odonto3_1,
  '/odonto-3-2': Odonto3_2,
  '/odonto-3-3': Odonto3_3,
  '/odonto-4': Odonto4,
  '/odonto-login': OdontoLogin,
  '/odonto-5': Odonto5,

  '/residencial-cotacao': ResidencialCotacao,
  '/residencial-coberturas': ResidencialCoberturas,
  '/residencial-identificacao': ResidencialIdentificacao,
  '/residencial-pagamento': ResidencialPagamento,

  '/vida-1': Vida1,
  '/vida-cotacao': VidaCotacao,
  '/vida-produto': VidaProduto,
  '/vida-assistencias': VidaAssistencias,
  '/vida-composicao': VidaComposicao,
  '/vida-login': VidaLogin,
  '/vida-cadastro': VidaCadastro,
  '/vida-endereco': VidaEndereco,
  '/vida-beneficiario': VidaBeneficiario,
  '/vida-dps': VidaDps,
  '/vida-pagamento': VidaPagamento,
  '/vida-confirmacao': VidaConfirmacao,
};

function App() {
  return (
    <JornadaProvider>
      <VidaProvider>
      <HashRouter>
      <Routes>
        {ROUTES.map((route) => {
          const Page = PAGES[route.path];
          // ROUTES é `as const`, então cada campo opcional só existe nas
          // entradas que o declaram — daí o `in` antes de ler.
          const logado = 'loggedIn' in route && route.loggedIn;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PageShell
                  user={logado ? DEMO_USER.nomeCurto : undefined}
                  anterior={'anterior' in route ? route.anterior : undefined}
                  jornada={'jornada' in route ? route.jornada : undefined}
                  etapa={'etapa' in route ? route.etapa : undefined}
                >
                  <Page />
                </PageShell>
              }
            />
          );
        })}
      </Routes>
      <PrototypeNav />
      </HashRouter>
      </VidaProvider>
    </JornadaProvider>
  );
}

export default App;
