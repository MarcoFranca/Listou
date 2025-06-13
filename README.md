# Listou
### 🏠 **Página principal:**

**Listou – App de Lista de Compras Inteligente**

> 📝 Bem-vindo à documentação do projeto Listou! Aqui você encontra tudo sobre o app, funcionalidades, modelo de dados, tecnologias e roadmap.
> 

---

### 1️⃣ **Visão Geral**

```
markdown
CopiarEditar
# Visão Geral

O Listou é um app de lista de compras inteligente, pensado para facilitar o controle e conferência de compras em supermercados, farmácias e similares.

**Público:** Pessoas comuns, microempreendedores, famílias, estudantes, idosos.
**Diferencial:** Controle de compras via toque ou scanner de código de barras, com cadastro automático dos produtos mais comuns.
**Funciona offline, mas com base para crescer para backup e sincronização online.**

```

---

### 2️⃣ **Funcionalidades do MVP**

```
markdown
CopiarEditar
# Funcionalidades do MVP

- Criar e editar listas de compras
- Adicionar/remover itens (nome, quantidade)
- Marcar itens como comprados (com toque)
- Busca e sugestão automática de produtos pela API (nome, foto, código de barras)
- Adicionar manualmente item e código de barras se não encontrado
- Scanner de código de barras para dar baixa automática nos itens
- Armazenamento local dos dados
- Monetização com anúncios (banner/recompensado)
- Opção de remover anúncios por pagamento (flag local)

```

---

### 3️⃣ **Funcionalidades Futuras**

```
markdown
CopiarEditar
# Funcionalidades Futuras

- Cadastro/login de usuário (Google/Facebook/email)
- Backup/sincronização via Firebase
- Listas compartilhadas em tempo real
- Histórico de listas, analytics de compras
- Recomendações baseadas no perfil/recorrência
- Crowdsourcing: usuários ajudam a popular base de produtos
- Dark mode, personalização de temas
- Promoções de mercado (ofertas de parceiros)

```

---

### 4️⃣ **Tecnologias Utilizadas**

```
mathematica
CopiarEditar
# Tecnologias Utilizadas

| Área            | Tecnologia                      | Motivo                             |
|-----------------|--------------------------------|-------------------------------------|
| App             | React Native (Expo)             | Rápido, multiplataforma, comunidade |
| Armazenamento   | AsyncStorage (local)            | Simples, sem backend inicial        |
| Scanner         | Expo Barcode Scanner            | Fácil de usar, integração rápida    |
| API produtos    | Open Food Facts API (REST)      | Dados globais, grátis               |
| Monetização     | AdMob (banner/recompensado)     | Monetiza fácil desde o começo       |
| Pagamento       | Stripe/Mercado Pago/Chave manual| MVP rápido, Play Store depois       |
| Versionamento   | GitHub                          | Controle de código                  |
| Deploy/Teste    | Expo Go + Google Play (futuro)  | Teste rápido + publicação fácil     |

```

*Dica:* Para tabela, use o bloco de **tabela inline** do Notion para facilitar atualização.

---

### 5️⃣ **Recursos Necessários**

```
markdown
CopiarEditar
# Recursos Necessários

- Conta Google para Expo e AdMob
- Chave de API do Open Food Facts (gratuita)
- Conta Stripe/Mercado Pago para pagamentos
- VS Code instalado, Node.js, Expo CLI

```

---

### 6️⃣ **Estrutura de Pastas do Projeto**

```
bash
CopiarEditar
# Estrutura de Pastas

listou-app/
├── assets/           # Imagens e ícones
├── components/       # Componentes reutilizáveis
├── screens/          # Telas do app
├── services/         # Serviços (API, storage, monetização)
├── utils/            # Funções auxiliares
├── App.tsx
├── app.json
├── README.md

```

---

### 7️⃣ **Modelo de Dados Inicial**

```
php
CopiarEditar
# Modelo de Dados Inicial

{
  id: string,
  nome: string,
  quantidade: number,
  codigo_barras?: string,
  foto_url?: string,
  comprado: boolean,
}

```

---

### 8️⃣ **Resumo do MVP**

```markdown
# Resumo do MVP

- Experiência fluida para criar, editar e marcar itens na lista
- Busca de produtos em API externa, evitando digitação do código
- Dar baixa pelo scanner, inovando na experiência
- Monetização com anúncios desde o início
- Estrutura preparada para crescimento (Firebase, login, backup no futuro)

```

---

### 9️⃣ **Roadmap / Backlog**

