const tpl = `
{{{modalAvatar}}}
{{{modalFiles}}}
<div class="chat">
  <div class="chat__line">
    {{{link}}}
    <input
      class="chat__line-input"
      type="search"
      name="search"
      placeholder="Поиск"
    />
    <span class='error-span'></span>
    {{{button}}}
    <div class="chat__list">
      {{{chats}}}
    </div>
  </div>
  <div class="chat__window">
    {{#if active.title}}
    <div class="chat__window-user">
    {{#if active.avatar}}
      <img class="chat__window-user_avatar" src="https://ya-praktikum.tech/api/v2/resources{{active.avatar}}" alt="avatar" />
    {{else}}
    <img class="chat__window-user_avatar" src={{active.defaultAvatar}} alt="avatar" />
    {{/if}}
    <h2 class="chat__window-user_name">{{active.title}}</h2>
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
