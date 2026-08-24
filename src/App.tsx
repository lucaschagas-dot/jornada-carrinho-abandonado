import type { ComponentType } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PageShell } from './components/PageShell';
import { PrototypeNav } from './components/PrototypeNav';
import { ROUTES, type RoutePath } from './routes';
import { DEMO_USER } from './demoUser';

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
  '/odonto-5': Odonto5,
};

function App() {
  return (
    <HashRouter>
      <Routes>
        {ROUTES.map((route) => {
          const Page = PAGES[route.path];
          // ROUTES é `as const`, então `loggedIn` só existe nas entradas que o declaram.
          const logado = 'loggedIn' in route && route.loggedIn;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PageShell user={logado ? DEMO_USER.nomeCurto : undefined}>
                  <Page />
                </PageShell>
              }
            />
          );
        })}
      </Routes>
      <PrototypeNav />
    </HashRouter>
  );
}

export default App;
