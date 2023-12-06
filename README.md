# MotorsShop

O MotorsShop é uma plataforma de concessionária de veículos que disponibiliza diversos recursos com o objetivo de oferecer aos usuários uma experiência completa ao comprar e vender carros. Com suas funcionalidades abrangentes, o MotorsShop simplifica e torna conveniente o processo de negociação de veículos.

---

## Funcionalidades

- **Anúncio de Carros:** O MotorsShop oferece a oportunidade de criar anúncios personalizados para quem deseja vender seu próprio veículo. Os usuários podem cadastrar carros para venda, incluindo detalhes completos como fotos, descrição, preço e informações de contato. Além disso, eles têm a liberdade de editar ou remover seus anúncios quando quiserem.

- **Gerenciamento de Anúncios:** Na MotorsShop, temos uma seção exclusiva para o gerenciamento dos anúncios, onde os usuários podem acessar todos os anúncios que cadastraram. Eles têm a opção de fazer alterações sempre que necessário ou remover os anúncios quando o veículo for vendido.

- **Autenticação e Gerenciamento de Perfil:** No MotorsShop, é fácil para os usuários criarem uma conta, fazerem login, redefinirem suas senhas e gerenciarem suas informações de perfil. Além disso, eles têm total liberdade para editar ou excluir seus perfis quando desejarem.

- **Compra de Carros:** Na MotorsShop, existe uma extensa variedade de veículos prontos para serem adquiridos. Os clientes podem explorar uma diversidade de marcas, modelos, anos, quilometragens e muito mais. Cada carro apresenta uma página detalhada, repleta de fotos, descrição completa, preço e dados de contato do vendedor.

- **Comentários:** Os usuários podem se envolver em interações entre si por meio de comentários, onde têm a opção de oferecer feedback, fazer perguntas ou fornecer informações extras sobre os carros anunciados. Adicionalmente, têm a possibilidade de editar ou remover seus próprios comentários.

---

## Tecnologias

O MotorsShop é desenvolvido utilizando as seguintes tecnologias:

- express-async-errors
- reflect-metadata
- jsonwebtoken
- nodemailer
- typescript
- bcryptjs
- express
- typeorm
- cors
- uuid
- zod
- pg

---

## Projeto front-end

