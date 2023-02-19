const tpl = `
<span class='error-span'></span>
{{#each users}}
<div class = "modal-body_result__item" data-id={{id}}>
{{#if avatar}}
<img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}">
{{else}}
<img id="avatar" src={{defaultAvatar}} alt="avatar" />
{{/if}}
<h1 class = "modal-body_result__item-login">{{login}}</h1>
<p class = "modal-body_result__item-role">{{role}}</p>
</div>
{{/each}}
`;

export default tpl;
