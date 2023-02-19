const tpl = `
{{#if buttonClass}}
<button class={{buttonClass}} data-link = {{link}}>
<a class={{linkClass}}>{{title}}</a>
</button>
{{else}}
<a class={{linkClass}}>{{title}}</a>
{{/if}}
`;

export default tpl;