| Tarefa | Prioridade | Status | Observações |
| --- | --- | --- | --- |
| Estruturação inicial do projeto | Alta | Pendente |  |
| Tela de criação e edição de listas | Alta | Pendente |  |
| Integração com API de produtos | Alta | Pendente | Open Food Facts |
| Scanner de código de barras | Média | Pendente | Expo Barcode Scanner |
| Implementação de anúncios | Alta | Pendente | AdMob |
| Sistema de pagamento premium | Média | Pendente | Stripe/Mercado Pago |
| Sincronização online e backup | Baixa | Futuro | Firebase |

## 🛠️ **Modelagem de Dados Inicial – Listou**

Vamos pensar nos principais objetos (entidades):

### 1. **Lista de Compras**

- `id`: string (uuid)
- `nome`: string (ex: “Supermercado”, “Farmácia”)
- `criada_em`: date
- `itens`: array de Itens

### 2. **Item da Lista**

- `id`: string (uuid)
- `nome`: string (ex: “Coca-Cola 2L”)
- `quantidade`: number
- `codigo_barras`: string (opcional)
- `foto_url`: string (opcional)
- `comprado`: boolean

---

### 🗃️ **Estrutura do armazenamento local**

Você pode salvar todas as listas como um array de objetos, ou um objeto onde a chave é o ID da lista, exemplo:

```json
json
CopiarEditar
{
  "listas": [
    {
      "id": "abc123",
      "nome": "Supermercado",
      "criada_em": "2024-06-13T14:00:00.000Z",
      "itens": [
        {
          "id": "it1",
          "nome": "Coca-Cola 2L",
          "quantidade": 2,
          "codigo_barras": "7894900011517",
          "foto_url": "https://static.openfoodfacts.org/images/products/789/490/001/1517/front_fr.4.400.jpg",
          "comprado": false},
        {
          "id": "it2",
          "nome": "Arroz 1kg",
          "quantidade": 1,
          "codigo_barras": "7891234567895",
          "foto_url": null,
          "comprado": true}
      ]
    }
  ]
}

```

---

### 🔑 **Resumo dos campos**

### **Lista de Compras**

- id (string, obrigatório)
- nome (string, obrigatório)
- criada_em (date, obrigatório)
- itens (array de Item, obrigatório)

### **Item**

- id (string, obrigatório)
- nome (string, obrigatório)
- quantidade (number, obrigatório)
- codigo_barras (string, opcional)
- foto_url (string, opcional)
- comprado (boolean, obrigatório)

---

### 🚀 **Evoluindo para Firebase no futuro**

- Estrutura praticamente idêntica!
- Cada lista vira um documento do usuário.
- Pode adicionar campos extras como `user_id`, `compartilhada_com`, `ultima_atualizacao`, etc.

## 1. **Diagrama Entidade-Relacionamento (ER) – Texto**

```
yaml
CopiarEditar
[Lista]
|-- id: string (PK)
|-- nome: string
|-- criada_em: date
|-- itens: [Item]

  |
  | (uma lista TEM MUITOS itens)
  V

[Item]
|-- id: string (PK)
|-- nome: string
|-- quantidade: number
|-- codigo_barras: string (opcional)
|-- foto_url: string (opcional)
|-- comprado: boolean

```

---

## 2. **Interfaces TypeScript (para o projeto)**

```tsx
typescript
CopiarEditar
// models/List.ts
export interface Item {
  id: string;
  nome: string;
  quantidade: number;
  codigo_barras?: string;
  foto_url?: string;
  comprado: boolean;
}

export interface Lista {
  id: string;
  nome: string;
  criada_em: string; // ISO date
  itens: Item[];
}

```

---

## 3. **JSON de exemplo**

```json
json
CopiarEditar
{
  "listas": [
    {
      "id": "abc123",
      "nome": "Supermercado",
      "criada_em": "2024-06-13T14:00:00.000Z",
      "itens": [
        {
          "id": "it1",
          "nome": "Coca-Cola 2L",
          "quantidade": 2,
          "codigo_barras": "7894900011517",
          "foto_url": "https://static.openfoodfacts.org/images/products/789/490/001/1517/front_fr.4.400.jpg",
          "comprado": false},
        {
          "id": "it2",
          "nome": "Arroz 1kg",
          "quantidade": 1,
          "codigo_barras": "7891234567895",
          "foto_url": null,
          "comprado": true}
      ]
    }
  ]
}

```

---

## 4. **Visual simples do ER (pode desenhar no draw.io ou Notion)**

```
mathematica
CopiarEditar
┌────────────┐       1   ┌───────────┐
│   Lista    │──────────▶│   Item    │
└────────────┘      *    └───────────┘

```

**Legenda:**

- Uma **Lista** tem muitos **Itens**
- Um **Item** pertence a uma única **Lista**
