# PokéApp 🧩

Aplicativo desenvolvido com **Ionic + Angular**, utilizando a [PokeAPI](https://pokeapi.co/) para listar e exibir detalhes de Pokémons.

---

## 🚀 Objetivo

Este projeto foi desenvolvido como parte de uma avaliação técnica para demonstrar habilidades com:
- Consumo de APIs RESTful;
- Estruturação de projeto Ionic/Angular;
- Organização de componentes e serviços;
- Boas práticas de código, versionamento e design.

---

## 🧠 Abordagem e Solução (Dissertação)

Durante o desenvolvimento, busquei seguir boas práticas de organização e clareza de código.

- **Arquitetura:**  
  O projeto foi estruturado em módulos e componentes, separando responsabilidades (ex: `pages/`, `services/`, `components/`).  
  Essa separação melhora a escalabilidade e facilita manutenção.

- **Consumo de API:**  
  Utilizei o serviço `HttpClient` do Angular para consumir a [PokeAPI](https://pokeapi.co/api/v2/pokemon/).  
  Criei um *service* dedicado (`pokemon.service.ts`) para centralizar as chamadas HTTP.

- **Listagem de Pokémons:**  
  A tela inicial exibe uma lista paginada com o **nome** e a **imagem** de cada Pokémon.  
  Também inclui um botão para marcar Pokémons como **favoritos**, armazenando o estado localmente.

- **Detalhamento:**  
  Ao clicar em um Pokémon, o app redireciona para a tela de **detalhes**, onde são exibidas ao menos seis informações adicionais (altura, peso, tipo, habilidades etc).

- **UI/UX e Layout:**  
  Foram utilizados componentes do **Ionic Framework** para manter a identidade visual moderna e responsiva.  
  Ícones personalizados foram usados no lugar de `ion-icon` para diferenciar elementos interativos, como o favorito.

- **Gerenciamento de Estado:**  
  Utilizei *services* injetados com `@Injectable()` para manter o estado dos favoritos e dados carregados, garantindo reatividade entre telas.

- **Boas práticas:**  
  Cada funcionalidade foi commitada separadamente com mensagens descritivas no GitHub.  
  O código segue princípios de clareza, reuso e separação de camadas.

---

## 🧩 Recursos Implementados

- [x] Listagem de Pokémons (nome e imagem)  
- [x] Paginação  
- [x] Tela de detalhes com 6 informações  
- [x] Marcar/Desmarcar como favorito  
- [x] Layout responsivo (orientação móvel)  
- [x] Boas práticas de versionamento (commits claros)  

---

### 🧪 Testes de Unidade

Este projeto inclui testes de unidade desenvolvidos com **Jasmine + Karma**, cobrindo os principais fluxos de interação dos componentes `HomePage` e `PokemonDetailPage`.

Os testes verificam:
- Inicialização e carregamento dos dados da API;
- Ações de favoritar/desfavoritar;
- Paginação;
- Navegação entre rotas.

Para executá-los, utilize:
```bash
npm test
```

---

## 🧰 Tecnologias e Dependências

- **Ionic 7 / Angular 17**
- **TypeScript**
- **RxJS**
- **HttpClient (Angular)**
- **Ion Components**
- **CSS customizado + ícones personalizados**
- **LocalStorage** (para persistência dos favoritos)

---

## 📸 Capturas de Tela

### 🏠 Página Inicial
Versão desktop - Lista:
![Home Desktop](src/assets/screenshots/pagina%20inicial%20-%20lista.png)

Versão desktop - Grade:
![Home Desktop](src/assets/screenshots/pagina%20inicial%20-%20grade.png)

Versão mobile/responsivo - Lista:
![Home Mobile](src/assets/screenshots/pagina%20inicial%20-%20lista%20-%20responsivo.png)

Versão mobile/responsivo - Grade:
![Home Mobile](src/assets/screenshots/pagina%20inicial%20-%20grade%20-%20responsivo.png)

---

### 🔍 Detalhes do Pokémon
Versão desktop:
![Detalhes Desktop](src/assets/screenshots/pagina%20de%20detalhes%20do%20pokemon.png)

Versão mobile/responsivo:
![Detalhes Mobile](src/assets/screenshots/pagina%20de%20detalhes%20do%20pokemon%20-%20responsivo.png)

---

### 🧪 Testes Unitários
![Testes Unitários](src/assets/screenshots/teste%20unitario.png)

---

## 📜 Considerações Finais

Esse projeto foi uma excelente oportunidade para aplicar conceitos de arquitetura limpa, componentização e integração com APIs RESTful.  
Busquei manter um código legível, modular e de fácil evolução.

---

**Autor:** Denilson Felisberto  
📅 Novembro de 2025
