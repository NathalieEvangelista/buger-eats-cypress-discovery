class SignupPage {
    accessPage(){
        //configuração do viewport está sendo feita no arquivo cypress.json
        //cy.viewport(1440, 900)
        //utilizando o baseURL não é necessário informar o link exato de acesso ao site devido a configuração no arquivo cypress.json
        cy.visit('/')
        // utilizando ancora html como buscador do checkbox (que verifica se a migração de página está correta)
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver){
                //informações pessoais
                cy.get('input[name="fullName"]').type(deliver.name)
                cy.get('input[name="cpf"]').type(deliver.cpf)
                cy.get('input[name="email"]').type(deliver.email)
                cy.get('input[name="whatsapp"]').type(deliver. whatsapp)
        
                //endereço
                cy.get('input[name="postalcode"]').type(deliver.address.postal_code)
                cy.get('input[type="button"][value="Buscar CEP"]').click()
        
                cy.get('input[name="address-number"]').type(deliver.address.number)
                cy.get('input[name="address-details"]').type(deliver.address.details)
        
                //validando informações preenchidas baseada no postal_code
                cy.get('input[name="address"]').should('have.value',deliver.address.street)
                cy.get('input[name="district"]').should('have.value',deliver.address.district)
                cy.get('input[name="city-uf"]').should('have.value',deliver.address.city_state)
        
                //veiculo de entrega
                cy.contains('.delivery-method li', deliver.delivery_metod).click()
                
                //pacote instalado no cypress para upload de arquivo
                //comando: npm install cypress-file-upload --save-dev
                //adicionar o import em suport/index
                cy.get('input[accept^="image"]').attachFile(deliver.cnh)
                //cy.get('input[acpostal_codet^="image"]')
    }

    submit(){
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage){
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)  
    }

    alertMessageShouldBe(expectedMessage){
        //validar msg de erro quando existe apenas um campo para validar
        //cy.get('.alert-error').should('have.text', expectedMessage)
        //para validar mais de um campo é necessário realizar uma combinação de seletores. Dessa forma o cypress não acusa que foram encontrados várias chaves
        cy.contains('.alert-error', expectedMessage).should('be.visible') 
    }
}

//o new faz a importação do arquivo já ser instanciada 
export default new SignupPage