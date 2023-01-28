const tpl = `
{{#data}}
{{#if itemClass}}
<div class={{itemClass}}>
{{#if title}}
<label class={{labelClass}}>{{title}}</label>
{{/if}}
<input
class={{inputClass}}
type={{type}}
name={{inputName}}
{{#if value}}
value={{value}}
{{/if}}
{{#if disabled}}
{{disabled}}
{{/if}}
{{#if required}}
{{required}}
{{/if}}
/>
</div>
<span class='error_span'></span>
{{else}}
<input
class={{inputClass}}
type={{type}}
name={{inputName}}
{{#if placeholder}}
placeholder={{placeholder}}
{{/if}}
{{#if value}}
value={{value}}
{{/if}}
{{#if disabled}}
{{disabled}}
{{/if}}
{{#if required}}
{{required}}
{{/if}}
/>
<span class='error_span'></span>
{{/if}}
{{/data}}
`;
export default tpl;
