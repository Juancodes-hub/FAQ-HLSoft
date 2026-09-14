# HL SOFT — Central de Ajuda

Site estático (FAQ) do sistema HL SOFT, da HL Tele Informática.

## Estrutura

```
.
├── index.html
├── vercel.json
└── assets/
    ├── logo-hlsoft-horizontal.png
    ├── logo-hlteleinformatica.png
    └── favicon.png
```

Não tem build, framework nem dependências — é HTML/CSS/JS puro. Basta subir os arquivos.

> **Aviso de tamanho:** a pasta `assets/manuais` tem mais de 640 PDFs (~400 MB no total). Nenhum arquivo individual passa de 5 MB, então não bate no limite do GitHub (100 MB por arquivo) — mas o primeiro `git push` vai demorar bastante dependendo da sua internet.

## 1. Subir para o GitHub

Dentro desta pasta, no terminal:

```bash
git init
git add .
git commit -m "Site HL SOFT - central de ajuda"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Se ainda não criou o repositório: entre em [github.com/new](https://github.com/new), dê um nome (ex: `hlsoft-site`), deixe **público ou privado** (os dois funcionam com o Vercel) e **não** marque a opção de criar README — já existe um aqui. Depois é só rodar os comandos acima.

## 2. Publicar com o Vercel

1. Acesse [vercel.com](https://vercel.com) e entre com sua conta do GitHub.
2. Clique em **Add New → Project**.
3. Selecione o repositório que você acabou de subir.
4. O Vercel detecta sozinho que é um site estático — não precisa mudar nenhuma configuração de build. Clique em **Deploy**.
5. Em menos de um minuto o site está no ar, com um link tipo `hlsoft-site.vercel.app`.

## Atualizações depois

Qualquer alteração no `index.html` ou nas imagens: só fazer commit e `git push` de novo — o Vercel publica a nova versão sozinho a cada push na branch `main`.

## Rodando com o GitHub Codespaces

O Codespaces abre um ambiente de edição na nuvem, direto no navegador — bom para editar e visualizar o site sem instalar nada no computador. Ele não substitui o Vercel para deixar o site público permanentemente, mas dá pra usar os dois juntos.

1. No repositório, no GitHub, clique em **Code → Codespaces → Create codespace on main**.
2. Espere o ambiente carregar (leva menos de um minuto).
3. No terminal que abre, rode:
   ```bash
   npx serve . -l 8080
   ```
4. O Codespaces mostra um aviso de porta aberta (8080) — clique em **Abrir no navegador** para ver o site rodando ao vivo. Toda alteração que você salvar no `index.html` aparece ao atualizar a página.
5. Para publicar de verdade a partir do Codespaces (sem precisar sair dele), use o Vercel direto pelo terminal:
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```
6. Quando terminar de editar, faça commit e push (`git add .`, `git commit -m "ajustes"`, `git push`) — se o projeto já estiver conectado ao Vercel via GitHub, o deploy acontece sozinho.

## Domínio próprio (opcional)

No painel do projeto no Vercel: **Settings → Domains** → adicione o domínio (ex: `hlsoft.com.br`) e siga as instruções de DNS que aparecem lá.
