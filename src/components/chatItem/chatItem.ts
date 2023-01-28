const tpl = `{{#data}}<div class="chat__list-item">
  <img class="chat__list-item_avatar" src={{avatar}} alt="avatar" />
  <div class="chat__list-item_info">
    <h2 class="chat__list-item_title">
      {{title}}
    </h2>
    <p class="chat__list-item_text">{{text}}</p>
  </div>
  <div>
    <p class="chat__list-item_date">{{date}}</p>
  </div>
</div>{{/data}}`;

export default tpl;
