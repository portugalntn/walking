# Gestão de conteúdo

Os produtos e as regiões do site são geridos no **FLOW**, na área **FLOW Walking** (https://flow-ntn.vercel.app/walking). Este repo só lê esses dados.

## Como funciona

1. A equipa edita no FLOW, que grava no Supabase (tabelas `walking_produtos` e `walking_regioes`, fotos no bucket `walking`).
2. Quem carrega em **Publicar** no FLOW dispara o Deploy Hook da Vercel deste site.
3. O `npm run build` corre primeiro `scripts/pull-content.mjs`, que escreve `content/produtos/*.json` e `content/destinos/*.json` a partir do Supabase.
4. `scripts/content-index.mjs` (chamado pelo `next.config.ts`) gera `lib/content.generated.ts`, e `lib/programs.ts`, `lib/destinations.ts` e `lib/region-content.ts` dão aos componentes os mesmos tipos de sempre.

Se o Supabase falhar, ou se as variáveis faltarem, o build usa os `content/*.json` que estão no repo. O site nunca fica vazio por causa disso.

## Variáveis (Vercel do site e `.env.local`)

- `FLOW_SUPABASE_URL` = `https://zglwfzqbrcuwrzzqqnec.supabase.co`
- `FLOW_SUPABASE_KEY` = a chave publishable do projeto Flow NTN (a mesma `NEXT_PUBLIC_SUPABASE_ANON_KEY` do FLOW)

## Em desenvolvimento

```bash
npm run conteudo
```

Traz o conteúdo atual do FLOW para `content/`. Convém fazer commit desses ficheiros de vez em quando, para o fallback ficar atualizado.

## O que continua no código

- Os textos da interface estão em `messages/{en,pt,es}.json`.
- O EXCLUSIVE está em `lib/exclusive.ts`.
- A altimetria está em `lib/trail-profiles.json` (`npm run trail`).

As imagens antigas continuam em `public/images/` e os caminhos `/images/...` funcionam como antes. As fotos novas carregadas no FLOW vêm do Supabase Storage, autorizado em `next.config.ts` (`remotePatterns`).
