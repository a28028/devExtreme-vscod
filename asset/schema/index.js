if (typeof devexpdesigner === "undefined") {
  window.devexpdesigner = new Object();
} else if (typeof devexpdesigner !== "object") {
  throw ("brutusin global variable already exists");
}

devexpdesigner.run = function (json_forms_container, intype = 'dxForm', data = false) {
  this.json_forms_container = json_forms_container;
  this.intype = intype;
  $($('.w3-bar > .w3-bar-item ')[0]).text(this.intype);
  var _self = this;

  if (typeof schema != "undefined") {
    _self.dorun( window.schema[this.intype], data)
  }
  $.getJSON(`asset/schema/${this.intype}/sch-devxtream.json?_=` + Math.random(1, 1000000), function (intypeschema) {
    _self.dorun(intypeschema, data)
  })
}
  devexpdesigner.dorun = function (schema, data = false) {
    this.schema = schema;
    var BrutusinForms = brutusin["json-forms"];
    this.bf = BrutusinForms.create(schema);
    var container = document.getElementById(this.json_forms_container);
    $('#' + this.json_forms_container).html('');
    if (data) {
      this.bf.render(container, data);
    }
    else {
      this.bf.render(container);
    }
  }

devexpdesigner.apply = function () {
  var datajson = this.bf.getData();
  if (this.intype == 'dxDataGrid') {
    datajson.dataSource = [];
  }
  $("#form")[`${this.intype}`](datajson);
  $("#textareajson").val(JSON.stringify(datajson));
}

devexpdesigner.loadJson = function () {
  var data = JSON.parse($("#textareajson").val());
  if(data){
    if(this.intype = 'dxDataGrid'){
      if(data.columns ){
        data.columns.forEach(function (column , index){
          if(typeof column  == "string" ){
            var newcolumn = new Object();
            newcolumn.dataField = column;
            data.columns[index] = newcolumn;
          }
        })
      }
    }
    this.dorun( this.schema , data);

  }
}
devexpdesigner.opentab = function (evt, cityName) {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var activebtn = document.getElementsByClassName("tabbtn");
  for (i = 0; i < x.length; i++) {
    activebtn[i].className = activebtn[i].className.replace(" w3-dark-grey", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-dark-grey";
}


