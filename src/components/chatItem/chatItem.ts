const tpl = `
{{#each chat}}
<div class="chat__list-item" data-id={{id}}>
<nav class = "contextmenu">
<ul class = "contextmenu__list">
<li class = "contextmenu__item item-archive">В архив</li>
<li class = "contextmenu__item item-delete" >Удалить чат</li>
</ul>
</nav>
  <img class="chat__list-item_avatar" src={{avatar}} alt="avatar" />
  <div class="chat__list-item_info">
    <h2 class="chat__list-item_title">
      {{title}}
    </h2>
    {{#if unread_count}}
    <p class="chat__list-item_unread">{{unread_count}}</p>
    {{/if}}
    {{#if last_message}}
    <p class="chat__list-item_text">{{last_message.user.display_name}}: {{last_message.content}}</p>
    <div>
    <p class="chat__list-item_date">{{last_message.time}}</p>
    </div>
    {{/if}}
  </div>
</div>
{{/each}}
`;

export default tpl;
