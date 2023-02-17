const tpl = `
{{#if mess}}
{{#each mess}}
  <div class={{classItem}}>
  <p class={{classText}}>{{text}}</p>
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