[Confira o projeto](https://github.com/grupo12-t14/Kars-project)!

---

## Iniciando a api

- Abra o terminal e rode o comando `yarn` para instalar as dependências da api.

- Para iniciar a api, insira o comando `yarn start` no terminal.

---

## Rotas

<br>

## Login

`POST /login - FORMATO DA REQUISIÇÃO:`

```json
{
  "email": "leo@gmail.com",
  "password": "12345678"
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6InNlbGxlciIsImlhdCI6MTY4ODE3ODAyMywiZXhwIjoxNjg4MTk2MDIzLCJzdWIiOiIxMmY3OThlOC00YTFhLTRjOTUtOTEwOS1kMjdkYzE5ODZhMGYifQ.Zm7Gu9JlPiBeOQ8lr2ipDKJaLYU37E9f63PWRI62T5c"
}
```

---

## Usuários

`POST /users - FORMATO DA REQUISIÇÃO:`

```json
{
  "name": "Leôncio",
  "email": "leo@gmail.com",
  "cpf": "12345678910",
  "telephone": "12345678910",
  "birthdate": "1990-05-23",
  "description": "descrição",
  "cep": "12345678",
  "state": "MG",
  "city": "cidade",
  "street": "rua",
  "number": "154",
  "accountType": "seller",
  "complement": "complemento",
  "password": "12345678"
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "id": "c0bc376a-b7ad-4ea5-883e-521b64137f28",
  "name": "Leôncio",
  "email": "leo@gmail.com",
  "cpf": "12345678910",
  "telephone": "12345678910",
  "birthdate": "1990-05-23",
  "description": "descrição",
  "cep": "12345678",
  "state": "MG",
  "city": "cidade",
  "street": "rua",
  "number": "154",
  "accountType": "seller",
  "complement": "complemento"
}
```

`PATCH /users/:id - FORMATO DA REQUISISÃO:`

```json
{
  "name": "Leôncio Atualizado",
  "email": "leo@gmail.com",
  "cpf": "12345678910",
  "telephone": "12345678910",
  "birthdate": "1990-05-23",
  "description": "descrição",
  "cep": "12345678",
  "state": "MG",
  "city": "cidade",
  "street": "rua",
  "number": "154",
  "accountType": "seller",
  "complement": "complemento"
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "id": "c0bc376a-b7ad-4ea5-883e-521b64137f28",
  "name": "Leôncio Atualizado",
  "email": "leo@gmail.com",
  "cpf": "12345678910",
  "telephone": "12345678910",
  "birthdate": "1990-05-23",
  "description": "descrição",
  "cep": "12345678",
  "state": "MG",
  "city": "cidade",
  "street": "rua",
  "number": "154",
  "accountType": "seller",
  "complement": "complemento"
}
```

`DELETE /users/:id`

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{}
```

---

## Anúncios

`POST /announcements - FORMATO DA REQUISISÃO:`

```json
{
  "model": "aircross 100 anos 1.6 flex 16v aut.",
  "brand": "citroën",
  "year": "2020",
  "fuelType": 1,
  "value": 80000,
  "mileage": "50",
  "color": "vermelho",
  "fipePrice": 500.2,
  "sellPrice": 400,
  "description": "descrição",
  "coverImage": "",
  "images": [""]
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
  "userId": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
  "brand": "citroën",
  "model": "aircross 100 anos 1.6 flex 16v aut.",
  "year": "2020",
  "fuelType": 1,
  "value": 80000,
  "mileage": "50",
  "color": "vermelho",
  "fipePrice": 500.2,
  "sellPrice": 400,
  "description": "descrição",
  "coverImage": "",
  "images": [""]
}
```

`GET /announcements - FORMATO DA RESPOSTA:`

```json
[
  {
    "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
    "userId": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
    "brand": "citroën",
    "model": "aircross 100 anos 1.6 flex 16v aut.",
    "year": "2020",
    "fuelType": 1,
    "value": 80000,
    "mileage": "50",
    "color": "vermelho",
    "fipePrice": 500.2,
    "sellPrice": 400,
    "description": "descrição",
    "coverImage": "",
    "images": [""]
  },
  {
    "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
    "userId": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
    "brand": "citroën",
    "model": "aircross 100 anos 1.6 flex 16v aut.",
    "year": "2020",
    "fuelType": 1,
    "value": 80000,
    "mileage": "50",
    "color": "vermelho",
    "fipePrice": 500.2,
    "sellPrice": 400,
    "description": "descrição",
    "coverImage": "",
    "images": [""]
  }
]
```

`GET /announcements/:id - FORMATO DA RESPOSTA:`

```json
{
  "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
  "userId": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
  "brand": "citroën",
  "model": "aircross 100 anos 1.6 flex 16v aut.",
  "year": "2020",
  "fuelType": 1,
  "value": 80000,
  "mileage": "50",
  "color": "vermelho",
  "fipePrice": 500.2,
  "sellPrice": 400,
  "description": "descrição",
  "coverImage": "",
  "images": [""]
}
```

`PATCH /announcements/:id - FORMATO DA REQUISIÇÃO:`

```json
{
  "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
  "userId": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
  "brand": "citroën",
  "model": "aircross 100 anos 1.6 flex 16v aut.",
  "year": "2016",
  "fuelType": 1,
  "value": 100000,
  "mileage": "50",
  "color": "verde",
  "fipePrice": 500.2,
  "sellPrice": 300,
  "description": "descrição",
  "coverImage": "",
  "images": [""]
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
  "userId": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
  "brand": "citroën",
  "model": "aircross 100 anos 1.6 flex 16v aut.",
  "year": "2016",
  "fuelType": 1,
  "value": 100000,
  "mileage": "50",
  "color": "verde",
  "fipePrice": 500.2,
  "sellPrice": 300,
  "description": "descrição",
  "coverImage": "",
  "images": [""]
}
```

`DELETE /announcements/:id - FORMATO DA RESPOSTA:`

```json
{}
```

---

## Comentários

`POST /comments - FORMATO DA REQUISIÇÃO:`

```json
{
  "user": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
  "announcement": "dfc74f85-dd05-4dfa-989e-619bcbbfb4f6",
  "content": "Gostei muito!"
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
  "user": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
  "announcement": "dfc74f85-dd05-4dfa-989e-619bcbbfb4f6",
  "content": "Gostei muito!"
}
```

`GET /comments/:id - FORMATO DA RESPOSTA:`

```json
[
  {
    "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
    "user": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
    "announcement": "dfc74f85-dd05-4dfa-989e-619bcbbfb4f6",
    "content": "Gostei muito!"
  },
  {
    "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
    "user": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
    "announcement": "dfc74f85-dd05-4dfa-989e-619bcbbfb4f6",
    "content": "Incrível!"
  }
]
```

`PATCH /comments/:id - FORMATO DA REQUISIÇÃO:`

```json
{
  "user": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
  "announcement": "dfc74f85-dd05-4dfa-989e-619bcbbfb4f6",
  "content": "Recomendarei para meus amigos!"
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "id": "96723b2a-b5c6-4028-8a09-15adb5531a98",
  "user": "12f798e8-4a1a-4c95-9109-d27dc1986a0f",
  "announcement": "dfc74f85-dd05-4dfa-989e-619bcbbfb4f6",
  "content": "Recomendarei para meus amigos!"
}
```

`DELETE /comments/:id - FORMATO DA RESPOSTA:`

```json
{}
```

---

## Recuperação de senha

`PATCH /forgot/:id - FORMATO DA REQUISIÇÃO:`

```json
{
  "email": "leo@gmail.com"
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "message": "E-mail de recuperação de senha enviado."
}
```

`PATCH /reset/:id - FORMATO DA REQUISIÇÃO:`

```json
{
  "password": "87654231"
}
```

`CASO DÊ CERTO, FORMATO DA RESPOSTA:`

```json
{
  "message": "Senha redefinida com sucesso."
}
```

## Integrantes

### Carlos Eduardo

- LinkedIn: https://www.linkedin.com/in/carlos-eduardo-perezini-cavalari-347740250/
- GitHub: https://github.com/CarlosGalleth

### Jonathan Miranda

- LinkedIn: https://www.linkedin.com/in/jonathanmir/
- GitHub: https://github.com/jonathanmir

### Hugo Raphael

- LinkedIn: https://www.linkedin.com/in/hugo-raphael77/
- GitHub: https://github.com/hugo-raphael
