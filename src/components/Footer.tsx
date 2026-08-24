import styles from './Footer.module.css';
import { ChevronUpIcon } from './icons';
import logoParticipacoes from '../assets/images/logo-participacoes-unimed.png';
import logoCloudflare from '../assets/images/logo-cloudflare.png';
import logoSomosCoop from '../assets/images/logo-somos-coop.png';
import seloAns from '../assets/images/selo-ans-odonto.png';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <button type="button" className={styles.backToTop} onClick={scrollToTop} aria-label="Voltar ao topo">
        <ChevronUpIcon />
      </button>

      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.col}>
            <img src={logoParticipacoes} alt="Plataforma Digital Participações Unimed" className={styles.participacoesLogo} />
            <nav className={styles.linkList}>
              <a href="#">Produtos Individuais</a>
              <a href="#">Produtos Empresariais</a>
              <a href="#">Central de Ajuda</a>
              <a href="#">Política de Privacidade</a>
              <a href="#">Minhas Compras</a>
              <a href="#">Configurar cookies</a>
            </nav>
            <div className={styles.badges}>
              <img src={logoCloudflare} alt="Cloudflare" className={styles.cloudflareLogo} />
              <img src={logoSomosCoop} alt="Movimento SomosCoop" className={styles.coopLogo} />
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.eyebrow}>CONTATO</p>
            <p className={styles.colTitle}>Seguros Unimed</p>
            <div className={styles.contactBlock}>
              <p className={styles.contactLabel}>WhatsApp</p>
              <p className={styles.contactValue}>(11) 3265-9934</p>
            </div>
            <div className={styles.contactBlock}>
              <p className={styles.contactLabel}>E-mail</p>
              <p className={styles.contactValue}>atendimento@corretoraunimed.com.br</p>
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.eyebrow}>ADMINISTRADO POR</p>
            <p className={styles.colTitle}>Unimed Odonto</p>
            <div className={styles.legalBlock}>
              <p>Central de Atendimento: 0800 942 84 28</p>
              <p>SAC: 0800 942 84 28 – Opção 3</p>
              <p>Ouvidoria: 0800 001 25 65</p>
              <a href="#" className={styles.underline}>Acessibilidade e mais informações</a>
              <p>Unimed Odonto CRO/SP nº 13.666</p>
              <p>RT: Rosane Menezes Faria - CRO/SP nº 86.685</p>
            </div>
            <p className={styles.contingency}>
              Número de contingência do 0800, para uso na inviabilidade ou intermitência: (0xx DDD) 4000-1628
            </p>
            <img src={seloAns} alt="Registro ANS Odonto" className={styles.ansSeal} />
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>Copyright © 2001- </span>
          <span>Todos os direitos reservados à Unimed Corretora de Seguros</span>
          <span>CNPJ 54.204.250/0001-72</span>
        </div>
      </div>
    </footer>
  );
}
