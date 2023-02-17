const tpl = `
{{#each chat}}
<div class="chat__list-item" data-id={{id}}>
<nav class = "contextmenu">
<ul class = "contextmenu__list">
<li class = "contextmenu__item item-archive">В архив</li>
<li class = "contextmenu__item item-delete" >Удалить чат</li>
</ul>
</nav>
{{#if avatar}}
  <img class="chat__list-item_avatar" src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="avatar" />
{{else}}
<img class="chat__list-item_avatar" src={{defaultAvatar}} alt="avatar" />
{{/if}}
  <div class="chat__list-item_info">
    <h2 class="chat__list-item_title">
      {{title}}
    </h2>
    {{#if unread_count}}
    <p class="chat__list-item_unread">{{unread_count}}</p>
    {{/if}}
    {{#if last_message}}
    {{#if last_message.user.display_name}}
    <p class="chat__list-item_text">{{last_message.user.display_name}}: {{last_message.content}}</p>
    {{else}}
    <p class="chat__list-item_text">{{last_message.user.login}}: {{last_message.content}}</p>
    {{/if}}
    <div>
    <p class="chat__list-item_date">{{last_message.time}}</p>
    </div>
    {{/if}}
  </div>
</div>
{{/each}}
`;

export default tpl;
