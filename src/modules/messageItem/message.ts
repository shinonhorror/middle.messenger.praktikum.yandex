const tpl = `
{{#if mess}}
{{#each mess}}
  <p class="chat__window-date">{{time}}</p>
  <div class={{classItem}}>
  {{#if path}}
  <img class="chat__window-your_message-image" src="https://ya-praktikum.tech/api/v2/resources{{path}}">
  {{else}}
  <p class={{classText}}>{{text}}</p>
  {{/if}}
  <p class={{classDate}}>
  {{#if isRead}}
  &#x2713 &#x2713 
  {{else}} 
  &#x2713 
  {{/if}}
  {{date}}</p>
  </div>
{{/each}}
{{else}}
<p class="chat__window-text">
  Напишите свое первое сообщение!
</p>
{{/if}}
`;

export default tpl;
