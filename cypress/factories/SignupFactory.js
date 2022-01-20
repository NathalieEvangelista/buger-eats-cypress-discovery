//instalando a biblioteca que permite gerar dados dinãmicos
///npm install faker --save-dev
//biblioteca para gerar cpf
///npm install gerador-validador-cpf --save-dev
//importando a biblioteca
var faker = require('faker')
var cpf = require('gerador-validador-cpf')

//criando um módulo
export default {

    deliver: function (){

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            // em node -> name: "Nathalie Santos",
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            //em node -> cpf: "00000765345",
            //em node -> email: "nathalie@mail.com",
            email: faker.internet.email(firstName),
            whatsapp: "71999999999",
            address: {
                        postal_code: "41290200",
                        street: "Rua Oito de Novembro",
                        number: "387",
                        details: "Apto 4",
                        district: "Pirajá",
                        city_state: "Salvador/BA"
                    },
            delivery_metod: "Moto",
            cnh: "images/cnh-digital.jpg"
        }

        return data
    }
}