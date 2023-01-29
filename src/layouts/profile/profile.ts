const tpl = `<div class="profile">
<div class="profile__back">
<a class="profile__back-link" href={{chat}}>Back</a>
</div>
<form class="profile__desc" action="submit">
<img class="profile__desc-avatar" src={{avatar}} alt="avatar" />
<h2 class="profile__desc-name">Иван</h2>
{{{input}}}
<div class="profile__desc__btn-group">
{{{button}}}
</div>
</form>
</div>`;

export default tpl;
