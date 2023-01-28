const tpl = `<div class="chat">
  <div class="chat__line">
    <a class="chat__line-link" href={{profile}}>Профиль</a>
    <input
      class="chat__line-input"
      type="search"
      name="search"
      placeholder="Поиск"
    />
    <div class="chat__list">
      {{{chats}}}
    </div>
  </div>
  <div class="chat__window">
    {{! <p class="chat__window-text">
Выберите чат чтобы отправить сообщение
</p> }}
    <div class="chat__window-user">
      <img class="chat__window-user_avatar" src={{avatar}} alt="avatar" />
      <h2 class="chat__window-user_name">Вадим</h2>
      <button class="chat__window-user_settings"><i class="fa-solid fa-ellipsis-vertical"></i></button>
    </div>
    <div class="chat__window-core">
      <p class="chat__window-date">19 июня</p>
      {{{messages}}}
    </div>
    <div class="chat__window-message">
      <button class="chat__window-message_add"><i class="fa-solid fa-plus"></i></button>
      <form class="chat__window-message_form" action="submit">
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
