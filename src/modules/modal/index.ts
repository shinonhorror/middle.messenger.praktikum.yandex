const tpl = `
<div id="openModal" class={{modalClass}}>
  <div class="modal-dialog">
      <form class="modal-body" action="submit">    
        <h2 class="modal-body_title">{{title}}</h2>
        <img class="modal-body_img">
        <input class="modal-body_input" type="file" name="avatar" accept=".png, .jpg, .jpeg">
        <button class="modal-body_button">{{button}}</button>
      </form>
  </div>
</div>`;

export default tpl;
