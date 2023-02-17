const tpl = `
<div id="openModal" class="modal">
  <div class="modal-dialog">
      <form class="modal-body" action="submit">    
        <h2 class="modal-body_title">{{title}}</h2>
        <input class="modal-body_search" type="text" name="search" placeholder="Введите логин">
        {{{button}}}
        {{{searching}}}
      </form> 
  </div>
</div>
<button class="dropdown__btn"><i class="fa-solid {{btnClass}}"></i></button>
<div class = "dropdown__content">
{{#each links}}
<li class = "dropdown__content-link" data-class={{linkClass}}><a>{{title}}</a></li>
{{/each}}
</div>
`;

export default tpl;
