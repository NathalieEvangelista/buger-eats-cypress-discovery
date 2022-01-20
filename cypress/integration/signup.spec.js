import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory' 
import signupPage from '../pages/SignupPage'

describe('Signup', function() {

////Para executar os teste de fato é ideia rodar no terminal, pois é gerado um relatório e um vídeo de evidência em caso de sucesso
//// e um screenshot em caso de falha no teste obs.: os vídeos e screenshot são sobrescritos a cada execução
////Para isso: executar no terminal, dentro da pasta do projeto, o comando npx cypress run 
////Para executar o teste em outro navegador, diferente do electron, npx cypress run -b [nome do navegador]

/*     beforeEach(function() {
        cy.fixture('deliver').then((massaTeste) =>{
            this.deliver = massaTeste
        })
    }) */

    //it.skip vai pular o teste e passar para o próx
    it('User should be deliver', function() {
       
        var deliver = signupFactory.deliver()
        signup.accessPage()
        
        //massa de teste vem da pasta fixture, não é compatível com uso de arrowfunction no it
        //signup.fillForm(this.deliver.signup)
        //uma opção é usar massa de teste dinâmica em vez da fixture para gerar a massa de dados estática
        signup.fillForm(deliver)
        signup.submit()
        //validar o cadastro com sucesso
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it('Incorrect document', function() {
        //esse método permite que novos valores sejam inseridos nas chaves sem necessidade de alteração no próprio arquivo
        //como os dados estão em cascatas é possível.... 
        var deliver = signupFactory.deliver()
        deliver.cpf = '000000000765345'

        signup.accessPage()
    
        signup.fillForm(deliver)

        signup.submit()
        
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function() {
        var deliver = signupFactory.deliver()
        deliver.email = 'teste.com.br'

        signup.accessPage()

        signup.fillForm(deliver)

        signup.submit()
        
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    //como os teste tem uma execução procedural, caso haja problema em uma linha o teste é interropido naquele ponto e passa para o próx. teste
    //para tratar isso, para evitar a interropução do teste, deve-se criar um contexto
    
    context('Required fields', function(){
        //const do tipo array
        const messages = [
            { field: 'name', output: 'É necessário informar o nome'},
            { field: 'cpf', output: 'É necessário informar o CPF'},
            { field: 'email', output: 'É necessário informar o email'},
            { field: 'postal_code', output: 'É necessário informar o CEP'},
            { field: 'number', output: 'É necessário informar o número do endereço'},
            { field: 'delivery_method', output: 'Selecione o método de entrega'},
            { field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            signupPage.accessPage()
            signupPage.submit()
        })

        //forEach percorre cada item da lista em um loop
        messages.forEach(function(msg){
            //caso de teste do cypress
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

    /* it('Required fields', function(){
        signupPage.accessPage()

        signupPage.submit()

        //validando as mensagens para os campos obrigatórios
        signupPage.alertMessageShouldBe('É necessário informar o nome') //nome
        signupPage.alertMessageShouldBe('É necessário informar o CPF') //cpf
        signupPage.alertMessageShouldBe('É necessário informar o email') //email
        signupPage.alertMessageShouldBe('É necessário informar o CEP') //cep
        signupPage.alertMessageShouldBe('É necessário informar o número do endereço') //núm. endereço
        signupPage.alertMessageShouldBe('Selecione o método de entrega') //método de entrega
        signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH') //imagem da cnh

    }) */
})