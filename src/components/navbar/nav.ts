const tpl = `<ul class="pages__list">
  <li class="pages__list-item">
    <a class="pages__list-link" href={{login}} >Авторизация</a>
  </li>
  <li class="pages__list-item">
    <a class="pages__list-link" href={{auth}}>Регистрация</a>
  </li>
  <li class="pages__list-item">
    <a class="pages__list-link" href={{profile}}>Профиль</a>
  </li>
  <li class="pages__list-item">
    <a class="pages__list-link" href={{chat}}>Чат</a>
  </li>
  <li class="pages__list-item">
    <a class="pages__list-link" href={{error}}>500</a>
  </li>
  <li class="pages__list-item">
    <a class="pages__list-link" href={{notFound}}>404</a>
  </li>
</ul>`;

export default tpl;
