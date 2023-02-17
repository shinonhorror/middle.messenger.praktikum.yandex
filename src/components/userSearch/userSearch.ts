const tpl = `
{{#users}}
<div class = "modal-body_result__item" data-id={{id}}>
{{#if avatar}}
<img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}">
{{else}}
<img id="avatar" src={{defaultAvatar}} alt="avatar" />
{{/if}}
<h1>{{login}}</h1>
</div>
{{/users}}
`;

export default tpl;
