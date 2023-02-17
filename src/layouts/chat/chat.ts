const tpl = `
<div class="chat">
  <div class="chat__line">
    <a class="chat__line-link">Профиль</a>
    <input
      class="chat__line-input"
      type="search"
      name="search"
      placeholder="Поиск"
    />
    {{{button}}}
    <div class="chat__list">
      {{{chats}}}
    </div>
  </div>
  <div class="chat__window">
    {{#if active.[0].title}}
    <div class="chat__window-user">
      <img class="chat__window-user_avatar" src={{active.[0].avatar}} alt="avatar" />
      <h2 class="chat__window-user_name">{{active.[0].title}}</h2>
      {{{dropdown}}}
    </div>
    {{{messages}}}
    {{else}}
    <p class="chat__window-text">Выберите или создайте чат</p>
    {{/if}}
    <div class="chat__window-message">
      <button class="chat__window-message_add"><i class="fa-solid fa-plus"></i></button>
      <form class="chat__window-message_form">
        <input
          class="chat__window-message_input"
          type="text"
          placeholder="Сообщение"
          name="message"
        />
        <button class="chat__window-message_send" type="submit"><i class="fa-solid fa-arrow-right"></i></button>
      </form>
    </div>
  </div>
</div>`;

export default tpl;

// <p class="chat__window-date">19 июня</p>;
