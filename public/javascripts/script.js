$(document).ready(function(){

  // function fetchFoods(val){
  //   var url = `https://api.nal.usda.gov/ndb/search/?q=${val}&max=25&offset=0&sort=n&ds=Standard%20Reference&api_key=IJRptWGibCsnknkK2RvBXmUxtratKK4l0pcuuMw4`;
    
  //   fetch(url)
  //     .then(result=>{
  //       if(!result.ok) return Promise.reject(result.statusText);
  //       return result.json();
  //     })
  //     .then(resultado=>{
  //       console.log(resultado);
  //       document.getElementById('nombre').innerHTML = data;
  //     })
  //     .catch(err=>console.log(err));
  // }

  // $('#foodSearch').keyup(()=>{
  //   var value = $('#foodSearch').val();
  //   fetchFoods(value);
  // });

  $('.sidenav').sidenav();
  $('select').formSelect();

});
