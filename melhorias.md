## Bugs:

### Acesso:
1. Não aparece o alerta de Campo Obrigatório quando o e-mail não é inserido.

### Cadastro:
1. Não aparece o alerta de Campo Obrigatório quando o e-mail não é inserido.

### Eventos:
1. O campo de data do evento está com o título de "Custo" ao invés de "Data".
2. O custo não aceita números float, e como se trata de valor, deveria aceitar.
3. O título aceita string vazia.
4. Ao entrar em um evento para editá-lo, o campo de data não carrega a data criada.
5. Quando crio um evento, ao invés da mensagem dizer que eu criei o evento com sucesso, ela diz que realizei login com sucesso.
6. Em caso de Título e Observações extensas, os campos ultrapassam o limite do card.

## Melhorias:

### Acesso:
1. Ajustar o tempo de exibição do toast "Login Realizado com Sucesso".
2. Adicionar validação para garantir que o campo de e-mail contenha um formato de e-mail válido.
3. Adicionar validação de tamanho mínimo e máximo no e-mail e password.

### Cadastro:
1. Adicionar validação para garantir que o campo de e-mail contenha um formato de e-mail válido.
2. Adicionar validação de tamanho mínimo e máximo no e-mail e password

### Eventos:
1. Ajustar o título do campo Data do evento.
2. Adicionar validações para impedir o cadastro de eventos com o mesmo nome ou com o mesmo nome e data.
3. Ajustar a mensagem após a criação de um evento para refletir corretamente a ação realizada.
4. Adicionar validações de tamanho máximo e mínimo nos campos necessários.
5. Adicionar validação de valor mínimo e máximo de custo.
6. Ajustar layout dos cards em caso de Título e Observações muito longo. Talvez limitando o tamanho já resolva, mas o ideal é rever essa questão.
