import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Termos de Uso e Privacidade',
  robots: 'noindex'
}

export default function Page() {
  return (
    <main className="prose dark:prose-invert max-w-screen-xl mx-auto p-4">
      <h1>Políticas de Privacidade e Termos de Uso</h1>
      <h2 id="pol-tica-de-privacidade">Política de Privacidade</h2>
      <p>Agradecemos por usar o aplicativo o Anipapers. Esta Política de Privacidade descreve como coletamos, usamos e compartilhamos suas informações pessoais quando você utiliza nosso aplicativo. Ao utilizar o Anipapers, você concorda com a coleta e o uso de suas informações pessoais conforme descrito nesta política.</p>
      <p>Coleta de Informações: Quando você cria uma conta no Anipapers, solicitamos que você forneça um nome de usuário e um endereço de e-mail. Essas informações são necessárias apenas para fins de identificação, permitindo que você curta os papéis de parede e siga animes de seu interesse. Não compartilhamos essas informações com terceiros nem as utilizamos para qualquer outro propósito.</p>
      <p>Uso de Informações: As informações fornecidas por você são utilizadas apenas para as funcionalidades do aplicativo, como permitir que você curta papéis de parede e siga animes. Não compartilhamos, vendemos ou transferimos suas informações pessoais para terceiros, a menos que seja exigido por lei ou seja necessário para proteger nossos direitos legais.</p>
      <p>Cookies: O Anipapers pode usar cookies ou tecnologias similares para melhorar sua experiência no aplicativo. Essas tecnologias permitem que lembremos quem você é, se assim permitir. Os cookies não contêm informações pessoais identificáveis como nome, nome de usuário ou senha ​​e não compartilhamos essas informações com terceiros.</p>
      <p>Segurança: Tomamos medidas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, lembre-se de que nenhum método de transmissão pela internet ou armazenamento eletrônico é completamente seguro. Portanto, não podemos garantir a segurança absoluta de suas informações.</p>
      <h2 id="termos-de-uso">Termos de Uso:</h2>
      <p>Ao utilizar o Anipapers, você concorda com o seguinte:</p>
      <ol className="list-descimal">
        <li>Você será responsável por todas as atividades realizadas em sua conta.</li>
        <li>Você não irá usar o aplicativo para qualquer atividade não autorizada.</li>
        <li>Você não irá utilizar o aplicativo para enviar qualquer tipo de spam ou conteúdo malicioso.</li>
        <li>Você não irá tentar interferir ou prejudicar o funcionamento adequado do aplicativo.</li>
      </ol>
      <p>Reservamo-nos o direito de suspender ou encerrar sua conta caso você viole esses termos de uso ou sejamos obrigados por lei a fazê-lo.</p>
      <p>Alterações na Política de Privacidade e Termos de Uso: Podemos atualizar esta Política de Privacidade e Termos de Uso de tempos em tempos. Recomendamos que você revise periodicamente esta página para estar ciente de quaisquer alterações. O uso contínuo do Anipapers após as alterações será considerado como aceitação dessas alterações.</p>
    </main>
  )
}
