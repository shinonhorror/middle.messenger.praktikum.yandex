const tpl = `
<div class="message">
{{#if error}}
<h1 class="message__code">505</h1>
<h2 class="message__text">Мы уже фиксим</h2>
{{else}}
<h1 class="message__code">404</h1>
<h2 class="message__text">Не туда попали</h2>
{{/if}}
<a class="message__link">Назад</a>
</div>`;

export default tpl;
