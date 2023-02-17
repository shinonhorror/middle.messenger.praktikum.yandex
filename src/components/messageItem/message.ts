const tpl = `
{{#if mess}}
{{#each mess}}
  <div class={{classItem}}>
  <p class={{classText}}>{{text}}</p>
  <p class={{classDate}}>{{date}}</p>
  </div>
{{/each}}
{{else}}
<p class="chat__window-text">
  Напишите свое первое сообщение!
</p>
{{/if}}
`;

export default tpl;
