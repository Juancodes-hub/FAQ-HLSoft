# Rode este arquivo na raiz do repositorio (pasta repo-hlsoft).
# Ele so renomeia 11 PDFs com git mv, sem reenviar os arquivos.
$b = "assets/manuais"

git mv "$b/complementares/vendas/procedimentos-complementares-manual-do-processo-de-venda-f12-utilizando-arpag.pdf" "$b/complementares/vendas/procedimentos-complementares-manual-do-processo-de-venda-f12-utilizando-pagamento.pdf"
git mv "$b/conversao-de-banco-de-dados/manual-de-conversao-de-arpa-para-arpa.pdf" "$b/conversao-de-banco-de-dados/manual-de-conversao-de-control-para-control.pdf"
git mv "$b/conversao-de-banco-de-dados/manual-do-conversor-universal-arpa-sistemas.pdf" "$b/conversao-de-banco-de-dados/manual-do-conversor-universal-control-sistemas.pdf"
git mv "$b/conversao-de-banco-de-dados/manual-dos-campos-obrigatorios-utilizados-no-conversor-universal-arpa-sistemas.pdf" "$b/conversao-de-banco-de-dados/manual-dos-campos-obrigatorios-utilizados-no-conversor-universal-control-sistemas.pdf"
git mv "$b/menu-utilitarios/configuracoes/manual-completo-do-gerenciador-de-servicos-arpa.pdf" "$b/menu-utilitarios/configuracoes/manual-completo-do-gerenciador-de-servicos-control.pdf"

git mv "$b/modulos-adicionais/arpag" "$b/modulos-adicionais/pagamento"
git mv "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-arpag-cielo.pdf" "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-pagamento-cielo.pdf"
git mv "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-arpag-fiserv.pdf" "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-pagamento-fiserv.pdf"
git mv "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-arpag-pagseguro.pdf" "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-pagamento-pagseguro.pdf"
git mv "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-arpag-rede.pdf" "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-pagamento-rede.pdf"
git mv "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-arpag-stone.pdf" "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-pagamento-stone.pdf"
git mv "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-arpag-vero.pdf" "$b/modulos-adicionais/pagamento/manual-de-configuracao-utilizacao-do-aplicativo-pagamento-vero.pdf"
