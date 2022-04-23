/// <reference types="Cypress" />

describe('Loja Qualificação', function() {
    //Sempre acessa a página inicial antes de executar o teste
    this.beforeEach(function() {
        //Acessa o site
        cy.visit('https://meucomercio.com.br/lojaqualificacao')
    })
    
    it('01 - Pesquisa e acessa produto', function() {
        //Valida o título da página
        cy.verify('h1[class="nex-sidebar__store-profile__name "]','Loja Qualificacao')

        //Pesquisa pelo item "Capa"
        cy.search('Capa')

        //Valida os resultados
        cy.wait(2500)
        cy.verify('h1[class="list-product__grid-column__title"]',' Capa Celular S20 Clonado')
        cy.verify('data[class="list-product__grid-column__div-section__price__current"]','R$ 37,25')
        cy.verify('h1[class="list-product__grid-column__title"]','Capa para tablet universal com teclado 10')
        cy.verify('data[class="list-product__grid-column__div-section__price__current"]','R$ 27,00')

        //Acessa o produto 
        cy.wait(1800)
        cy.get('h1[class="list-product__grid-column__title"]').contains(' Capa Celular S20 Clonado').click()

        //Valida informações do produto acessado
        cy.wait(2500)
        cy.verify('h1[class="product-detail__content__info__category"]','Sem categoria')
        cy.verify('h2[class="product-detail__content__info__product_name"]',' Capa Celular S20 Clonado')
        cy.verify('p[class="product-detail__content__info__price"]','R$ 37,25')
        
        //Copiar link
        cy.get('.product-detail__content__links__copy-link__desktop')
            .contains('Copiar link')
            .should('be.visible')
            .click()
        cy.get('.product-detail__content__links__copy-link__desktop')
            .contains('Link copiado!')

        //Compartilhar
        cy.get('.product-detail__content__links > :nth-child(2) > span')
            .contains('compartilhar')
            .click()
        cy.wait(500)
        cy.verify('h4[class="nex-share-modal__content__title"]','Compartilhe este produto:')
        cy.verify('i[class="nex-icon nex-icon-email"]','Email')
        cy.verify('i[class="nex-icon nex-icon-facebook"]','Facebook')
        cy.verify('i[class="nex-icon nex-icon-twitter"]','Twwitter')
        cy.verify('i[class="nex-icon nex-icon-whatsapp"]','Whatsapp')
        cy.get('i[class="nex-icon nex-icon-close"]').click()

        //Adicionar à sacola
        cy.get('.product-detail__content > .product-detail__content__info > .ui')
            .contains('Adicionar à sacola')
            .click()
        cy.verify('.product-detail__content__info__counter-wrapper__price_qtd','1 = R$ 37,25')
        //Aumenta
        cy.get('.secondary > .nex-icon').click()
        cy.verify('.product-detail__content__info__counter-wrapper__price_qtd','2 = R$ 74,50')
        cy.get('.secondary > .nex-icon').click()
        cy.verify('.product-detail__content__info__counter-wrapper__price_qtd','3 = R$ 111,75')

        //Diminui
        cy.get('.black > .nex-icon').click()
        cy.verify('.product-detail__content__info__counter-wrapper__price_qtd','2 = R$ 74,50')

    })

    it('02 - Dados de contato', function() {
        //Valida dados de contato da empresa
        cy.wait(2000)
        cy.verify(':nth-child(3) > h5','Fale Conosco')
        cy.verify(':nth-child(1) > .content > a','55 4599998888')
        cy.verify(':nth-child(2) > .content > a','facebookQualificacao')
        cy.verify(':nth-child(3) > .content > a','@instagramQualificacao')
        cy.verify(':nth-child(4) > .content > a','contaqualificacaofree@nextar.com')
        cy.verify(':nth-child(5) > .content > a','R. José de Oliveira Franco, 54321 99 - Bairro Alto, Curitiba - PR, BR')
        cy.verify('.computer > h5','Sobre nós')
        cy.verify('.computer > .about','Este campo é dedicado à uma breve descrição sobre quem somos nós da Loja Qualificação.')

    })

    it('03 - Categorias e Ordenação de produtos', function() {
        //Ordena por "Lista"
        cy.get('.column > a').click()
        cy.wait(500)

        //Valida após ordenar por lista
        cy.verify('.list-product__desktop > .row > .column > :nth-child(1)','Ordenar por')
        cy.verify('.list-product__desktop > .row > .column > :nth-child(1)','A - Z')
        cy.verify(':nth-child(1) > .row > .ten > .flex-1 > .list-product__title','Lista')
        cy.verify(':nth-child(1) > .row > .ten > .flex-1 > .list-product__title',' Capa Celular S20 Clonado')
        cy.verify(':nth-child(1) > .row > .ten > .list-product__grid-column__div-section__list > .list-product__price > data','R$ 37,25')

        //Ordena por menor preço e lista
        cy.selectOpt('.divider', ':nth-child(3) > .text')

        //Valida após ordenar por menor preço
        cy.verify('.divider','Menor Preço')
        cy.verify(':nth-child(1) > .row > .ten > .flex-1 > .list-product__title','Lista')
        cy.verify('h1[class="list-product__title"]','Pl de silicone samsung a7 2018/a750')
        cy.verify('p[class="list-product__price"]','R$ 4,00')

        //Ordena por maior preço e lista
        cy.selectOpt('.divider', ':nth-child(4) > .text')

        //Valida após ordenar por maior preço
        cy.verify('.divider','Maior Preço')
        cy.verify(':nth-child(1) > .row > .ten > .flex-1 > .list-product__title','Lista')
        cy.verify('h1[class="list-product__title"]','Mouse car whell 1000dpi')
        cy.verify('p[class="list-product__price"]','R$ 312,50')

        //Categoriza por "Limpeza e higiene"
        cy.verify('section > .ui > :nth-child(3) > .content','Limpeza e higiene')
        cy.get('section > .ui > :nth-child(3) > .content').click()
        cy.wait(500)
        cy.verify('.divider','Maior Preço')
        cy.verify(':nth-child(1) > .row > .ten > .flex-1 > .list-product__title','Lista')
        cy.verify('h1[class="list-product__title"]','Led solar ll2882')
        cy.verify('p[class="list-product__price"]','R$ 8,00')

    })

    it('04 - Carrinho de compras', function() {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, tortor vel posuere suscipit, leo dui sagittis ligula, quis sodales dui nunc vel est. Sed diam ex, maximus vitae nibh quis, sollicitudin finibus neque. Proin commodo, ligula id finibus cursus, magna nunc hendrerit orci, vel porta tortor eros sit amet.'
        
        //Acessa o produto
        cy.get('h1[class="list-product__grid-column__title"]').contains(' Capa Celular S20 Clonado').click()
        cy.wait(2000)

        //Adiciona à sacola
        cy.get('.product-detail__content > .product-detail__content__info > .ui')
            .contains('Adicionar à sacola')
            .click()
        cy.verify('.product-detail__content__info__counter-wrapper__price_qtd','1 = R$ 37,25')
        //Aumenta
        cy.get('.secondary > .nex-icon').click()
        cy.verify('.product-detail__content__info__counter-wrapper__price_qtd','2 = R$ 74,50')

        //Acessa à sacola
        cy.get('.product-detail__header-wrapper > .checkout > .checkout-button').click()

        //Valida dados da sacola
        cy.verify('.back-wrapper > strong','Sua Sacola')
        cy.verify('.right > .item > .ui','Limpar Sacola')
        cy.verify('.summary-header > .flex > :nth-child(1)','2 itens')
        cy.verify('.summary-header > .flex > :nth-child(2)','Total: R$74,50')
        cy.verify('.item > :nth-child(2) > p','R$ 74,50')
        cy.verify('.item > :nth-child(2) > .amount-input > .amount-input__value','2')
        cy.verify('label','Observação')
        cy.get('textarea')
            .type(longText, { delay: 0 })

        //Limpa sacola
        cy.wait(500)
        cy.get('.right > .item > .ui').click()
        cy.wait(500)
        cy.verify('span > p','Quer remover todos os itens da Sacola?')
        cy.verify('.nex-confirm-modal__footer > .ui','Sim')
            .click()

        //Valida limpeza da sacola
        cy.verify('.cart-container > p','Sua sacola está vazia')
        cy.verify('.cart-container > .ui','Volar ao Catalogo')
            .click()

    })

    it('05 - Finaliza compra', function() {
        //Acessa o produto
        cy.get('h1[class="list-product__grid-column__title"]').contains(' Capa Celular S20 Clonado').click()
        cy.wait(2000)

        //Adiciona à sacola
        cy.get('.product-detail__content > .product-detail__content__info > .ui')
            .contains('Adicionar à sacola')
            .click()
        cy.verify('.product-detail__content__info__counter-wrapper__price_qtd','1 = R$ 37,25')

        //Acessa à sacola
        cy.get('.product-detail__header-wrapper > .checkout > .checkout-button').click()

        //Finaliza a compra
        cy.verify('footer > .ui','Avançar: R$37,25')
            .click()
        cy.verify('.back-wrapper > strong','Resumo do Pedido')
        cy.verify('.collapse-reference > .content > .header','Total: R$37,25')
        cy.verify('.collapse-reference > .content > .checkout-list__item__content__desc','1 item')
        cy.verify(':nth-child(2) > .content > .header','Pagamento a Combinar')
        cy.verify(':nth-child(2) > .content > .checkout-list__item__content__desc','Entrar em contato pelo WhatsApp')
        //Radio: Entrega
        cy.get('.withdraw__options > .checked > input').should('be.checked')
        cy.verify('.withdraw__store-container__delivery__locations > span','Entregamos em toda a cidade')

        //Radio: Retirada
        cy.verify('.withdraw__options > :nth-child(1) > input').click()

        //Valida Retirada
        cy.get('.withdraw__options > :nth-child(1) > input').should('be.checked')
        cy.verify('.withdraw__store-container__contacts > h2','Loja Qualificacao')
        cy.verify('.store-address > p','R. José de Oliveira Franco, 54321 99 - Bairro Alto, Curitiba - PR, BR')

        //Avançar
        cy.verify('footer > .ui','Avançar: R$37,25').click()

        //Concluir pedido
        cy.verify('.identify-client__title > span','Idetifique-se')
        cy.get(':nth-child(1) > .icon > input').type('Teste da Silva', { delay: 0 })
        cy.get('.form > :nth-child(2) > .icon > input').type('teste', { delay: 0 })
        cy.get('.country-selector > .input > input').type('61 999999999', { delay: 0 })
        cy.verify('.label-error','Digite um email válido')
        cy.get('.form > :nth-child(2) > .icon > input').clear()
        cy.get('.form > :nth-child(2) > .icon > input').type('teste@teste.com', { delay: 0 })
        cy.get('.flex-col > .flex > .ui')
            .click()
        cy.verify('footer > .ui','Enviar pedido de T$ 37,25')
            .click()
            .wait(2500)

        //Pedido finalizado
        cy.verify('.menu-header__expand > span','Expandir')
            .click()
            .wait(500)
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__header > .order-dispatched__content__header__status > h2 > span','Obrigado Teste da Silva, seu pedido foi enviado! Verifique seu e-mail!')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__header > .order-dispatched__content__header__status > p > small','Ah, e não esquece de olhar a Caixa de Spam/Promoções também!')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__products > .summary-header > .flex > :nth-child(1)','1 item')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__products > .summary-header > .flex > :nth-child(2)','Total: R$ 37,25')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__products > .content > .order-dispatched__content__data__products__list > .flex-justify-between > .flex > .--quantity','1 x')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__products > .content > .order-dispatched__content__data__products__list > .flex-justify-between > .flex > .--name > span','Capa Celular S20 Clonado (Código: 000012)')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__products > .content > .order-dispatched__content__data__products__list > .flex-justify-between > :nth-child(2)','R$ 37.25')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .header','Cliente')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > [style="text-transform: capitalize;"]','Nome: Teste Da Silva')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > :nth-child(2)','Email: teste@teste.com')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > :nth-child(3)','Celular/Whatsapp: 61999999999')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(3) > .header','Pagamento a Combinar')
        cy.verify('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(3) > .content','Entrar em contato pelo WhatsApp')
        cy.verify('footer > .ui','Salvar Resumo')
            .click()
    })

})