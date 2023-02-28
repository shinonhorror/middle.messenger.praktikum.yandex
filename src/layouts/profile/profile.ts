const tpl = `
{{{modalAvatar}}}
<div class="profile">
<div class="profile__back">
{{{chatLink}}}
</div>
<form class="profile__desc" action="submit">
<div class="profile__desc-avatar">
{{#if user.avatar}}
<img id="avatar" src={{user.avatar}} alt="avatar" />
{{else}}
<img id="avatar" src={{avatar}} alt="avatar" />
{{/if}}
<span class="profile__desc-avatar_mask">
<p>Загрузить аватар</p>
</span>
</div>
<h2 class="profile__desc-name">{{user.login}}#{{user.id}}</h2>
{{{input}}}
<div class="profile__desc__btn-group">
{{{button}}}
</div>
</form>
</div>`;

export default tpl;
