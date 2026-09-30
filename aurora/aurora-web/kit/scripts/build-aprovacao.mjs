// Versão de APROVAÇÃO na Vercel (não é a produção do domínio aurora.beyondcompany.com.br).
// - compila com o endereço de aprovação nas tags de compartilhamento e com noindex;
// - grava dist/vercel.json: /submissaomercado vai para o app real; o resto cai no index.html
//   (login, chamadas e candidatura são telas deste site).
// Uso: SITE=https://<alias>.vercel.app npm run build:aprovacao
// Depois: cd dist && env -u VERCEL_TOKEN vercel deploy --prod --yes --scope aurora-beyond
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const site = process.env.SITE;
if (!site) {
  console.error("Defina SITE (ex.: SITE=https://aurora-lp.vercel.app).");
  process.exit(1);
}
execSync("npm run build", {
  stdio: "inherit",
  env: { ...process.env, VITE_SITE_URL: site.replace(/\/$/, ""), VITE_ROBOTS: "noindex,nofollow" },
});
const APP = "https://aurora.beyondcompany.com.br";
writeFileSync(
  "dist/vercel.json",
  JSON.stringify(
    {
      // Só a submissão aberta vai para o app real (ainda não tem tela nova). Rota exata e
      // sub-rotas separadas: ":path*" sozinho acrescenta "/" no fim do destino.
      redirects: ["/submissaomercado"].flatMap((r) => [
        { source: r, destination: `${APP}${r}`, permanent: false },
        { source: `${r}/:path+`, destination: `${APP}${r}/:path+`, permanent: false },
      ]),
      // Telas do app (login, chamadas, candidatura) são rotas do próprio site: qualquer caminho
      // que não seja arquivo cai no index.html e o React escolhe a tela.
      rewrites: [{ source: "/(.*)", destination: "/index.html" }],
      headers: [{ source: "/(.*)", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }],
    },
    null,
    2,
  ),
);
console.log(`dist/ pronto para aprovação em ${site}`);
